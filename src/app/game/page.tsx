import { CardSortGame } from "@/components/card-sort-game";

export const metadata = { title: "بازی دسته‌بندی" };

export default function GamePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">بازی آموزشی</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">دسته‌بندی کارت‌ها</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          مفاهیم شبکه را با کشیدن و رها کردن کارت‌ها یاد بگیر — TCP/UDP و لایه‌های OSI.
        </p>
      </div>
      <CardSortGame />
    </div>
  );
}