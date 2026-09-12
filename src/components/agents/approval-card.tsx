"use client";
// beui.dev/components/agents/approval-card — human-in-the-loop decision surface

import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { EASE_OUT, SPRING_LAYOUT, SPRING_PANEL, SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type ApprovalCardQuestion = {
  id: string;
  title: string;
  description?: string;
  options?: { value: string; label: string }[];
  multiple?: boolean;
  allowCustom?: boolean;
  customPlaceholder?: string;
};

export type ApprovalCardAnswers = Record<string, string | string[]>;

export type ApprovalCardStatus = "pending" | "submitting" | "answered";

export interface ApprovalCardProps {
  /** Single question or multi-step flow */
  questions: ApprovalCardQuestion[];
  /** Controlled completion state */
  status?: ApprovalCardStatus;
  /** Called when the user submits answers */
  onSubmit?: (answers: ApprovalCardAnswers) => void;
  /** Shown in success state */
  result?: ReactNode;
  /** Primary CTA label */
  submitLabel?: string;
  /** Secondary CTA label */
  cancelLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function ApprovalCard({
  questions,
  status = "pending",
  onSubmit,
  result,
  submitLabel = "تأیید",
  cancelLabel = "انصراف",
  children,
  className,
}: ApprovalCardProps) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ApprovalCardAnswers>({});
  const [internalStatus, setInternalStatus] = useState<ApprovalCardStatus>("pending");

  const currentStatus = status !== "pending" || internalStatus !== "pending" ? status === "pending" ? internalStatus : status : status;
  const q = questions[step];

  const answer = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => {
        const existing = prev[questionId];
        if (Array.isArray(existing)) {
          return { ...prev, [questionId]: existing.includes(value) ? existing.filter((v) => v !== value) : [...existing, value] };
        }
        return { ...prev, [questionId]: value };
      });
    },
    [],
  );

  const submit = () => {
    setInternalStatus("submitting");
    onSubmit?.(answers);
    // If status prop isn't driving the state, settle locally
    setTimeout(() => setInternalStatus("answered"), 700);
  };

  if (currentStatus === "answered") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : SPRING_PANEL}
        className={cn("rounded-2xl border border-primary-200 bg-primary-50 p-6 text-center", className)}
      >
        <motion.div
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
          className="mx-auto grid size-12 place-items-center rounded-full bg-primary-500 text-white"
        >
          <Check className="size-6" />
        </motion.div>
        <p className="mt-3 text-base font-bold text-text-primary">تکمیل شد</p>
        <p className="mt-1 text-sm text-text-muted">{result ?? "پاسخ‌ها ثبت شد."}</p>
        {children}
      </motion.div>
    );
  }

  if (currentStatus === "submitting") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("flex items-center justify-center gap-3 rounded-2xl border border-border p-8", className)}
      >
        <Loader2 className="size-5 animate-spin text-primary-600" />
        <span className="text-sm font-medium text-text-muted">در حال ثبت…</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : SPRING_PANEL}
      className={cn("overflow-hidden rounded-2xl border border-border bg-white shadow-sm", className)}
    >
      {/* Progress */}
      {questions.length > 1 ? (
        <div className="flex items-center gap-2 px-5 pt-5">
          {questions.map((qItem, i) => (
            <div
              key={qItem.id}
              className={cn("h-1 flex-1 rounded-full transition-colors", i <= step ? "bg-primary-500" : "bg-border")}
            />
          ))}
        </div>
      ) : null}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {questions.length > 1 ? (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                {step + 1} / {questions.length}
              </p>
            ) : (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">آماده‌ای؟</p>
            )}
            <h3 className="mt-1.5 text-lg font-bold text-text-primary">{q?.title}</h3>
            {q?.description ? <p className="mt-1 text-sm text-text-muted">{q.description}</p> : null}
          </div>
        </div>

        {q?.options && (
          <div className="mt-5 space-y-2">
            {q.options.map((opt) => {
              const selected = Array.isArray(answers[q.id]) ? answers[q.id].includes(opt.value) : answers[q.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => answer(q.id, opt.value)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium text-right transition-all",
                    selected
                      ? "border-primary-400 bg-primary-50 text-primary-700"
                      : "border-border bg-white text-text-secondary hover:border-primary-200 hover:bg-gray-50",
                  )}
                >
                  {opt.label}
                  <span className={cn("grid size-5 place-items-center rounded-full border", selected ? "border-primary-500 bg-primary-500 text-white" : "border-border")}>
                    {selected ? <Check className="size-3" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text-primary disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight className="size-4" />
            {cancelLabel}
          </button>

          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={SPRING_PRESS}
            onClick={() => {
              if (step < questions.length - 1) {
                setStep((s) => s + 1);
              } else {
                submit();
              }
            }}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            {step < questions.length - 1 ? "بعدی" : submitLabel}
            <ArrowLeft className="size-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}