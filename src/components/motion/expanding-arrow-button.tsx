"use client";
// beui.dev/components/motion/expanding-arrow-button — link-aware version

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { forwardRef, useState, type FocusEvent, type MouseEvent, type ReactNode } from "react";
import { EASE_OUT, SPRING_LAYOUT, SPRING_PRESS } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface ExpandingArrowButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  accentClassName?: string;
  labelClassName?: string;
  href?: string;
}

const ARROW_OPACITY = [1, 0.78, 0.54, 0.32, 0.16] as const;

function DottedChevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 28" fill="none" aria-hidden="true" className={className}>
      <circle cx="4" cy="4" r="2" fill="currentColor" />
      <circle cx="10" cy="9" r="2" fill="currentColor" />
      <circle cx="16" cy="14" r="2" fill="currentColor" />
      <circle cx="10" cy="19" r="2" fill="currentColor" />
      <circle cx="4" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}

function ChevronArrow({ active, reduce }: { active: boolean; reduce: boolean | null }) {
  return (
    <>
      <motion.span
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: reduce ? 0 : 0.1, ease: EASE_OUT }}
        className="absolute inset-0 grid place-items-center"
      >
        <DottedChevron className="h-7 w-5" />
      </motion.span>
      <span className="absolute inset-0 flex items-center justify-around px-3">
        {ARROW_OPACITY.map((opacity, index) => (
          <motion.span
            key={opacity}
            animate={{
              opacity: active ? 1 : 0,
              transform: active && !reduce ? "translateX(0px)" : "translateX(-6px)",
            }}
            transition={{ duration: reduce ? 0 : 0.18, delay: active && !reduce ? 0.04 + index * 0.025 : 0, ease: EASE_OUT }}
            style={{ color: `rgb(10 10 10 / ${opacity})` }}
            className="inline-grid place-items-center"
          >
            <DottedChevron className="h-7 w-5" />
          </motion.span>
        ))}
      </span>
    </>
  );
}

export function ExpandingArrowButton({
  children,
  className,
  accentClassName,
  labelClassName,
  disabled,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  href,
  ...rest
}: ExpandingArrowButtonProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = !disabled && ((canHover && hovered) || focused);
  const layoutTransition = reduce ? { duration: 0 } : SPRING_LAYOUT;

  // When href is provided, render as <a> for real navigation
  if (href) {
    return (
      <motion.a
        href={href}
        onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e as any); }}
        onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e as any); }}
        onFocus={(e) => { setFocused(true); onFocus?.(e as any); }}
        onBlur={(e) => { setFocused(false); onBlur?.(e as any); }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        transition={SPRING_PRESS}
        className={cn(
          "relative inline-flex h-16 min-w-72 items-center overflow-hidden rounded-[22px] bg-neutral-950 p-1.5 text-white select-none no-underline",
          "outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
      >
        <motion.span
          layout="size"
          aria-hidden="true"
          transition={layoutTransition}
          style={{ width: active ? "calc(100% - 12px)" : 52, borderRadius: 16 }}
          className={cn("absolute inset-y-1.5 left-1.5 z-10 overflow-hidden bg-primary-400 text-neutral-950", accentClassName)}
        >
          <ChevronArrow active={active} reduce={reduce} />
        </motion.span>

        <motion.span
          animate={{
            opacity: active ? 0 : 1,
            transform: active && !reduce ? "translateX(6px)" : "translateX(0px)",
          }}
          transition={{ duration: reduce ? 0 : 0.12, ease: EASE_OUT }}
          className={cn("relative z-0 ml-[76px] mr-5 whitespace-nowrap text-lg font-medium tracking-[-0.02em]", labelClassName)}
        >
          {children}
        </motion.span>
      </motion.a>
    );
  }

  // Fallback: render as <button>
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      onFocus={(e) => { setFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      whileTap={reduce || disabled ? undefined : { scale: 0.97 }}
      transition={SPRING_PRESS}
      className={cn(
        "relative inline-flex h-16 min-w-72 items-center overflow-hidden rounded-[22px] bg-neutral-950 p-1.5 text-white select-none",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...rest}
    >
      <motion.span
        layout="size"
        aria-hidden="true"
        transition={layoutTransition}
        style={{ width: active ? "calc(100% - 12px)" : 52, borderRadius: 16 }}
        className={cn("absolute inset-y-1.5 left-1.5 z-10 overflow-hidden bg-primary-400 text-neutral-950", accentClassName)}
      >
        <ChevronArrow active={active} reduce={reduce} />
      </motion.span>

      <motion.span
        animate={{
          opacity: active ? 0 : 1,
          transform: active && !reduce ? "translateX(6px)" : "translateX(0px)",
        }}
        transition={{ duration: reduce ? 0 : 0.12, ease: EASE_OUT }}
        className={cn("relative z-0 ml-[76px] mr-5 whitespace-nowrap text-lg font-medium tracking-[-0.02em]", labelClassName)}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}