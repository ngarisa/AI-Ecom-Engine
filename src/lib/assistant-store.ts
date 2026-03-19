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
  dropdownOpen: boolean;
  unreadCount: number;
  connectionStatus: AssistantConnectionStatus;
  notifications: AssistantNotification[];

  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  setDropdownOpen: (open: boolean) => void;
  markAllRead: () => void;

  // Shell-only helpers (message logic comes next)
  enqueueNotification: (preview: string) => void;
  setConnectionStatus: (status: AssistantConnectionStatus) => void;
}

export const useAssistantStore = create<AssistantUIState>((set, get) => ({
  open: false,
  dropdownOpen: false,
  unreadCount: 0,
  connectionStatus: "connected",
  notifications: [],

  setOpen: (open) =>
    set(() => ({
      open,
      dropdownOpen: false,
      unreadCount: open ? 0 : get().unreadCount,
    })),
  toggleOpen: () => {
    const next = !get().open;
    get().setOpen(next);
    if (next) get().markAllRead();
  },
  setDropdownOpen: (open) => set(() => ({ dropdownOpen: open })),
  markAllRead: () => set(() => ({ unreadCount: 0 })),

  enqueueNotification: (preview) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const entry: AssistantNotification = {
      id,
      createdAt: new Date().toISOString(),
      preview,
    };
    set((state) => ({
      notifications: [entry, ...state.notifications].slice(0, 20),
      unreadCount: state.open ? 0 : Math.min(99, state.unreadCount + 1),
    }));
  },
  setConnectionStatus: (status) => set(() => ({ connectionStatus: status })),
}));

