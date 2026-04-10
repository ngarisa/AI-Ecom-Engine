import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 600;

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";
const VEO_MODEL = "veo-3.1-generate-preview";

function getAspectRatio(aspectRatio?: string): "16:9" | "9:16" {
  return aspectRatio === "9:16" ? "9:16" : "16:9";
}

function getDurationSeconds(durationSeconds?: string): 4 | 6 | 8 {
  const parsed = Number(durationSeconds);
  if (parsed === 4 || parsed === 6 || parsed === 8) {
    return parsed;
  }
  return 8;
}

async function pollVideoStatus(operationName: string, apiKey: string): Promise<string> {
  const maxAttempts = 120;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const res = await fetch(`${GEMINI_BASE}/${operationName}`, {
      headers: { "x-goog-api-key": apiKey },
    });

    if (!res.ok) {
      // Gemini can intermittently return transient 5xx while operation is still running.
      if (res.status >= 500 && res.status < 600) {
        continue;
      }
      const errText = await res.text();
      throw new Error(`Poll error ${res.status}: ${errText}`);
    }

    const data = await res.json();

    if (data.done === true) {
      if (data.error) {
        const errMsg = data.error.message || JSON.stringify(data.error);
        throw new Error(`Video generation failed: ${errMsg}`);
      }

      const videoUri = data.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
      if (!videoUri) {
        throw new Error(`No video URI returned from Veo API. Raw: ${JSON.stringify(data)}`);
      }

      const contentRes = await fetch(videoUri, {
        headers: { "x-goog-api-key": apiKey },
        redirect: "follow",
      });

      if (!contentRes.ok) {
        throw new Error(`Failed to download video: ${contentRes.status}`);
      }

      const buffer = await contentRes.arrayBuffer();
      return Buffer.from(buffer).toString("base64");
    }
  }

  throw new Error("Video generation timed out after 10 minutes");
}

async function createVideoOperation(
  prompt: string,
  ratio: "16:9" | "9:16",
  duration: 4 | 6 | 8,
  apiKey: string,
): Promise<string> {
  const maxAttempts = 3;
  let lastError = "Unknown Gemini error";

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const genRes = await fetch(`${GEMINI_BASE}/models/${VEO_MODEL}:predictLongRunning`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          aspectRatio: ratio,
          durationSeconds: duration,
        },
      }),
    });

    if (genRes.ok) {
      const genData = await genRes.json();
      const operationName = genData.name;
      if (!operationName) {
        throw new Error(`No operation name returned from Veo API. Raw: ${JSON.stringify(genData)}`);
      }
      return operationName;
    }

    const errText = await genRes.text();
    lastError = `Gemini Veo API error ${genRes.status}: ${errText}`;
    if (genRes.status < 500 || genRes.status >= 600 || attempt === maxAttempts) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
  }

  throw new Error(lastError);
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, aspectRatio, durationSeconds } = await request.json() as {
      prompt: string;
      aspectRatio?: string;
      durationSeconds?: string;
    };

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_AI_API_KEY ||
      process.env.GOOGLE_VEO_IMG2VID_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const duration = getDurationSeconds(durationSeconds);
    const ratio = getAspectRatio(aspectRatio);

    const operationName = await createVideoOperation(prompt, ratio, duration, apiKey);

    const videoBase64 = await pollVideoStatus(operationName, apiKey);

    return NextResponse.json({ data: { videoBase64, mimeType: "video/mp4" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[generate-video] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
