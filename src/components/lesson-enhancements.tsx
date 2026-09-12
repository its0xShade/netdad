"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HelpCircle, Keyboard } from "lucide-react";
import { LessonQuiz, type QuizQuestion } from "@/components/lesson-quiz";
import { HotkeyHelp, useHotkeys, HotkeyBadge } from "@/components/motion/hotkey";
import { Button } from "@/components/ui/button";
import { toFaDigits } from "@/lib/format";

// سؤال مخصوص هر فصل — به‌جای سؤال ثابت، سؤال مرتبط با درس فعلی
const CHAPTER_QUIZ: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: "c1q1",
      question: "در مدل OSI، روتر در کدام لایه کار می‌کند؟",
      options: ["لایه ۱ - فیزیکی", "لایه ۲ - پیوند داده", "لایه ۳ - شبکه", "لایه ۴ - انتقال"],
      correctIndex: 2,
      explanation: "روتر بر اساس آدرس IP تصمیم‌گیری می‌کند و IP در لایه ۳ (شبکه) قرار دارد.",
    },
    {
      id: "c1q2",
      question: "وظیفه اصلی مدل OSI چیست؟",
      options: [
        "اجرای برنامه‌های کاربردی",
        "تقسیم ارتباط شبکه به لایه‌های استاندارد",
        "افزایش سرعت اینترنت",
        "رمزنگاری داده‌ها",
      ],
      correctIndex: 1,
      explanation: "مدل OSI ارتباط شبکه را به ۷ لایه مجزا تقسیم می‌کند تا استانداردسازی و عیب‌یابی ساده شود.",
    },
  ],
  2: [
    {
      id: "c2q1",
      question: "آدرس IPv4 چند بیت است؟",
      options: ["۸ بیت", "۱۶ بیت", "۳۲ بیت", "۶۴ بیت"],
      correctIndex: 2,
      explanation: "IPv4 از ۳۲ بیت (۴ اکتت) تشکیل شده که به صورت چهار عدد ۰ تا ۲۵۵ نمایش داده می‌شود.",
    },
    {
      id: "c2q2",
      question: "کدام کلاس آدرس برای شبکه‌های بزرگ (سازمانی) استفاده می‌شود؟",
      options: ["کلاس A", "کلاس B", "کلاس C", "کلاس D"],
      correctIndex: 0,
      explanation: "کلاس A برای تعداد کم شبکه ولی تعداد زیادی هاست (تا ۱۶ میلیون) طراحی شده.",
    },
  ],
  3: [
    {
      id: "c3q1",
      question: "پروتکل TCP چه تضمینی ارائه می‌دهد که UDP نمی‌دهد؟",
      options: ["سرعت بیشتر", "تحویل مطمئن و ترتیب‌دار داده", "استفاده از IP کمتر", "رمزنگاری"],
      correctIndex: 1,
      explanation: "TCP با شماره توالی و ACK، تحویل مطمئن و ترتیب‌دار بسته‌ها را تضمین می‌کند.",
    },
    {
      id: "c3q2",
      question: "کدام پروتکل برای پخش زنده ویدیو مناسب‌تر است؟",
      options: ["TCP", "UDP", "HTTP", "FTP"],
      correctIndex: 1,
      explanation: "UDP تأخیر کم و بدون سربار اتصال دارد؛ برای استریم که سرعت مهم‌تر از کامل بودن است، بهتر است.",
    },
  ],
  4: [
    {
      id: "c4q1",
      question: "پورت پیش‌فرض HTTP چیست؟",
      options: ["21", "25", "80", "443"],
      correctIndex: 2,
      explanation: "HTTP روی پورت ۸۰ و نسخه امن HTTPS روی پورت ۴۴۳ کار می‌کند.",
    },
    {
      id: "c4q2",
      question: "کدام پروتکل برای ارسال ایمیل استفاده می‌شود؟",
      options: ["HTTP", "SMTP", "SSH", "DNS"],
      correctIndex: 1,
      explanation: "SMTP (Simple Mail Transfer Protocol) وظیفه ارسال ایمیل بین سرورها را دارد.",
    },
  ],
  5: [
    {
      id: "c5q1",
      question: "نقش NAT چیست؟",
      options: ["رمزنگاری بسته‌ها", "ترجمه آدرس‌های خصوصی به عمومی", "افزایش پهنای باند", "تشخیص ویروس"],
      correctIndex: 1,
      explanation: "NAT آدرس‌های IP خصوصی را به یک آدرس عمومی ترجمه می‌کند تا چند دستگاه با یک IP به اینترنت بروند.",
    },
    {
      id: "c5q2",
      question: "کدام آدرس یک آدرس خصوصی (Private) است؟",
      options: ["8.8.8.8", "172.16.5.4", "1.1.1.1", "93.120.1.2"],
      correctIndex: 1,
      explanation: "محدوده 172.16.0.0 تا 172.31.255.255 آدرس خصوصی است و در NAT برای شبکه داخلی استفاده می‌شود.",
    },
  ],
  6: [
    {
      id: "c6q1",
      question: "شبکه 192.168.1.0/24 چند هاست قابل استفاده دارد؟",
      options: ["۲۵۴", "۲۵۵", "۲۵۶", "۱۲۸"],
      correctIndex: 0,
      explanation: "/24 یعنی ۲۵۶ آدرس؛ دو تا (خود شبکه و broadcast) کم می‌شود → ۲۵۴ هاست.",
    },
    {
      id: "c6q2",
      question: "ماسک 255.255.255.0 معادل کدام پیشوند است؟",
      options: ["/16", "/24", "/26", "/30"],
      correctIndex: 1,
      explanation: "۲۵۵.۲۵۵.۲۵۵.۰ یعنی ۲۴ بیت یک → /24.",
    },
  ],
  7: [
    {
      id: "c7q1",
      question: "دستور ping از کدام پروتکل استفاده می‌کند؟",
      options: ["TCP", "UDP", "ICMP", "ARP"],
      correctIndex: 2,
      explanation: "ping با ارسال بسته ICMP Echo Request و دریافت Echo Reply سلامت اتصال را می‌سنجد.",
    },
    {
      id: "c7q2",
      question: "دستور tracert برای چه کاری است؟",
      options: ["نمایش IP دستگاه", "ردیابی مسیر تا مقصد", "بستن پورت‌ها", "خالی کردن کش DNS"],
      correctIndex: 1,
      explanation: "tracert (و traceroute) مسیری که بسته‌ها از مبدأ تا مقصد طی می‌کنند را نشان می‌دهد.",
    },
  ],
  8: [
    {
      id: "c8q1",
      question: "آنچه VLAN انجام می‌دهد چیست؟",
      options: ["افزایش سرعت اینترنت", "تقسیم یک سوییچ به چند شبکه مجزا", "حذف نیاز به روتر", "رمزنگاری ترافیک"],
      correctIndex: 1,
      explanation: "VLAN با تقسیم منطقی سوییچ، چند شبکه مستقل روی یک دستگاه فیزیکی ایجاد می‌کند.",
    },
    {
      id: "c8q2",
      question: "ترافیک بین دو VLAN مختلف از کجا عبور می‌کند؟",
      options: ["سوییچ فقط", "روتر (یا سوییچ لایه ۳)", "کابل فیبر", "هیچ‌جا — غیرممکن است"],
      correctIndex: 1,
      explanation: "VLANها همدیگر را نمی‌بینند؛ برای ارتباط بین آن‌ها روتر یا سوییچ لایه ۳ لازم است.",
    },
  ],
  9: [
    {
      id: "c9q1",
      question: "کدام پروتکل مسیریابی به‌صورت خودکار از الگوریتم Dijkstra استفاده می‌کند؟",
      options: ["RIP", "OSPF", "BGP", "EIGRP (قدیمی)"],
      correctIndex: 1,
      explanation: "OSPF با الگوریتم Dijkstra (کوتاه‌ترین مسیر اول) بهترین مسیر را محاسبه می‌کند.",
    },
    {
      id: "c9q2",
      question: "BGP برای چه نوع اتصالی استفاده می‌شود؟",
      options: ["اتصال بین شبکه‌های کوچک خانگی", "مسیریابی بین سیستم‌های مستقل (AS)", "اتصال کامپیوتر به سوییچ", "پخش ویدیو"],
      correctIndex: 1,
      explanation: "BGP پروتکل مسیریابی اینترنت است که بین سیستم‌های مستقل (AS) تبادل مسیر می‌کند.",
    },
  ],
  10: [
    {
      id: "c10q1",
      question: "Wi-Fi 6 به کدام استاندارد اشاره دارد؟",
      options: ["802.11b", "802.11g", "802.11ax", "802.11n"],
      correctIndex: 2,
      explanation: "Wi-Fi 6 بر پایه استاندارد 802.11ax ساخته شده و سرعت و کارایی بالاتری در محیط شلوغ دارد.",
    },
    {
      id: "c10q2",
      question: "فرکانس‌های اصلی شبکه بی‌سیم کدامند؟",
      options: ["۲.۴ و ۵ گیگاهرتز", "۱ و ۲ گیگاهرتز", "۱۰ و ۲۰ گیگاهرتز", "۶۰ و ۹۰ گیگاهرتز فقط"],
      correctIndex: 0,
      explanation: "شبکه‌های Wi-Fi عمدتاً در باند ۲.۴ گیگاهرتز (پوشش بیشتر) و ۵ گیگاهرتز (سرعت بیشتر) کار می‌کنند.",
    },
  ],
  11: [
    {
      id: "c11q1",
      question: "پروتکل SSH به‌جای چه پروتکل ناامنی استفاده می‌شود؟",
      options: ["HTTP", "Telnet", "SMTP", "SNMP"],
      correctIndex: 1,
      explanation: "Telnet متن و رمزها را بدون رمزنگاری می‌فرستد؛ SSH با رمزنگاری جایگزین امن آن است.",
    },
    {
      id: "c11q2",
      question: "کدام ابزار برای پیدا کردن پورت‌های باز استفاده می‌شود؟",
      options: ["ping", "nmap", "cd", "ipconfig"],
      correctIndex: 1,
      explanation: "nmap (Network Mapper) پورت‌های باز، سرویس‌ها و سیستم‌عامل میزبان را شناسایی می‌کند.",
    },
  ],
  12: [
    {
      id: "c12q1",
      question: "در شبکه‌سازی، «پینگ بالا» (High Ping) یعنی چه؟",
      options: ["اینترنت خیلی سریع", "تأخیر زیاد در رسیدن بسته‌ها", "قطع کامل اتصال", "بیشتر شدن پهنای باند"],
      correctIndex: 1,
      explanation: "پینگ بالا یعنی تأخیر (Latency) زیاد؛ بسته‌ها دیر می‌رسند و بازی/تماس کیفیتش افت می‌کند.",
    },
    {
      id: "c12q2",
      question: "کدام ابزار لینوکسی نمایش زنده ترافیک شبکه است؟",
      options: ["ifconfig", "iptables", "netstat", "tcpdump"],
      correctIndex: 3,
      explanation: "tcpdump بسته‌های رد و بدل شده روی رابط شبکه را به‌صورت زنده نمایش و تحلیل می‌کند.",
    },
  ],
  13: [
    {
      id: "c13q1",
      question: "اصطلاح «کلود» (Cloud) در عملیات شبکه یعنی چه؟",
      options: [
        "یک کامپیوتر خاص",
        "زیرساخت و سرویس‌هایی که از راه دور و از طریق اینترنت ارائه می‌شوند",
        "نرم‌افزار آنتی‌ویروس",
        "نوعی کابل شبکه",
      ],
      correctIndex: 1,
      explanation: "کلود یعنی منابع و سرویس‌هایی (محاسبه، ذخیره‌سازی، شبکه) که به‌جای سخت‌افزار محلی، از راه دور مصرف می‌شوند.",
    },
    {
      id: "c13q2",
      question: "کدام سرویس ابری به‌صورت «نرم‌افزار آماده از طریق مرورگر» ارائه می‌شود؟",
      options: ["IaaS", "PaaS", "SaaS", "DaaS"],
      correctIndex: 2,
      explanation: "در SaaS (Software as a Service) مثل Gmail یا Google Docs، برنامه آماده از طریق مرورگر استفاده می‌شود.",
    },
  ],
  14: [
    {
      id: "c14q1",
      question: "کدام یک نشانه معتبر نتیجه ping است؟",
      options: ["Reply from ... bytes=32", "Request timed out", "Destination host unreachable", "TTL expired"],
      correctIndex: 0,
      explanation: "پاسخ «Reply from» یعنی میزبان مقصد زنده و در دسترس است.",
    },
    {
      id: "c14q2",
      question: "اولین قدم در عیب‌یابی «اینترنت وصل نیست» چیست؟",
      options: [
        "تعویض سوییچ",
        "بررسی اتصال فیزیکی و ping به دروازه (Gateway)",
        "نصب دوباره ویندوز",
        "خاموش کردن فایروال همیشه",
      ],
      correctIndex: 1,
      explanation: "از لایه اول شروع می‌کنیم: اتصال کابل/وای‌فای، بعد ping به Gateway — لایه به لایه جلو می‌رویم.",
    },
  ],
};

export function quizForLesson(chapter: number): QuizQuestion[] {
  return CHAPTER_QUIZ[chapter] ?? CHAPTER_QUIZ[1];
}

export function LessonEnhancements({
  prevId, nextId, prevTitle, nextTitle, chapter,
}: {
  prevId: string | null;
  nextId: string | null;
  prevTitle: string;
  nextTitle: string;
  chapter?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // سؤال‌های مرتبط با فصل این درس
  const chapterNum = chapter ?? (Number(pathname?.split("/")[2]?.split("-")[0]) || 1);
  const questions = quizForLesson(chapterNum);

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
        className="fixed bottom-6 left-6 z-50 hidden items-center gap-2 rounded-full border border-border bg-white/90 px-3 py-2 text-xs text-text-muted shadow-lg backdrop-blur-sm transition-colors hover:border-primary-200 hover:text-primary-700 sm:flex"
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
            <p className="mt-1 text-xs text-text-muted">دانش خودت رو بسنج — {toFaDigits(questions.length)} سؤال چندگزینه‌ای</p>
          </button>
        ) : (
          <LessonQuiz questions={questions} />
        )}
      </div>
    </>
  );
}