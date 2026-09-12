import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { buildCourse } from "@/lib/content";
import { toFaDigits } from "@/lib/format";

export function SiteFooter() {
  const { chapters, totalLessons, totalMinutes } = buildCourse();

  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="size-4" />
            </span>
            <span className="text-lg font-extrabold text-text-primary">نت‌داد</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            آکادمی تخصصی شبکه — یادگیری از پایه تا حرفه‌ای با پروژه‌های عملی.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold text-text-primary">دسترسی سریع</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li><Link href="/curriculum" className="transition-colors hover:text-primary-600 no-underline">سرفصل‌ها</Link></li>
            <li><Link href="/tools" className="transition-colors hover:text-primary-600 no-underline">ابزارهای شبکه</Link></li>
            <li><Link href="/search" className="transition-colors hover:text-primary-600 no-underline">جستجو</Link></li>
            <li><Link href="/glossary" className="transition-colors hover:text-primary-600 no-underline">واژه‌نامه</Link></li>
            <li><Link href="/profile" className="transition-colors hover:text-primary-600 no-underline">پیشرفت من</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold text-text-primary">دوره جامع شبکه</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li>{toFaDigits(chapters.length)} بخش آموزشی</li>
            <li>{toFaDigits(totalLessons)} درس تخصصی</li>
            <li>{toFaDigits(totalMinutes)} دقیقه محتوای آموزشی</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold text-text-primary">ارتباط با ما</p>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li>پشتیبانی: support@netdad.ir</li>
            <li>تلگرام: @netdad_academy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border-light bg-gray-50/60">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 sm:flex-row">
          <p className="text-xs text-text-light">© ۱۴۰۴ آکادمی نت‌داد — تمامی حقوق محفوظ است.</p>
          <p className="text-xs text-text-light">ساخته‌شده با ❤️ برای یادگیری شبکه</p>
        </div>
      </div>
    </footer>
  );
}