import { WeakPointsAnalysis } from "@/components/weak-points-analysis";

export const metadata = { title: "تحلیل نقاط ضعف" };

export default function WeakPointsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Analytics</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">تحلیل نقاط ضعف</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          عملکرد شما به تفکیک فصل — ببین کجا بیشتر باید بخوانی.
        </p>
      </div>
      <WeakPointsAnalysis />
    </div>
  );
}