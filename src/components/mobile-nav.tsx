"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Network, Home, BookOpen, Wrench, GraduationCap, User, Menu, X, Search, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

const BOTTOM_LINKS = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/curriculum", label: "سرفصل‌ها", icon: BookOpen },
  { href: "/tools", label: "ابزارها", icon: Wrench },
  { href: "/exam", label: "آزمون", icon: GraduationCap },
  { href: "/profile", label: "پروفایل", icon: User },
];

// عنوان صفحه برای هدر موبایل
const PAGE_TITLES: [RegExp, string][] = [
  [/^\/$/, "خانه"],
  [/^\/curriculum/, "سرفصل‌ها"],
  [/^\/chapter\//, "فصل دوره"],
  [/^\/lesson\//, "درس"],
  [/^\/tools/, "ابزارهای شبکه"],
  [/^\/exam/, "آزمون نهایی"],
  [/^\/game/, "بازی شبکه"],
  [/^\/cable/, "تستر کابل"],
  [/^\/flashcards/, "فلش‌کارت"],
  [/^\/timeline/, "خط زمانی"],
  [/^\/network-builder/, "ساخت شبکه"],
  [/^\/drill/, "دریل هوشمند"],
  [/^\/weak-points/, "نقاط ضعف"],
  [/^\/mind-map/, "نقشه ذهنی"],
  [/^\/search/, "جستجو"],
  [/^\/glossary/, "واژه‌نامه"],
  [/^\/profile/, "پروفایل"],
];

function titleFor(path: string): string {
  for (const [re, t] of PAGE_TITLES) if (re.test(path)) return t;
  return "نت‌داد";
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = titleFor(pathname);

  return (
    <>
      {/* ═══ Mobile header: لوگو + عنوان ═══ */}
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:hidden">
        <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-border/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="grid size-8 place-items-center rounded-lg bg-primary-600 text-white">
              <Network className="size-4" />
            </span>
            <span className="text-sm font-extrabold text-text-primary">
              نت‌داد <span className="text-xs font-medium text-text-muted">— {title}</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="grid size-8 place-items-center rounded-lg text-text-primary transition-colors hover:bg-gray-100"
            aria-label="باز کردن منو"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* ═══ Bottom nav ═══ */}
      <nav className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-4 md:hidden">
        <div className="flex w-full max-w-md items-center justify-around rounded-2xl border border-border/80 bg-white/95 px-1 py-1.5 shadow-lg backdrop-blur-md">
          {BOTTOM_LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-semibold transition-colors no-underline",
                  active ? "bg-primary-50 text-primary-700" : "text-text-muted hover:text-text-primary",
                )}
              >
                <Icon className={cn("size-5", active && "text-primary-600")} />
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ═══ Slide-out sheet ═══ */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/30 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[160] flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl md:hidden"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="flex items-center gap-2 text-sm font-black text-text-primary">
                  <Network className="size-5 text-primary-500" />
                  نت‌داد
                </span>
                <button onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-lg text-text-muted hover:bg-gray-100" aria-label="بستن منو">
                  <X className="size-4.5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto p-3">
                {[...BOTTOM_LINKS, { href: "/search", label: "جستجو", icon: Search }, { href: "/glossary", label: "واژه‌نامه", icon: BookMarked }].map((l) => {
                  const active = pathname === l.href;
                  const Icon = l.icon;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors no-underline",
                        active ? "bg-primary-50 text-primary-700" : "text-text-primary hover:bg-gray-50",
                      )}
                    >
                      <Icon className={cn("size-4.5", active ? "text-primary-500" : "text-text-light")} />
                      {l.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="border-t border-border p-4 text-center text-[10px] text-text-light">
                نت‌داد — آکادمی شبکه
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}