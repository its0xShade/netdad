"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";
import { FINAL_EXAM_QUESTIONS } from "@/lib/exam-questions";
import { recordWeakResult } from "@/lib/weak-points";
import { useToast } from "@/components/ui/toast";
import { fireConfetti } from "@/lib/confetti";

export function FinalExam() {
  const { toast } = useToast();
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const total = FINAL_EXAM_QUESTIONS.length;
  const q = FINAL_EXAM_QUESTIONS[current];
  const isCorrect = selected === q.correctIndex;

  function start() {
    setStarted(true);
  }

  function handleAnswer() {
    if (selected === null || answered) return;
    setAnswered(true);
    if (isCorrect) setScore((s) => s + 1);
    recordWeakResult({ id: q.id, kind: "question", chapter: q.chapter, correct: isCorrect });
  }

  function handleNext() {
    setAnswers((a) => [...a, selected]);
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      const pct = Math.round(((score + (isCorrect ? 1 : 0)) / total) * 100);
      if (pct >= 70) {
        fireConfetti();
        toast({
          title: "تبریک! آزمون را قبول شدی 🎉",
          description: `نمره ${score + (isCorrect ? 1 : 0)} از ${total} — گواهیات صادر شد.`,
          variant: "success",
        });
      }
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setStarted(true);
    setAnswers([]);
  }

  // ═══ Intro screen ═══
  if (!started) {
    return (
      <div className="card p-10 text-center">
        <Award className="mx-auto size-16 text-primary-500" />
        <h2 className="mt-5 text-2xl font-black text-text-primary">آزمون نهایی دوره</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          {toFaDigits(total)} سؤال از همه {toFaDigits(14)} بخش — برای دریافت گواهی، باید حداقل ۷۰٪ (۱۴ سؤال) را درست جواب بدهی.
        </p>

        <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-3">
          {[
            { label: "سؤال", value: toFaDigits(total) },
            { label: "زمان", value: "۳۰ دقیقه" },
            { label: "قبول", value: "۷۰٪" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-gray-50 px-4 py-4">
              <div className="text-lg font-black text-text-primary">{value}</div>
              <div className="mt-1 text-xs text-text-muted">{label}</div>
            </div>
          ))}
        </div>

        <Button onClick={start} size="lg" className="mt-8 rounded-2xl">
          شروع آزمون
        </Button>
      </div>
    );
  }

  // ═══ Result screen ═══
  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn("mx-auto grid size-20 place-items-center rounded-full", passed ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500")}
        >
          <Trophy className="size-10" />
        </motion.div>

        <h2 className="mt-5 text-2xl font-black text-text-primary">
          {passed ? "🎉 تبریک! قبول شدی" : "دوباره تلاش کن"}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          نمره: {toFaDigits(score)} از {toFaDigits(total)} ({toFaDigits(pct)}٪)
        </p>

        <div className="mx-auto mt-5 h-3 w-full max-w-sm overflow-hidden rounded-full bg-gray-100">
          <div className={cn("h-full rounded-full transition-all duration-700", passed ? "bg-emerald-500" : "bg-amber-400")} style={{ width: `${pct}%` }} />
        </div>

        {passed ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mx-auto mt-6 max-w-md rounded-2xl border-2 border-primary-300 bg-gradient-to-br from-primary-50 to-white p-6 text-center">
            <Award className="mx-auto size-10 text-primary-600" />
            <h3 className="mt-3 text-lg font-black text-text-primary">گواهی پایان دوره</h3>
            <p className="mt-1 text-xs text-text-muted">این گواهی به پروفایل شما اضافه شد و می‌توانید آن را به رزومه خود اضافه کنید.</p>
            <div className="mt-4 rounded-xl border border-dashed border-primary-300 bg-white p-4">
              <p className="font-mono text-[10px] text-text-light">CERT-NETDAD-{toFaDigits(2026)}-{toFaDigits(score * 7 + 13)}</p>
            </div>
          </motion.div>
        ) : (
          <p className="mt-4 text-xs text-text-muted">به ۷۰٪ نیاز داری — درس‌ها را مرور کن و دوباره تلاش کن.</p>
        )}

        <Button onClick={restart} variant="outline" size="sm" className="mt-8">
          <RotateCcw className="size-4" />
          آزمون مجدد
        </Button>
      </motion.div>
    );
  }

  // ═══ Question screen ═══
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-white px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-bold text-primary-700">بخش {toFaDigits(q.chapter)}</span>
          <span className="text-xs text-text-muted">سؤال {toFaDigits(current + 1)} از {toFaDigits(total)}</span>
        </div>
        <span className="text-xs font-bold text-text-muted">نمره: {toFaDigits(score)}</span>
      </div>

      {/* Progress */}
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-primary-500 transition-all duration-500" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="card p-7">
          <p className="text-base font-bold text-text-primary leading-8">{q.question}</p>

          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isRight = answered && i === q.correctIndex;
              const isWrong = answered && isSelected && !isCorrect;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => !answered && setSelected(i)}
                  disabled={answered}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-right text-sm transition-all",
                    !answered && isSelected && "border-primary-300 bg-primary-50 text-primary-700",
                    !answered && !isSelected && "border-border bg-white hover:border-primary-200 hover:bg-gray-50",
                    isRight && "border-emerald-300 bg-emerald-50 text-emerald-700",
                    isWrong && "border-red-300 bg-red-50 text-red-700",
                    answered && !isRight && !isWrong && "border-border bg-gray-50 text-text-muted opacity-60",
                  )}
                >
                  <span className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold",
                    !answered && isSelected ? "border-primary-500 bg-primary-500 text-white" : "border-border bg-white text-text-muted",
                    isRight && "border-emerald-500 bg-emerald-500 text-white",
                    isWrong && "border-red-500 bg-red-500 text-white",
                  )}>
                    {answered && isRight && <CheckCircle2 className="size-4" />}
                    {answered && isWrong && <XCircle className="size-4" />}
                    {!answered && <span>{["ا", "ب", "ج", "د"][i]}</span>}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {answered && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 rounded-xl border border-border bg-gray-50 px-4 py-3">
              <p className={cn("text-xs font-bold mb-1", isCorrect ? "text-emerald-600" : "text-red-600")}>
                {isCorrect ? "✅ پاسخ درست!" : "❌ پاسخ نادرست"}
              </p>
              <p className="text-xs text-text-muted leading-6">{q.explanation}</p>
            </motion.div>
          )}

          <div className="mt-5 flex items-center justify-between">
            {answered && current > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => { setSelected(answers[current - 1] ?? null); setAnswered(true); setCurrent((c) => c - 1); }}>
                قبلی
              </Button>
            ) : <span />}
            {!answered ? (
              <Button onClick={handleAnswer} disabled={selected === null} variant="primary" size="sm">تأیید پاسخ</Button>
            ) : (
              <Button onClick={handleNext} variant="primary" size="sm" className="min-w-32">
                {current + 1 < total ? "سؤال بعدی" : "مشاهده نتیجه"}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}