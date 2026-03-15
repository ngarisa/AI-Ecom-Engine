import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300; // 5 minutes — Veo generation can take 2-3 min

const VEO_MODEL = "veo-3.1-generate-preview";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

async function pollOperation(operationName: string, apiKey: string): Promise<string> {
  const maxAttempts = 30; // 30 × 10s = 5 min max

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const res = await fetch(`${BASE_URL}/${operationName}`, {
      headers: { "x-goog-api-key": apiKey },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Poll error ${res.status}: ${errText}`);
    }

    const data = await res.json();

    if (data.done) {
      if (data.error) {
        throw new Error(`Video generation failed: ${JSON.stringify(data.error)}`);
      }

      // Actual response path from Veo API
      const sample = data.response?.generateVideoResponse?.generatedSamples?.[0];
      const videoUri = sample?.video?.uri;

      if (!videoUri) {
        throw new Error(`No video URI in response. Raw: ${JSON.stringify(data.response)}`);
      }

      // Fetch the video and convert to base64 so the client can display it
      const videoRes = await fetch(videoUri, {
        headers: { "x-goog-api-key": apiKey },
      });
      if (!videoRes.ok) {
        throw new Error(`Failed to fetch generated video: ${videoRes.status}`);
      }
      const buffer = await videoRes.arrayBuffer();
      return Buffer.from(buffer).toString("base64");
    }
  }

  throw new Error("Video generation timed out after 5 minutes");
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, thumbnailUrl, aspectRatio, durationSeconds } = await request.json() as {
      prompt: string;
      thumbnailUrl?: string | null;
      aspectRatio?: string;
      durationSeconds?: string;
    };

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_AI_API_KEY not configured" }, { status: 500 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    // Build instance — optionally attach competitor thumbnail as first-frame reference
    const instance: Record<string, unknown> = { prompt };

    if (thumbnailUrl) {
      try {
        const imgRes = await fetch(thumbnailUrl);
        if (imgRes.ok) {
          const buffer = await imgRes.arrayBuffer();
          instance.image = {
            bytesBase64Encoded: Buffer.from(buffer).toString("base64"),
            mimeType: imgRes.headers.get("content-type") || "image/jpeg",
          };
        }
      } catch {
        // proceed without reference image
      }
    }

    // Start long-running generation
    const genRes = await fetch(
      `${BASE_URL}/models/${VEO_MODEL}:predictLongRunning?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [instance],
          parameters: {
            aspectRatio: aspectRatio || "9:16",
            durationSeconds: Number(durationSeconds) || 8,
          },
        }),
      }
    );

    if (!genRes.ok) {
      const errText = await genRes.text();
      throw new Error(`Veo API error ${genRes.status}: ${errText}`);
    }

    const operation = await genRes.json();
    if (!operation.name) {
      throw new Error("No operation name returned from Veo API");
    }

    // Poll until complete
    const videoBase64 = await pollOperation(operation.name, apiKey);

    return NextResponse.json({ data: { videoBase64, mimeType: "video/mp4" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[generate-video] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
