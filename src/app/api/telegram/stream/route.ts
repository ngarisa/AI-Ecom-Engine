import { assistantBusSubscribe, getRecentAssistantBusMessages } from "@/lib/telegram/assistant-bus";

export async function GET() {
  const recent = getRecentAssistantBusMessages(10);
  const encoder = new TextEncoder();
  let unsub: null | (() => void) = null;
  let keepAlive: null | ReturnType<typeof setInterval> = null;

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (payload: unknown) => {
        controller.enqueue(
          encoder.encode(`event: assistant_message\ndata: ${JSON.stringify(payload)}\n\n`)
        );
      };

      // Send a few recent messages on connect.
      for (const msg of recent) sendEvent(msg);

      unsub = assistantBusSubscribe((msg) => sendEvent(msg));

      keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(`: keep-alive\n\n`));
      }, 20000);
    },
    cancel() {
      if (keepAlive) clearInterval(keepAlive);
      if (unsub) unsub();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

