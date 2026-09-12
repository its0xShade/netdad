import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle2, Circle, Clock, Lock } from "lucide-react";
import { buildCourse, getChapter } from "@/lib/content";
import { toFaDigits, DIFFICULTY_LABELS } from "@/lib/format";
import { LessonList } from "@/components/lesson-list";
import { ExpandingArrowButton } from "@/components/motion/expanding-arrow-button";
import { Button } from "@/components/ui/button";

export const metadata = { title: "بخش دوره" };

export function generateStaticParams() {
  const { chapters } = buildCourse();
  return chapters.map((c) => ({ num: String(c.number) }));
}

export const dynamicParams = false;

export default async function ChapterPage({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const chapter = getChapter(parseInt(num));
  if (!chapter) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      {/* Header */}
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-primary-600 ltr">Section 0{chapter.number}</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">{chapter.title}</h1>
        {chapter.titleEn ? <p className="mt-1.5 text-sm text-text-light ltr">{chapter.titleEn}</p> : null}
        <p className="mt-4 text-sm text-text-muted">
          {toFaDigits(chapter.lessons.length)} درس • مجموعاً {toFaMaths(chapter.lessons.reduce((s, l) => s + l.duration, 0))} دقیقه مطالعه
        </p>
      </div>

      {/* Lesson list */}
      <div className="card overflow-hidden">
        <LessonList lessons={chapter.lessons} />
      </div>

      {/* Footer actions */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-white p-8 text-center sm:flex-row sm:justify-between sm:text-right">
        <div>
          <h3 className="text-lg font-bold text-text-primary">درس بعدی</h3>
          <p className="mt-1 text-sm text-text-muted">آماده‌ای ادامه مسیر رو شروع کنی؟</p>
        </div>
        <ExpandingArrowButton href={'/lesson/' + chapter.lessons[0].id}>
          شروع یادگیری
        </ExpandingArrowButton>
      </div>
    </div>
  );
}

function toFaMaths(n: number) {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(n).replace(/\d/g, (d) => fa[+d]);
}