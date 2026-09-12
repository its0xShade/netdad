"use client";
import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/markdown";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const headings = items.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length) setActive(vis[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    headings.forEach((h) => h && obs.observe(h));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="space-y-0.5 text-xs">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`}
          className={`block rounded-md px-3 py-1.5 no-underline transition-colors ${
            item.level > 2 ? "pr-6" : ""
          } ${
            active === item.id
              ? "bg-primary-50 font-semibold text-primary-700"
              : "text-text-muted hover:text-text-primary hover:bg-gray-50"
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}