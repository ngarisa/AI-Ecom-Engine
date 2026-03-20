import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 600;

const OPENAI_BASE = "https://api.openai.com/v1";

function getVideoSize(aspectRatio?: string): string {
  if (aspectRatio === "16:9") return "1280x720";
  return "720x1280";
}

async function pollVideoStatus(videoId: string, apiKey: string): Promise<string> {
  const maxAttempts = 120;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const res = await fetch(`${OPENAI_BASE}/videos/${videoId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Poll error ${res.status}: ${errText}`);
    }

    const data = await res.json();

    if (data.status === "completed") {
      const contentRes = await fetch(`${OPENAI_BASE}/videos/${videoId}/content`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        redirect: "follow",
      });

      if (!contentRes.ok) {
        throw new Error(`Failed to download video: ${contentRes.status}`);
      }

      const buffer = await contentRes.arrayBuffer();
      return Buffer.from(buffer).toString("base64");
    }

    if (data.status === "failed") {
      const errMsg = data.error?.message || JSON.stringify(data);
      throw new Error(`Video generation failed: ${errMsg}`);
    }
  }

  throw new Error("Video generation timed out after 10 minutes");
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, aspectRatio, durationSeconds } = await request.json() as {
      prompt: string;
      aspectRatio?: string;
      durationSeconds?: string;
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const duration = String(Number(durationSeconds) || 8);
    const size = getVideoSize(aspectRatio);

    const genRes = await fetch(`${OPENAI_BASE}/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sora-2",
        prompt,
        size,
        seconds: duration,
      }),
    });

    if (!genRes.ok) {
      const errText = await genRes.text();
      throw new Error(`OpenAI Sora API error ${genRes.status}: ${errText}`);
    }

    const genData = await genRes.json();
    const videoId = genData.id;
    if (!videoId) {
      throw new Error(`No video ID returned from Sora API. Raw: ${JSON.stringify(genData)}`);
    }

    const videoBase64 = await pollVideoStatus(videoId, apiKey);

    return NextResponse.json({ data: { videoBase64, mimeType: "video/mp4" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[generate-video] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
