const REPLICATE_BASE_URL = "https://api.replicate.com/v1";
const REPLICATE_SEEDANCE_VERSION = "018b80a8f9965fa245b7d92f8d9db120ab765b80226b16a95d0367588659921b";
const ATLAS_BASE_URL = "https://api.atlascloud.ai/api/v1/model";
const ATLAS_MODEL = "bytedance/seedance-2.0/image-to-video";

type ReplicatePredictionStatus =
  | "starting"
  | "processing"
  | "succeeded"
  | "failed"
  | "canceled";

interface ReplicatePredictionResponse {
  id: string;
  status: ReplicatePredictionStatus;
  output?: string | string[];
  error?: string;
}

interface AtlasCreateResponse {
  code?: number;
  message?: string;
  data?: {
    id?: string;
    urls?: { get?: string };
    status?: string;
  };
  prediction_id?: string;
  id?: string;
}

interface AtlasStatusResponse {
  code?: number;
  message?: string;
  data?: {
    status?: string;
    outputs?: string[] | { url?: string; video_url?: string };
    output?: string | string[] | { url?: string; video_url?: string };
    urls?: { get?: string };
    error?: string;
  };
  status?: string;
  output?: string | string[] | { url?: string; video_url?: string };
  video_url?: string;
  url?: string;
  prediction?: { output?: string | string[] | { url?: string; video_url?: string } };
  error?: string;
}

function buildHeaders(apiKey: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

export function getSeedanceApiKey(): string | undefined {
  return process.env.SEEDANCE_API_KEY || process.env.REPLICATE_API_TOKEN;
}

function shouldUseAtlas(apiKey: string): boolean {
  if (process.env.SEEDANCE_PROVIDER === "atlas") return true;
  if (process.env.SEEDANCE_PROVIDER === "replicate") return false;
  return apiKey.startsWith("apikey-");
}

function getAtlasModel(): string {
  return process.env.SEEDANCE_MODEL || ATLAS_MODEL;
}

export function toSeedanceAspectRatio(aspectRatio?: string): "16:9" | "9:16" {
  return aspectRatio === "9:16" ? "9:16" : "16:9";
}

export function toSeedanceDuration(durationSeconds?: number | string): number {
  const parsed = Number(durationSeconds);
  if (Number.isNaN(parsed) || parsed <= 0) return 5;
  return Math.max(3, Math.min(12, Math.round(parsed)));
}

export async function createSeedancePrediction(params: {
  apiKey: string;
  prompt: string;
  imageDataUrl?: string;
  aspectRatio: "16:9" | "9:16";
  duration: number;
}): Promise<string> {
  const { apiKey, prompt, imageDataUrl, aspectRatio, duration } = params;

  if (shouldUseAtlas(apiKey)) {
    if (!imageDataUrl) {
      throw new Error("Seedance (Atlas) requires a reference image for image-to-video.");
    }
    const atlasModel = getAtlasModel();
    const atlasContent = [
      {
        type: "image_url",
        image_url: { url: imageDataUrl },
      },
      {
        type: "text",
        text: prompt,
      },
    ];

    const response = await fetch(`${ATLAS_BASE_URL}/generateVideo`, {
      method: "POST",
      headers: buildHeaders(apiKey),
      body: JSON.stringify({
        model: atlasModel,
        // Seedance 2.0 Atlas multimodal schema
        content: atlasContent,
        input: {
          content: atlasContent,
          image_url: { url: imageDataUrl },
          prompt,
          aspect_ratio: aspectRatio,
          duration,
          camera_fixed: false,
        },
        image_url: { url: imageDataUrl },
        // Keep duplicated fields for compatibility with variants.
        prompt,
        aspect_ratio: aspectRatio,
        duration,
        camera_fixed: false,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Seedance (Atlas) create failed (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as AtlasCreateResponse;
    const predictionId = data.prediction_id || data.id || data.data?.id;
    if (!predictionId) {
      throw new Error(`Seedance (Atlas) returned no prediction id. Raw: ${JSON.stringify(data)}`);
    }
    return predictionId;
  }

  const input: Record<string, unknown> = {
    prompt,
    duration,
    resolution: "1080p",
    fps: 24,
    camera_fixed: false,
    aspect_ratio: aspectRatio,
  };
  if (imageDataUrl) {
    input.image = imageDataUrl;
  }

  const response = await fetch(`${REPLICATE_BASE_URL}/predictions`, {
    method: "POST",
    headers: buildHeaders(apiKey),
    body: JSON.stringify({
      version: REPLICATE_SEEDANCE_VERSION,
      input,
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Seedance create failed (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as ReplicatePredictionResponse;
  if (!data.id) {
    throw new Error(`Seedance create returned no prediction id. Raw: ${JSON.stringify(data)}`);
  }
  return data.id;
}

export async function waitForSeedanceOutputUrl(predictionId: string, apiKey: string): Promise<string> {
  if (shouldUseAtlas(apiKey)) {
    const maxAttempts = 180;
    for (let i = 0; i < maxAttempts; i++) {
      if (i > 0) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      const response = await fetch(`${ATLAS_BASE_URL}/prediction/${predictionId}`, {
        headers: buildHeaders(apiKey),
      });
      if (!response.ok) {
        const text = await response.text();
        try {
          const parsed = JSON.parse(text) as AtlasStatusResponse;
          const providerError = parsed.data?.error || parsed.error || parsed.message;
          if (providerError) {
            throw new Error(`Seedance (Atlas) generation failed: ${providerError}`);
          }
        } catch {
          // fall through to generic error below
        }
        throw new Error(`Seedance (Atlas) status failed (${response.status}): ${text}`);
      }

      const data = (await response.json()) as AtlasStatusResponse;
      const status = (data.data?.status || data.status || "").toLowerCase();
      if (status === "completed" || status === "succeeded" || status === "success") {
        const out = data.data?.outputs || data.data?.output || data.output || data.prediction?.output;
        const urlFromOutput = Array.isArray(out)
          ? out[0]
          : typeof out === "string"
            ? out
            : out?.video_url || out?.url;
        const outputUrl = data.video_url || data.url || urlFromOutput;
        if (!outputUrl) {
          throw new Error(`Seedance (Atlas) completed without output URL. Raw: ${JSON.stringify(data)}`);
        }
        return outputUrl;
      }
      if (status === "failed" || status === "error" || status === "canceled" || status === "cancelled") {
        throw new Error(data.data?.error || data.error || "Seedance (Atlas) generation failed.");
      }
    }
    throw new Error("Seedance (Atlas) generation timed out after 9 minutes");
  }

  const maxAttempts = 180;
  for (let i = 0; i < maxAttempts; i++) {
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    const response = await fetch(`${REPLICATE_BASE_URL}/predictions/${predictionId}`, {
      headers: buildHeaders(apiKey),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Seedance status failed (${response.status}): ${text}`);
    }

    const data = (await response.json()) as ReplicatePredictionResponse;
    if (data.status === "succeeded") {
      const output = data.output;
      const url = Array.isArray(output) ? output[0] : output;
      if (!url) {
        throw new Error(`Seedance succeeded without output URL. Raw: ${JSON.stringify(data)}`);
      }
      return url;
    }
    if (data.status === "failed" || data.status === "canceled") {
      throw new Error(data.error || `Seedance prediction ${data.status}.`);
    }
  }

  throw new Error("Seedance video generation timed out after 9 minutes");
}

export async function fetchSeedanceVideoAsBase64(url: string): Promise<string> {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Failed to download Seedance video (${response.status}).`);
  }
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}
