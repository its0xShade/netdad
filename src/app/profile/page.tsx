import Link from "next/link";
import { BookOpen, Clock, GraduationCap, CheckCircle2 } from "lucide-react";
import { buildCourse } from "@/lib/content";
import { toFaDigits } from "@/lib/format";
import { ProfileClient } from "@/components/profile-client";

export const metadata = { title: "پیشرفت من" };

export default function ProfilePage() {
  const { chapters, totalLessons, totalMinutes } = buildCourse();
  const allLessons = chapters.flatMap((c) => c.lessons);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">داشبورد</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">پیشرفت من</h1>
        <p className="mt-2 text-sm text-text-muted">وضعیت یادگیری، بوکمارک‌ها و ادامه مسیر</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "درس تکمیل‌شده", icon: CheckCircle2 },
          { label: "دقیقه مطالعه", icon: Clock },
          { label: "درس کل دوره", icon: BookOpen, value: toFaDigits(totalLessons) },
          { label: "بخش دوره", icon: GraduationCap, value: toFaDigits(chapters.length) },
        ].map(({ label, icon: Icon, value }) => (
          <div key={label} className="card card-hover p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-50 text-primary-600">
                <Icon className="size-5" />
              </span>
              <div>
                <div className="text-xl font-black text-text-primary">{value ?? "۰"}</div>
                <div className="mt-0.5 text-xs text-text-muted">{label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gamification */}
      <ProfileClient allLessons={allLessons} />

      {/* CTA */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-primary-50 p-8 sm:flex-row">
        <div>
          <h2 className="text-lg font-bold text-text-primary">ادامه یادگیری</h2>
          <p className="mt-1 text-sm text-text-muted">از بخش اول شروع کن — مسیر ۱۴ بخشی منتظرته.</p>
        </div>
        <Link href="/curriculum" className="btn-primary no-underline">مشاهده سرفصل‌ها</Link>
      </div>
    </div>
  );
}