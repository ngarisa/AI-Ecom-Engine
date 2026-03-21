import { NextRequest, NextResponse } from "next/server";
import type { BrandContextBlock } from "@/lib/telegram/context";
import { buildTelegramText, sendToTelegramBot } from "@/lib/telegram/telegram-api";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const OPENCLAW_GATEWAY_URL = "ws://127.0.0.1:18789";
const OPENCLAW_OPENCLAW_JSON_PATH = "/Users/nihalgarisa/.openclaw/openclaw.json";
const OPENCLAW_AUTH_PROFILES_FILE =
  "/Users/nihalgarisa/Downloads/AI Ecom Engine/node_modules/openclaw/dist/auth-profiles-DRjqKE3G.js";

let cachedGatewayToken: string | null = null;
let cachedGatewayClient: any | null = null;
let cachedGatewayReadyPromise: Promise<void> | null = null;
let cachedTelegramSessionKey: string | null = null;
let cachedTelegramChatId: string | null = null;

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

  const candidate = `agent:main:telegram:direct:${chatId}`;
  if (!cachedGatewayClient) {
    cachedTelegramSessionKey = candidate;
    cachedTelegramChatId = chatId;
    return candidate;
  }

  // Confirm/resolve once (handle any session key format drift).
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
    // ignore and fall back to candidate
  }

  cachedTelegramSessionKey = candidate;
  cachedTelegramChatId = chatId;
  return candidate;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message: string;
      includeContext?: boolean;
      context?: BrandContextBlock;
    };

    const text = buildTelegramText({
      message: body.message,
      includeContext: body.includeContext,
      context: body.context,
    });

    const result = await sendToTelegramBot(text);

    // OpenClaw's own Telegram long-polling will see this message, process it,
    // and store both the user turn and the assistant reply in chat.history for
    // the Telegram session.  The /api/telegram/poll route reads that history.
    // We do NOT call chat.send here because that would make OpenClaw process
    // the same message a second time and potentially create a duplicate session.

    return NextResponse.json({
      ok: true,
      telegram: {
        messageId: result.messageId,
        date: result.date,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

