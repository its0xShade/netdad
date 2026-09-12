import { buildCourse } from "@/lib/content";
import { SearchClient } from "@/components/search-client";

export const metadata = { title: "جستجو" };

export default function SearchPage() {
  const { chapters, lessons } = buildCourse();

  const chapterOptions = chapters.map((c) => ({ value: String(c.number), label: c.title }));

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">جستجو</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">پیدا کردن درس</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          با فیلتر بخش یا جستجوی مستقیم، درس مورد نظرت رو پیدا کن.
        </p>
      </div>
      <SearchClient lessons={lessons} chapterOptions={chapterOptions} />
    </div>
  );
}