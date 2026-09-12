"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookOpen, Wrench, Newspaper, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Cmd = { id: string; label: string; href: string; icon: React.ReactNode; category: string };

const COMMANDS: Cmd[] = [
  { id: "home", label: "خانه", href: "/", icon: <Newspaper className="size-4" />, category: "صفحه‌ها" },
  { id: "curriculum", label: "سرفصل‌ها", href: "/curriculum", icon: <BookOpen className="size-4" />, category: "صفحه‌ها" },
  { id: "tools", label: "ابزارها", href: "/tools", icon: <Wrench className="size-4" />, category: "صفحه‌ها" },
  { id: "flashcards", label: "فلش‌کارت‌ها", href: "/flashcards", icon: <BookOpen className="size-4" />, category: "تمرین" },
  { id: "drill", label: "دریل هوشمند", href: "/drill", icon: <BookOpen className="size-4" />, category: "تمرین" },
  { id: "exam", label: "آزمون نهایی", href: "/exam", icon: <Trophy className="size-4" />, category: "تمرین" },
  { id: "timeline", label: "گاهشواری پروتکل‌ها", href: "/timeline", icon: <Newspaper className="size-4" />, category: "یادگیری" },
  { id: "mind-map", label: "نقشه مفاهیم", href: "/mind-map", icon: <BookOpen className="size-4" />, category: "یادگیری" },
  { id: "network-builder", label: "سازنده شبکه", href: "/network-builder", icon: <Wrench className="size-4" />, category: "تمرین" },
  { id: "subnet", label: "محاسبه زیرشبکه", href: "/tools/subnet", icon: <Wrench className="size-4" />, category: "ابزارها" },
  { id: "binary", label: "مبدل باینری", href: "/tools/binary", icon: <Wrench className="size-4" />, category: "ابزارها" },
  { id: "ports", label: "مرجع پورت‌ها", href: "/tools/ports", icon: <Wrench className="size-4" />, category: "ابزارها" },
  { id: "subnet-viz", label: "تصویرسازی زیرشبکه", href: "/tools/subnet-viz", icon: <Wrench className="size-4" />, category: "ابزارها" },
  { id: "cheat-sheet", label: "برگه مرجع زیرشبکه", href: "/tools/cheat-sheet", icon: <Wrench className="size-4" />, category: "ابزارها" },
  { id: "cable", label: "تستر کابل", href: "/cable", icon: <Wrench className="size-4" />, category: "ابزارها" },
  { id: "game", label: "بازی کارت‌ها", href: "/game", icon: <Wrench className="size-4" />, category: "ابزارها" },
  { id: "weak", label: "تحلیل نقاط ضعف", href: "/weak-points", icon: <BookOpen className="size-4" />, category: "تمرین" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { if (open) { setQuery(""); setSel(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);

  const results = useMemo(() => {
    if (!query) return COMMANDS;
    const q = query.toLowerCase();
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => { setSel(0); }, [query]);

  function go(idx: number) {
    const cmd = results[idx];
    if (cmd) { window.location.href = cmd.href; setOpen(false); }
  }

  function onKeyNav(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); go(sel); }
  }

  const categories = [...new Set(results.map((c) => c.category))];

  return (
    <>
      {/* Hint chip in footer or dock — invisible trigger */}
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-1.5 rounded-lg border border-border bg-white/80 px-3 py-1.5 text-[11px] font-medium text-text-muted backdrop-blur transition-colors hover:border-primary-300 hover:text-primary-600 lg:inline-flex"
        aria-label="باز کردن جستجوی سریع"
      >
        <Search className="size-3" />
        جستجوی سریع
        <kbd className="rounded border border-border bg-gray-50 px-1 py-0.5 font-mono text-[9px]">Ctrl+K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed left-1/2 top-[18%] z-[210] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="size-4 shrink-0 text-primary-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyNav}
                  placeholder="جستجوی صفحه، ابزار، تمرین…"
                  className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-light"
                />
                <button onClick={() => setOpen(false)} className="shrink-0 rounded-md p-1 text-text-light hover:bg-gray-100 hover:text-text-primary">
                  <X className="size-3.5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 && <p className="py-6 text-center text-sm text-text-light">چیزی پیدا نشد</p>}
                {categories.map((cat) => (
                  <div key={cat}>
                    <p className="mb-1 px-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-text-light">{cat}</p>
                    {results.filter((c) => c.category === cat).map((cmd) => {
                      const globalIdx = results.indexOf(cmd);
                      const isSel = globalIdx === sel;
                      return (
                        <a
                          key={cmd.id}
                          href={cmd.href}
                          onMouseEnter={() => setSel(globalIdx)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors no-underline",
                            isSel ? "bg-primary-50 text-primary-700" : "text-text-primary hover:bg-gray-50",
                          )}
                        >
                          <span className={cn("shrink-0", isSel ? "text-primary-500" : "text-text-light")}>{cmd.icon}</span>
                          <span className="font-medium">{cmd.label}</span>
                        </a>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[10px] text-text-light">
                <span><kbd className="rounded border border-border bg-gray-50 px-1 font-mono">↑↓</kbd> حرکت</span>
                <span><kbd className="rounded border border-border bg-gray-50 px-1 font-mono">↵</kbd> باز کردن</span>
                <span><kbd className="rounded border border-border bg-gray-50 px-1 font-mono">esc</kbd> بستن</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}