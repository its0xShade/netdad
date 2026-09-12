"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function NumberAnimation({
  value,
  duration = 2,
  delay = 0,
  className,
}: {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [displayVal, setDisplayVal] = useState(0);
  const hasAnimated = useRef(false);
  const fa = (n: number) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

  useEffect(() => {
    if (reduce || hasAnimated.current) {
      setDisplayVal(value);
      return;
    }

    const timer = setTimeout(() => {
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplayVal(Math.round(v)),
      });
      hasAnimated.current = true;
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, duration, delay, reduce]);

  return <span ref={ref} className={cn("tabular-nums", className)}>{fa(displayVal)}</span>;
}