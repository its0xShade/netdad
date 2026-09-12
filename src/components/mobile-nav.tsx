"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Home, Menu, X, BookOpen, Wrench, GraduationCap, User, Network } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MOBILE_LINKS = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/curriculum", label: "سرفصل‌ها", icon: BookOpen },
  { href: "/tools", label: "ابزارها", icon: Wrench },
  { href: "/exam", label: "آزمون", icon: GraduationCap },
  { href: "/profile", label: "پروفایل", icon: User },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Hamburger — always on mobile, hidden on desktop */}
      <button
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-xl border border-border bg-white text-text-primary transition-colors hover:border-primary-300 md:hidden"
        aria-label="باز کردن منو"
      >
        <Menu className="size-5" />
      </button>

      {/* Slide-out sheet */}
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
                {MOBILE_LINKS.map((l) => {
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
                Ctrl+K — جستجوی سریع در دسکتاپ
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}