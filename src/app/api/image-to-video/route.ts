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

async function uploadImageToOpenAI(imageUrl: string, apiKey: string): Promise<string | null> {
  try {
    // Fetch the source image
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return null;

    const buffer = await imgRes.arrayBuffer();
    const contentType = imgRes.headers.get("content-type") || "image/jpeg";
    const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpeg";

    // Upload to OpenAI Files API
    const formData = new FormData();
    const blob = new Blob([buffer], { type: contentType });
    formData.append("file", blob, `reference.${ext}`);
    formData.append("purpose", "user_data");

    const uploadRes = await fetch(`${OPENAI_BASE}/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData,
    });

    if (!uploadRes.ok) {
      console.error("[image-to-video] File upload failed:", await uploadRes.text());
      return null;
    }

    const uploadData = await uploadRes.json();
    return uploadData.id || null;
  } catch (err) {
    console.error("[image-to-video] Failed to upload image:", err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageUrl, durationSeconds, aspectRatio } = await request.json() as {
      prompt: string;
      imageUrl: string;
      aspectRatio?: string;
      durationSeconds?: number;
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
    }

    if (!prompt || !imageUrl) {
      return NextResponse.json({ error: "prompt and imageUrl are required" }, { status: 400 });
    }

    const duration = String(durationSeconds || 8);
    const size = getVideoSize(aspectRatio);

    // Upload the image to OpenAI first, then reference it
    const fileId = await uploadImageToOpenAI(imageUrl, apiKey);

    // Build the request body
    const requestBody: Record<string, unknown> = {
      model: "sora-2",
      prompt,
      size,
      seconds: duration,
    };

    if (fileId) {
      requestBody.input_reference = {
        type: "file",
        file: { id: fileId },
      };
    }

    const genRes = await fetch(`${OPENAI_BASE}/videos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
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
    console.error("[image-to-video] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
