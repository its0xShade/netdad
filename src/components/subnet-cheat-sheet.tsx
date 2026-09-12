"use client";

import { useState } from "react";
import { Printer, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toFaDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

type Row = { cidr: string; mask: string; hosts: string; wildcard: string; first: string; last: string; broadcast: string };

// Build rows for /8 through /30 in a /24 example
function buildRows(): Row[] {
  const rows: Row[] = [];
  for (let cidr = 8; cidr <= 30; cidr++) {
    const hostBits = 32 - cidr;
    const hosts = Math.pow(2, hostBits) - 2;
    const mask = (() => {
      const bits = 0xffffffff << (32 - cidr);
      return [(bits >>> 24) & 0xff, (bits >>> 16) & 0xff, (bits >>> 8) & 0xff, bits & 0xff].join(".");
    })();
    const wildcard = (() => {
      const bits = 0xffffffff >>> cidr;
      return [(bits >>> 24) & 0xff, (bits >>> 16) & 0xff, (bits >>> 8) & 0xff, bits & 0xff].join(".");
    })();
    rows.push({
      cidr: `/${cidr}`,
      mask,
      hosts: hosts >= 1000 ? `${(hosts / 1000).toFixed(1)}K` : hosts >= 1_000_000 ? `${(hosts / 1e6).toFixed(1)}M` : `${hosts}`,
      wildcard,
      first: "",
      last: "",
      broadcast: "",
    });
  }
  return rows;
}

const ROWS = buildRows();

const EXAMPLE_NETS = [
  { base: "192.168.0.0", cidr: 24 },
  { base: "10.0.0.0", cidr: 8 },
  { base: "172.16.0.0", cidr: 12 },
];

function ipToInt(ip: string) { return ip.split(".").reduce((a, b) => (a << 8) + parseInt(b), 0) >>> 0; }
function intToIp(n: number) { return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join("."); }

export function SubnetCheatSheet() {
  const [showExamples, setShowExamples] = useState(true);

  return (
    <div className="space-y-6">
      {/* Print button */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-white p-4">
        <p className="text-xs text-text-muted">
          <RefreshCw className="me-1 inline size-3" />
          آماده چاپ — کاغذ کم مصرف. <span className="font-bold text-text-primary">برای پرینت، حالت تیره مناسب است</span>
        </p>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer className="size-4" />
          چاپ / PDF
        </Button>
      </div>

      {/* Toggle examples */}
      <div className="flex gap-2">
        <button onClick={() => setShowExamples(true)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold", showExamples ? "bg-primary-600 text-white" : "bg-gray-100 text-text-muted")}>
          جدول CIDR
        </button>
        <button onClick={() => setShowExamples(false)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold", !showExamples ? "bg-primary-600 text-white" : "bg-gray-100 text-text-muted")}>
          مثال‌ها
        </button>
      </div>

      {/* CIDR Table */}
      {showExamples && (
        <div className="overflow-x-auto rounded-2xl border border-border print:border-gray-300">
          <table className="w-full min-w-152 text-right text-[13px]">
            <thead>
              <tr className="border-b-2 border-primary-200 bg-primary-50">
                <th className="px-4 py-2.5 font-bold text-primary-800">CIDR</th>
                <th className="px-4 py-2.5 font-bold text-primary-800">ماسک زیرشبکه</th>
                <th className="px-4 py-2.5 font-bold text-primary-800">میزبان‌های قابل استفاده</th>
                <th className="px-4 py-2.5 font-bold text-primary-800">Wildcard</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.cidr} className={cn("border-b border-border/60 transition-colors", r.cidr === "/24" || r.cidr === "/16" || r.cidr === "/8" ? "bg-amber-50/70" : "hover:bg-gray-50")}>
                  <td className="px-4 py-1.5 font-mono font-bold text-primary-700">{r.cidr}</td>
                  <td className="px-4 py-1.5 font-mono text-text-primary">{r.mask}</td>
                  <td className="px-4 py-1.5 font-mono text-text-primary">{r.hosts}</td>
                  <td className="px-4 py-1.5 font-mono text-text-muted">{r.wildcard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Examples */}
      {!showExamples && (
        <div className="space-y-4">
          {EXAMPLE_NETS.map(({ base, cidr }) => {
            const baseInt = ipToInt(base);
            const hostBits = 32 - cidr;
            const mask = (() => {
              const bits = 0xffffffff << (32 - cidr);
              return [(bits >>> 24) & 0xff, (bits >>> 16) & 0xff, (bits >>> 8) & 0xff, bits & 0xff].join(".");
            })();
            return (
              <div key={base + cidr} className="rounded-2xl border border-border bg-white p-5">
                <h3 className="font-mono text-sm font-black text-text-primary">{base}/{cidr}</h3>
                <p className="mt-1 text-xs text-text-muted">
                  Mask: <code className="font-mono text-primary-700">{mask}</code> · Hosts: <b>{toFaDigits(Math.pow(2, hostBits) - 2)}</b> usable
                </p>
                <div className="mt-3 overflow-hidden rounded-xl border">
                  {Array.from({ length: Math.min(8, Math.pow(2, hostBits > 4 ? 0 : 1)) }).map((_, i) => {
                    const net = baseInt + i * Math.pow(2, hostBits);
                    const bcast = net + Math.pow(2, hostBits) - 1;
                    return (
                      <div key={i} className="flex justify-between bg-gray-50 px-4 py-2 text-xs font-mono border-b border-border/60 last:border-0">
                        <span className="text-emerald-700">{intToIp(net)}</span>
                        <span className="text-text-muted">{intToIp(net + 1)} … {intToIp(bcast - 1)}</span>
                        <span className="text-red-500">{intToIp(bcast)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; inset: 0; width: 100%; }
          @page { margin: 12mm; }
        }
      `}</style>
    </div>
  );
}