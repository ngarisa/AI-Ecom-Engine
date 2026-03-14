"use client";

import { create } from "zustand";

type ToastVariant = "default" | "success" | "error";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastState {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id"> & { id?: string }) => void;
  dismiss: (id: string) => void;
  clear: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  show: (toast) => {
    const id = toast.id ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const next = { ...toast, id };
    set((state) => ({
      toasts: [next, ...state.toasts].slice(0, 5),
    }));
    return id;
  },
  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clear: () => set({ toasts: [] }),
}));

export function showToast(toast: Omit<Toast, "id"> & { id?: string }) {
  return useToastStore.getState().show(toast);
}

