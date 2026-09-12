"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { ApprovalCard } from "@/components/agents/approval-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export function LessonQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const isCorrect = selected === q.correctIndex;

  function handleAnswer() {
    if (selected === null || answered) return;
    setAnswered(true);
    if (isCorrect) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="card p-8 text-center">
        <Trophy className="mx-auto size-12 text-amber-400" />
        <h3 className="mt-4 text-xl font-bold text-text-primary">آزمون تمام شد!</h3>
        <p className="mt-2 text-sm text-text-muted">
          نمره شما: {toFaDigits(score)} از {toFaDigits(questions.length)} ({toFaDigits(pct)}٪)
        </p>
        <div className="mx-auto mt-4 h-3 w-full max-w-xs overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-xs text-text-muted">
          {pct >= 80 ? "🎉 عالی بود!" : pct >= 50 ? "👏 خوب بود!" : "📚 دوباره تلاش کن!"}
        </p>
        <Button onClick={handleRestart} variant="ghost" size="sm" className="mt-6">
          <RotateCcw className="size-4" />
          شروع مجدد
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-primary">آزمون درس</h3>
        <span className="text-xs text-text-muted">
          {toFaDigits(current + 1)} / {toFaDigits(questions.length)}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="card p-6"
        >
          <p className="text-sm font-bold text-text-primary leading-7">{q.question}</p>

          {/* Options */}
          <div className="mt-4 space-y-2">
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
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-right text-sm transition-all",
                    !answered && isSelected && "border-primary-300 bg-primary-50 text-primary-700",
                    !answered && !isSelected && "border-border bg-white hover:border-primary-200 hover:bg-gray-50",
                    isRight && "border-green-300 bg-green-50 text-green-700",
                    isWrong && "border-red-300 bg-red-50 text-red-700",
                    answered && !isRight && !isWrong && "border-border bg-gray-50 text-text-muted opacity-60",
                  )}
                >
                  <span className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border-2 text-xs font-bold",
                    !answered && isSelected ? "border-primary-500 bg-primary-500 text-white" : "border-border bg-white",
                    isRight && "border-green-500 bg-green-500 text-white",
                    isWrong && "border-red-500 bg-red-500 text-white",
                  )}>
                    {answered && isRight && <CheckCircle2 className="size-4" />}
                    {answered && isWrong && <XCircle className="size-4" />}
                    {!answered && (
                      <span className="font-mono">{["ا", "ب", "ج", "د"][i]}</span>
                    )}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 rounded-xl border border-border bg-gray-50 px-4 py-3"
            >
              <p className="text-xs font-bold text-text-primary mb-1">
                {isCorrect ? "✅ پاسخ درست!" : "❌ پاسخ نادرست"}
              </p>
              <p className="text-xs text-text-muted leading-6">{q.explanation}</p>
            </motion.div>
          )}

          {/* Actions */}
          <div className="mt-4 flex justify-end">
            {!answered ? (
              <Button onClick={handleAnswer} disabled={selected === null} variant="primary" size="sm">
                تأیید پاسخ
              </Button>
            ) : (
              <Button onClick={handleNext} variant="primary" size="sm">
                {current + 1 < questions.length ? "سوال بعدی" : "مشاهده نتیجه"}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}