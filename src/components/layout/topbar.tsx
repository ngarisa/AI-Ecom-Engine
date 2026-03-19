"use client";

import { AssistantBell } from "@/components/assistant/assistant-bell";
import { useAppStore } from "@/lib/store";

export function TopBar() {
  const brandName = useAppStore((s) => s.brandProfile.brandName);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="h-14 px-6 flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{brandName || "AdFactory AI"}</p>
          <p className="text-[11px] text-muted-foreground truncate">
            Your AI ecommerce ad command center
          </p>
        </div>
        <div className="flex items-center gap-2 pt-0.5">
          <AssistantBell />
        </div>
      </div>
    </header>
  );
}

