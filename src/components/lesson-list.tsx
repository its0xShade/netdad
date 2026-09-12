"use client";
import Link from "next/link";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { toFaDigits, DIFFICULTY_LABELS } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { LessonMeta } from "@/lib/content";

export function LessonList({ lessons }: { lessons: LessonMeta[] }) {
  const { completed } = useProgress();
  const completedCount = lessons.filter((l) => completed.includes(l.id)).length;

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border bg-gray-50/50 px-6 py-4">
        <h2 className="text-sm font-bold text-text-primary">لیست درس‌ها</h2>
        <span className="text-xs font-semibold text-primary-600">
          {toFaDigits(completedCount)} / {toFaDigits(lessons.length)} تکمیل‌شده
        </span>
      </div>
      <ul className="divide-y divide-border-light">
        {lessons.map((lesson, i) => {
          const done = completed.includes(lesson.id);
          const { difficulty = "مبتدی" } = lesson;
          return (
            <li key={lesson.id}>
              <Link
                href={`/lesson/${lesson.id}`}
                className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-primary-50/40 no-underline"
              >
                <span className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full border-2 transition-colors",
                  done ? "border-primary-500 bg-primary-500 text-white" : "border-border bg-white text-text-light group-hover:border-primary-300",
                )}>
                  {done ? <CheckCircle2 className="size-4.5" /> : <span className="font-mono text-xs font-bold">{toFaDigits(i + 1)}</span>}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-text-primary group-hover:text-primary-700">
                    {lesson.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-text-muted">
                    {toFaDigits(lesson.duration)} دقیقه
                  </span>
                </span>
                <span className={cn(
                  "badge shrink-0",
                  difficulty === "سخت" || difficulty === "پیشرفته" ? "badge-hard" : difficulty === "متوسط" ? "badge-medium" : "badge-easy",
                )}>
                  {difficulty}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}