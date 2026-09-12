"use client";
// beui.dev/components/motion/button — spring-pressed base with variants

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";
import { SPRING_PRESS } from "@/lib/ease";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-600/20",
  secondary:
    "bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200",
  ghost: "text-text-secondary hover:bg-black/5 hover:text-text-primary",
  outline: "border border-border bg-white text-text-primary hover:bg-gray-50",
  destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/20",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
  icon: "h-10 w-10 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", disabled, children, whileTap, ...rest },
  ref,
) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      whileTap={reduce || disabled ? undefined : { scale: 0.96 }}
      transition={SPRING_PRESS}
      disabled={disabled}
      className={cn(
        "inline-flex select-none items-center justify-center font-medium transition-colors duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
});