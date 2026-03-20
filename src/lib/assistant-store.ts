"use client";

import { create } from "zustand";

export type AssistantConnectionStatus = "connected" | "reconnecting" | "disconnected";

export interface AssistantNotification {
  id: string;
  createdAt: string; // ISO
  preview: string;
}

interface AssistantUIState {
  open: boolean;
  unreadCount: number;
  connectionStatus: AssistantConnectionStatus;
  lastReadAt: string | null;

  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  markAllRead: () => void;
  setUnreadCount: (count: number) => void;
  setLastReadAt: (iso: string | null) => void;

  // Shell-only helpers (message logic comes next)
  setConnectionStatus: (status: AssistantConnectionStatus) => void;
}

export const useAssistantStore = create<AssistantUIState>((set, get) => ({
  open: false,
  unreadCount: 0,
  connectionStatus: "connected",
  lastReadAt: null,

  setOpen: (open) =>
    set(() => ({
      open,
      unreadCount: open ? 0 : get().unreadCount,
    })),
  toggleOpen: () => {
    const next = !get().open;
    get().setOpen(next);
    if (next) get().markAllRead();
  },
  markAllRead: () => set(() => ({ unreadCount: 0 })),

  setUnreadCount: (count) =>
    set(() => ({
      unreadCount: Math.max(0, Math.min(99, Math.floor(count))),
    })),
  setLastReadAt: (iso) => set(() => ({ lastReadAt: iso })),
  setConnectionStatus: (status) => set(() => ({ connectionStatus: status })),
}));

