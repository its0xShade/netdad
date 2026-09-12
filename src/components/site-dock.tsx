"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, GraduationCap, Search, Compass, Wrench, BookMarked } from "lucide-react";
import { Dock, DockItem, DockSeparator } from "@/components/motion/dock";
import { DockProgressRing } from "@/components/motion/dock-progress-ring";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/curriculum", label: "سرفصل‌ها", icon: BookOpen },
  { href: "/tools", label: "ابزارها", icon: Wrench },
];

export function SiteDock() {
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-4 z-50 hidden justify-center px-4 md:flex">
      <Dock className="gap-0.5 px-2 py-1.5">
        {/* Brand */}
        <Link
          href="/"
          className="flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-extrabold text-text-primary transition-colors hover:text-primary-600"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-primary-600 text-white">
            <GraduationCap className="size-4" />
          </span>
          <span className="hidden sm:inline">نت‌داد</span>
        </Link>

        <DockSeparator />

        {NAV.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <DockItem key={item.href} active={active} aria-label={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl text-text-secondary transition-colors",
                  "hover:bg-black/5 hover:text-text-primary",
                  active && "text-primary-600",
                )}
                aria-label={item.label}
              >
                <Icon className="size-5" />
              </Link>
            </DockItem>
          );
        })}

        <DockSeparator />

        <DockItem active={isActive("/search")} aria-label="جستجو">
          <Link href="/search" className="grid h-10 w-10 place-items-center rounded-xl text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary" aria-label="جستجو">
            <Search className="size-5" />
          </Link>
        </DockItem>
        <DockItem active={isActive("/glossary")} aria-label="واژه‌نامه">
          <Link href="/glossary" className="grid h-10 w-10 place-items-center rounded-xl text-text-secondary transition-colors hover:bg-black/5 hover:text-text-primary" aria-label="واژه‌نامه">
            <BookMarked className="size-5" />
          </Link>
        </DockItem>
        <DockItem active={isActive("/profile")} aria-label="پروفایل">
          <DockProgressRing />
        </DockItem>

      </Dock>
    </header>
  );
}