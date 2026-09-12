"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, RotateCcw, Flame, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";
import { getWeakRecords, recordWeakResult, getWrongQuestionIds } from "@/lib/weak-points";
import { FINAL_EXAM_QUESTIONS, type ExamQuestion } from "@/lib/exam-questions";

const CHAPTER_TITLES: Record<number, string> = {
  1: "مبانی شبکه", 2: "مدل OSI", 3: "رسانه‌ها", 4: "لایه ۲",
  5: "آدرس‌دهی IP", 6: "ARP", 7: "مسیریابی", 8: "TCP/UDP",
  9: "DNS و NAT", 10: "بی‌سیم", 11: "امنیت", 12: "عیب‌یابی",
  13: "IPv6", 14: "شبکه مدرن",
};

function pickDrillQuestions(wrongIds: string[], count: number): ExamQuestion[] {
  const pool = FINAL_EXAM_QUESTIONS.filter((q) => wrongIds.includes(q.id));
  if (pool.length >= count) {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  const remaining = count - pool.length;
  const extras = FINAL_EXAM_QUESTIONS.filter((q) => !wrongIds.includes(q.id)).sort(() => Math.random() - 0.5).slice(0, remaining);
  return [...pool, ...extras].sort(() => Math.random() - 0.5);
}

export function DrillMode() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const wrongIds = useMemo(() => getWrongQuestionIds(getWeakRecords()), []);
  const current = questions[idx];
  const total = questions.length;
  const isCorrect = current ? selected === current.correctIndex : false;
  const hasWrong = wrongIds.length > 0;

  function start(count: number) {
    setQuestions(pickDrillQuestions(wrongIds, count));
    setStarted(true);
  }

  function handleAnswer() {
    if (!current || selected === null || answered) return;
    setAnswered(true);
    const correct = selected === current.correctIndex;
    if (correct) { setScore((s) => s + 1); setStreak((s) => s + 1); }
    else { setStreak(0); }
    recordWeakResult({ id: current.id, kind: "question", chapter: current.chapter, correct });
  }

  useEffect(() => {
    if (streak > bestStreak) setBestStreak(streak);
  }, [streak, bestStreak]);

  function handleNext() {
    if (idx + 1 < total) { setIdx((i) => i + 1); setSelected(null); setAnswered(false); }
    else setFinished(true);
  }

  function reset() {
    setIdx(0); setSelected(null); setAnswered(false); setScore(0); setStreak(0); setFinished(false); setStarted(true);
    setQuestions(pickDrillQuestions(wrongIds, Math.max(5, wrongIds.length)));
  }

  // ═══ Intro ═══
  if (!started) {
    return (
      <div className="card p-10 text-center">
        <Zap className="mx-auto size-14 text-amber-500" />
        <h2 className="mt-4 text-2xl font-black text-text-primary">دریل هوشمند</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-muted leading-7">
          {hasWrong
            ? `${toFaDigits(wrongIds.length)} سؤال غلط از آزمون‌های قبلی داری. مرورشان کن تا درست جواب بدهی.`
            : "هنوز سؤال غلطی نداری — اول آزمون نهایی را بده تا دریل شروع شود."}
        </p>

        {hasWrong && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[5, 10, Math.min(20, wrongIds.length)].map((n) => (
              <Button key={n} onClick={() => start(n)} size="lg" className="rounded-2xl px-8">
                <Flame className="size-4" />
                {toFaDigits(n)} سؤال
              </Button>
            ))}
          </div>
        )}

        {!hasWrong && (
          <Button variant="outline" className="mt-6 rounded-xl" onClick={() => start(5)}>
            به هر حال ۵ سؤال تصادفی امتحان کن
          </Button>
        )}
      </div>
    );
  }

  // ═══ Finished ═══
  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className={cn("mx-auto grid size-20 place-items-center rounded-full", pct >= 70 ? "bg-emerald-50 text-emerald-500" : "bg-amber-50 text-amber-500")}>
          <Flame className="size-10" />
        </motion.div>
        <h2 className="mt-5 text-2xl font-black text-text-primary">{pct >= 70 ? "آفرین! عالی بود 🎉" : "تمرین را ادامه بده!"}</h2>
        <p className="mt-2 text-sm text-text-muted">
          امتیاز: {toFaDigits(score)} از {toFaDigits(total)} ({toFaDigits(pct)}٪) — بهترین استریک: {toFaDigits(bestStreak)}
        </p>
        <div className="mx-auto mt-4 h-3 w-full max-w-sm overflow-hidden rounded-full bg-gray-100">
          <div className={cn("h-full rounded-full transition-all duration-700", pct >= 70 ? "bg-emerald-500" : "bg-amber-400")} style={{ width: `${pct}%` }} />
        </div>
        <Button onClick={reset} variant="outline" size="sm" className="mt-6">
          <RotateCcw className="size-3.5" /> دریل مجدد
        </Button>
      </motion.div>
    );
  }

  // ═══ Question ═══
  return (
    <div className="space-y-4">
      {/* Streak */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-white px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-bold text-primary-700">بخش {toFaDigits(current.chapter)}</span>
          <span className="text-xs text-text-muted">سؤال {toFaDigits(idx + 1)} از {toFaDigits(total)}</span>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <motion.span key={streak} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
              <Flame className="size-3" /> {toFaDigits(streak)}
            </motion.span>
          )}
          <span className="text-xs font-bold text-text-muted">{toFaDigits(score)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-primary-500 transition-all duration-500" style={{ width: `${((idx + 1) / total) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current.id + (answered ? "-a" : "")} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="card p-7">
          <p className="text-base font-bold text-text-primary leading-8">{current.question}</p>

          <div className="mt-5 space-y-2.5">
            {current.options.map((opt, i) => {
              const isSel = selected === i;
              const isRight = answered && i === current.correctIndex;
              const isWrong = answered && isSel && !isRight;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => !answered && setSelected(i)}
                  disabled={answered}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-right text-sm transition-all",
                    !answered && isSel && "border-primary-300 bg-primary-50 text-primary-700",
                    !answered && !isSel && "border-border bg-white hover:border-primary-200",
                    isRight && "border-emerald-300 bg-emerald-50 text-emerald-700",
                    isWrong && "border-red-300 bg-red-50 text-red-700",
                    answered && !isRight && !isWrong && "border-border bg-gray-50 text-text-muted opacity-60",
                  )}
                >
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold", !answered && isSel ? "border-primary-500 bg-primary-500 text-white" : "border-border bg-white text-text-muted", isRight && "border-emerald-500 bg-emerald-500 text-white", isWrong && "border-red-500 bg-red-500 text-white")}>
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
                {isCorrect ? "✅ درست!" : "❌ غلط — مرور کن: " + CHAPTER_TITLES[current.chapter]}
              </p>
              <p className="text-xs text-text-muted leading-6">{current.explanation}</p>
            </motion.div>
          )}

          <div className="mt-5 flex justify-end">
            {answered && (
              <Button onClick={handleNext} variant="primary" size="sm" className="min-w-32">
                {idx + 1 < total ? "سؤال بعدی" : "مشاهده نتیجه"}
              </Button>
            )}
            {!answered && (
              <Button onClick={handleAnswer} disabled={selected === null} variant="primary" size="sm">
                تأیید
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}