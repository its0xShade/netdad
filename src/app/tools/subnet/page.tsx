"use client";
import { useState } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { Input } from "@/components/motion/input";
import { Button } from "@/components/ui/button";
import { toFaDigits } from "@/lib/format";

type Result = {
  network: string; broadcast: string; mask: string;
  firstHost: string; lastHost: string; total: number; hosts: number;
};

export default function SubnetPage() {
  const [ip, setIp] = useState("");
  const [cidr, setCidr] = useState("24");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | false>(false);

  function calculate() {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
      setError("آدرس IP معتبر وارد کنید — مثل 192.168.1.0");
      setResult(null);
      return;
    }
    const c = parseInt(cidr);
    if (isNaN(c) || c < 1 || c > 32) {
      setError("CIDR باید بین ۱ تا ۳۲ باشد");
      setResult(null);
      return;
    }
    setError(false);
    const maskBits = ~((1 << (32 - c)) - 1) >>> 0;
    const ipNum = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
    const network = (ipNum & maskBits) >>> 0;
    const broadcast = (network | ~maskBits) >>> 0;
    const total = 1 << (32 - c);
    const hosts = Math.max(0, total - 2);
    const fmt = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
    setResult({
      network: fmt(network), broadcast: fmt(broadcast), mask: fmt(maskBits),
      firstHost: hosts > 0 ? fmt(network + 1) : "-",
      lastHost: hosts > 0 ? fmt(broadcast - 1) : "-",
      total, hosts,
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <nav className="mb-3 flex items-center gap-2 text-xs text-text-muted">
          <Link href="/tools" className="transition-colors hover:text-primary-600 no-underline">ابزارها</Link>
          <span>/</span>
          <span className="text-text-primary">محاسبه زیرشبکه</span>
        </nav>
        <h1 className="text-3xl font-black tracking-tight text-text-primary">محاسبه زیرشبکه</h1>
        <p className="mt-2 text-sm text-text-muted">آدرس IP و CIDR وارد کنید — شبکه، Broadcast و Hostها محاسبه می‌شود.</p>
      </div>

      <div className="card space-y-5 p-7">
        <Input
          label="آدرس IP"
          value={ip}
          onChange={setIp}
          placeholder="192.168.1.0"
          error={error}
          leftIcon={<Calculator className="size-4" />}
          className="ltr text-left font-mono"
        />
        <Input
          label="CIDR"
          value={cidr}
          onChange={setCidr}
          placeholder="24"
          className="ltr text-left font-mono"
        />
        <Button onClick={calculate} className="w-full">محاسبه</Button>
      </div>

      {result ? (
        <div className="card overflow-hidden">
          <div className="border-b border-border bg-primary-50 px-6 py-4">
            <h2 className="text-sm font-bold text-text-primary">نتیجه</h2>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {([
                ["آدرس شبکه", result.network],
                ["آدرس Broadcast", result.broadcast],
                ["Subnet Mask", result.mask],
                ["اولین Host", result.firstHost],
                ["آخرین Host", result.lastHost],
                ["تعداد کل آدرس‌ها", toFaDigits(result.total)],
                ["تعداد Hostها", toFaDigits(result.hosts)],
              ] as [string, string][]).map(([label, value], i) => (
                <tr key={label} className={i % 2 ? "bg-gray-50/50" : ""}>
                  <td className="px-6 py-3.5 font-semibold text-text-primary">{label}</td>
                  <td className="px-6 py-3.5 text-left font-mono text-sm text-primary-700 ltr">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}