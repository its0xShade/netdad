"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { useProgress } from "@/lib/progress";

const TOTAL_LESSONS = 53;

export function DockProgressRing() {
  const { completed } = useProgress();
  const pct = Math.min(100, Math.round((completed.length / TOTAL_LESSONS) * 100));
  const R = 15;
  const C = 2 * Math.PI * R;

  return (
    <Link href="/profile" aria-label="پیشرفت دوره" className="relative grid h-10 w-10 place-items-center rounded-xl text-text-secondary transition-colors hover:bg-black/5">
      <svg viewBox="0 0 40 40" className="size-9 -rotate-90">
        <circle cx="20" cy="20" r={R} fill="none" stroke="#e2e8f0" strokeWidth="3" />
        <motion.circle
          cx="20"
          cy="20"
          r={R}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - (pct / 100) * C }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <CircleUser className="absolute size-4 text-text-secondary" />
    </Link>
  );
}