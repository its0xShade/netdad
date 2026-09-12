"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "خانه" },
  { href: "/curriculum", label: "سرفصل‌ها" },
  { href: "/tools", label: "ابزارها" },
  { href: "/search", label: "جستجو" },
  { href: "/profile", label: "پیشرفت" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between">
        {/* Brand — right in RTL */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="#10b981" opacity="0.12"/>
            <circle cx="16" cy="8" r="3" fill="#10b981"/>
            <circle cx="8" cy="22" r="3" fill="#10b981"/>
            <circle cx="24" cy="22" r="3" fill="#10b981"/>
            <line x1="16" y1="11" x2="9" y2="19.5" stroke="#10b981" strokeWidth="1.5"/>
            <line x1="16" y1="11" x2="23" y2="19.5" stroke="#10b981" strokeWidth="1.5"/>
            <line x1="11" y1="22" x2="21" y2="22" stroke="#10b981" strokeWidth="1.5"/>
          </svg>
          <span className="text-lg font-extrabold text-text-primary">نت‌داد</span>
        </Link>

        {/* Nav — left in RTL */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium no-underline transition-colors ${
                  active
                    ? "bg-primary-50 text-primary-700"
                    : "text-text-muted hover:bg-gray-50 hover:text-text-primary"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}