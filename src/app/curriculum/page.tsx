import { buildCourse } from "@/lib/content";
import { CurriculumAccordion } from "@/components/curriculum-accordion";

export const metadata = { title: "سرفصل‌های دوره" };

export default function CurriculumPage() {
  const { chapters, totalLessons } = buildCourse();

  // Serialize chapter data (strip functions/non-serializable)
  const data = chapters.map((ch) => ({
    number: ch.number,
    title: ch.title,
    titleEn: ch.titleEn,
    lessons: ch.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      titleEn: l.titleEn,
      order: l.order,
      duration: l.duration,
      difficulty: l.difficulty,
      chapter: l.chapter,
    })),
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">مسیر یادگیری</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">سرفصل‌های دوره جامع شبکه</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-muted">
          {totalLessons} درس در ۱۴ بخش — از مبانی شبکه تا مفاهیم پیشرفته، قدم‌به‌قدم.
        </p>
      </div>

      {/* Accordion */}
      <CurriculumAccordion chapters={data} totalLessons={totalLessons} />
    </div>
  );
}