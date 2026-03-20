import { NextRequest, NextResponse } from "next/server";
import { pushAssistantBusMessage } from "@/lib/telegram/assistant-bus";

function requireTelegramSecret() {
  const v = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!v) throw new Error("TELEGRAM_WEBHOOK_SECRET not configured");
  return v;
}

function extractBotText(update: any): string | null {
  const message = update?.message ?? update?.edited_message;
  const text = message?.text;
  if (typeof text === "string" && text.trim()) return text;
  return null;
}

function extractMessageIds(update: any) {
  const updateId = typeof update?.update_id === "number" ? update.update_id : null;
  const messageId = typeof update?.message?.message_id === "number" ? update.message.message_id : undefined;
  return { updateId, messageId };
}

export async function POST(request: NextRequest) {
  try {
    const secret = requireTelegramSecret();
    const headerToken =
      request.headers.get("X-Telegram-Bot-Api-Secret-Token") ||
      request.headers.get("x-telegram-bot-api-secret-token");

    if (!headerToken || headerToken !== secret) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }

    const update = await request.json();

    const message = update?.message ?? update?.edited_message;
    const from = message?.from;
    const chat = message?.chat;

    const chatIdEnv = process.env.TELEGRAM_CHAT_ID ? Number(process.env.TELEGRAM_CHAT_ID) : null;
    const chatId = typeof chat?.id === "number" ? chat.id : null;

    // Only accept updates from the OpenClaw Telegram bot in the configured chat.
    const isBot = from?.is_bot === true;
    if (!isBot) return NextResponse.json({ ok: true });
    if (chatIdEnv !== null && chatId !== chatIdEnv) return NextResponse.json({ ok: true });

    const replyText = extractBotText(update);
    if (!replyText) return NextResponse.json({ ok: true });

    const { updateId, messageId } = extractMessageIds(update);
    const createdAt =
      typeof message?.date === "number" ? new Date(message.date * 1000).toISOString() : new Date().toISOString();

    pushAssistantBusMessage({
      id: `assistant-${updateId ?? "u"}-${messageId ?? "m"}`,
      role: "assistant",
      content: replyText,
      createdAt,
      telegram: {
        updateId: updateId ?? -1,
        messageId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Never crash on malformed payloads. Telegram will retry webhook if needed.
    console.error("[telegram webhook] Malformed payload:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

