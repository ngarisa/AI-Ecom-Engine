"use client";

import { useEffect, useMemo, useRef } from "react";
import { useAssistantStore } from "@/lib/assistant-store";
import { cn, timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, X, Wifi, WifiOff, Loader2 } from "lucide-react";

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
  const notifications = useAssistantStore((s) => s.notifications);

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    markAllRead();
  }, [open, markAllRead]);

  // Escape key closes
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

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
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/20 border border-primary/25 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Ad Assistant</p>
                  <Badge className="bg-white/5 border border-white/10 text-white/70 text-[10px] px-2 py-0.5">
                    OpenClaw
                  </Badge>
                </div>
                <StatusDot status={connectionStatus} />
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="h-9 w-9 px-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Feed (shell placeholder) */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 assistant-scroll">
            {notifications.length === 0 ? (
              <div className="pt-10 text-center">
                <p className="text-sm font-medium">No messages yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Once enabled, the assistant will post alerts, digests, and quick actions here.
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5"
                >
                  <p className="text-xs text-white/90">{n.preview}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{timeAgo(Date.parse(n.createdAt) / 1000)}</p>
                </div>
              ))
            )}
          </div>

          {/* Input (shell) */}
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <input
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/30"
                placeholder="Ask the assistant…"
                disabled
              />
              <Button size="sm" disabled className="rounded-full">
                Send
              </Button>
            </div>
            <p className="text-[10px] text-white/40 mt-2">
              Chat logic is next — this is the panel shell and notification plumbing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

