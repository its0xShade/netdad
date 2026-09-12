import { SubnetCheatSheet } from "@/components/subnet-cheat-sheet";

export const metadata = { title: "برگه مرجع زیرشبکه" };

export default function CheatSheetPage() {
  return (
    <div className="print-area mx-auto max-w-4xl space-y-8">
      <div className="text-center print:hidden">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Reference</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">برگه مرجع زیرشبکه</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          جدول کامل CIDR — چاپش کن و کنار میزت بذار.
        </p>
      </div>
      <SubnetCheatSheet />
    </div>
  );
}