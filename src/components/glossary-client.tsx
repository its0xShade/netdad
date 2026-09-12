"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search } from "lucide-react";
import { BouncyAccordion, type BouncyAccordionItem } from "@/components/motion/bouncy-accordion";
import { GLOSSARY, type GlossaryEntry } from "@/lib/glossary";
import { cn } from "@/lib/utils";

const CATEGORIES = [...new Set(GLOSSARY.map((g) => g.category))];

export function GlossaryComponent() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      const catMatch = !activeCat || g.category === activeCat;
      const searchMatch =
        !s ||
        g.term.toLowerCase().includes(s) ||
        g.termEn.toLowerCase().includes(s) ||
        g.definition.toLowerCase().includes(s);
      return catMatch && searchMatch;
    });
  }, [search, activeCat]);

  const items: BouncyAccordionItem[] = filtered.map((g) => ({
    id: g.termEn,
    icon: <BookOpen className="h-4 w-4" />,
    title: (
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-text-primary">{g.term}</span>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-700 ltr">
            {g.termEn}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-text-muted">
            {g.category}
          </span>
        </div>
      </div>
    ),
    description: (
      <p className="text-[13px] leading-7 text-text-secondary">{g.definition}</p>
    ),
  }));

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-text-light" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در واژه‌نامه…"
          className="h-11 w-full rounded-xl border border-border bg-white pl-4 pr-10 text-sm text-text-primary shadow-sm outline-none transition-colors placeholder:text-text-light focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
          aria-label="جستجوی گlossary"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCat(null)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
            !activeCat ? "bg-primary-600 text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200",
          )}
        >
          همه
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCat(activeCat === cat ? null : cat)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
              activeCat === cat ? "bg-primary-600 text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="rounded-2xl border border-border bg-white overflow-hidden">
        <div className="border-b border-border bg-gray-50/60 px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-bold text-text-primary">{filtered.length} واژه</span>
          <span className="text-[10px] text-text-light">برای مشاهده توضیحات کلیک کنید</span>
        </div>
        {items.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-text-muted">واژه‌ای یافت نشد.</p>
        ) : (
          <div className="p-2">
            <BouncyAccordion items={items} collapsible classNames={{ item: "border-0 shadow-none" }} />
          </div>
        )}
      </div>
    </div>
  );
}