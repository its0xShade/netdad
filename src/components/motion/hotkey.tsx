"use client";
// beui.dev/components/motion/hotkey — keyboard shortcuts with Cmd/Ctrl awareness

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface HotkeyItem {
  key: string;
  description: string;
  handler: (e: KeyboardEvent) => void;
  modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean };
}

function getModifierLabel(): string {
  if (typeof navigator === "undefined") return "Ctrl";
  return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl";
}

export function useHotkeys(items: HotkeyItem[]) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      for (const item of items) {
        const ctrlMatch = item.modifiers?.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const shiftMatch = item.modifiers?.shift ? e.shiftKey : !e.shiftKey;
        const altMatch = item.modifiers?.alt ? e.altKey : !e.altKey;
        const keyMatch = e.key.toLowerCase() === item.key.toLowerCase();

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          e.preventDefault();
          item.handler(e);
          return;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [items]);

  return { isMac };
}

export function HotkeyBadge({ keys, className }: { keys: string[]; className?: string }) {
  const modLabel = getModifierLabel();
  return (
    <kbd className={cn("inline-flex items-center gap-1 text-[10px]", className)}>
      {keys.map((key, i) => (
        <span key={i}>
          <span className="inline-block rounded-md border border-border bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-text-secondary shadow-sm">
            {key === "mod" ? modLabel : key}
          </span>
          {i < keys.length - 1 && <span className="mx-0.5 text-text-light">+</span>}
        </span>
      ))}
    </kbd>
  );
}

export function HotkeyHelp({
  items,
  visible,
  onClose,
}: {
  items: { keys: string[]; description: string }[];
  visible: boolean;
  onClose: () => void;
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-text-primary">کلیدهای میانبر</h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">✕</button>
        </div>
        <ul className="space-y-2">
          {items.map(({ keys, description }) => (
            <li key={description} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5">
              <span className="text-sm text-text-primary">{description}</span>
              <HotkeyBadge keys={keys} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}