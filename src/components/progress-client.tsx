"use client";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function ChapterProgress({ lessons }: { lessons: string[] }) {
  const { completed } = useProgress();
  const done = lessons.filter((id) => completed.includes(id)).length;
  const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;

  return (
    <div className="px-6 pb-5">
      <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
        <span className="text-text-muted">پیشرفت</span>
        <span className="text-primary-600">{toFa(pct)}٪</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function toFa(n: number) {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(n).replace(/\d/g, (d) => fa[+d]);
}