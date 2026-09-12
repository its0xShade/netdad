"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { useGamification, levelForXp } from "@/lib/gamification";

const TOTAL = 53;

export function DockProgressRing() {
  const { completed } = useProgress();
  const { state, loaded } = useGamification();
  const pct = Math.min(100, Math.round((completed.length / TOTAL) * 100));
  const R = 15;
  const C = 2 * Math.PI * R;
  const { current } = levelForXp(loaded ? state.xp : 0);

  return (
    <Link href="/profile" aria-label="پیشرفت" className="relative grid h-10 w-10 place-items-center rounded-xl text-text-secondary transition-colors hover:bg-black/5">
      <svg viewBox="0 0 40 40" className="size-9 -rotate-90">
        <circle cx="20" cy="20" r={R} fill="none" stroke="#e2e8f0" strokeWidth="3" />
        <motion.circle
          cx="20" cy="20" r={R} fill="none" stroke="#10b981" strokeWidth="3"
          strokeLinecap="round" strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - (pct / 100) * C }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute -top-0.5 right-0 text-[10px]">{current.icon}</span>
      {loaded && state.streak >= 2 && (
        <span className="absolute -bottom-0.5 -left-0.5 flex items-center gap-0.5 rounded-full bg-amber-500 px-1.5 py-0.5 text-[8px] font-black text-white shadow">
          <Flame className="size-2" />{state.streak}
        </span>
      )}
    </Link>
  );
}