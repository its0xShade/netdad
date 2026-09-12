"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Inbox, BookOpen } from "lucide-react";
import { MultiSelect } from "@/components/motion/multi-select";
import { toFaDigits } from "@/lib/format";
import type { LessonMeta } from "@/lib/content";

type Option = { value: string; label: string };

export function SearchClient({ lessons, chapterOptions }: { lessons: LessonMeta[]; chapterOptions: Option[] }) {
  const [q, setQ] = useState("");
  const [chapters, setChapters] = useState<string[]>([]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return lessons.filter((l) => {
      const okChapter = chapters.length === 0 || chapters.includes(String(l.chapter));
      if (!okChapter) return false;
      if (!s) return true;
      return (
        l.title.toLowerCase().includes(s) ||
        l.titleEn.toLowerCase().includes(s) ||
        l.summary.toLowerCase().includes(s) ||
        l.chapterTitle.toLowerCase().includes(s)
      );
    });
  }, [q, chapters, lessons]);

  return (
    <div className="space-y-6">
      {/* Multi-select filters */}
      <div className="rounded-2xl border border-border bg-white p-5">
        <p className="mb-3 text-sm font-bold text-text-primary">فیلتر بر اساس بخش</p>
        <MultiSelect
          options={chapterOptions}
          value={chapters}
          onValueChange={setChapters}
          placeholder="همه بخش‌ها…"
          emptyMessage="بخشی یافت نشد"
        />
      </div>

      {/* Live search */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-text-light" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو در عنوان یا خلاصه درس…"
          className="h-14 w-full rounded-2xl border border-border bg-white pl-4 pr-12 text-sm text-text-primary shadow-sm outline-none transition-colors placeholder:text-text-light focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
          aria-label="جستجوی درس"
        />
      </div>

      {/* Count */}
      <p className="text-sm text-text-muted">
        {toFaDigits(results.length)} درس پیدا شد
        {chapters.length > 0 ? ` در ${toFaDigits(chapters.length)} بخش` : " در همه بخش‌ها"}
      </p>

      {/* Results */}
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white py-16 text-center">
          <Inbox className="mx-auto size-10 text-text-light" />
          <h3 className="mt-4 text-base font-bold text-text-primary">نتیجه‌ای پیدا نشد</h3>
          <p className="mt-1 text-sm text-text-muted">عبارت دیگری جستجو کن یا فیلترها را تغییر بده.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {results.map((l) => (
            <li key={l.id}>
              <Link
                href={`/lesson/${l.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:border-primary-200 hover:shadow-card-hover no-underline"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
                  <BookOpen className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <span className="rounded-full bg-gray-50 px-2 py-0.5 font-semibold text-text-secondary">بخش {toFaDigits(l.chapter)}</span>
                    <span>درس {toFaDigits(l.order)}</span>
                  </div>
                  <h3 className="mt-1 truncate text-sm font-bold text-text-primary group-hover:text-primary-700">{l.title}</h3>
                  {l.summary ? <p className="mt-0.5 line-clamp-1 text-xs text-text-muted">{l.summary}</p> : null}
                </div>
                <span className="text-text-light transition-transform group-hover:-translate-x-1">←</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}