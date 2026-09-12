import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Network, Shield, Wifi, Router, Server, Lock, Cloud } from "lucide-react";
import { buildCourse } from "@/lib/content";
import { toFaDigits, DIFFICULTY_LABELS } from "@/lib/format";
import { TiltCard } from "@/components/motion/tilt-card";
import { ExpandingArrowButton } from "@/components/motion/expanding-arrow-button";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { NumberAnimation } from "@/components/motion/number-animation";
import { AnimatedBadge } from "@/components/motion/animated-badge";
import { Button } from "@/components/ui/button";

const CHAPTER_ICONS = [Network, Router, Wifi, Server, Shield, Cloud, Lock, Network, Router, Wifi, Shield, Server, Lock, Cloud];

const FAQ_ITEMS = [
  { id: "1", title: "این دوره برای چه کسانی مناسب است؟", description: "دوره از پایه‌ترین مفاهیم شروع می‌شود و برای مبتدیان مطلق، دانشجویان فنی و کسانی که می‌خواهند وارد حوزه شبکه شوند مناسب است. هیچ پیش‌نیازی نیاز ندارید." },
  { id: "2", title: "آیا بعد از پایان دوره مدرک می‌گیرم؟", description: "بله! بعد از تکمیل همه دروس و آزمون‌های هر بخش، گواهی پایان دوره دریافت می‌کنید که می‌توانید به رزومه خود اضافه کنید." },
  { id: "3", title: "مدت زمان دوره چقدر است؟", description: "دوره شامل ۱۴ بخش و ۵۳ درس تخصصی است. با توجه به ۶۰+ ساعت محتوا، با برنامه‌ریزی روزانه ۱ ساعت، حدود ۲ ماه طول می‌کشد." },
  { id: "4", title: "آیا تمرین عملی هم داریم؟", description: "بله! در هر بخش تمرین‌های عملی، مثال‌های واقعی و محاسبات دستی داریم — از محاسبه زیرشبکه تا تحلیل سناریوهای مسیریابی." },
  { id: "5", title: "آیا دوره به‌روزرسانی می‌شود؟", description: "بله. محتوای دوره دائماً با تکنولوژی‌های روز شبکه — IPv6، ابر، اتوماسیون و امنیت — به‌روزرسانی می‌شود." },
];

export default function HomePage() {
  const { chapters, totalLessons, totalMinutes } = buildCourse();

  return (
    <div className="space-y-24">
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-white">
        <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-primary-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-primary-50 blur-3xl" />
        <div className="relative grid gap-10 px-8 py-14 lg:grid-cols-2 lg:items-center lg:px-14">
          <div>
            <span className="badge badge-easy">🎓 آکادمی تخصصی شبکه</span>
            <h1 className="mt-5 text-4xl font-black leading-[1.15] tracking-tight text-text-primary lg:text-5xl">
              یادگیری شبکه رو
              <br />
              از پایه تا <span className="bg-gradient-to-l from-primary-600 to-primary-400 bg-clip-text text-transparent">حرفه‌ای</span> شروع کن
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-text-muted">
              از مفاهیم پایه‌ای مثل آدرس‌دهی IP و سوئیچینگ تا مسیریابی، امنیت و شبکه‌های مدرن — همه چیز را با پروژه و مثال عملی یاد بگیر.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ExpandingArrowButton className="min-w-64" href="/curriculum">
                            ادامه یادگیری
                          </ExpandingArrowButton>
              <Button variant="outline" size="lg" className="rounded-2xl">
                <Link href="/curriculum" className="contents">مشاهده سرفصل‌ها</Link>
              </Button>
            </div>
          </div>

          {/* Hero visual — network nodes */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-200 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-10 rounded-full border border-primary-100" />
              <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-xl shadow-primary-500/30">
                <Network className="size-12" />
              </div>
              <div className="absolute left-1/2 top-4 grid size-12 -translate-x-1/2 place-items-center rounded-2xl border border-border bg-white text-primary-600 shadow-md">
                <Cloud className="size-5" />
              </div>
              <div className="absolute bottom-8 right-2 grid size-12 place-items-center rounded-2xl border border-border bg-white text-primary-600 shadow-md">
                <Router className="size-5" />
              </div>
              <div className="absolute bottom-8 left-2 grid size-12 place-items-center rounded-2xl border border-border bg-white text-primary-600 shadow-md">
                <Shield className="size-5" />
              </div>
              <div className="absolute right-2 top-1/3 grid size-12 place-items-center rounded-2xl border border-border bg-white text-primary-600 shadow-md">
                <Wifi className="size-5" />
              </div>
              <div className="absolute left-2 top-1/3 grid size-12 place-items-center rounded-2xl border border-border bg-white text-primary-600 shadow-md">
                <Server className="size-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-2 gap-px border-t border-border bg-border-light md:grid-cols-4">
          {[
            { value: chapters.length, label: "بخش آموزشی" },
            { value: totalLessons, label: "درس تخصصی" },
            { value: Math.round(totalMinutes / 60), label: "ساعت محتوا" },
            { value: 100, label: "پروژه‌محور", suffix: "٪" },
          ].map(({ value, label, suffix }) => (
            <div key={label} className="bg-white px-8 py-6 text-center">
              <div className="text-2xl font-black text-text-primary">
                <NumberAnimation value={value} />
                {suffix ?? ""}
              </div>
              <div className="mt-1 text-xs text-text-muted">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Chapters grid ═══ */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary-600">سرفصل‌ها</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-text-primary">مسیر یادگیری</h2>
          </div>
          <Link href="/curriculum" className="hidden items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 sm:flex no-underline">
            همه سرفصل‌ها
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {chapters.map((ch, i) => {
            const Icon = CHAPTER_ICONS[i % CHAPTER_ICONS.length];
            return (
              <ScrollReveal key={ch.number} delay={i * 0.06} y={28} className="h-full">
                <TiltCard max={6} glare={false} className="rounded-2xl border border-border bg-white h-full">
                  <Link href={`/chapter/${ch.number}`} className="block p-6 no-underline">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-text-light ltr">0{ch.number}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-text-primary">{ch.title}</h3>
                    {ch.titleEn && <p className="mt-0.5 text-xs text-text-light ltr">{ch.titleEn}</p>}
                    <div className="mt-3 flex items-center justify-between">
                      <AnimatedBadge status={i < 5 ? "success" : i < 10 ? "info" : "warning"} size="sm">
                        {ch.lessons.length} درس
                      </AnimatedBadge>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ═══ Why us ═══ */}
      <section>
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-primary-600">چرا نت‌داد؟</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-text-primary">تجربه‌ای که ارزشش را دارد</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "یادگیری عمیق", desc: "مفاهیم را با تشبیه، مثال واقعی و تمرین دستی یاد می‌گیرید — نه حفظ کردن." },
            { icon: Clock, title: "پیشرفت هوشمند", desc: "سیستم پیشرفت شخصی، مکانی که ماندید را ذخیره می‌کند و به درس بعدی هدایتتان می‌کند." },
            { icon: Shield, title: "از پایه تا حرفه‌ای", desc: "بدون پیش‌نیاز شروع کنید و تا مفاهیم پیشرفته مسیریابی و امنیت پیش بروید." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.1} className="h-full">
              <div className="card card-hover h-full p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-text-muted">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-primary-600">سوالات پرتکرار</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-text-primary">پرسش‌های شما</h2>
        </div>
        <BouncyAccordion items={FAQ_ITEMS} defaultValue="1" />
      </section>
    </div>
  );
}