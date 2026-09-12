"use client";
// beui.dev/components/motion/animated-badge — status badge with animated icons

import { AlertTriangle, Check, Circle, Info, LoaderCircle, X, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type AnimatedBadgeStatus = "neutral" | "info" | "success" | "warning" | "danger" | "loading";
export type AnimatedBadgeSize = "sm" | "md";

const STATUS_CLASS: Record<AnimatedBadgeStatus, string> = {
  neutral: "border-border bg-white text-text-muted",
  info: "border-primary-300 bg-primary-50 text-primary-700",
  success: "border-emerald-300 bg-emerald-50 text-emerald-700",
  warning: "border-amber-300 bg-amber-50 text-amber-700",
  danger: "border-red-300 bg-red-50 text-red-700",
  loading: "border-primary-300 bg-primary-50 text-primary-700",
};

const SIZE_CLASS: Record<AnimatedBadgeSize, string> = {
  sm: "h-6 gap-1.5 px-2 text-[11px]",
  md: "h-8 gap-2 px-3 text-xs",
};

const ICONS: Record<AnimatedBadgeStatus, LucideIcon> = {
  neutral: Circle, info: Info, success: Check, warning: AlertTriangle, danger: X, loading: LoaderCircle,
};

const ICON_ROLL: Variants = {
  initial: { opacity: 0.72, y: "80%", scale: 0.92, rotate: -8, filter: "blur(6px)" },
  animate: { opacity: 1, y: "0%", scale: 1, rotate: 0, filter: "blur(0px)", transition: { y: { type: "spring", stiffness: 210, damping: 24 }, scale: { type: "spring", stiffness: 250, damping: 24 }, rotate: { duration: 0.28, ease: EASE_OUT }, opacity: { duration: 0.28, ease: EASE_OUT }, filter: { duration: 0.42, ease: EASE_OUT } } },
  exit: { opacity: 0.5, y: "-80%", scale: 0.96, rotate: 8, filter: "blur(6px)", transition: { duration: 0.22, ease: EASE_OUT } },
};

const TEXT_ROLL: Variants = {
  initial: { opacity: 0.76, y: "85%", filter: "blur(6px)" },
  animate: { opacity: 1, y: "0%", filter: "blur(0px)", transition: { y: { type: "spring", stiffness: 210, damping: 24 }, opacity: { duration: 0.3, ease: EASE_OUT }, filter: { duration: 0.42, ease: EASE_OUT } } },
  exit: { opacity: 0.5, y: "-85%", filter: "blur(6px)", transition: { duration: 0.2, ease: EASE_OUT } },
};

export function AnimatedBadge({
  status = "neutral", size = "md", children, showIcon = true, pulse: pulseProp, contentKey, className,
}: {
  status?: AnimatedBadgeStatus;
  size?: AnimatedBadgeSize;
  children?: ReactNode;
  showIcon?: boolean;
  pulse?: boolean;
  contentKey?: string | number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Icon = ICONS[status];
  const pulse = pulseProp ?? status === "loading";
  const key = contentKey ?? (typeof children === "string" ? children : status);

  return (
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.7 }}
      className={cn(
        "relative inline-flex shrink-0 items-center overflow-hidden whitespace-nowrap rounded-full border font-medium tabular-nums transition-colors duration-300",
        STATUS_CLASS[status], SIZE_CLASS[size], className,
      )}
    >
      {pulse && !reduce && (
        <motion.span aria-hidden className="absolute inset-0 rounded-full bg-current opacity-10"
          animate={{ scale: [0.94, 1.08, 0.94], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {showIcon && (
        <span className="relative z-10 inline-flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={status} aria-hidden variants={ICON_ROLL}
              initial={reduce ? false : "initial"} animate={reduce ? { opacity: 1 } : "animate"} exit={reduce ? undefined : "exit"}
              className="inline-flex will-change-transform"
            >
              {status === "loading" && !reduce ? (
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-flex">
                  <Icon className="h-3.5 w-3.5" />
                </motion.span>
              ) : <Icon className="h-3.5 w-3.5" />}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
      {children != null && (
        <span className="relative z-10 inline-flex overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={key} variants={TEXT_ROLL}
              initial={reduce ? false : "initial"} animate={reduce ? { opacity: 1 } : "animate"} exit={reduce ? undefined : "exit"}
              className="inline-block will-change-transform"
            >
              {children}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </motion.span>
  );
}