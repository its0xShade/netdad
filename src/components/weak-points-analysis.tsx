"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { AlertTriangle, TrendingUp, Trash2, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWeakRecords, getChapterStats, getWeakChapters, getWrongQuestionIds, clearWeakRecords, type ChapterStat } from "@/lib/weak-points";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

// Chapter titles for display
const CHAPTER_TITLES: Record<number, string> = {
  1: "مفاهیم پایه شبکه", 2: "مدل OSI", 3: "رسانه‌های انتقال", 4: "لایه پیوند داده",
  5: "آدرس‌دهی IP", 6: "پروتکل ARP", 7: "مسیریابی و Gateway", 8: "لایه انتقال (TCP/UDP)",
  9: "DNS و NAT", 10: "شبکه‌های بی‌سیم", 11: "امنیت شبکه", 12: "عیب‌یابی",
  13: "IPv6", 14: "شبکه‌های مدرن",
};

export function WeakPointsAnalysis() {
  const [records, setRecords] = useState(getWeakRecords());
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  useEffect(() => { setRecords(getWeakRecords()); }, []);

  const stats = useMemo(() => getChapterStats(records), [records]);
  const weakChapters = useMemo(() => getWeakChapters(records), [records]);
  const wrongIds = useMemo(() => getWrongQuestionIds(records), [records]);
  const total = records.length;
  const correct = records.filter((r) => r.correct).length;
  const overall = total ? Math.round((correct / total) * 100) : 0;

  function handleClear() {
    clearWeakRecords();
    setRecords([]);
  }

  return (
    <div className="space-y-6">
      {/* Empty state */}
      {total === 0 && (
        <div className="card p-10 text-center">
          <Target className="mx-auto size-12 text-primary-400" />
          <h3 className="mt-4 text-lg font-black text-text-primary">هنوز دادهای نیست</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-text-muted">
            وقتی آزمون نهایی یا دریل هوشمند رو انجام بدی، اینجا نشون میده کدوم فصلها رو اشتباه جواب دادی — و پیشنهاد درس میده.
          </p>
        </div>
      )}

      {total > 0 && (
        <>
          {/* Overview cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-white p-4 text-center">
              <div className="text-2xl font-black text-text-primary">{toFaDigits(total)}</div>
              <div className="mt-1 text-[11px] text-text-muted">کل پاسخ‌ها</div>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 text-center">
              <div className="text-2xl font-black text-emerald-600">{toFaDigits(overall)}٪</div>
              <div className="mt-1 text-[11px] text-text-muted">دقت کلی</div>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 text-center">
              <div className="text-2xl font-black text-amber-500">{toFaDigits(weakChapters.length)}</div>
              <div className="mt-1 text-[11px] text-text-muted">فصل‌های ضعیف</div>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 text-center">
              <div className="text-2xl font-black text-red-500">{toFaDigits(wrongIds.length)}</div>
              <div className="mt-1 text-[11px] text-text-muted">سؤال‌های غلط</div>
            </div>
          </div>

          {/* Weak chapters */}
          {weakChapters.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-500" />
                <h3 className="text-sm font-black text-amber-800">فصل‌هایی که باید مرور کنی</h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {weakChapters.map((ch) => (
                  <button key={ch} onClick={() => setSelectedChapter(selectedChapter === ch ? null : ch)} className={cn("rounded-xl border px-3 py-2 text-xs font-semibold transition-colors", selectedChapter === ch ? "border-primary-400 bg-white text-primary-700" : "border-amber-200 bg-white text-text-primary hover:border-amber-400")}>
                    فصل {toFaDigits(ch)} — {CHAPTER_TITLES[ch]}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-amber-700/70">
                پیشنهاد: این فصل‌ها رو از سرفصل‌ها باز کن، درس‌هاش رو مرور کن، بعد دوباره آزمون بده.
              </p>
            </div>
          )}

          {/* Chapter accuracy bars */}
          <div>
            <h3 className="mb-3 text-sm font-black text-text-primary">دقت به تفکیک فصل</h3>
            <div className="space-y-2.5">
              {stats.map((s: ChapterStat) => (
                <div key={s.chapter} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-[11px] font-semibold text-text-muted">{toFaDigits(s.chapter)}. {CHAPTER_TITLES[s.chapter]?.split(" ")[0]}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={cn("h-full rounded-full", s.pct >= 75 ? "bg-emerald-400" : s.pct >= 50 ? "bg-amber-400" : "bg-red-400")}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right text-[11px] font-bold text-text-muted">
                    {toFaDigits(s.pct)}٪ <span className="text-[9px] font-normal text-text-light">({toFaDigits(s.correct)}/{toFaDigits(s.total)})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          {overall < 70 && (
            <div className="flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50/60 p-5">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-sky-500" />
              <div>
                <p className="text-sm font-bold text-sky-800">نکته مطالعه</p>
                <p className="mt-1 text-xs leading-6 text-sky-700/80">
                  دقت کلیات زیر ۷۰٪ است. به‌جای آزمون مجدد، اول درس‌های فصل‌های ضعیف را مرور کن — دریل هوشمند دقیقاً همین سؤال‌ها را دوباره بهت نشان می‌دهد.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleClear} className="text-red-500">
              <Trash2 className="size-3.5" />
              پاک‌کردن آمار
            </Button>
          </div>
        </>
      )}
    </div>
  );
}