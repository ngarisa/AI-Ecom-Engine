/**
 * GET /api/telegram/debug
 *
 * Dumps the raw OpenClaw gateway state so you can verify:
 *   - Which sessions exist
 *   - What chat.history looks like for the Telegram session
 *   - Whether timestamps are in seconds or milliseconds
 *
 * Only for local debugging — remove or gate behind an auth check before deploying.
 */
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const OPENCLAW_GATEWAY_URL = "ws://127.0.0.1:18789";
const OPENCLAW_OPENCLAW_JSON_PATH = "/Users/nihalgarisa/.openclaw/openclaw.json";
const OPENCLAW_AUTH_PROFILES_FILE =
  "/Users/nihalgarisa/Downloads/AI Ecom Engine/node_modules/openclaw/dist/auth-profiles-DRjqKE3G.js";

async function makeGatewayClient() {
  const raw = await readFile(OPENCLAW_OPENCLAW_JSON_PATH, "utf8");
  const json = JSON.parse(raw) as any;
  const token = json?.gateway?.auth?.token;
  if (!token) throw new Error("No gateway token in openclaw.json");

  const fileUrl = pathToFileURL(OPENCLAW_AUTH_PROFILES_FILE).href;
  const mod = (await new Function("u", "return import(u)")(fileUrl)) as any;
  const GatewayClient = mod?.ic;
  if (typeof GatewayClient !== "function") throw new Error("GatewayClient not found");

  return new Promise<any>((resolve, reject) => {
    const client = new GatewayClient({
      url: OPENCLAW_GATEWAY_URL,
      token,
      role: "operator",
      scopes: ["operator.admin", "operator.approvals", "operator.pairing", "operator.read"],
      onHelloOk: () => resolve(client),
      onConnectError: (err: any) => reject(err),
      onClose: () => {},
      onEvent: () => {},
    });
    client.start();
    setTimeout(() => reject(new Error("Gateway connection timed out after 10s")), 10_000);
  });
}

export async function GET() {
  try {
    const client = await makeGatewayClient();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim() ?? "";

    // 1. List all sessions
    const sessionsList = await client.request(
      "sessions.list",
      { limit: 50, includeGlobal: true, includeUnknown: true, activeMinutes: 3650 },
      { timeoutMs: 15_000 }
    );

    const sessions: any[] = Array.isArray(sessionsList?.sessions) ? sessionsList.sessions : [];
    const telegramSessions = sessions.filter((s) =>
      String(s?.key ?? "").toLowerCase().includes("telegram")
    );

    // 2. Fetch chat.history for each telegram session (limit 5 messages each)
    const historyResults: Record<string, any> = {};
    for (const s of telegramSessions.slice(0, 5)) {
      const key = String(s?.key ?? "");
      try {
        const h = await client.request("chat.history", { sessionKey: key, limit: 10 }, { timeoutMs: 10_000 });
        const msgs = Array.isArray(h?.messages) ? h.messages : [];
        historyResults[key] = {
          count: msgs.length,
          // Show raw structure of last 3 messages
          lastMessages: msgs.slice(-3).map((m: any) => ({
            role: m?.role,
            rawTimestamp: m?.timestamp,
            timestampIsMs: typeof m?.timestamp === "number" && m.timestamp > 1e10,
            contentTypes: Array.isArray(m?.content) ? m.content.map((c: any) => c?.type) : [],
            textPreview: Array.isArray(m?.content)
              ? m.content
                  .filter((c: any) => c?.type === "text")
                  .map((c: any) => String(c?.text ?? "").slice(0, 100))
                  .join(" | ")
              : null,
          })),
        };
      } catch (err) {
        historyResults[key] = { error: String(err) };
      }
    }

    // 3. Also try the candidate key directly
    const candidateKey = chatId ? `agent:main:telegram:direct:${chatId}` : "main";
    if (!historyResults[candidateKey]) {
      try {
        const h = await client.request("chat.history", { sessionKey: candidateKey, limit: 5 }, { timeoutMs: 10_000 });
        const msgs = Array.isArray(h?.messages) ? h.messages : [];
        historyResults[`[candidate] ${candidateKey}`] = { count: msgs.length, rawResponse: h };
      } catch (err) {
        historyResults[`[candidate] ${candidateKey}`] = { error: String(err) };
      }
    }

    return NextResponse.json({
      chatId,
      candidateKey,
      allSessionKeys: sessions.map((s) => s?.key),
      telegramSessionKeys: telegramSessions.map((s) => s?.key),
      historyResults,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error), hint: "Check that OpenClaw gateway is running at ws://127.0.0.1:18789" },
      { status: 500 }
    );
  }
}
