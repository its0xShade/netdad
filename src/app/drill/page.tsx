import { DrillMode } from "@/components/drill-mode";

export const metadata = { title: "Smart Drill" };

export default function DrillPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Practice</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">دریل هوشمند</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          مرور خودکار سؤالاتی که غلط جواب دادی — تا درست جواب بدی.
        </p>
      </div>
      <DrillMode />
    </div>
  );
}