import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import {
  createSeedancePrediction,
  fetchSeedanceVideoAsBase64,
  getSeedanceApiKey,
  toSeedanceAspectRatio,
  toSeedanceDuration,
  waitForSeedanceOutputUrl,
} from "@/lib/video/seedance";

export const maxDuration = 600;

function getAspectRatio(aspectRatio?: string): "16:9" | "9:16" {
  return aspectRatio === "9:16" ? "9:16" : "16:9";
}

function enforceBrandTextAccuracy(prompt: string, brandName?: string): string {
  const normalizedBrand = brandName?.trim();
  const explicitBrandInstruction = normalizedBrand
    ? `The exact brand text to render on-screen is "${normalizedBrand}" (case-sensitive). Show this exact text at least twice: in the opening 1 second and final 1 second.`
    : "Use one consistent brand name across the video and keep spelling identical every time it appears.";

  return [
    prompt,
    explicitBrandInstruction,
    "Integrate the logo/brand directly on the product, packaging, label, or garment surface in the main subject area, not as a corner watermark.",
    "Recreate any visible brand text with exact spelling and punctuation only.",
    "No distorted letters, no pseudo-text, and no alternate spellings in logos, overlays, captions, or call-to-action text.",
    "Prefer bold, simple sans-serif typography for readability and letter accuracy.",
  ].join(" ");
}

interface BrandPlacementBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function intersectionArea(a: BrandPlacementBox, b: BrandPlacementBox): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.width, b.x + b.width);
  const y2 = Math.min(a.y + a.height, b.y + b.height);
  if (x2 <= x1 || y2 <= y1) return 0;
  return (x2 - x1) * (y2 - y1);
}

function chooseEmbeddingBox(
  detectedBrandBox: BrandPlacementBox | null,
  detectedProductBox: BrandPlacementBox | null,
  width: number,
  height: number,
): BrandPlacementBox | null {
  if (detectedBrandBox && detectedProductBox) {
    const overlap = intersectionArea(detectedBrandBox, detectedProductBox);
    const brandArea = detectedBrandBox.width * detectedBrandBox.height;
    const overlapRatio = brandArea > 0 ? overlap / brandArea : 0;
    if (overlapRatio >= 0.25) {
      return detectedBrandBox;
    }
  }

  if (detectedProductBox) {
    return {
      x: clamp(Math.round(detectedProductBox.x + detectedProductBox.width * 0.15), 0, width - 1),
      y: clamp(Math.round(detectedProductBox.y + detectedProductBox.height * 0.34), 0, height - 1),
      width: clamp(Math.round(detectedProductBox.width * 0.7), 64, width),
      height: clamp(Math.round(detectedProductBox.height * 0.24), 36, height),
    };
  }

  if (detectedBrandBox) return detectedBrandBox;
  return null;
}

async function imageUrlToBuffer(imageUrl: string): Promise<Buffer | null> {
  if (imageUrl.startsWith("data:")) {
    const commaIndex = imageUrl.indexOf(",");
    if (commaIndex === -1) return null;
    return Buffer.from(imageUrl.slice(commaIndex + 1), "base64");
  }

  const response = await fetch(imageUrl);
  if (!response.ok) return null;
  return Buffer.from(await response.arrayBuffer());
}

async function detectBrandPlacementBox(
  imageBuffer: Buffer,
  mimeType: string,
  width: number,
  height: number,
): Promise<BrandPlacementBox | null> {
  const apiKey =
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  const prompt = [
    "Find the main visible brand/logo/text mark on the product or packaging in this ad image.",
    "Return ONLY strict JSON with pixel coordinates:",
    '{"x": <number>, "y": <number>, "width": <number>, "height": <number>}',
    "If none is visible, return: {}",
  ].join(" ");

  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: imageBuffer.toString("base64"),
            },
          },
        ],
      },
    ],
  };

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;

  const data = await response.json() as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };
  const rawText = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join(" ").trim();
  if (!rawText) return null;

  const jsonText = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  let parsed: Partial<BrandPlacementBox> | null = null;
  try {
    parsed = JSON.parse(jsonText) as Partial<BrandPlacementBox>;
  } catch {
    return null;
  }

  if (
    typeof parsed?.x !== "number" ||
    typeof parsed?.y !== "number" ||
    typeof parsed?.width !== "number" ||
    typeof parsed?.height !== "number"
  ) {
    return null;
  }

  const boxWidth = clamp(Math.round(parsed.width), 40, width);
  const boxHeight = clamp(Math.round(parsed.height), 24, height);
  const boxX = clamp(Math.round(parsed.x), 0, Math.max(0, width - boxWidth));
  const boxY = clamp(Math.round(parsed.y), 0, Math.max(0, height - boxHeight));
  return { x: boxX, y: boxY, width: boxWidth, height: boxHeight };
}

async function detectProductBox(
  imageBuffer: Buffer,
  mimeType: string,
  width: number,
  height: number,
): Promise<BrandPlacementBox | null> {
  const apiKey =
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  const prompt = [
    "Find the main product/package area in this ad image.",
    "Return ONLY strict JSON with pixel coordinates:",
    '{"x": <number>, "y": <number>, "width": <number>, "height": <number>}',
    "If no clear product exists, return: {}",
  ].join(" ");

  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: imageBuffer.toString("base64"),
            },
          },
        ],
      },
    ],
  };

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) return null;

  const data = await response.json() as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };
  const rawText = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join(" ").trim();
  if (!rawText) return null;

  const jsonText = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  let parsed: Partial<BrandPlacementBox> | null = null;
  try {
    parsed = JSON.parse(jsonText) as Partial<BrandPlacementBox>;
  } catch {
    return null;
  }

  if (
    typeof parsed?.x !== "number" ||
    typeof parsed?.y !== "number" ||
    typeof parsed?.width !== "number" ||
    typeof parsed?.height !== "number"
  ) {
    return null;
  }

  const boxWidth = clamp(Math.round(parsed.width), 40, width);
  const boxHeight = clamp(Math.round(parsed.height), 24, height);
  const boxX = clamp(Math.round(parsed.x), 0, Math.max(0, width - boxWidth));
  const boxY = clamp(Math.round(parsed.y), 0, Math.max(0, height - boxHeight));
  return { x: boxX, y: boxY, width: boxWidth, height: boxHeight };
}

async function applyBrandingOnProduct(
  baseJpegBuffer: Buffer,
  width: number,
  height: number,
  brandName?: string,
  brandLogoDataUrl?: string,
): Promise<Buffer> {
  const detectedBox = await detectBrandPlacementBox(baseJpegBuffer, "image/jpeg", width, height);
  const detectedProductBox = await detectProductBox(baseJpegBuffer, "image/jpeg", width, height);
  const targetBox = chooseEmbeddingBox(detectedBox, detectedProductBox, width, height);
  if (!targetBox) return baseJpegBuffer;
  const logoMaxWidth = clamp(Math.round(targetBox.width * 1.15), 80, Math.round(width * 0.55));
  const logoMaxHeight = clamp(Math.round(targetBox.height * 1.4), 50, Math.round(height * 0.35));

  if (brandLogoDataUrl) {
    const logoBuffer = await imageUrlToBuffer(brandLogoDataUrl).catch(() => null);
    if (logoBuffer) {
      const preparedLogo = await sharp(logoBuffer)
        .resize(logoMaxWidth, logoMaxHeight, { fit: "inside", withoutEnlargement: true })
        .png()
        .toBuffer();
      const meta = await sharp(preparedLogo).metadata();
      const logoWidth = meta.width || logoMaxWidth;
      const logoHeight = meta.height || logoMaxHeight;
      const left = clamp(
        Math.round(targetBox.x + (targetBox.width - logoWidth) / 2),
        0,
        Math.max(0, width - logoWidth),
      );
      const top = clamp(
        Math.round(targetBox.y + (targetBox.height - logoHeight) / 2),
        0,
        Math.max(0, height - logoHeight),
      );
      const embeddedLogo = await sharp(preparedLogo)
        .ensureAlpha(0.85)
        .modulate({ brightness: 0.88, saturation: 0.9 })
        .blur(0.4)
        .png()
        .toBuffer();
      return sharp(baseJpegBuffer)
        .composite([{ input: embeddedLogo, top, left, blend: "multiply" }])
        .jpeg({ quality: 90 })
        .toBuffer();
    }
  }

  if (!brandName?.trim()) return baseJpegBuffer;
  const safeBrandName = brandName.replace(/[<&>"]/g, (ch) => (
    { "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" }[ch] || ch
  ));
  const fontSize = Math.max(28, Math.round(width * 0.035));
  const badgeWidth = Math.min(width - 40, Math.max(260, safeBrandName.length * (fontSize * 0.62) + 36));
  const badgeHeight = fontSize + 26;
  const badgeX = clamp(Math.round(targetBox.x + (targetBox.width - badgeWidth) / 2), 20, Math.max(20, width - badgeWidth - 20));
  const badgeY = clamp(Math.round(targetBox.y + (targetBox.height - badgeHeight) / 2), 20, Math.max(20, height - badgeHeight - 20));

  const svg = `
<svg width="${width}" height="${height}">
  <rect x="${badgeX}" y="${badgeY}" rx="12" ry="12" width="${badgeWidth}" height="${badgeHeight}" fill="rgba(0,0,0,0.68)" />
  <text x="${badgeX + 18}" y="${badgeY + badgeHeight - 14}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff">${safeBrandName}</text>
</svg>`;
  return sharp(baseJpegBuffer)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toBuffer();
}

async function preparePromptImageDataUri(
  imageUrl: string | null | undefined,
  targetWidth: number,
  targetHeight: number,
): Promise<string | undefined> {
  if (!imageUrl) return undefined;

  try {
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return undefined;

    const rawBuffer = Buffer.from(await imgRes.arrayBuffer());
    const resizedBuffer = await sharp(rawBuffer)
      .resize(targetWidth, targetHeight, { fit: "cover", position: "centre" })
      .jpeg({ quality: 90 })
      .toBuffer();
    return `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, thumbnailUrl, brandName, brandLogoDataUrl, aspectRatio, durationSeconds } = await request.json() as {
      prompt: string;
      thumbnailUrl?: string | null;
      brandName?: string;
      brandLogoDataUrl?: string;
      aspectRatio?: string;
      durationSeconds?: string;
    };

    const apiKey = getSeedanceApiKey();
    if (!apiKey) {
      return NextResponse.json({ error: "SEEDANCE_API_KEY (or REPLICATE_API_TOKEN) not configured" }, { status: 500 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const ratio = getAspectRatio(aspectRatio);
    const seedanceRatio = toSeedanceAspectRatio(ratio);
    const seedanceDuration = toSeedanceDuration(durationSeconds);
    const seedancePrompt = enforceBrandTextAccuracy(prompt, brandName);
    const targetWidth = ratio === "16:9" ? 1280 : 720;
    const targetHeight = ratio === "16:9" ? 720 : 1280;
    const promptImage = await preparePromptImageDataUri(thumbnailUrl, targetWidth, targetHeight);
    let brandedPromptImage = promptImage;
    if (promptImage) {
      const promptImageBase64 = promptImage.split(",")[1];
      if (promptImageBase64) {
        const brandedPromptImageBuffer = await applyBrandingOnProduct(
          Buffer.from(promptImageBase64, "base64"),
          targetWidth,
          targetHeight,
          brandName,
          brandLogoDataUrl,
        );
        brandedPromptImage = `data:image/jpeg;base64,${brandedPromptImageBuffer.toString("base64")}`;
      }
    }

    const predictionId = await createSeedancePrediction({
      apiKey,
      prompt: seedancePrompt,
      aspectRatio: seedanceRatio,
      duration: seedanceDuration,
      imageDataUrl: brandedPromptImage,
      modelOverride: process.env.SEEDANCE_VIDEO_TO_VIDEO_MODEL,
    });
    const outputUrl = await waitForSeedanceOutputUrl(predictionId, apiKey);
    const videoBase64 = await fetchSeedanceVideoAsBase64(outputUrl);

    return NextResponse.json({ data: { videoBase64, mimeType: "video/mp4" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[generate-video] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
