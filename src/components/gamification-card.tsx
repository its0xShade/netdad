"use client";

import { motion } from "motion/react";
import { Flame, Zap, Award, Trophy } from "lucide-react";
import { useGamification, BADGE_INFO } from "@/lib/gamification";
import { toFaDigits } from "@/lib/format";

export function GamificationCard() {
  const { state, level, nextLevel, levelProgress } = useGamification();

  return (
    <div className="card overflow-hidden p-6">
      {/* Header: level + streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.span
            key={level.title}
            initial={{ scale: 0.6, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-3xl shadow-md"
          >
            {level.icon}
          </motion.span>
          <div>
            <p className="text-xs text-text-muted">سطح</p>
            <p className="text-lg font-black text-text-primary">{level.title}</p>
            <p className="text-[10px] text-text-light">
              {toFaDigits(state.xp)} XP
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="flex items-center justify-center gap-1 text-amber-500">
            <Flame className="size-4 fill-amber-400" />
            <span className="text-2xl font-black text-text-primary">{toFaDigits(state.streak)}</span>
          </p>
          <p className="text-[10px] text-text-muted">روز پیاپی</p>
        </div>
      </div>

      {/* Progress to next level */}
      {nextLevel ? (
        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-text-muted">تا سطح «{nextLevel.title}»</span>
            <span className="font-mono text-text-light">{toFaDigits(Math.round(levelProgress))}٪</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-center text-xs font-bold text-amber-700">
          <Trophy className="inline size-3.5 me-1" />
          به بالاترین سطح رسیدی! 🎉
        </p>
      )}

      {/* Badges */}
      {state.badges.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 flex items-center gap-1 text-[11px] font-bold text-text-muted">
            <Award className="size-3.5 text-primary-500" />
            نشان‌ها
          </p>
          <div className="flex flex-wrap gap-1.5">
            {state.badges.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-[10px] font-bold text-primary-700"
                title={BADGE_INFO[b]?.label}
              >
                <span>{BADGE_INFO[b]?.emoji}</span>
                {BADGE_INFO[b]?.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* XP today hint */}
      <p className="mt-4 flex items-center gap-1 text-[11px] text-text-light">
        <Zap className="size-3 text-amber-500" />
        با تکمیل درس +۱۵ XP و هر پاسخ درست کوییز +۵ XP بگیر
      </p>
    </div>
  );
}