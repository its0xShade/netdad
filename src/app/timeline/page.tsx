import { ProtocolTimeline } from "@/components/protocol-timeline";

export const metadata = { title: "گاهشواری پروتکل‌ها" };

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Network History</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">گاهشواری پروتکل‌ها</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-text-muted">
          از ARPANET (۱۹۶۹) تا Wi-Fi 7 (۲۰۲۴) — هر پروتکل، استاندارد و تحولی که اینترنت را ساخت.
        </p>
      </div>
      <ProtocolTimeline />
    </div>
  );
}