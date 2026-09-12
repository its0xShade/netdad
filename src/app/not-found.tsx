import Link from "next/link";
import { SearchX, Home, Compass } from "lucide-react";

export const metadata = { title: "صفحه پیدا نشد" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">
      {/* 404 visual */}
      <div className="relative">
        <h1 className="bg-gradient-to-b from-gray-900 to-gray-400 bg-clip-text text-[110px] font-black leading-none tracking-tighter text-transparent">
          404
        </h1>
        <div className="absolute inset-0 -z-10 grid place-items-center opacity-20">
          <div className="size-56 rounded-full border-4 border-dashed border-primary-400" />
          <div className="absolute size-40 rounded-full border-4 border-dashed border-primary-300" style={{ animation: "spin 12s linear infinite" }} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs text-text-muted shadow-sm">
        <SearchX className="size-3.5 text-primary-500" />
        <span className="font-mono">IP not found — destination unreachable</span>
      </div>

      <h2 className="mt-6 text-2xl font-black text-text-primary">این آدرس روی شبکه نیست</h2>
      <p className="mt-2 max-w-sm text-sm leading-7 text-text-muted">
        صفحه‌ای که دنبالش بودی جابه‌جا شده یا اصلاً وجود نداشته. شبیه یک بسته گم‌شده در اینترنت — Time to Live تمام شده.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary-700 active:translate-y-0 active:scale-95">
          <Home className="size-4" />
          صفحه اصلی
        </Link>
        <Link href="/curriculum" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-bold text-text-primary transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700 active:translate-y-0 active:scale-95">
          <Compass className="size-4" />
          سرفصل‌ها
        </Link>
      </div>

      {/* Fun ping terminal */}
      <div className="mt-10 w-full max-w-sm rounded-2xl border border-border bg-[#0d1117] p-5 text-right font-mono text-xs shadow-lg">
        <p className="text-gray-500">$ ping this-page.netdad.ir</p>
        <p className="mt-2 text-red-400">PING: transmit failed. General failure.</p>
        <p className="text-red-400">Destination host unreachable.</p>
        <p className="mt-2 text-gray-500">4 packets transmitted, 0 received, 100% packet loss</p>
        <p className="mt-2 text-emerald-400">→ try /curriculum — that one responds 😉</p>
      </div>
    </div>
  );
}