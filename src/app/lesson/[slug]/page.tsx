import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import { buildCourse, findLesson, getAdjacentLessons } from "@/lib/content";
import { renderMarkdown, extractToc } from "@/lib/markdown";
import { toFaDigits, DIFFICULTY_LABELS } from "@/lib/format";
import { OnThisPage } from "@/components/motion/on-this-page";
import { LessonToolbar } from "@/components/lesson-toolbar";
import { Button } from "@/components/ui/button";
import { ExpandingArrowButton } from "@/components/motion/expanding-arrow-button";
import { LessonEnhancements } from "@/components/lesson-enhancements";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { PrintLessonButton } from "@/components/print-lesson-button";
import { NotesHighlighter } from "@/components/notes-highlighter";
import { LessonDiagram } from "@/components/lesson-diagram";
import { cn } from "@/lib/utils";

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(async ({ slug }) => {
    const lesson = findLesson(slug);
    if (!lesson) return { title: "درس" };
    return {
      title: lesson.title,
      description: lesson.summary || undefined,
      openGraph: {
        title: lesson.title,
        description: lesson.summary || undefined,
        type: "article",
      },
    };
  });
}

export function generateStaticParams() {
  const { lessons } = buildCourse();
  return lessons.map((l) => ({ slug: l.id }));
}

export const dynamicParams = false;

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = findLesson(slug);
  if (!lesson) notFound();

  const html = await renderMarkdown(lesson.body);
  const toc = extractToc(html);
  const { prev, next } = getAdjacentLessons(lesson.id);
  const { difficulty = "مبتدی", chapterTitle, chapter } = lesson;

  return (
    <div className="mx-auto max-w-none">
      <ReadingProgress />
      {/* ═══ Header ═══ */}
      <div className="border-b border-border pb-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-xs text-text-muted" aria-label="مسیر">
          <Link href="/curriculum" className="transition-colors hover:text-primary-600 no-underline">سرفصل‌ها</Link>
          <span>/</span>
          <Link href={`/chapter/${chapter}`} className="transition-colors hover:text-primary-600 no-underline">بخش {toFaDigits(chapter)}</Link>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("badge", difficulty === "سخت" || difficulty === "پیشرفته" ? "badge-hard" : difficulty === "متوسط" ? "badge-medium" : "badge-easy")}>
            {difficulty}
          </span>
          <span className="badge bg-gray-50 text-text-muted">درس {toFaDigits(lesson.order)}</span>
          <span className="badge bg-gray-50 text-text-muted flex items-center gap-1">
            <Clock className="size-3" />
            {toFaDigits(lesson.duration)} دقیقه
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-black leading-snug tracking-tight text-text-primary lg:text-4xl">{lesson.title}</h1>
        {lesson.titleEn ? <p className="mt-1.5 text-sm text-text-light ltr">{lesson.titleEn}</p> : null}
        {lesson.summary ? <p className="mt-4 max-w-2xl text-sm leading-7 text-text-muted">{lesson.summary}</p> : null}

        <div className="mt-5 flex items-center gap-2 no-print">
          <LessonToolbar lessonId={lesson.id} />
          <PrintLessonButton />
        </div>
      </div>

      {/* ═══ TL;DR ═══ */}
      {lesson.summary && (
        <div className="mt-8 rounded-2xl border border-primary-200 bg-gradient-to-l from-primary-50 to-white p-6">
          <div className="flex items-center gap-2">
            <span className="badge badge-easy">خلاصه درس</span>
            <span className="text-[10px] font-semibold text-primary-600">TL;DR</span>
          </div>
          <p className="mt-3 text-sm font-medium leading-7 text-text-primary">{lesson.summary}</p>
        </div>
      )}

      {/* ═══ Body + TOC ═══ */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="relative min-w-0">
          <LessonDiagram chapter={chapter} />
          <article className="prose min-w-0" dangerouslySetInnerHTML={{ __html: html }} />
          <NotesHighlighter lessonId={lesson.id} />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <OnThisPage items={toc} />
          </div>
        </aside>
      </div>

      {/* ═══ Prev / Next ═══ */}
      <div className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {prev ? (
          <div className="card card-hover p-5">
            <p className="text-xs text-text-muted">درس قبلی</p>
            <Link href={`/lesson/${prev.id}`} className="mt-1.5 block text-sm font-bold text-text-primary hover:text-primary-700 no-underline">
              {prev.title}
            </Link>
            <Button variant="ghost" size="sm" className="mt-3 text-primary-600 hover:bg-primary-50">
              <ArrowRight className="size-4" />
              بازگشت
            </Button>
          </div>
        ) : <div />}
        {next ? (
          <div className="card card-hover p-5 text-left">
            <p className="text-right text-xs text-text-muted">درس بعدی</p>
            <Link href={`/lesson/${next.id}`} className="mt-1.5 block text-sm font-bold text-text-primary hover:text-primary-700 no-underline">
              {next.title}
            </Link>
            <ExpandingArrowButton className="mt-3 h-11 min-w-44 rounded-2xl" href={'/lesson/' + next.id}>
              ادامه یادگیری
            </ExpandingArrowButton>
          </div>
        ) : null}
      </div>

      {/* ═══ Quiz + Keyboard ═══ */}
      <LessonEnhancements
        prevId={prev?.id ?? null}
        nextId={next?.id ?? null}
        prevTitle={prev?.title ?? ""}
        nextTitle={next?.title ?? ""}
      />
    </div>
  );
}