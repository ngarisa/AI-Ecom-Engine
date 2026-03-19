"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAssistantStore } from "@/lib/assistant-store";

export function AssistantBell() {
  const open = useAssistantStore((s) => s.open);
  const toggleOpen = useAssistantStore((s) => s.toggleOpen);
  const unreadCount = useAssistantStore((s) => s.unreadCount);

  const prevUnread = useRef(unreadCount);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (unreadCount > prevUnread.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 900);
      return () => clearTimeout(t);
    }
    prevUnread.current = unreadCount;
  }, [unreadCount]);

  useEffect(() => {
    prevUnread.current = unreadCount;
  }, [unreadCount]);

  const badge = useMemo(() => {
    if (unreadCount <= 0) return null;
    return unreadCount > 99 ? "99+" : String(unreadCount);
  }, [unreadCount]);

  return (
    <div className="relative">
      <button
        className={cn(
          "relative h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors translate-y-[2px]",
          pulse && "assistant-bell-pulse"
        )}
        onClick={() => toggleOpen()}
        aria-label="Open assistant"
      >
        <Bell className={cn("h-4 w-4 mx-auto text-white/80", open && "text-primary")} />
        {badge && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border border-[#0b0b11]">
            {badge}
          </span>
        )}
      </button>
    </div>
  );
}

