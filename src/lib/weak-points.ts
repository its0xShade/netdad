// Weak-point tracking — records every exam/drill answer in localStorage
export type WeakRecord = {
  id: string;           // question or card id
  kind: "question" | "flashcard";
  chapter: number;      // 1..14
  correct: boolean;
  ts: number;
};

const KEY = "netdad-weak-records";
const MAX = 400;

export function getWeakRecords(): WeakRecord[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function recordWeakResult(r: Omit<WeakRecord, "ts">) {
  const all = getWeakRecords();
  all.push({ ...r, ts: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(all.slice(-MAX)));
}

export type ChapterStat = { chapter: number; total: number; correct: number; pct: number };

export function getChapterStats(records: WeakRecord[]): ChapterStat[] {
  const map = new Map<number, { total: number; correct: number }>();
  for (const r of records) {
    const cur = map.get(r.chapter) ?? { total: 0, correct: 0 };
    cur.total++;
    if (r.correct) cur.correct++;
    map.set(r.chapter, cur);
  }
  return [...map.entries()]
    .map(([chapter, v]) => ({ chapter, ...v, pct: v.total ? Math.round((v.correct / v.total) * 100) : 0 }))
    .sort((a, b) => a.pct - b.pct);
}

export function getWeakChapters(records: WeakRecord[], minAttempts = 2, threshold = 75): number[] {
  return getChapterStats(records)
    .filter((s) => s.total >= minAttempts && s.pct < threshold)
    .map((s) => s.chapter);
}

export function getWrongQuestionIds(records: WeakRecord[]): string[] {
  return records.filter((r) => r.kind === "question" && !r.correct).map((r) => r.id);
}

export function clearWeakRecords() {
  localStorage.removeItem(KEY);
}