"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, Keyboard } from "lucide-react";
import { LessonQuiz, type QuizQuestion } from "@/components/lesson-quiz";
import { HotkeyHelp, useHotkeys, HotkeyBadge } from "@/components/motion/hotkey";
import { Button } from "@/components/ui/button";

const SAMPLE_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "کدام پروتکل برای تبدیل نام دامنه به آدرس IP استفاده می‌شود؟",
    options: ["DHCP", "DNS", "ARP", "NAT"],
    correctIndex: 1,
    explanation: "DNS (Domain Name System) وظیفه تبدیل نام‌های دامنه مثل google.com به آدرس‌های IP را دارد.",
  },
  {
    id: "q2",
    question: "پروتکل TCP چه ویژگی اصلی نسبت به UDP دارد؟",
    options: ["سرعت بیشتر", "اتصال محور با تأیید دریافت", "بدون نیاز به اتصال", "استفاده از UDP در لایه ۳"],
    correctIndex: 1,
    explanation: "TCP یک پروتکل اتصال محور (connection-oriented) است که تأیید دریافت (ACK) و بازیابی خودکار دارد.",
  },
  {
    id: "q3",
    question: "آدرس MAC در کدام لایه مدل OSI استفاده می‌شود؟",
    options: ["لایه ۱ - فیزیکی", "لایه ۲ - پیوند داده", "لایه ۳ - شبکه", "لایه ۴ - انتقال"],
    correctIndex: 1,
    explanation: "MAC Address در لایه ۲ (Data Link) مدل OSI استفاده می‌شود و وظیفه شناسایی فیزیکی دستگاه‌ها را دارد.",
  },
];

export function LessonEnhancements({
  prevId, nextId, prevTitle, nextTitle,
}: {
  prevId: string | null;
  nextId: string | null;
  prevTitle: string;
  nextTitle: string;
}) {
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const hotkeyItems = useHotkeys([
    { key: "ArrowLeft", description: "درس قبلی", handler: () => { if (prevId) router.push(`/lesson/${prevId}`); } },
    { key: "ArrowRight", description: "درس بعدی", handler: () => { if (nextId) router.push(`/lesson/${nextId}`); } },
    { key: "/", description: "جستجو", handler: () => router.push("/search"), modifiers: { shift: true } },
    { key: "q", description: "آزمون درس", handler: () => setShowQuiz((v) => !v), modifiers: { ctrl: true } },
    { key: "?", description: "راهنمای کلیدها", handler: () => setShowHelp((v) => !v), modifiers: { shift: true } },
  ]);

  const helpItems = [
    { keys: ["←"], description: "درس قبلی" },
    { keys: ["→"], description: "درس بعدی" },
    { keys: ["Shift", "/"], description: "جستجو" },
    { keys: ["Ctrl", "Q"], description: "آزمون درس" },
    { keys: ["Shift", "?"], description: "راهنمای کلیدها" },
  ];

  return (
    <>
      {/* Floating keyboard hint */}
      <button
        type="button"
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-border bg-white/90 px-3 py-2 text-xs text-text-muted shadow-lg backdrop-blur-sm transition-colors hover:border-primary-200 hover:text-primary-700"
        title="کلیدهای میانبر"
      >
        <Keyboard className="size-4" />
        <span className="hidden sm:inline">کلیدهای میانبر</span>
        <HotkeyBadge keys={["?"]} />
      </button>

      {/* Keyboard help modal */}
      <HotkeyHelp items={helpItems} visible={showHelp} onClose={() => setShowHelp(false)} />

      {/* Quiz section */}
      <div className="mt-10">
        {!showQuiz ? (
          <button
            type="button"
            onClick={() => setShowQuiz(true)}
            className="w-full rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 p-6 text-center transition-colors hover:border-primary-300 hover:bg-primary-50"
          >
            <HelpCircle className="mx-auto size-8 text-primary-500" />
            <p className="mt-2 text-sm font-bold text-text-primary">آزمون درس</p>
            <p className="mt-1 text-xs text-text-muted">دانش خودت رو بسنج — {3} سؤال چندگزینه‌ای</p>
          </button>
        ) : (
          <LessonQuiz questions={SAMPLE_QUIZ} />
        )}
      </div>
    </>
  );
}