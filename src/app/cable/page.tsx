import { CableTester } from "@/components/cable-tester";

export const metadata = { title: "تستر کابل شبکه" };

export default function CablePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">ابزار تعاملی</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">تستر کابل شبکه</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          با استانداردهای T568A و T568B آشنا شو و کابل درست رو بساز.
        </p>
      </div>
      <CableTester />
    </div>
  );
}