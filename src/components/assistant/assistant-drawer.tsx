"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAssistantStore } from "@/lib/assistant-store";
import { cn, timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, X, Wifi, WifiOff, Loader2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { showToast } from "@/lib/toast-store";

function StatusDot({ status }: { status: "connected" | "reconnecting" | "disconnected" }) {
  const { dot, label, icon: Icon } = useMemo(() => {
    if (status === "connected") {
      return { dot: "bg-emerald-400", label: "Connected", icon: Wifi };
    }
    if (status === "reconnecting") {
      return { dot: "bg-yellow-400", label: "Reconnecting", icon: Loader2 };
    }
    return { dot: "bg-red-400", label: "Disconnected", icon: WifiOff };
  }, [status]);

  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-2 w-2 rounded-full", dot)} />
      <span className="text-xs text-muted-foreground flex items-center gap-1">
        <Icon className={cn("h-3.5 w-3.5", status === "reconnecting" && "animate-spin")} />
        {label}
      </span>
    </div>
  );
}

export function AssistantDrawer() {
  const open = useAssistantStore((s) => s.open);
  const setOpen = useAssistantStore((s) => s.setOpen);
  const markAllRead = useAssistantStore((s) => s.markAllRead);
  const connectionStatus = useAssistantStore((s) => s.connectionStatus);
  const setUnreadCount = useAssistantStore((s) => s.setUnreadCount);
  const setLastReadAt = useAssistantStore((s) => s.setLastReadAt);
  const setConnectionStatus = useAssistantStore((s) => s.setConnectionStatus);

  const { brandProfile, competitors } = useAppStore();

  type ChatRole = "user" | "assistant";
  type ChatStatus = "sent" | "delivered" | "error";

  interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
    timestamp: string; // ISO
    status: ChatStatus;
  }

  const LS_CHAT = "openclaw-chat-history";
  const LS_UNREAD = "openclaw-unread-count";
  const LS_LAST_READ = "openclaw-last-read-at";
  const LS_CONTEXT_HASH = "openclaw-context-hash";
  const LS_TELEGRAM_OFFSET = "openclaw-telegram-offset";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesRef = useRef<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const openRef = useRef(open);
  const typingSinceRef = useRef<number | null>(null);
  const awaitingAssistantRef = useRef(false);
  const messageIdsRef = useRef<Set<string>>(new Set());
  const pollingStartedRef = useRef(false);
  const pollInFlightRef = useRef(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const pendingUserContentRef = useRef<string | null>(null);
  const pendingUserSentAtMsRef = useRef<number | null>(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  function safeParse<T>(raw: string | null): T | null {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  function truncateOldest<T>(arr: T[], keep = 200) {
    if (arr.length <= keep) return arr;
    return arr.slice(arr.length - keep);
  }

  function safePersistMessages(next: ChatMessage[]) {
    const trimmed = truncateOldest(next, 200);
    const serialized = JSON.stringify(trimmed);
    try {
      localStorage.setItem(LS_CHAT, serialized);
    } catch (err) {
      // If quota exceeded, drop oldest 50 and retry once.
      try {
        const reduced = trimmed.slice(50);
        localStorage.setItem(LS_CHAT, JSON.stringify(reduced));
      } catch {
        // Give up silently; UI still works with in-memory state.
      }
    }
  }

  function hashString(input: string) {
    // FNV-1a 32-bit (fast + no crypto deps)
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = (hash * 0x01000193) >>> 0;
    }
    return hash.toString(16);
  }

  function buildBrandContextForTelegram() {
    const productList =
      brandProfile.productCategories?.length ? brandProfile.productCategories.join(", ") : brandProfile.brandDescription || "None";
    const competitorNames = competitors?.map((c) => c.name).filter(Boolean) ?? [];
    return {
      brand_name: brandProfile.brandName || "Unknown",
      voice: brandProfile.brandVoice || "Unknown",
      products: productList,
      competitors: competitorNames,
      target_audience: brandProfile.targetAudience || "Unknown",
    };
  }

  function formatTelegramContextBlockIfNeeded() {
    const ctx = buildBrandContextForTelegram();
    const snapshot = JSON.stringify(ctx);
    const newHash = hashString(snapshot);
    const lastHash = localStorage.getItem(LS_CONTEXT_HASH);
    const changed = !lastHash || lastHash !== newHash;
    if (changed) localStorage.setItem(LS_CONTEXT_HASH, newHash);
    return { includeContext: changed, context: ctx };
  }

  function pushMessage(nextMessage: ChatMessage) {
    // Check and update the ref OUTSIDE the updater so it stays pure.
    // (React Strict Mode double-invokes updaters; side effects inside them break deduplication.)
    if (messageIdsRef.current.has(nextMessage.id)) return;
    messageIdsRef.current.add(nextMessage.id);

    setMessages((prev) => {
      // Guard against the rare case where state already has this message.
      if (prev.some((m) => m.id === nextMessage.id)) return prev;
      const updated = [...prev, nextMessage];
      return truncateOldest(updated, 200);
    });
  }

  function tryResolvePendingUserMessage(nextIncoming: ChatMessage): boolean {
    if (nextIncoming.role !== "user") return false;
    const pendingContent = pendingUserContentRef.current;
    const pendingSentAtMs = pendingUserSentAtMsRef.current;
    if (!pendingContent || !pendingSentAtMs) return false;
    if (nextIncoming.content !== pendingContent) return false;

    const incomingTs = Date.parse(nextIncoming.timestamp);
    if (!Number.isFinite(incomingTs)) return false;
    if (Math.abs(incomingTs - pendingSentAtMs) > 60_000) return false;

    const existing = messagesRef.current.find(
      (m) => m.role === "user" && m.content === pendingContent && m.status === "sent"
    );
    if (!existing) return false;

    setMessages((prev) => {
      const updated = prev.map((m) =>
        m.id === existing.id
          ? { ...m, status: "delivered" as const, timestamp: nextIncoming.timestamp }
          : m
      );
      return truncateOldest(updated, 200);
    });

    pendingUserContentRef.current = null;
    pendingUserSentAtMsRef.current = null;
    return true;
  }

  function markReadNow(latestIso?: string) {
    const latest = latestIso ?? messages[messages.length - 1]?.timestamp ?? new Date().toISOString();
    try {
      localStorage.setItem(LS_LAST_READ, latest);
      localStorage.setItem(LS_UNREAD, "0");
    } catch {
      // ignore quota errors for unread
    }
    setLastReadAt(latest);
    setUnreadCount(0);
    markAllRead();
  }

  // Load persisted chat + unread on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Always reset typing on mount — prevents stuck state from previous session.
    setTyping(false);
    setWaitingForResponse(false);
    awaitingAssistantRef.current = false;

    const history = safeParse<ChatMessage[]>(localStorage.getItem(LS_CHAT)) ?? [];
    const trimmed = truncateOldest(history, 200).filter((m) => m && m.id && m.role && typeof m.content === "string");
    messageIdsRef.current = new Set(trimmed.map((m) => m.id));
    setMessages(trimmed);
    messagesRef.current = trimmed;

    const lastReadAt = localStorage.getItem(LS_LAST_READ);
    setLastReadAt(lastReadAt || null);

    const computedUnread = lastReadAt
      ? trimmed.filter((m) => m.role === "assistant" && Date.parse(m.timestamp) > Date.parse(lastReadAt)).length
      : Number(localStorage.getItem(LS_UNREAD) ?? "0") || 0;

    setUnreadCount(Math.min(99, computedUnread));
  }, [setLastReadAt, setUnreadCount]);

  useEffect(() => {
    messagesRef.current = messages;
    // Keep the dedup set in sync with actual state.
    messageIdsRef.current = new Set(messages.map((m) => m.id));
    // Persist to localStorage whenever messages change.
    if (messages.length > 0) safePersistMessages(messages);
  }, [messages]);

  // Mark messages as read when the panel opens
  useEffect(() => {
    if (!open) return;
    markReadNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape key closes
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  // Connect to SSE stream (webhook path) + fallback polling.
  useEffect(() => {
    if (typeof window === "undefined") return;

    let pollTimer: ReturnType<typeof setInterval> | null = null;
    let pollOffset = Number(localStorage.getItem(LS_TELEGRAM_OFFSET) ?? "0") || 0;

    const ensurePolling = () => {
      if (pollingStartedRef.current) return;
      pollingStartedRef.current = true;
      pollTimer = setInterval(async () => {
        if (pollInFlightRef.current) return;
        pollInFlightRef.current = true;
        try {
          const res = await fetch(`/api/telegram/poll?offset=${pollOffset}`);
          const data = await res.json();
          if (!res.ok) {
            console.warn("[assistant/poll] server error:", data?.error ?? res.status);
            setConnectionStatus("reconnecting");
            pollInFlightRef.current = false;
            return;
          }

          setConnectionStatus("connected");
          const incoming = Array.isArray(data?.messages) ? data.messages : [];
          const nextOffset = typeof data?.nextOffset === "number" ? data.nextOffset : pollOffset;

          console.debug("[assistant/poll] received", incoming.length, "messages, nextOffset:", nextOffset);

          for (const m of incoming) {
            const msgId = String(m.id ?? `asst-${m.timestamp ?? Date.now()}`);
            const already = messageIdsRef.current.has(msgId);
            if (already) continue;
            const content = String(m.content ?? "");
            const timestamp = String(m.timestamp ?? new Date().toISOString());
            if (!content.trim()) continue;

            const role: ChatRole = m.role === "user" ? "user" : "assistant";
            const nextMessage: ChatMessage = {
              id: msgId,
              role,
              content,
              timestamp,
              status: "delivered",
            };

            // If this echoes our most recent optimistic user message, update that message in-place.
            if (role === "user" && tryResolvePendingUserMessage(nextMessage)) {
              if (openRef.current) markReadNow(nextMessage.timestamp);
              continue;
            }

            pushMessage(nextMessage);

            if (role === "assistant") {
              awaitingAssistantRef.current = false;
              setTyping(false);
              setWaitingForResponse(false);

              if (openRef.current) {
                markReadNow(nextMessage.timestamp);
              } else {
                const curr = useAssistantStore.getState().unreadCount;
                const nextUnread = Math.min(99, curr + 1);
                setUnreadCount(nextUnread);
                try {
                  localStorage.setItem(LS_UNREAD, String(nextUnread));
                } catch {
                  // ignore
                }
              }
            } else if (openRef.current) {
              markReadNow(nextMessage.timestamp);
            }
          }

          pollOffset = nextOffset;
          localStorage.setItem(LS_TELEGRAM_OFFSET, String(pollOffset));
        } catch (err) {
          console.warn("[assistant/poll] fetch error:", err);
          setConnectionStatus("reconnecting");
        } finally {
          pollInFlightRef.current = false;
        }
      }, 3000);
    };

    const onAssistantPayload = (payload: any) => {
      try {
        const msgId = String(payload?.id ?? `asst-${Date.now()}`);
        if (messageIdsRef.current.has(msgId)) return;
        const content = String(payload?.content ?? "");
        const timestamp = String(payload?.createdAt ?? new Date().toISOString());
        if (!content.trim()) return;

        const nextMessage: ChatMessage = {
          id: msgId,
          role: "assistant",
          content,
          timestamp,
          status: "delivered",
        };

        pushMessage(nextMessage);

        awaitingAssistantRef.current = false;
        setTyping(false);
        setWaitingForResponse(false);
        setConnectionStatus("connected");

        if (openRef.current) {
          markReadNow(timestamp);
        } else {
          const curr = useAssistantStore.getState().unreadCount;
          const nextUnread = Math.min(99, curr + 1);
          setUnreadCount(nextUnread);
          try {
            localStorage.setItem(LS_UNREAD, String(nextUnread));
          } catch {
            // ignore
          }
        }
      } catch {
        // ignore malformed SSE payloads
      }
    };

    // Start polling immediately as a reliable fallback (webhook may not be configured).
    ensurePolling();

    try {
      const es = new EventSource("/api/telegram/stream");
      eventSourceRef.current = es;
      es.addEventListener("assistant_message", (e) => {
        const raw = (e as MessageEvent).data;
        const payload = JSON.parse(raw);
        onAssistantPayload(payload);
      });
      es.onerror = () => {
        try {
          es.close();
        } catch {
          // ignore
        }
        ensurePolling();
      };
    } catch {
      ensurePolling();
    }

    return () => {
      try {
        if (eventSourceRef.current) eventSourceRef.current.close();
      } catch {
        // ignore
      }
      if (pollTimer) clearInterval(pollTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Waiting status if assistant takes too long
  useEffect(() => {
    if (!typing) return;
    if (!typingSinceRef.current) typingSinceRef.current = Date.now();
    const interval = setInterval(() => {
      if (!awaitingAssistantRef.current) return;
      const elapsed = Date.now() - (typingSinceRef.current ?? Date.now());
      if (elapsed > 30_000) setWaitingForResponse(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [typing]);

  // Keep the scroll position near-bottom when new content arrives
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 140) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages.length, typing]);

  async function handleSend(messageOverride?: string) {
    const content = (messageOverride ?? draft).trim();
    if (!content) return;
    if (typing) {
      console.warn("[handleSend] blocked — typing is true (stuck state). Resetting.");
      setTyping(false);
      awaitingAssistantRef.current = false;
      return;
    }

    console.log("[handleSend] sending:", content);

    const userMessageId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const nowIso = new Date().toISOString();
    const userMsg: ChatMessage = {
      id: userMessageId,
      role: "user",
      content,
      timestamp: nowIso,
      status: "sent",
    };

    pushMessage(userMsg);
    console.log("[handleSend] pushed user message, messages count:", messagesRef.current.length + 1);
    pendingUserContentRef.current = content;
    pendingUserSentAtMsRef.current = Date.now();
    setDraft("");
    setTyping(true);
    setWaitingForResponse(false);
    typingSinceRef.current = Date.now();
    awaitingAssistantRef.current = true;
    setConnectionStatus("reconnecting");

    let includeContext = false;
    let context: Record<string, unknown> | undefined;
    try {
      const ctx = formatTelegramContextBlockIfNeeded();
      includeContext = ctx.includeContext;
      context = ctx.context;
    } catch {
      // If localStorage is unavailable, just send without context.
    }

    try {
      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, includeContext, context }),
      });

      console.log("[handleSend] Telegram send status:", res.status);

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      // Response will arrive via the polling loop.
    } catch (err) {
      const errorText = err instanceof Error ? err.message : "Send failed";

      // Mark the user message as error.
      setMessages((prev) =>
        prev.map((m) => (m.id === userMessageId ? { ...m, status: "error" as const } : m))
      );

      awaitingAssistantRef.current = false;
      setTyping(false);
      setWaitingForResponse(false);
      setConnectionStatus("disconnected");
      showToast({ title: "Assistant error", description: errorText, variant: "error" });
    }
  }

  function clearChat() {
    try {
      localStorage.removeItem(LS_CHAT);
      localStorage.removeItem(LS_UNREAD);
      localStorage.removeItem(LS_LAST_READ);
      localStorage.removeItem(LS_CONTEXT_HASH);
    } catch {
      // ignore
    }
    messageIdsRef.current = new Set();
    setMessages([]);
    setDraft("");
    setTyping(false);
    setWaitingForResponse(false);
    setUnreadCount(0);
    setLastReadAt(null);
    markAllRead();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        ref={panelRef}
        className={cn(
          "fixed right-0 top-0 z-50 h-screen w-[400px] max-w-[92vw] border-l border-border bg-[#0b0b11]",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-primary/20 border border-primary/25 flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="leading-tight min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <p className="text-sm font-semibold truncate">Ad Assistant</p>
                  <Badge className="bg-white/5 border border-white/10 text-white/70 text-[10px] px-2 py-0.5">
                    OpenClaw
                  </Badge>
                </div>
                <StatusDot status={connectionStatus} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="h-9 rounded-xl border-white/10 bg-transparent text-white/70 hover:bg-white/5"
              >
                Clear Chat
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="h-9 w-9 px-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 assistant-scroll">
            {messages.length === 0 ? (
              <div className="pt-10 text-center">
                <p className="text-sm font-medium">Ask Ad Assistant</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try: “What’s trending in skincare ads right now?” or “Generate headlines for my moisturizer.”
                </p>
              </div>
            ) : (
              messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={cn("flex", isUser ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[92%] rounded-2xl px-3 py-2.5 border",
                        isUser
                          ? "bg-primary text-primary-foreground border-primary/30"
                          : "bg-white/5 border-white/10"
                      )}
                    >
                      <div
                        className={cn(
                          "text-xs leading-relaxed whitespace-pre-wrap break-words",
                          isUser ? "text-white/95" : "text-white/90"
                        )}
                      >
                        {m.content}
                      </div>

                      <div className={cn("flex items-center gap-2 mt-1", isUser ? "justify-end" : "justify-start")}>
                        <span
                          className={cn(
                            "text-[10px] text-white/40",
                            isUser ? "text-white/55" : "text-white/40"
                          )}
                          title={new Date(m.timestamp).toLocaleString()}
                        >
                          {timeAgo(Date.parse(m.timestamp) / 1000)}
                        </span>

                        {m.status === "error" && isUser && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 rounded-full border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/15"
                            onClick={() => handleSend(m.content)}
                          >
                            Retry
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {typing && (
              <div className="flex justify-start">
                <div className="max-w-[92%] rounded-2xl px-3 py-2.5 border border-white/10 bg-white/5">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span className="assistant-typing-dot" />
                    <span className="assistant-typing-dot" />
                    <span className="assistant-typing-dot" />
                    <span className="ml-1">{waitingForResponse ? "Waiting for response..." : "Assistant is typing"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <input
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/30 text-white/90"
                placeholder="Ask the assistant…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                autoFocus={open}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button
                size="sm"
                className="rounded-full"
                onClick={() => handleSend()}
                disabled={!draft.trim() || typing}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

