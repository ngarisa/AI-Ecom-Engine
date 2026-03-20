import { NextRequest, NextResponse } from "next/server";

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const OPENCLAW_GATEWAY_URL = "ws://127.0.0.1:18789";
const OPENCLAW_OPENCLAW_JSON_PATH = "/Users/nihalgarisa/.openclaw/openclaw.json";
const OPENCLAW_AUTH_PROFILES_FILE =
  "/Users/nihalgarisa/Downloads/AI Ecom Engine/node_modules/openclaw/dist/auth-profiles-DRjqKE3G.js";

type OpenclawChatHistoryMessage = {
  role?: string;
  timestamp?: number;
  content?: Array<{ type?: string; text?: string }>;
};

type AssistantPollMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string; // ISO
};

let cachedGatewayToken: string | null = null;
let cachedGatewayClient: any | null = null;
let cachedGatewayReadyPromise: Promise<void> | null = null;
let cachedTelegramSessionKey: string | null = null;
let cachedTelegramChatId: string | null = null;

function isProbablyMsTimestamp(n: number) {
  // Unix ms is typically ~ 1.6e12+; unix seconds is ~ 1.6e9.
  return Number.isFinite(n) && n > 10_000_000_000;
}

function hashShort(input: string) {
  // FNV-1a 32-bit (fast + no crypto deps)
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash.toString(16);
}

function previewText(s: string, max = 120) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

function extractOpenclawTextForRole(msg: OpenclawChatHistoryMessage): { role: "user" | "assistant"; text: string } | null {
  const role = msg?.role;
  if (role !== "user" && role !== "assistant") return null;

  const content = msg.content;
  if (!Array.isArray(content) || content.length === 0) return null;

  const textParts = content
    .filter((p) => p?.type === "text" && typeof p?.text === "string")
    .map((p) => p.text!.trim())
    .filter(Boolean);

  if (textParts.length === 0) return null;
  return { role, text: textParts.join("\n\n") };
}

async function getOpenclawGatewayToken() {
  if (cachedGatewayToken) return cachedGatewayToken;
  const raw = await readFile(OPENCLAW_OPENCLAW_JSON_PATH, "utf8");
  const json = JSON.parse(raw) as any;
  const token = json?.gateway?.auth?.token;
  if (!token || typeof token !== "string") throw new Error("OpenClaw gateway token missing from openclaw.json");
  cachedGatewayToken = token;
  return cachedGatewayToken;
}

async function ensureGatewayClientReady() {
  const ws = (cachedGatewayClient as any)?.ws;
  if (cachedGatewayClient && ws && ws.readyState === 1) return;
  if (cachedGatewayReadyPromise) {
    await cachedGatewayReadyPromise;
    return;
  }

  cachedGatewayReadyPromise = (async () => {
    const fileUrl = pathToFileURL(OPENCLAW_AUTH_PROFILES_FILE).href;
    // Force runtime dynamic import (avoids Next/webpack import transforms that can break file:// specifiers).
    const mod = (await new Function("u", "return import(u)")(fileUrl)) as any;
    const GatewayClient = mod?.ic;
    if (typeof GatewayClient !== "function") throw new Error("OpenClaw GatewayClient not found in module exports");

    const token = await getOpenclawGatewayToken();

    let resolveReady: (() => void) | null = null;
    let rejectReady: ((err: unknown) => void) | null = null;

    const ready = new Promise<void>((resolve, reject) => {
      resolveReady = resolve;
      rejectReady = reject;
    });

    const client = new GatewayClient({
      url: OPENCLAW_GATEWAY_URL,
      token,
      role: "operator",
      scopes: ["operator.admin", "operator.approvals", "operator.pairing", "operator.read"],
      onHelloOk: () => resolveReady?.(),
      onConnectError: (err: any) => rejectReady?.(err),
      onClose: () => {
        // If the gateway disconnects, allow re-init on next poll.
        cachedGatewayClient = null;
        cachedGatewayReadyPromise = null;
      },
      onEvent: () => {},
    });

    cachedGatewayClient = client;
    client.start();

    await ready;
  })();

  try {
    await cachedGatewayReadyPromise;
  } catch (e) {
    cachedGatewayClient = null;
    cachedGatewayReadyPromise = null;
    throw e;
  } finally {
    cachedGatewayReadyPromise = null;
  }
}

async function resolveTelegramSessionKey() {
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim() ?? "";
  if (!chatId) return "main";

  if (cachedTelegramSessionKey && cachedTelegramChatId === chatId) return cachedTelegramSessionKey;

  // Common pattern observed in OpenClaw:
  // agent:main:telegram:direct:<chatId>
  const candidate = `agent:main:telegram:direct:${chatId}`;

  if (!cachedGatewayClient) return candidate;

  // Confirm by scanning sessions once (so we handle any future key format drift).
  try {
    const list = await cachedGatewayClient.request(
      "sessions.list",
      { limit: 25, includeGlobal: true, includeUnknown: true, activeMinutes: 3650 },
      { timeoutMs: 15_000 }
    );

    const sessions: any[] = Array.isArray(list?.sessions) ? list.sessions : [];
    const matches = sessions.filter((s) => {
      const key = String(s?.key ?? "");
      if (!key.toLowerCase().includes("telegram")) return false;
      return key.includes(chatId);
    });

    if (matches.length > 0) {
      matches.sort((a, b) => (b?.updatedAtMs ?? 0) - (a?.updatedAtMs ?? 0));
      cachedTelegramSessionKey = String(matches[0]?.key);
      cachedTelegramChatId = chatId;
      return cachedTelegramSessionKey;
    }
  } catch {
    // fall back to candidate
  }

  cachedTelegramSessionKey = candidate;
  cachedTelegramChatId = chatId;
  return candidate;
}

export async function GET(request: NextRequest) {
  try {
    const offsetRaw = request.nextUrl.searchParams.get("offset");
    const offsetNum = offsetRaw ? Number(offsetRaw) : 0;

    // If the client still has the old Telegram offset in localStorage (update_id-like),
    // treat it as unknown and watch from "recent" forward.
    const initialOffsetMs = isProbablyMsTimestamp(offsetNum) ? offsetNum : 0;
    const offsetMs = initialOffsetMs > 0 ? initialOffsetMs : Date.now() - 10_000;

    await ensureGatewayClientReady();
    if (!cachedGatewayClient) throw new Error("OpenClaw gateway client unavailable");

    const sessionKey = await resolveTelegramSessionKey();
    console.log("[assistant/poll] request", {
      offsetRaw,
      offsetNum,
      offsetMs,
      sessionKey,
    });
    const history = await cachedGatewayClient.request(
      "chat.history",
      { sessionKey, limit: 250 },
      { timeoutMs: 15_000 }
    );

    const rawMessages: OpenclawChatHistoryMessage[] = Array.isArray(history?.messages) ? history.messages : [];
    const lastRaw = rawMessages.slice(-8).map((m) => {
      const extracted = extractOpenclawTextForRole(m);
      return {
        role: m?.role,
        timestamp: m?.timestamp,
        textPreview: extracted?.text ? previewText(extracted.text) : null,
      };
    });

    console.log("[assistant/poll] chat.history summary", {
      totalRaw: rawMessages.length,
      lastRaw,
    });

    const extracted: Array<{ timestampMs: number; role: "user" | "assistant"; content: string }> = [];
    for (const m of rawMessages) {
      const ts = m?.timestamp;
      if (typeof ts !== "number" || !Number.isFinite(ts)) continue;
      // Include messages with the same timestamp as the previous offset.
      // OpenClaw can emit multiple events within the same ms.
      if (ts < offsetMs) continue;
      const parsed = extractOpenclawTextForRole(m);
      if (!parsed) continue;
      extracted.push({ timestampMs: ts, role: parsed.role, content: parsed.text });
    }

    extracted.sort((a, b) => a.timestampMs - b.timestampMs);

    const messages: AssistantPollMessage[] = extracted.map((m) => ({
      id: `openclaw-${m.role}-${m.timestampMs}-${hashShort(m.content.slice(0, 256))}`,
      role: m.role,
      content: m.content,
      timestamp: new Date(m.timestampMs).toISOString(),
    }));

    const nextOffset = messages.length > 0 ? Math.max(...messages.map((m) => Date.parse(m.timestamp))) : offsetMs;

    console.log("[assistant/poll] parsed+return", {
      returnedCount: messages.length,
      nextOffset,
      returnedPreview: messages.slice(-5).map((m) => ({
        id: m.id,
        role: m.role,
        ts: m.timestamp,
        contentPreview: previewText(m.content),
      })),
    });

    return NextResponse.json({ messages, nextOffset });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[assistant/poll] error", { message, error });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

