import { MindMap } from "@/components/mind-map";

export const metadata = { title: "نقشه مفاهیم" };

export default function MindMapPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Visual Learning</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">نقشه مفاهیم شبکه</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-text-muted">
          TCP، IP، ARP، سوئیچ و روتر چطور به هم وصل هستند — روی هر نود کلیک کن.
        </p>
      </div>
      <MindMap />
    </div>
  );
}