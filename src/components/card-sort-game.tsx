"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shuffle, CheckCircle2, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";

type Level = { name: string; buckets: string[]; items: { id: string; label: string; bucket: number; hint: string }[] };

const LEVELS: Level[] = [
  {
    name: "TCP / UDP",
    buckets: ["TCP", "UDP"],
    items: [
      { id: "a", label: "Three-Way Handshake", bucket: 0, hint: "اتصال محور" },
      { id: "b", label: "ارسال استریم زنده", bucket: 1, hint: "بدون تأخیر، بدون تضمین" },
      { id: "c", label: "تضمین تحویل بسته", bucket: 0, hint: "ACK و Retransmission" },
      { id: "d", label: "DNS Query", bucket: 1, hint: "سریع و سبک" },
      { id: "e", label: "کنترل ازدحام", bucket: 0, hint: "Congestion Control" },
      { id: "f", label: "Voice over IP", bucket: 1, hint: "تأخیر کم مهم‌تر است" },
      { id: "g", label: "بازی آنلاین", bucket: 1, hint: "سرعت > دقت" },
      { id: "h", label: "دانلود فایل", bucket: 0, hint: "دقت > سرعت" },
    ],
  },
  {
    name: "لایه‌های OSI",
    buckets: ["لایه ۲", "لایه ۳", "لایه ۴", "لایه ۷"],
    items: [
      { id: "a", label: "آدرس MAC", bucket: 0, hint: "Physical Address" },
      { id: "b", label: "آدرس IP", bucket: 1, hint: "Logical Addressing" },
      { id: "c", label: "پورت‌ها و Session", bucket: 2, hint: "Ports & Sockets" },
      { id: "d", label: "HTTP", bucket: 3, hint: "Application" },
      { id: "e", label: "Frame", bucket: 0, hint: "Data Link" },
      { id: "f", label: "Packet", bucket: 1, hint: "Network" },
      { id: "g", label: "Segment", bucket: 2, hint: "Transport" },
      { id: "h", label: "DNS", bucket: 3, hint: "Application" },
    ],
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function CardSortGame() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [level, setLevel] = useState(LEVELS[0]);
  const [piles, setPiles] = useState<Record<number, string[]>>(() => {
    const p: Record<number, string[]> = {};
    level.buckets.forEach((_, i) => (p[i] = []));
    return p;
  });
  const [deck, setDeck] = useState(() => shuffle(level.items.map((i) => i.id)));
  const [wrong, setWrong] = useState<string | null>(null);
  const [hintFor, setHintFor] = useState<string | null>(null);
  const [won, setWon] = useState(false);

  const itemById = useMemo(() => {
    const m: Record<string, (typeof level.items)[number]> = {};
    level.items.forEach((i) => (m[i.id] = i));
    return m;
  }, [level]);

  function reset(li: number) {
    const lv = LEVELS[li];
    setLevelIdx(li);
    setLevel(lv);
    const p: Record<number, string[]> = {};
    lv.buckets.forEach((_, i) => (p[i] = []));
    setPiles(p);
    setDeck(shuffle(lv.items.map((i) => i.id)));
    setWrong(null);
    setHintFor(null);
    setWon(false);
  }

  function drop(id: string, bucket: number) {
    const item = itemById[id];
    if (item.bucket === bucket) {
      setPiles((prev) => ({ ...prev, [bucket]: [...prev[bucket], id] }));
      setDeck((prev) => prev.filter((d) => d !== id));
      setWrong(null);
      // Check win
      const remaining = deck.filter((d) => d !== id).length;
      if (remaining === 0) setWon(true);
    } else {
      setWrong(id);
      setTimeout(() => setWrong(null), 700);
    }
  }

  const totalItems = level.items.length;
  const placed = totalItems - deck.length;

  return (
    <div className="space-y-6">
      {/* Level tabs */}
      <div className="flex gap-2">
        {LEVELS.map((lv, i) => (
          <button
            key={lv.name}
            type="button"
            onClick={() => reset(i)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
              levelIdx === i ? "bg-primary-600 text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200",
            )}
          >
            {lv.name}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary-500 transition-all duration-500" style={{ width: `${(placed / totalItems) * 100}%` }} />
        </div>
        <span className="text-xs font-bold text-primary-600">{toFaDigits(placed)}/{toFaDigits(totalItems)}</span>
      </div>

      {/* Win overlay */}
      <AnimatePresence>
        {won && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-6 text-emerald-500" />
              <div>
                <p className="text-sm font-bold text-emerald-700">آفرین! همه درست دسته‌بندی شد 🎉</p>
                <p className="text-xs text-emerald-600/80">{toFaDigits(totalItems)} کارت در {toFaDigits(level.buckets.length)} دسته</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => reset(levelIdx)}>
              <RotateCcw className="size-3.5" />
              دوباره
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deck — cards to place */}
      <div>
        <p className="mb-2 text-xs font-bold text-text-muted">کارت‌ها را به دسته درست بکش:</p>
        <div className="flex min-h-24 flex-wrap gap-2 rounded-2xl border-2 border-dashed border-border bg-gray-50/50 p-4">
          {deck.length === 0 ? (
            <p className="text-xs text-text-muted">همه چیز مرتب شد! 🎉</p>
          ) : (
            deck.map((id) => {
              const item = itemById[id];
              return (
                <div
                    key={id}
                    draggable
                    onDragStart={(e: React.DragEvent) => e.dataTransfer.setData("text/plain", id)}
                    className="relative cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrong === id ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      "select-none rounded-xl border bg-white px-4 py-3 text-sm font-semibold shadow-sm transition-colors",
                      wrong === id ? "border-red-300 bg-red-50 text-red-600" : "border-border text-text-primary hover:border-primary-300",
                    )}
                  >
                    {item.label}
                    <span className="mt-0.5 block text-[10px] font-normal text-text-light">{item.hint}</span>
                  </motion.div>
                  </div>
              );
            })
          )}
        </div>
      </div>

      {/* Buckets */}
      <div className={cn("grid gap-4", level.buckets.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-4")}>
        {level.buckets.map((bucketName, bi) => {
          const cards = piles[bi] ?? [];
          const correctTotal = level.items.filter((i) => i.bucket === bi).length;
          const done = cards.length === correctTotal && correctTotal > 0;
          return (
            <div
              key={bucketName}
              onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
              onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) drop(id, bi); }}
              className={cn(
                "min-h-36 rounded-2xl border-2 border-dashed p-4 transition-colors",
                done ? "border-emerald-300 bg-emerald-50/60" : "border-border bg-white hover:border-primary-300",
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-text-primary">{bucketName}</span>
                <span className={cn("text-[10px] font-bold", done ? "text-emerald-600" : "text-text-light")}>
                  {toFaDigits(cards.length)}/{toFaDigits(correctTotal)}
                </span>
              </div>
              <div className="space-y-2">
                <AnimatePresence>
                  {cards.map((id) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-text-primary shadow-sm"
                    >
                      {itemById[id].label}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {cards.length === 0 && <p className="text-[10px] text-text-light">کارت را اینجا رها کن</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint chip */}
      {hintFor && (
        <p className="text-center text-xs text-text-muted">
          <Heart className="ml-1 inline size-3 text-primary-400" />
          راهنما: {itemById[hintFor].hint}
        </p>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-text-muted">
        <span className="flex items-center gap-1"><Shuffle className="size-3" /> کارت‌ها را با کشیدن دسته‌بندی کن</span>
        <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-emerald-500" /> درست → سبز می‌شود</span>
      </div>
    </div>
  );
}