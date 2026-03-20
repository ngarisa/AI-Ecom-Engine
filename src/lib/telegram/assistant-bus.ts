import { EventEmitter } from "events";

export type AssistantRole = "assistant";

export interface AssistantBusMessage {
  id: string;
  role: AssistantRole;
  content: string;
  createdAt: string; // ISO
  telegram: {
    updateId: number;
    messageId?: number;
  };
}

declare global {
  // eslint-disable-next-line no-var
  var __openclawAssistantBus:
    | (EventEmitter & { messages: AssistantBusMessage[] })
    | undefined;
}

const BUS_LIMIT = 200;

export function getAssistantBus() {
  if (!globalThis.__openclawAssistantBus) {
    const emitter = new EventEmitter() as EventEmitter & {
      messages: AssistantBusMessage[];
    };
    emitter.messages = [];
    globalThis.__openclawAssistantBus = emitter;
  }
  return globalThis.__openclawAssistantBus;
}

export function pushAssistantBusMessage(msg: AssistantBusMessage) {
  const bus = getAssistantBus();
  bus.messages.unshift(msg);
  bus.messages = bus.messages.slice(0, BUS_LIMIT);
  bus.emit("assistant_message", msg);
}

export function getRecentAssistantBusMessages(limit = 50) {
  const bus = getAssistantBus();
  return bus.messages.slice(0, limit);
}

export function assistantBusSubscribe(onMessage: (msg: AssistantBusMessage) => void) {
  const bus = getAssistantBus();
  bus.on("assistant_message", onMessage);
  return () => bus.off("assistant_message", onMessage);
}

