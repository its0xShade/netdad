"use client";

// ── Gamification: XP, Levels, Streaks ─────────────────────────────
// Pure localStorage-based. No backend needed.

import { useCallback, useEffect, useState } from "react";

const KEY = "netdad_gamification";

export type GamificationState = {
  xp: number;
  streak: number;        // current daily streak in days
  lastActiveDay: string; // "YYYY-MM-DD"
  badges: string[];
  completedLessons: number;
  quizScore: number;     // total correct answers
  quizTotal: number;     // total quiz questions answered
};

const INITIAL: GamificationState = {
  xp: 0,
  streak: 0,
  lastActiveDay: "",
  badges: [],
  completedLessons: 0,
  quizScore: 0,
  quizTotal: 0,
};

// Level thresholds — XP needed for each level
export const LEVELS = [
  { level: 1, minXp: 0, title: "تازه‌کار", icon: "🌱" },
  { level: 2, minXp: 100, title: "کارآموز", icon: "📘" },
  { level: 3, minXp: 250, title: "شبکه‌یار", icon: "🔧" },
  { level: 4, minXp: 500, title: "متخصص", icon: "⚡" },
  { level: 5, minXp: 800, title: "حرفه‌ای", icon: "🚀" },
  { level: 6, minXp: 1200, title: "استاد شبکه", icon: "🏆" },
];

export function levelForXp(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXp) current = l;
  }
  const next = LEVELS.find((l) => l.minXp > xp) ?? null;
  const progress = next ? ((xp - current.minXp) / (next.minXp - current.minXp)) * 100 : 100;
  return { current, next, progress: Math.min(100, Math.max(0, progress)) };
}

function load(): GamificationState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...INITIAL };
    return { ...INITIAL, ...JSON.parse(raw) };
  } catch {
    return { ...INITIAL };
  }
}

function save(state: GamificationState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// Called on any visit to update streak
export function touchStreak(state: GamificationState): GamificationState {
  const t = today();
  if (state.lastActiveDay === t) return state;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streak = state.lastActiveDay === yesterday ? state.streak + 1 : 1;
  return { ...state, streak, lastActiveDay: t };
}

export function addXpRaw(state: GamificationState, amount: number): GamificationState {
  return { ...state, xp: state.xp + amount };
}

export function recordLessonComplete(state: GamificationState): GamificationState {
  // +15 XP per completed lesson
  return addXpRaw({ ...state, completedLessons: state.completedLessons + 1 }, 15);
}

export function recordQuizResult(state: GamificationState, correct: number, total: number): GamificationState {
  const quizScore = state.quizScore + correct;
  const quizTotal = state.quizTotal + total;
  // +5 XP per correct answer
  return addXpRaw({ ...state, quizScore, quizTotal }, correct * 5);
}

// Badge check — called after any XP change
export function checkBadges(state: GamificationState): GamificationState {
  const badges = new Set(state.badges);
  if (state.completedLessons >= 1) badges.add("first-lesson");
  if (state.completedLessons >= 10) badges.add("ten-lessons");
  if (state.completedLessons >= 25) badges.add("quarter");
  if (state.completedLessons >= 53) badges.add("all-lessons");
  if (state.xp >= 250) badges.add("xp-250");
  if (state.xp >= 800) badges.add("xp-800");
  if (state.streak >= 3) badges.add("streak-3");
  if (state.streak >= 7) badges.add("streak-7");
  if (state.quizScore >= 10) badges.add("quiz-10");
  return { ...state, badges: [...badges] };
}

export const BADGE_INFO: Record<string, { label: string; emoji: string }> = {
  "first-lesson": { label: "اولین درس", emoji: "🎯" },
  "ten-lessons": { label: "۱۰ درس", emoji: "📚" },
  quarter: { label: "یک‌چهارم دوره", emoji: "🌗" },
  "all-lessons": { label: "فارغ‌التحصیل", emoji: "🎓" },
  "xp-250": { label: "۲۵۰ امتیاز", emoji: "⚡" },
  "xp-800": { label: "۸۰۰ امتیاز", emoji: "💎" },
  "streak-3": { label: "۳ روز پیاپی", emoji: "🔥" },
  "streak-7": { label: "۷ روز پیاپی", emoji: "🔥" },
  "quiz-10": { label: "۱۰ پاسخ درست", emoji: "✅" },
};

// ── React hook ─────────────────────────────
export function useGamification() {
  const [state, setState] = useState<GamificationState>(INITIAL);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let s = load();
    s = touchStreak(s);
    s = checkBadges(s);
    save(s);
    setState(s);
    setLoaded(true);
  }, []);

  const update = useCallback((fn: (s: GamificationState) => GamificationState) => {
    setState((prev) => {
      const next = checkBadges(fn(prev));
      save(next);
      return next;
    });
  }, []);

  const completeLesson = useCallback(() => update((s) => recordLessonComplete(s)), [update]);
  const finishQuiz = useCallback((correct: number, total: number) => update((s) => recordQuizResult(s, correct, total)), [update]);
  const addXp = useCallback((amount: number) => update((s) => addXpRaw(s, amount)), [update]);

  const { current, next, progress } = levelForXp(state.xp);

  return {
    state,
    loaded,
    level: current,
    nextLevel: next,
    levelProgress: progress,
    completeLesson,
    finishQuiz,
    addXp,
  };
}