"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "info" | "error";
type ToastItem = { id: number; title: string; description?: string; variant: ToastVariant };

const ToastCtx = createContext<{ toast: (t: Omit<ToastItem, "id">) => void }>({ toast: () => {} });

export function useToast() {
  return useContext(ToastCtx);
}

const VARIANTS: Record<ToastVariant, { icon: ReactNode; ring: string; iconColor: string }> = {
  success: { icon: <CheckCircle2 className="size-4.5" />, ring: "border-emerald-200", iconColor: "text-emerald-500" },
  info: { icon: <Info className="size-4.5" />, ring: "border-sky-200", iconColor: "text-sky-500" },
  error: { icon: <AlertTriangle className="size-4.5" />, ring: "border-red-200", iconColor: "text-red-500" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(1);

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((t: Omit<ToastItem, "id">) => {
    const id = idRef.current++;
    setItems((prev) => [...prev.slice(-2), { ...t, id }]);
    setTimeout(() => dismiss(id), 3500);
  }, [dismiss]);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      {/* Toast stack — bottom center */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {items.map((t) => {
            const v = VARIANTS[t.variant];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className={cn("pointer-events-auto flex w-full items-start gap-3 rounded-2xl border bg-white/95 p-4 shadow-xl shadow-black/5 backdrop-blur", v.ring)}
              >
                <span className={cn("mt-0.5 shrink-0", v.iconColor)}>{v.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-text-primary">{t.title}</p>
                  {t.description && <p className="mt-0.5 text-xs leading-5 text-text-muted">{t.description}</p>}
                </div>
                <button type="button" onClick={() => dismiss(t.id)} className="shrink-0 rounded-lg p-1 text-text-light transition-colors hover:bg-gray-100 hover:text-text-primary" aria-label="بستن">
                  <X className="size-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}