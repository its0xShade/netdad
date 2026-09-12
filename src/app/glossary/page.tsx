import { GlossaryComponent } from "@/components/glossary-client";

export const metadata = { title: "واژه‌نامه شبکه" };

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">واژه‌نامه</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">واژه‌نامه شبکه</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          تعاریف مهم‌ترین مفاهیم شبکه — فارسی و انگلیسی.
        </p>
      </div>
      <GlossaryComponent />
    </div>
  );
}