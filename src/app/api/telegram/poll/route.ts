import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const OPENCLAW_GATEWAY_URL = "ws://127.0.0.1:18789";
const OPENCLAW_JSON_PATH = "/Users/nihalgarisa/.openclaw/openclaw.json";
const OPENCLAW_AUTH_PROFILES_FILE =
  "/Users/nihalgarisa/Downloads/AI Ecom Engine/node_modules/openclaw/dist/auth-profiles-DRjqKE3G.js";

type OpenclawMessage = {
  role?: string;
  timestamp?: number;
  content?: Array<{ type?: string; text?: string }>;
};

type PollMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

function hashShort(input: string) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash.toString(16);
}

/** Strip [BRAND CONTEXT]...[/BRAND CONTEXT] blocks prepended by buildTelegramText */
function stripBrandContextBlock(text: string): string {
  return text.replace(/^\[BRAND CONTEXT\][\s\S]*?\[\/BRAND CONTEXT\]\s*/i, "").trim();
}

function extractText(msg: OpenclawMessage): { role: "user" | "assistant"; text: string } | null {
  const role = msg?.role;
  if (role !== "user" && role !== "assistant") return null;
  if (!Array.isArray(msg.content) || msg.content.length === 0) return null;
  const parts = msg.content
    .filter((p) => p?.type === "text" && typeof p?.text === "string")
    .map((p) => p.text!.trim())
    .filter(Boolean);
  if (parts.length === 0) return null;
  let text = parts.join("\n\n");
  if (role === "user") text = stripBrandContextBlock(text);
  if (!text) return null;
  return { role, text };
}

/** Creates a fresh gateway client and resolves when it is ready. */
async function makeClient(): Promise<any> {
  const raw = await readFile(OPENCLAW_JSON_PATH, "utf8");
  const json = JSON.parse(raw) as any;
  const token = json?.gateway?.auth?.token;
  if (!token) throw new Error("Gateway token missing from openclaw.json");

  const fileUrl = pathToFileURL(OPENCLAW_AUTH_PROFILES_FILE).href;
  const mod = (await new Function("u", "return import(u)")(fileUrl)) as any;
  const GatewayClient = mod?.ic;
  if (typeof GatewayClient !== "function") throw new Error("GatewayClient not found in openclaw module");

  return new Promise<any>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Gateway hello timeout after 10s")), 10_000);
    const client = new GatewayClient({
      url: OPENCLAW_GATEWAY_URL,
      token,
      role: "operator",
      scopes: ["operator.admin", "operator.approvals", "operator.pairing", "operator.read"],
      onHelloOk: () => { clearTimeout(timer); resolve(client); },
      onConnectError: (err: any) => { clearTimeout(timer); reject(err ?? new Error("Gateway connect error")); },
      onClose: () => {},
      onEvent: () => {},
    });
    client.start();
  });
}

/** Find the Telegram session key from the sessions list. */
async function findSessionKey(client: any): Promise<string> {
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim() ?? "";

  try {
    const list = await client.request(
      "sessions.list",
      { limit: 50, includeGlobal: true, includeUnknown: true, activeMinutes: 3650 },
      { timeoutMs: 10_000 }
    );
    const sessions: any[] = Array.isArray(list?.sessions) ? list.sessions : [];

    // First try: key contains both "telegram" and the chat ID
    let match = chatId
      ? sessions.find((s) => {
          const k = String(s?.key ?? "").toLowerCase();
          return k.includes("telegram") && k.includes(chatId);
        })
      : null;

    // Second try: any session whose key contains "telegram"
    if (!match) {
      match = sessions
        .filter((s) => String(s?.key ?? "").toLowerCase().includes("telegram"))
        .sort((a, b) => (b?.updatedAtMs ?? 0) - (a?.updatedAtMs ?? 0))[0];
    }

    if (match) {
      const key = String(match.key);
      console.log("[poll] found session key:", key);
      return key;
    }
  } catch (err) {
    console.warn("[poll] sessions.list failed:", err);
  }

  // Fallback to the well-known key pattern
  const fallback = chatId ? `agent:main:telegram:direct:${chatId}` : "main";
  console.log("[poll] using fallback session key:", fallback);
  return fallback;
}

export async function GET(request: NextRequest) {
  let client: any;
  try {
    const offsetRaw = request.nextUrl.searchParams.get("offset");
    const offsetNum = offsetRaw ? Number(offsetRaw) : 0;

    // Normalise offset to milliseconds.
    // Values > 1e10 are already in ms; smaller values are legacy Telegram update_ids (treat as 0).
    const offsetMs = offsetNum > 1e10 ? offsetNum : Date.now() - 10_000;

    client = await makeClient();
    const sessionKey = await findSessionKey(client);

    console.log("[poll] chat.history request", { sessionKey, offsetMs });

    const history = await client.request(
      "chat.history",
      { sessionKey, limit: 250 },
      { timeoutMs: 15_000 }
    );

    const rawMessages: OpenclawMessage[] = Array.isArray(history?.messages) ? history.messages : [];

    console.log("[poll] chat.history returned", rawMessages.length, "messages. Last 5 raw timestamps:",
      rawMessages.slice(-5).map((m) => ({ role: m?.role, ts: m?.timestamp }))
    );

    const extracted: Array<{ tsMs: number; role: "user" | "assistant"; content: string }> = [];

    for (const m of rawMessages) {
      const ts = m?.timestamp;
      if (typeof ts !== "number" || !Number.isFinite(ts)) continue;
      // Normalise seconds → ms
      const tsMs = ts > 1e10 ? ts : ts * 1000;
      if (tsMs < offsetMs) continue;
      const parsed = extractText(m);
      if (!parsed) continue;
      extracted.push({ tsMs, role: parsed.role, content: parsed.text });
    }

    extracted.sort((a, b) => a.tsMs - b.tsMs);

    const messages: PollMessage[] = extracted.map((m) => ({
      id: `openclaw-${m.role}-${m.tsMs}-${hashShort(m.content.slice(0, 256))}`,
      role: m.role,
      content: m.content,
      timestamp: new Date(m.tsMs).toISOString(),
    }));

    const nextOffset =
      messages.length > 0 ? Math.max(...messages.map((m) => Date.parse(m.timestamp))) : offsetMs;

    console.log("[poll] returning", messages.length, "messages, nextOffset:", nextOffset);

    return NextResponse.json({ messages, nextOffset });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[poll] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  } finally {
    // Always close the client to avoid leaking WebSocket connections.
    try { client?.ws?.close?.(); } catch { /* ignore */ }
  }
}
