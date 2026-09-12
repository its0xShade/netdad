"use client";
// Animated sidebar with gliding active indicator (beUI pattern)

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { type ReactNode } from "react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export function Sidebar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <aside className={cn("w-72 shrink-0 overflow-y-auto", className)}>
      <nav className="sticky top-24 space-y-1" aria-label="فهرست جانبی">
        {children}
      </nav>
    </aside>
  );
}

export interface SidebarItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

export function SidebarItem({ href, label, icon, active, badge, onClick }: SidebarItemProps) {
  const reduce = useReducedMotion();
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-text-muted transition-colors",
        "hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary-400",
        active && "text-primary-700",
      )}
    >
      {active ? (
        <motion.span
          layoutId="sidebar-active"
          transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
          className="absolute inset-0 rounded-xl bg-primary-50 ring-1 ring-primary-100"
        />
      ) : null}
      <span className="relative z-10 grid size-8 place-items-center rounded-lg bg-gray-50 text-text-secondary transition-colors group-hover:bg-primary-50 group-hover:text-primary-600">
        {icon}
      </span>
      <span className="relative z-10 flex-1 truncate">{label}</span>
      {badge ? (
        <span className="relative z-10 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function SidebarGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-4">
      <p className="mb-1.5 px-3.5 text-xs font-bold uppercase tracking-wider text-text-light">{label}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}