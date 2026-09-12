"use client";
import { useState } from "react";
import Link from "next/link";
import { Binary } from "lucide-react";
import { Input } from "@/components/motion/input";
import { Button } from "@/components/ui/button";

type Mode = "dec" | "bin" | "hex";

export default function BinaryPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("dec");
  const [results, setResults] = useState<{ dec: string; bin: string; hex: string } | null>(null);
  const [error, setError] = useState<string | false>(false);

  function convert() {
    const v = parseInt(input, mode === "dec" ? 10 : mode === "hex" ? 16 : 2);
    if (isNaN(v) || v < 0 || v > 255) {
      setError("مقدار معتبر بین ۰ تا ۲۵۵ وارد کنید");
      setResults(null);
      return;
    }
    setError(false);
    setResults({ dec: String(v), bin: v.toString(2).padStart(8, "0"), hex: "0x" + v.toString(16).toUpperCase() });
  }

  const modes: [Mode, string][] = [["dec", "دسیمال"], ["bin", "باینری"], ["hex", "هگز"]];

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <nav className="mb-3 flex items-center gap-2 text-xs text-text-muted">
          <Link href="/tools" className="transition-colors hover:text-primary-600 no-underline">ابزارها</Link>
          <span>/</span>
          <span className="text-text-primary">مبدل باینری</span>
        </nav>
        <h1 className="text-3xl font-black tracking-tight text-text-primary">مبدل باینری</h1>
        <p className="mt-2 text-sm text-text-muted">تبدیل بین دسیمال، باینری و هگزادسیمال — ورودی ۰ تا ۲۵۵.</p>
      </div>

      <div className="card space-y-5 p-7">
        <div className="flex gap-2">
          {modes.map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => { setMode(k); setError(false); }}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                mode === k ? "bg-primary-600 text-white" : "bg-gray-100 text-text-muted hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <Input
          label="مقدار"
          value={input}
          onChange={setInput}
          placeholder={mode === "dec" ? "مثلاً 192" : mode === "bin" ? "11000000" : "C0"}
          error={error}
          leftIcon={<Binary className="size-4" />}
          className="ltr text-left font-mono"
        />
        <Button onClick={convert} className="w-full">تبدیل</Button>
      </div>

      {results ? (
        <div className="card space-y-3 p-6">
          {([
            ["دسیمال", results.dec],
            ["باینری", results.bin],
            ["هگز", results.hex],
          ] as [string, string][]).map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-xl bg-gray-50 px-5 py-4">
              <span className="text-sm font-semibold text-text-primary">{label}</span>
              <span className="font-mono text-sm font-bold text-primary-700 ltr">{value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}