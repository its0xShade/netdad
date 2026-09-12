"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, CheckCircle2, XCircle, Brain, Shuffle } from "lucide-react";
import { FLASHCARD_DECK, gradeSRS, type SRSCard } from "@/lib/flashcards";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";

const STORAGE_KEY = "netdad-flashcards";

function loadProgress(): Record<string, SRSCard> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveProgress(p: Record<string, SRSCard>) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

export function FlashcardReviewer() {
  const [progress, setProgress] = useState<Record<string, SRSCard>>({});
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const [filter, setFilter] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => { setProgress(loadProgress()); }, []);

  const categories = useMemo(() => [...new Set(FLASHCARD_DECK.map((c) => c.category))], []);
  const dueCards = useMemo(() => {
    const now = Date.now();
    return FLASHCARD_DECK.filter((c) => {
      if (filter && c.category !== filter) return false;
      const s = progress[c.id];
      return !s || s.nextReview <= now;
    });
  }, [progress, filter]);

  const current = dueCards[idx];
  const progressPct = dueCards.length > 0 ? Math.round((idx / dueCards.length) * 100) : 0;

  function grade(quality: number) {
    if (!current) return;
    const s = progress[current.id] || { id: current.id, ease: 2.5, interval: 1, nextReview: 0, repetitions: 0 };
    const updated = gradeSRS({ ...s, id: current.id }, quality);
    const newProgress = { ...progress, [current.id]: updated };
    setProgress(newProgress);
    saveProgress(newProgress);
    setFlipped(false);
    if (idx < dueCards.length - 1) setIdx((i) => i + 1);
    else setStarted(false);
  }

  function start() { setStarted(true); setIdx(0); setFlipped(false); }

  if (!started || dueCards.length === 0) {
    return (
      <div className="space-y-6">
        {/* Category filter */}
        <div>
          <p className="mb-2 text-xs font-bold text-text-muted">Filter by category:</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setFilter(null)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition-colors", !filter ? "bg-primary-600 text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200")}>All</button>
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => setFilter(cat)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition-colors", filter === cat ? "bg-primary-600 text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200")}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="card p-10 text-center">
          <Brain className="mx-auto size-14 text-primary-500" />
          <h2 className="mt-4 text-2xl font-black text-text-primary">مرور فلش‌کارت</h2>
          <p className="mt-2 text-sm text-text-muted">
            {dueCards.length > 0
              ? `${toFaDigits(dueCards.length)} کارت برای مرور آماده است`
              : "همه را مرور کردی! کارتی نمانده 🎉"}
          </p>
          {dueCards.length > 0 && (
            <button onClick={start} className="mt-6 rounded-xl bg-primary-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700">
              شروع مرور ({toFaDigits(dueCards.length)} کارت)
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-primary-600">{toFaDigits(idx + 1)} / {toFaDigits(dueCards.length)}</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Card */}
      <div onClick={() => setFlipped(!flipped)} className="cursor-pointer">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + (flipped ? "-back" : "-front")}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="relative min-h-48 rounded-2xl border-2 border-border bg-white p-8 text-center shadow-sm"
          >
            <span className="absolute top-4 left-4 rounded-full bg-primary-50 px-2.5 py-0.5 text-[10px] font-bold text-primary-600">
              {current.category}
            </span>
            <span className="absolute top-4 right-4 text-[10px] text-text-light">برای دیدن جواب بزن</span>

            {!flipped ? (
              <>
                <h3 className="mt-8 text-2xl font-black text-text-primary">{current.front}</h3>
                <p className="mt-3 text-xs text-text-light">برای دیدن جواب کلیک کن</p>
              </>
            ) : (
              <>
                <h3 className="mt-6 text-lg font-bold text-text-primary">جواب</h3>
                <p className="mt-3 text-sm leading-7 text-text-muted">{current.back}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grade buttons */}
      {flipped && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-2">
          {[
            { q: 1, label: "بازهم", color: "bg-red-100 text-red-700 hover:bg-red-200" },
            { q: 3, label: "سخت", color: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
            { q: 4, label: "خوب", color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" },
            { q: 5, label: "آسان", color: "bg-sky-100 text-sky-700 hover:bg-sky-200" },
          ].map(({ q, label, color }) => (
            <button key={q} onClick={() => grade(q)} className={cn("rounded-xl px-6 py-3 text-sm font-bold transition-colors", color)}>
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}