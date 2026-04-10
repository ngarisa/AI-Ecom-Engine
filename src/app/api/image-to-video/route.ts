import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";

export const maxDuration = 600;

const VEO_MODEL = "veo-3.1-generate-preview";

function getAspectRatio(aspectRatio?: string): "16:9" | "9:16" {
  return aspectRatio === "9:16" ? "9:16" : "16:9";
}

function getTargetDimensions(aspectRatio?: string): { width: number; height: number } {
  if (aspectRatio === "16:9") return { width: 1280, height: 720 };
  return { width: 720, height: 1280 };
}

function getDurationSeconds(durationSeconds?: number): 4 | 6 | 8 {
  if (durationSeconds === 4 || durationSeconds === 6 || durationSeconds === 8) {
    return durationSeconds;
  }
  return 8;
}

async function pollVideoStatus(operation: unknown, ai: GoogleGenAI, apiKey: string): Promise<string> {
  const maxAttempts = 120;
  let currentOperation = operation as {
    done?: boolean;
    response?: { generatedVideos?: Array<{ video?: { uri?: string } }> };
    error?: { message?: string };
  };

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    currentOperation = await ai.operations.getVideosOperation({
      operation: currentOperation,
    }) as typeof currentOperation;

    if (currentOperation.done === true) {
      if (currentOperation.error) {
        const errMsg = currentOperation.error.message || JSON.stringify(currentOperation.error);
        throw new Error(`Video generation failed: ${errMsg}`);
      }

      const videoUri = currentOperation.response?.generatedVideos?.[0]?.video?.uri;
      if (!videoUri) {
        throw new Error(`No video URI returned from Veo API. Raw: ${JSON.stringify(currentOperation)}`);
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

async function prepareReferenceImage(imageUrl: string, targetWidth: number, targetHeight: number): Promise<string | null> {
  try {
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return null;

    const rawBuffer = Buffer.from(await imgRes.arrayBuffer());

    const resizedBuffer = await sharp(rawBuffer)
      .resize(targetWidth, targetHeight, { fit: "cover", position: "centre" })
      .jpeg({ quality: 90 })
      .toBuffer();

    return resizedBuffer.toString("base64");
  } catch (err) {
    console.error("[image-to-video] Failed to prepare image:", err);
    return null;
  }
}

async function createVideoOperation(
  prompt: string,
  imageBase64: string,
  ratio: "16:9" | "9:16",
  duration: 4 | 6 | 8,
  apiKey: string,
): Promise<unknown> {
  const ai = new GoogleGenAI({ apiKey });
  const maxAttempts = 3;
  let lastError = "Unknown Gemini error";

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await ai.models.generateVideos({
        model: VEO_MODEL,
        prompt,
        image: {
          imageBytes: imageBase64,
          mimeType: "image/jpeg",
        },
        config: {
          aspectRatio: ratio,
          durationSeconds: duration,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      lastError = message;
      const is5xx = /(?:\b5\d\d\b|INTERNAL)/i.test(message);
      if (!is5xx || attempt === maxAttempts) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
    }
  }

  throw new Error(lastError);
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageUrl, durationSeconds, aspectRatio } = await request.json() as {
      prompt: string;
      imageUrl: string;
      aspectRatio?: string;
      durationSeconds?: number;
    };

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_AI_API_KEY ||
      process.env.GOOGLE_VEO_IMG2VID_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    if (!prompt || !imageUrl) {
      return NextResponse.json({ error: "prompt and imageUrl are required" }, { status: 400 });
    }

    const duration = getDurationSeconds(durationSeconds);
    const ratio = getAspectRatio(aspectRatio);
    const { width: targetWidth, height: targetHeight } = getTargetDimensions(ratio);

    const imageBase64 = await prepareReferenceImage(imageUrl, targetWidth, targetHeight);
    if (!imageBase64) {
      throw new Error("Failed to fetch or prepare reference image");
    }

    const ai = new GoogleGenAI({ apiKey });
    const operation = await createVideoOperation(prompt, imageBase64, ratio, duration, apiKey);
    const videoBase64 = await pollVideoStatus(operation, ai, apiKey);

    return NextResponse.json({ data: { videoBase64, mimeType: "video/mp4" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[image-to-video] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
