"use client";
import Link from "next/link";
import { Bookmark, CheckCircle2, Clock } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { useBookmarks } from "@/lib/bookmarks";
import { toFaDigits } from "@/lib/format";
import type { LessonMeta } from "@/lib/content";

export function ProfileClient({ allLessons }: { allLessons: LessonMeta[] }) {
  const { completed } = useProgress();
  const { bookmarks } = useBookmarks();

  const doneLessons = allLessons.filter((l) => completed.includes(l.id));
  const bmLessons = allLessons.filter((l) => bookmarks.includes(l.id));
  const pct = allLessons.length ? Math.round((doneLessons.length / allLessons.length) * 100) : 0;

  return (
    <>
      {/* ══ Overall progress (dynamic) ══ */}
      <div className="card p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary">پیشرفت کل دوره</h2>
          <span className="text-xs font-bold text-primary-600">{toFaDigits(pct)}٪</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-xs text-text-muted">
          از {toFaDigits(allLessons.length)} درس — {toFaDigits(doneLessons.length)} درس تکمیل شده
        </p>
      </div>

      {/* ══ Completed lessons ══ */}
      <div className="card p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-text-primary">
          <CheckCircle2 className="size-4 text-primary-600" />
          درس‌های تکمیل‌شده
        </h2>
        {doneLessons.length === 0 ? (
          <p className="mt-3 text-sm text-text-muted">هنوز درسی را تکمیل نکرده‌اید. از بخش اول شروع کنید!</p>
        ) : (
          <ul className="mt-4 space-y-1">
            {doneLessons.map((l) => (
              <li key={l.id}>
                <Link href={`/lesson/${l.id}`} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary-50/50 no-underline">
                  <span className="size-2 shrink-0 rounded-full bg-primary-500" />
                  <span className="truncate font-medium text-text-primary group-hover:text-primary-700">{l.title}</span>
                  <span className="ms-auto text-xs text-text-light">{toFaDigits(Math.floor(l.chapter))}.{toFaDigits(l.order)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ══ Bookmarks ══ */}
      <div className="card p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-text-primary">
          <Bookmark className="size-4 text-primary-600" />
          ذخیره‌شده‌ها
        </h2>
        {bmLessons.length === 0 ? (
          <p className="mt-3 text-sm text-text-muted">هنوز درسی ذخیره نکرده‌اید.</p>
        ) : (
          <ul className="mt-4 space-y-1">
            {bmLessons.map((l) => (
              <li key={l.id}>
                <Link href={`/lesson/${l.id}`} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-primary-50/50 no-underline">
                  <span className="size-2 shrink-0 rounded-full bg-primary-500" />
                  <span className="truncate font-medium text-text-primary group-hover:text-primary-700">{l.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}