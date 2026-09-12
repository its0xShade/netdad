"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Network, Router, Wifi, Server, Shield, Cloud, Lock, Globe, Radio, Cpu, KeyRound, Bug, Hexagon, Layers } from "lucide-react";
import { BouncyAccordion, type BouncyAccordionItem } from "@/components/motion/bouncy-accordion";
import { MultiSelect } from "@/components/motion/multi-select";
import { useProgress } from "@/lib/progress";
import { useBookmarks } from "@/lib/bookmarks";
import { cn } from "@/lib/utils";

const CHAPTER_ICONS = [Network, Router, Wifi, Server, Shield, Cloud, Lock, Globe, Radio, Cpu, KeyRound, Bug, Hexagon, Layers];

const DIFFICULTY_LEVELS = ["beginner", "fundamentals", "practical", "intermediate"] as const;
const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "مبتدی",
  fundamentals: "مبانی",
  practical: "عملی",
  intermediate: "متوسط",
};

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  fundamentals: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  practical: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
  intermediate: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
};

type LessonData = {
  id: string;
  title: string;
  titleEn: string;
  order: number;
  duration: number;
  difficulty: string;
  chapter: number;
};

type ChapterData = {
  number: number;
  title: string;
  titleEn: string;
  lessons: LessonData[];
};

function toFa(n: number) {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(n).replace(/\d/g, (d) => fa[+d]);
}

function ChapterLessons({ lessons, chapterNum }: { lessons: LessonData[]; chapterNum: number }) {
  const { completed } = useProgress();
  const { isBookmarked } = useBookmarks();
  const doneCount = lessons.filter((l) => completed.includes(l.id)).length;
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;

  return (
    <div className="space-y-3 pt-1">
      {/* Progress bar */}
      <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-2.5">
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold">
            <span className="text-text-muted">پیشرفت این بخش</span>
            <span className="text-primary-600">{toFa(pct)}٪</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary-500 to-primary-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-semibold text-text-muted">
          {toFa(doneCount)}/{toFa(lessons.length)}
        </span>
      </div>

      {/* Lesson list */}
      <ul className="space-y-1">
        {lessons.map((lesson) => {
          const done = completed.includes(lesson.id);
          const bookmarked = isBookmarked(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={`/lesson/${lesson.id}`}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-primary-50/60 no-underline"
              >
                {/* Status dot */}
                <span
                  className={cn(
                    "size-2.5 shrink-0 rounded-full transition-colors",
                    done ? "bg-primary-500" : "bg-border group-hover:bg-primary-300",
                  )}
                />

                {/* Lesson info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-text-light ltr">
                      {chapterNum}.{lesson.order}
                    </span>
                    <span className="truncate text-sm font-medium text-text-primary group-hover:text-primary-700 transition-colors">
                      {lesson.title}
                    </span>
                  </div>
                  {lesson.titleEn ? (
                    <span className="mt-0.5 block text-[11px] text-text-light ltr">{lesson.titleEn}</span>
                  ) : null}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      DIFFICULTY_STYLES[lesson.difficulty] ?? "bg-gray-50 text-gray-600",
                    )}
                  >
                    {lesson.difficulty}
                  </span>
                  <span className="text-[11px] text-text-light">{toFa(lesson.duration)} دقیقه</span>
                  {bookmarked ? (
                    <span className="text-primary-400 text-xs">★</span>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* View full chapter link */}
      <Link
        href={`/chapter/${chapterNum}`}
        className="flex items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-xs font-semibold text-text-muted transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 no-underline"
      >
        مشاهده کامل بخش
        <span className="text-[10px]">←</span>
      </Link>
    </div>
  );
}

export function CurriculumAccordion({
  chapters,
  totalLessons,
}: {
  chapters: ChapterData[];
  totalLessons: number;
}) {
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);

  // Filter chapters based on difficulty
  const visibleChapters = useMemo(() => {
    if (difficultyFilter.length === 0) return chapters;
    return chapters.filter((ch) =>
      ch.lessons.some((l) => difficultyFilter.includes(l.difficulty))
    );
  }, [chapters, difficultyFilter]);

  const visibleLessons = visibleChapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

  const items: BouncyAccordionItem[] = visibleChapters.map((ch) => {
    const Icon = CHAPTER_ICONS[(ch.number - 1) % CHAPTER_ICONS.length];

    return {
      id: String(ch.number),
      icon: <Icon className="h-4 w-4" />,
      title: (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-text-light ltr">0{ch.number}</span>
            <span>{ch.title}</span>
          </div>
          <span className="flex items-center gap-2">
            <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-bold text-primary-700">
              {toFa(ch.lessons.length)} درس
            </span>
          </span>
        </div>
      ),
      description: <ChapterLessons lessons={ch.lessons} chapterNum={ch.number} />,
    };
  });

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
      {/* Header + filter */}
      <div className="flex flex-col gap-3 border-b border-border bg-gray-50/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-text-primary">لیست بخش‌ها</h2>
          <span className="text-xs font-semibold text-primary-600">
            {toFa(visibleChapters.length)} بخش — {toFa(visibleLessons)} درس
          </span>
        </div>
        <div className="max-w-xs">
          <MultiSelect
            options={DIFFICULTY_LEVELS.map((level) => ({ value: level, label: DIFFICULTY_LABELS[level] }))}
            value={difficultyFilter}
            onValueChange={setDifficultyFilter}
            placeholder="فیلتر سطح…"
            emptyMessage="سطحی یافت نشد"
          />
        </div>
      </div>

      {visibleChapters.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm text-text-muted">درسی با این سطح پیدا نشد.</p>
        </div>
      ) : (
        <div className="p-2">
          <BouncyAccordion
            items={items}
            defaultValue={null}
            collapsible={true}
            classNames={{
              item: "border-0 shadow-none bg-transparent hover:bg-gray-50/50",
              trigger: "rounded-xl",
              description: "text-text-secondary",
            }}
          />
        </div>
      )}
    </div>
  );
}