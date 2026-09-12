"use client";
// beui.dev/components/motion/input — label, icons, error shake, success

import { motion, useReducedMotion } from "motion/react";
import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const SHAKE = { x: [0, -8, 8, -5, 5, 0] };

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string | boolean;
  success?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, value, defaultValue, onChange, error, success, leftIcon, rightIcon, className, ...rest },
  ref,
) {
  const reduce = useReducedMotion();
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = value ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const iconSlot = (node: ReactNode, side: "left" | "right") =>
    node ? (
      <span className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-text-light", side === "left" ? "left-3" : "right-3")}>
        {node}
      </span>
    ) : null;

  return (
    <div className="w-full">
      {label ? (
        <label className="mb-1.5 block text-sm font-medium text-text-primary">{label}</label>
      ) : null}
      <motion.div
        animate={error && !reduce ? SHAKE : undefined}
        transition={{ duration: 0.35 }}
        className="relative"
      >
        <input
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          className={cn(
            "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-text-primary placeholder:text-text-light",
            "outline-none transition-colors duration-150",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : success
                ? "border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                : "border-border focus:border-primary-400 focus:ring-2 focus:ring-primary-100",
            className,
          )}
          {...rest}
        />
        {iconSlot(leftIcon, "left")}
        {iconSlot(rightIcon, "right")}
      </motion.div>
      {error && typeof error === "string" ? (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : null}
      {success && !error ? (
        <p className="mt-1.5 text-xs text-primary-600">✓ ذخیره شد</p>
      ) : null}
    </div>
  );
});