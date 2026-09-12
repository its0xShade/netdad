"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cable, CheckCircle2, XCircle, RotateCcw, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// T568A / T568B pin orders
const WIRE_COLORS = [
  "bg-green-500", "bg-green-300", "bg-orange-500", "bg-blue-400",
  "bg-blue-200", "bg-orange-300", "bg-amber-800", "bg-gray-300",
];

type PinLayout = number[];

const PINS_A: PinLayout = [0, 1, 2, 3, 4, 5, 6, 7];
const PINS_B: PinLayout = [1, 0, 3, 2, 5, 4, 7, 6];

function colorFor(pin: number, layout: PinLayout): string {
  return WIRE_COLORS[layout[pin]];
}

export function CableTester() {
  const [leftLayout, setLeftLayout] = useState<"A" | "B">("A");
  const [rightLayout, setRightLayout] = useState<"A" | "B">("A");
  const [tested, setTested] = useState(false);

  const straight = leftLayout === rightLayout;
  const crossover = leftLayout !== rightLayout;
  const pass = straight; // straight-through works for host↔switch; crossover for host↔host

  function reset() {
    setLeftLayout("A");
    setRightLayout("A");
    setTested(false);
  }

  const leftPins = leftLayout === "A" ? PINS_A : PINS_B;
  const rightPins = rightLayout === "A" ? PINS_A : PINS_B;

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600">
            <Cable className="size-6" />
          </span>
          <div>
            <h2 className="text-base font-bold text-text-primary">تستر کابل شبکه</h2>
            <p className="mt-0.5 text-xs text-text-muted">
              دو سر کابل رو انتخاب کن و تستش کن — مستقیم برای سوئیچ، متقاطع برای اتصال دو دستگاه هم‌رتبه.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Left end */}
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-text-primary">سر ۱</span>
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
              {(["A", "B"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => { setLeftLayout(v); setTested(false); }}
                  className={cn("rounded-md px-3 py-1 text-xs font-bold transition-colors", leftLayout === v ? "bg-white text-primary-600 shadow-sm" : "text-text-muted")}
                >
                  T{v}68A
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((pin) => (
              <div key={pin} className="flex items-center gap-2">
                <span className="w-5 text-[10px] font-mono text-text-light">{pin + 1}</span>
                <span className={cn("h-5 flex-1 rounded-md", colorFor(pin, leftPins))} />
                {tested && leftLayout === rightLayout && (
                  <span className="text-[10px] text-emerald-500">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right end */}
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-text-primary">سر ۲</span>
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
              {(["A", "B"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => { setRightLayout(v); setTested(false); }}
                  className={cn("rounded-md px-3 py-1 text-xs font-bold transition-colors", rightLayout === v ? "bg-white text-primary-600 shadow-sm" : "text-text-muted")}
                >
                  T{v}68A
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((pin) => (
              <div key={pin} className="flex items-center gap-2">
                <span className="w-5 text-[10px] font-mono text-text-light">{pin + 1}</span>
                <span className={cn("h-5 flex-1 rounded-md", colorFor(pin, rightPins))} />
                {tested && leftLayout !== rightLayout && (
                  <span className="text-[10px] text-amber-500">⇄</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test button */}
      <div className="flex justify-center">
        <Button onClick={() => setTested(true)} size="lg" className="rounded-2xl px-10">
          <Cable className="size-4" />
          تست کابل
        </Button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {tested && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={cn(
              "rounded-2xl border-2 p-6 text-center",
              pass ? "border-emerald-300 bg-emerald-50" : "border-amber-300 bg-amber-50",
            )}
          >
            {pass ? (
              <>
                <CheckCircle2 className="mx-auto size-10 text-emerald-500" />
                <h3 className="mt-3 text-lg font-black text-emerald-700">کابل مستقیم — سالم ✅</h3>
                <p className="mt-1 text-sm text-emerald-700/80">
                  این کابل برای اتصال {leftLayout === rightLayout ? "دستگاه به سوئیچ" : "دو دستگاه هم‌رتبه (PC به PC)"} مناسبه.
                </p>
              </>
            ) : (
              <>
                <XCircle className="mx-auto size-10 text-amber-500" />
                <h3 className="mt-3 text-lg font-black text-amber-700">کابل متقاطع — سالم ⚠️</h3>
                <p className="mt-1 text-sm text-amber-700/80">
                  این کابل برای اتصال مستقیم دو دستگاه هم‌رتبه (PC به PC، سوئیچ به سوئیچ) طراحی شده.
                </p>
              </>
            )}
            <div className="mt-4 flex justify-center gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((pin) => {
                const sameColor = leftPins[pin] === rightPins[pin];
                return (
                  <span key={pin} className={cn("size-3 rounded-full", sameColor ? "bg-emerald-400" : "bg-amber-400")} title={`پین ${pin + 1}`} />
                );
              })}
            </div>
            <p className="mt-3 text-[11px] text-emerald-700/60">
              هر پین رنگی = سیم یکسان در دو سر • قرمز = جابه‌جایی
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learn more */}
      <div className="rounded-2xl border border-border bg-white p-5">
        <div className="flex items-center gap-2">
          <Wifi className="size-4 text-primary-600" />
          <h3 className="text-sm font-bold text-text-primary">کی از کدام استفاده کنیم؟</h3>
        </div>
        <div className="mt-3 grid gap-3 text-xs leading-6 text-text-muted sm:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="font-bold text-text-primary mb-1">مستقیم (Straight-through)</p>
            PC → سوئیچ، PC → روتر، سوئیچ → روتر. پرکاربردترین کابل.
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="font-bold text-text-primary mb-1">متقاطع (Crossover)</p>
            PC → PC، سوئیچ → سوئیچ، PC → سوئیچ قدیمی. فقط برای اتصال هم‌رتبه‌ها.
          </div>
        </div>
      </div>
    </div>
  );
}