import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 600;

const HEYGEN_BASE = "https://api.heygen.com";

async function pollVideoStatus(videoId: string, apiKey: string): Promise<string> {
  const maxAttempts = 60;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const res = await fetch(`${HEYGEN_BASE}/v1/video_status.get?video_id=${videoId}`, {
      headers: { "X-Api-Key": apiKey },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Poll error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const status = data?.data?.status;

    if (status === "completed") {
      const videoUrl = data?.data?.video_url;
      if (!videoUrl) {
        throw new Error(`No video_url in response. Raw: ${JSON.stringify(data)}`);
      }

      const videoRes = await fetch(videoUrl);
      if (!videoRes.ok) {
        throw new Error(`Failed to fetch generated video: ${videoRes.status}`);
      }
      const buffer = await videoRes.arrayBuffer();
      return Buffer.from(buffer).toString("base64");
    }

    if (status === "failed") {
      throw new Error(`Video generation failed: ${JSON.stringify(data)}`);
    }
  }

  throw new Error("Video generation timed out after 10 minutes");
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageUrl, durationSeconds } = await request.json() as {
      prompt: string;
      imageUrl: string;
      aspectRatio?: string;
      durationSeconds?: number;
    };

    const apiKey = process.env.HEYGEN_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "HEYGEN_API_KEY not configured" }, { status: 500 });
    }

    if (!prompt || !imageUrl) {
      return NextResponse.json({ error: "prompt and imageUrl are required" }, { status: 400 });
    }

    // HeyGen Video Agent has no duration param — inject it into the prompt
    const duration = durationSeconds || 15;
    const enrichedPrompt = `${prompt} Source image reference: ${imageUrl} The video should be approximately ${duration} seconds long.`;

    const genRes = await fetch(`${HEYGEN_BASE}/v1/video_agent/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({ prompt: enrichedPrompt }),
    });

    if (!genRes.ok) {
      const errText = await genRes.text();
      throw new Error(`HeyGen API error ${genRes.status}: ${errText}`);
    }

    const genData = await genRes.json();
    const videoId = genData?.data?.video_id;
    if (!videoId) {
      throw new Error(`No video_id returned from HeyGen API. Raw: ${JSON.stringify(genData)}`);
    }

    const videoBase64 = await pollVideoStatus(videoId, apiKey);

    return NextResponse.json({ data: { videoBase64, mimeType: "video/mp4" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[image-to-video] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
