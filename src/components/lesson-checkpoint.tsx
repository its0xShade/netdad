"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, CheckCircle2, XCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";
import { useGamification } from "@/lib/gamification";

export type CheckpointData = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export function LessonCheckpoint({ data }: { data: CheckpointData }) {
  const { finishQuiz } = useGamification();
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const isCorrect = selected === data.correctIndex;

  function check() {
    if (selected === null || answered) return;
    setAnswered(true);
    finishQuiz(isCorrect ? 1 : 0, 1);
  }

  return (
    <div className="not-prose my-8 rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/40 p-5">
      <div className="flex items-center gap-2 text-xs font-bold text-primary-700">
        <HelpCircle className="size-4" />
        <span>توقف و تمرین — یک سؤال سریع</span>
        {answered && isCorrect && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ms-auto flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
            <Zap className="size-3" /> +۵ XP
          </motion.span>
        )}
      </div>

      <p className="mt-3 text-sm font-bold leading-7 text-text-primary">{data.question}</p>

      <div className="mt-4 space-y-2">
        {data.options.map((opt, i) => {
          const right = answered && i === data.correctIndex;
          const wrong = answered && selected === i && !isCorrect;
          return (
            <button
              key={i}
              type="button"
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-right text-sm transition-all",
                !answered && selected === i && "border-primary-400 bg-white",
                !answered && selected !== i && "border-border bg-white hover:border-primary-200",
                right && "border-emerald-400 bg-emerald-50 text-emerald-800",
                wrong && "border-red-400 bg-red-50 text-red-700",
                answered && !right && !wrong && "border-border bg-white opacity-50"
              )}
            >
              <span className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full border-2 text-[11px] font-bold",
                right ? "border-emerald-500 bg-emerald-500 text-white" : wrong ? "border-red-500 bg-red-500 text-white" : "border-border text-text-muted"
              )}>
                {right ? <CheckCircle2 className="size-3.5" /> : wrong ? <XCircle className="size-3.5" /> : ["ا", "ب", "ج", "د"][i]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
            <p className="mt-3 rounded-xl bg-white px-4 py-3 text-xs leading-6 text-text-muted">{data.explanation}</p>
            <p className="mt-2 text-[11px] text-text-light">
              {isCorrect ? "✅ درست بود!" : "❌ اشکالی نداره — همین اشتباه یادت میمونه."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!answered && (
        <button
          onClick={check}
          disabled={selected === null}
          className="mt-4 rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          بررسی پاسخ
        </button>
      )}
      {answered && <span className="mt-4 block text-[11px] text-text-light">سؤال {toFaDigits(1)} از {toFaDigits(1)}</span>}
    </div>
  );
}