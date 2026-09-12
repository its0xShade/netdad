"use client";
// beui.dev/components/motion/multi-select — searchable options, removable animated tokens, collision-aware panel

import { motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type MultiSelectOption = { value: string; label: string; icon?: ReactNode };

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  searchable?: boolean;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = "انتخاب…",
  emptyMessage = "موردی یافت نشد",
  searchable = true,
  className,
}: MultiSelectProps) {
  const reduce = useReducedMotion();
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = value ?? internal;

  const setSelected = useCallback(
    (next: string[]) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    },
    [value, onValueChange],
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (v: string) => {
    setSelected(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  };

  const filtered = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const selectedOptions = options.filter((o) => selected.includes(o.value));

  return (
    <div ref={rootRef} className={cn("w-full", className)}>
      {/* Trigger: tokens + input */}
      <div
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex min-h-12 w-full cursor-text flex-wrap items-center gap-1.5 rounded-xl border bg-white px-3 py-2 transition-colors",
          open ? "border-primary-400 ring-2 ring-primary-100" : "border-border hover:border-primary-200",
        )}
      >
        {selectedOptions.map((opt) => (
          <motion.span
            key={opt.value}
            layout={reduce ? undefined : true}
            initial={reduce ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduce ? undefined : { scale: 0.8, opacity: 0 }}
            transition={SPRING_LAYOUT}
            className="inline-flex items-center gap-1 rounded-full bg-primary-50 py-1 pl-1.5 pr-2.5 text-xs font-medium text-primary-700"
          >
            {opt.icon}
            {opt.label}
            <button
              type="button"
              aria-label={`حذف ${opt.label}`}
              onClick={(e) => { e.stopPropagation(); toggle(opt.value); }}
              className="grid size-4 place-items-center rounded-full text-primary-400 transition-colors hover:bg-primary-100 hover:text-primary-700"
            >
              <X className="size-3" />
            </button>
          </motion.span>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={selected.length ? "" : placeholder}
          className="min-w-24 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-light outline-none"
          aria-label="جستجو در گزینه‌ها"
        />
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-text-light">
          <ChevronDown className="size-4" />
        </motion.span>
      </div>

      {/* Panel */}
      {open ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={reduce ? { duration: 0 } : SPRING_PANEL}
          className="absolute z-50 mt-2 max-h-72 w-full max-w-md overflow-auto rounded-xl border border-border bg-white p-1.5 shadow-xl shadow-black/10"
        >
          {searchable ? (
            <div className="relative mb-1.5">
              <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-text-light" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو…"
                className="h-9 w-full rounded-lg bg-gray-50 pl-3 pr-8 text-sm outline-none placeholder:text-text-light focus:bg-white focus:ring-1 focus:ring-primary-300"
              />
            </div>
          ) : null}
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-text-muted">{emptyMessage}</p>
          ) : (
            filtered.map((opt) => {
              const isSelected = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(opt.value)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isSelected ? "bg-primary-50 text-primary-700" : "text-text-secondary hover:bg-gray-50",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {opt.icon}
                    {opt.label}
                  </span>
                  {isSelected ? <Check className="size-4 text-primary-600" /> : null}
                </button>
              );
            })
          )}
        </motion.div>
      ) : null}
    </div>
  );
}