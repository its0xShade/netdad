import { NetworkBuilder } from "@/components/network-builder";

export const metadata = { title: "سازنده شبکه" };

export default function NetworkBuilderPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Visual Lab</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">سازنده شبکه</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-text-muted">
          دستگاه‌ها را بکش و وصل کن و تپولوژی شبکه خودت را طراحی کن — نیاز به نصب هیچ برنامه‌ای نیست.
        </p>
      </div>
      <NetworkBuilder />
    </div>
  );
}