const RUNWAY_BASE_URL = "https://api.dev.runwayml.com/v1";
const RUNWAY_VERSION = "2024-11-06";
const RUNWAY_MODEL = "gen4.5";
const MAX_PROMPT_CHARS = 1000;
const FALLBACK_PROMPT_IMAGE_DATA_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AApMBgQf9Nw0AAAAASUVORK5CYII=";

type RunwayTaskStatus = "PENDING" | "THROTTLED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";

interface RunwayTaskResponse {
  id: string;
  status?: RunwayTaskStatus;
  failure?: string;
  output?: string[];
}

function buildHeaders(apiKey: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "X-Runway-Version": RUNWAY_VERSION,
  };
}

export function getRunwayApiKey(): string | undefined {
  return process.env.RUNWAY_API_KEY || process.env.RUNWAYML_API_SECRET;
}

export function toRunwayRatio(aspectRatio?: string): "1280:720" | "720:1280" {
  return aspectRatio === "16:9" ? "1280:720" : "720:1280";
}

/**
 * Gen-4.5 currently supports 5s and 10s outputs for image_to_video.
 * We map existing UI values to the nearest supported duration.
 */
export function toRunwayDuration(durationSeconds?: number | string): 5 | 10 {
  const parsed = Number(durationSeconds);
  if (parsed <= 5) return 5;
  return 10;
}

export function buildRunwayPrompt(rawPrompt: string): string {
  const compact = rawPrompt.replace(/\s+/g, " ").trim();
  if (compact.length <= MAX_PROMPT_CHARS) {
    return compact;
  }

  const sentences = compact.split(/(?<=[.!?])\s+/);
  let truncated = "";
  for (const sentence of sentences) {
    const next = truncated ? `${truncated} ${sentence}` : sentence;
    if (next.length > MAX_PROMPT_CHARS) break;
    truncated = next;
  }

  if (!truncated) {
    truncated = compact.slice(0, MAX_PROMPT_CHARS);
  }

  return truncated.trim();
}

export function withFallbackPromptImage(promptImage?: string): string {
  return promptImage || FALLBACK_PROMPT_IMAGE_DATA_URI;
}

export async function createRunwayVideoTask(params: {
  apiKey: string;
  promptText: string;
  ratio: "1280:720" | "720:1280";
  duration: 5 | 10;
  promptImage: string;
}): Promise<string> {
  const { apiKey, promptText, ratio, duration, promptImage } = params;

  const body: Record<string, unknown> = {
    model: RUNWAY_MODEL,
    promptText,
    ratio,
    duration,
    promptImage,
  };

  const response = await fetch(`${RUNWAY_BASE_URL}/image_to_video`, {
    method: "POST",
    headers: buildHeaders(apiKey),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Runway create task failed (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as RunwayTaskResponse;
  if (!data.id) {
    throw new Error(`Runway did not return a task id. Raw: ${JSON.stringify(data)}`);
  }

  return data.id;
}

export async function waitForRunwayOutputUrl(taskId: string, apiKey: string): Promise<string> {
  const maxAttempts = 120;

  for (let i = 0; i < maxAttempts; i++) {
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    const response = await fetch(`${RUNWAY_BASE_URL}/tasks/${taskId}`, {
      headers: buildHeaders(apiKey),
    });

    if (!response.ok) {
      const text = await response.text();
      const isRetryable = response.status >= 500 && response.status < 600;
      if (isRetryable) {
        continue;
      }
      throw new Error(`Runway task status failed (${response.status}): ${text}`);
    }

    const task = (await response.json()) as RunwayTaskResponse;
    const status = task.status;

    if (status === "SUCCEEDED") {
      const outputUrl = task.output?.[0];
      if (!outputUrl) {
        throw new Error(`Runway task succeeded without output URL. Raw: ${JSON.stringify(task)}`);
      }
      return outputUrl;
    }

    if (status === "FAILED" || status === "CANCELLED") {
      throw new Error(task.failure || `Runway task ${status.toLowerCase()}.`);
    }
  }

  throw new Error("Runway video generation timed out after 10 minutes");
}

export async function fetchVideoAsBase64(url: string): Promise<string> {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Failed to download generated video (${response.status}).`);
  }
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}
