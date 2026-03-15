import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;

const VEO_MODEL = "veo-3.1-generate-preview";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

async function pollOperation(operationName: string, apiKey: string): Promise<string> {
  const maxAttempts = 30;

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

      const sample = data.response?.generateVideoResponse?.generatedSamples?.[0];
      const videoUri = sample?.video?.uri;

      if (!videoUri) {
        throw new Error(`No video URI in response. Raw: ${JSON.stringify(data.response)}`);
      }

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
    const { prompt, imageUrl, aspectRatio, durationSeconds } = await request.json() as {
      prompt: string;
      imageUrl: string;
      aspectRatio?: string;
      durationSeconds?: number;
    };

    const apiKey = process.env.GOOGLE_VEO_IMG2VID_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_VEO_IMG2VID_API_KEY not configured" }, { status: 500 });
    }

    if (!prompt || !imageUrl) {
      return NextResponse.json({ error: "prompt and imageUrl are required" }, { status: 400 });
    }

    // Fetch and encode the source image as base64
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      return NextResponse.json({ error: `Failed to fetch source image: ${imgRes.status}` }, { status: 400 });
    }
    const imgBuffer = await imgRes.arrayBuffer();
    const imageBase64 = Buffer.from(imgBuffer).toString("base64");
    const mimeType = imgRes.headers.get("content-type") || "image/jpeg";

    const genRes = await fetch(
      `${BASE_URL}/models/${VEO_MODEL}:predictLongRunning?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [
            {
              prompt,
              image: { bytesBase64Encoded: imageBase64, mimeType },
            },
          ],
          parameters: {
            aspectRatio: aspectRatio || "9:16",
            durationSeconds: durationSeconds || 8,
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

    const videoBase64 = await pollOperation(operation.name, apiKey);

    return NextResponse.json({ data: { videoBase64, mimeType: "video/mp4" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[image-to-video] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
