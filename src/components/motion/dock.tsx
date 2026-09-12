"use client";
// beui.dev/components/motion/dock — macOS-style dock with gliding active pill

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useRef } from "react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface DockProps {
  children: ReactNode;
  className?: string;
  size?: number;
}

export function Dock({ children, className, size = 44 }: DockProps) {
  return (
    <div className={cn("inline-flex items-end gap-1.5 rounded-2xl border border-border bg-white/90 p-1.5 shadow-lg shadow-black/5 backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

export interface DockItemProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  className?: string;
  size?: number;
}

export function DockItem({ children, active, onClick, "aria-label": ariaLabel, className, size = 44 }: DockItemProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      layout={!reduce}
      transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
      className={cn("relative flex items-center justify-center", className)}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative z-10 grid place-items-center rounded-xl text-text-secondary outline-none transition-colors",
          "hover:bg-black/5 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
          active && "text-primary-600 hover:text-primary-700",
        )}
        style={{ width: size, height: size }}
      >
        {children}
      </button>
      {active ? (
        <motion.span
          layoutId="dock-active-pill"
          transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
          className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary-500"
        />
      ) : null}
    </motion.div>
  );
}

export function DockSeparator({ className }: { className?: string }) {
  return <div className={cn("mx-1 h-8 w-px bg-border", className)} />;
}