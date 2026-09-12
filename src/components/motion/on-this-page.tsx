"use client";
// On This Page — animated active-section navigation (beUI pattern)

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/markdown";

export function OnThisPage({ items }: { items: TocItem[] }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the top-most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="rounded-2xl border border-border bg-white p-4">
      <p className="px-2 text-xs font-bold uppercase tracking-wider text-text-light">در این صفحه</p>
      <ul className="mt-2 space-y-0.5">
        {items.map((item) => {
          const active = activeId === item.id;
          const href = `#${item.id}`;
          return (
            <li key={item.id} className="relative">
              {active ? (
                <motion.span
                  layoutId="toc-active"
                  transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                  className="absolute inset-0 rounded-lg bg-primary-50"
                />
              ) : null}
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                  history.replaceState(null, "", href);
                  setActiveId(item.id);
                }}
                className={cn(
                  "relative z-10 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                  item.level > 2 ? "pr-8" : "",
                  active ? "font-semibold text-primary-700" : "text-text-muted hover:text-text-primary",
                )}
              >
                {item.level > 2 ? <span className="size-1 rounded-full bg-text-light/50" /> : null}
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}