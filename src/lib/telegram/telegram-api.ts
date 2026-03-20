import type { BrandContextBlock } from "./context";
import { formatBrandContextBlock } from "./context";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} not configured`);
  return v;
}

export interface TelegramSendRequest {
  message: string;
  includeContext?: boolean;
  context?: BrandContextBlock;
}

export interface TelegramSendResult {
  ok: true;
  messageId?: number;
  date?: number; // telegram unix seconds
}

export async function sendToTelegramBot(text: string): Promise<TelegramSendResult> {
  const botToken = requireEnv("TELEGRAM_BOT_TOKEN");
  const chatId = requireEnv("TELEGRAM_CHAT_ID");
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  // Retry 429 responses with exponential backoff.
  let attempt = 0;
  const maxAttempts = 5;
  let last429: { status: number; payload: any } | null = null;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    attempt += 1;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    const payload = await res
      .json()
      .catch(() => ({ ok: false, error: "non-json response" }));

    if (res.status === 429) {
      last429 = { status: res.status, payload };
      if (attempt >= maxAttempts) {
        const msg = "Telegram rate limited (429)";
        const detail = last429?.payload?.description ? `: ${last429.payload.description}` : "";
        throw new Error(`${msg}${detail}`);
      }
      const retryAfterSeconds =
        payload?.parameters?.retry_after ? Number(payload.parameters.retry_after) : null;
      const baseMs = retryAfterSeconds ? retryAfterSeconds * 1000 : 500;
      const waitMs = Math.round(baseMs * Math.pow(2, attempt - 1));
      await new Promise((r) => setTimeout(r, waitMs));
      continue;
    }

    if (!res.ok || payload?.ok !== true) {
      throw new Error(`Telegram sendMessage failed: ${res.status}`);
    }

    return {
      ok: true,
      messageId: payload?.result?.message_id,
      date: payload?.result?.date,
    };
  }
}

export function buildTelegramText(req: TelegramSendRequest) {
  const message = (req.message || "").trim();
  if (!message) throw new Error("message required");

  if (req.includeContext && req.context) {
    const block = formatBrandContextBlock(req.context);
    return `${block}User question: ${message}`;
  }

  return message;
}

export async function fetchTelegramUpdates(offset?: number) {
  const botToken = requireEnv("TELEGRAM_BOT_TOKEN");
  const url = `https://api.telegram.org/bot${botToken}/getUpdates`;
  const params = new URLSearchParams();
  if (typeof offset === "number") params.set("offset", String(offset));

  const res = await fetch(`${url}?${params.toString()}`, { method: "GET" });
  if (!res.ok) throw new Error(`getUpdates failed: ${res.status}`);
  return res.json();
}

