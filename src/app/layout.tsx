import type { Metadata, Viewport } from "next";
import "@fontsource-variable/vazirmatn";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { SiteDock } from "@/components/site-dock";
import { SiteFooter } from "@/components/site-footer";
import { TerminalLauncher } from "@/components/terminal-launcher";
import { ToastProvider } from "@/components/ui/toast";
import { CommandPalette } from "@/components/command-palette";
import { ScrollToTop } from "@/components/motion/scroll-to-top";
import { MobileNav } from "@/components/mobile-nav";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://netdad.ir";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "نت‌داد — آکادمی شبکه",
    template: "%s | نت‌داد",
  },
  description:
    "یادگیری شبکه از پایه تا حرفه‌ای — دوره جامع شبکه با ۱۴ بخش و ۵۳ درس عملی، آزمون‌ها، شبیه‌سازها و ابزارهای تعاملی.",
  keywords: [
    "آموزش شبکه",
    "نت‌داد",
    "CCNA",
    "Network+",
    "آموزش رایگان شبکه",
    "زیرشبکه",
    "آموزش فارسی شبکه",
    "IPv4",
    "IPv6",
    "روتر",
    "سوئیچ",
  ],
  authors: [{ name: "نت‌داد" }],
  creator: "نت‌داد",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: "نت‌داد",
    title: "نت‌داد — آکادمی شبکه",
    description:
      "دوره جامع و رایگان شبکه از پایه تا CCNA — ۵۳ درس، آزمون، شبیه‌ساز ترمینال و ابزارهای تعاملی.",
  },
  twitter: {
    card: "summary",
    title: "نت‌داد — آکادمی شبکه",
    description: "یادگیری شبکه از پایه تا حرفه‌ای، رایگان و فارسی.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10b981",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">
        <Script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js" strategy="afterInteractive" />
        {process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <ToastProvider>
          <SiteDock />
          <main className="mx-auto w-full max-w-7xl px-6 pb-28 pt-24 md:pb-24">{children}</main>
          <SiteFooter />
          <TerminalLauncher />
          <ScrollToTop />
          <MobileNav />
          <CommandPalette />
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}