import { FinalExam } from "@/components/final-exam";

export const metadata = { title: "آزمون نهایی جامع" };

export default function ExamPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">آزمون نهایی</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">آزمون جامع دوره</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          دانشت رو از همه ۱۴ بخش بسنج و گواهی پایان دوره بگیر.
        </p>
      </div>
      <FinalExam />
    </div>
  );
}