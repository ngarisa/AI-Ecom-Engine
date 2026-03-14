"use client";

import { useEffect } from "react";
import { useToastStore, type Toast } from "@/lib/toast-store";
import { cn } from "@/lib/utils";

export function ToastViewport() {
  const { toasts, dismiss } = useToastStore();

  useEffect(() => {
    const timeouts = toasts.map((toast) =>
      setTimeout(() => dismiss(toast.id), 4500)
    );
    return () => {
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, [toasts, dismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const { title, description, variant = "default" } = toast;

  return (
    <div
      className={cn(
        "pointer-events-auto w-full max-w-sm rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md transition-transform duration-150",
        "bg-card/90 border-border/60",
        "hover:translate-y-[-1px]",
        {
          "border-emerald-500/60 bg-emerald-500/10": variant === "success",
          "border-destructive/70 bg-destructive/10": variant === "error",
        }
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-1">
          {title && <p className="text-sm font-semibold">{title}</p>}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="ml-2 text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

