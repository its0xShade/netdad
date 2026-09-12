"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { toFaDigits } from "@/lib/format";

type SubnetBlock = { network: string; broadcast: string; range: string; hosts: number; binary: string };

function cidrToMask(cidr: number): string {
  const bits = 0xffffffff << (32 - cidr);
  return [(bits >>> 24) & 0xff, (bits >>> 16) & 0xff, (bits >>> 8) & 0xff, bits & 0xff].join(".");
}

function ipToInt(ip: string): number {
  return ip.split(".").reduce((a, b) => (a << 8) + parseInt(b), 0) >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}

function getSubnets(ip: string, cidr: number, splitCidr: number): SubnetBlock[] {
  const base = ipToInt(ip);
  const mask = cidrToMask(splitCidr);
  const hostBits = 32 - splitCidr;
  const hostsPerSubnet = Math.pow(2, hostBits);
  const count = Math.pow(2, splitCidr - cidr);
  const blocks: SubnetBlock[] = [];
  for (let i = 0; i < count; i++) {
    const netAddr = base + i * hostsPerSubnet;
    const bcast = netAddr + hostsPerSubnet - 1;
    blocks.push({
      network: intToIp(netAddr),
      broadcast: intToIp(bcast),
      range: `${intToIp(netAddr + 1)} — ${intToIp(bcast - 1)}`,
      hosts: hostsPerSubnet - 2,
      binary: intToIp(netAddr).split(".").map((o) => parseInt(o).toString(2).padStart(8, "0")).join("."),
    });
  }
  return blocks;
}

function getBinaryBar(ip: string, maskCidr: number) {
  const octets = ip.split(".").map(Number);
  return octets.flatMap((o) =>
    o.toString(2).padStart(8, "0").split("").map(Number)
  );
}

export function SubnetVisualizer() {
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState(24);
  const [splitCidr, setSplitCidr] = useState(26);
  const [subnets, setSubnets] = useState<SubnetBlock[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [showBinary, setShowBinary] = useState(false);

  const error = splitCidr <= cidr ? "Subnet CIDR must be greater than base CIDR" : splitCidr > 30 ? "Maximum CIDR is /30" : null;
  const mask = cidrToMask(cidr);
  const splitMask = cidrToMask(splitCidr);
  const subnetCount = error ? 0 : Math.pow(2, splitCidr - cidr);
  const hostsPer = error ? 0 : Math.pow(2, 32 - splitCidr) - 2;
  const totalHosts = error ? 0 : subnetCount * (hostsPer + 2);
  const maxHosts = error ? 0 : Math.pow(2, 32 - cidr) - 2;

  function compute() {
    if (error) return;
    setSubnets(getSubnets(ip, cidr, splitCidr));
    setActive(null);
  }

  const colors = [
    "bg-emerald-400", "bg-sky-400", "bg-amber-400", "bg-rose-400",
    "bg-violet-400", "bg-teal-400", "bg-orange-400", "bg-indigo-400",
    "bg-pink-400", "bg-lime-400", "bg-cyan-400", "bg-fuchsia-400",
  ];

  const binaryBits = getBinaryBar(ip, cidr);
  const hostBits = 32 - cidr;
  const splitHostBits = 32 - splitCidr;
  const subnetBitsInHost = splitCidr - cidr;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-text-muted">Network IP</label>
          <input value={ip} onChange={(e) => setIp(e.target.value)} className="w-full rounded-xl border border-border bg-white px-4 py-3 font-mono text-sm text-text-primary outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" placeholder="192.168.1.0" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-text-muted">Base CIDR</label>
          <div className="flex items-center gap-3">
            <input type="range" min={8} max={30} value={cidr} onChange={(e) => setCidr(+e.target.value)} className="flex-1 accent-primary-500" />
            <span className="min-w-8 text-center font-mono text-sm font-bold text-primary-600">/{cidr}</span>
          </div>
          <p className="mt-1 text-[10px] text-text-light">Mask: {mask}</p>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-text-muted">Split into /{splitCidr}</label>
          <div className="flex items-center gap-3">
            <input type="range" min={cidr + 1} max={30} value={splitCidr} onChange={(e) => setSplitCidr(+e.target.value)} className="flex-1 accent-primary-500" />
            <span className="min-w-8 text-center font-mono text-sm font-bold text-primary-600">/{splitCidr}</span>
          </div>
          <p className="mt-1 text-[10px] text-text-light">Mask: {splitMask}</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="button"
        onClick={compute}
        disabled={!!error}
        className="w-full rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
      >
        Compute Subnets
      </button>

      {/* Stats */}
      {subnets.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Subnets", value: toFaDigits(subnetCount) },
            { label: "Hosts/each", value: toFaDigits(hostsPer) },
            { label: "Total usable", value: toFaDigits(totalHosts) },
            { label: "Utilization", value: `${Math.round((totalHosts / maxHosts) * 100)}%` },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-border bg-white p-3 text-center">
              <div className="text-lg font-black text-primary-600">{value}</div>
              <div className="text-[10px] text-text-muted">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Binary visualization toggle */}
      {subnets.length > 0 && (
        <button type="button" onClick={() => setShowBinary(!showBinary)} className="text-xs font-semibold text-primary-600 hover:underline">
          {showBinary ? "Hide" : "Show"} binary breakdown
        </button>
      )}

      {/* Binary bar */}
      {showBinary && subnets.length > 0 && (
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="mb-2 text-xs font-bold text-text-muted">Bit structure of {ip}/{cidr}</p>
          <div className="flex gap-0 font-mono">
            {binaryBits.map((bit, i) => {
              const isNet = i < cidr;
              const isSubnet = i >= cidr && i < splitCidr;
              const isHost = i >= splitCidr;
              return (
                <span
                  key={i}
                  className={cn(
                    "inline-flex h-7 w-5 items-center justify-center border border-black/10 text-[10px] font-bold",
                    isNet && "bg-primary-100 text-primary-800",
                    isSubnet && "bg-amber-100 text-amber-800",
                    isHost && "bg-gray-100 text-gray-600",
                  )}
                >
                  {bit}
                </span>
              );
            })}
          </div>
          <div className="mt-2 flex gap-4 text-[10px] text-text-muted">
            <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-primary-100" /> Network ({cidr} bits)</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-amber-100" /> Subnet ({subnetBitsInHost} bits)</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-gray-200" /> Host ({splitHostBits} bits)</span>
          </div>
        </div>
      )}

      {/* Visual blocks */}
      {subnets.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-bold text-text-muted">Subnet blocks ({subnetCount}) — click to expand</p>
          <div className={cn("grid gap-2", subnetCount <= 4 ? "grid-cols-1" : subnetCount <= 8 ? "grid-cols-2" : "grid-cols-3")}>
            {subnets.map((sn, i) => {
              const barWidth = ((sn.hosts + 2) / (maxHosts / subnetCount)) * 100;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setActive(active === i ? null : i)}
                  className={cn("cursor-pointer rounded-xl border-2 p-4 transition-all", active === i ? "border-primary-500 shadow-md" : "border-border hover:border-primary-300")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn("size-3 rounded-full", colors[i % colors.length])} />
                      <span className="font-mono text-sm font-bold text-text-primary">{sn.network}/{splitCidr}</span>
                    </div>
                    <span className="text-[10px] text-text-light">{toFaDigits(sn.hosts)} hosts</span>
                  </div>
                  {/* Size bar */}
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      className={cn("h-full rounded-full", colors[i % colors.length])}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(barWidth, 4)}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  {/* Expanded details */}
                  {active === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-1 text-xs text-text-muted">
                      <p><span className="font-semibold text-text-primary">Network:</span> <code className="font-mono">{sn.network}</code></p>
                      <p><span className="font-semibold text-text-primary">Broadcast:</span> <code className="font-mono">{sn.broadcast}</code></p>
                      <p><span className="font-semibold text-text-primary">Range:</span> <code className="font-mono">{sn.range}</code></p>
                      <p><span className="font-semibold text-text-primary">Binary:</span> <code className="font-mono text-[9px]">{sn.binary}</code></p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stacked bar preview */}
      {subnets.length > 0 && (
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="mb-2 text-xs font-bold text-text-muted">Visual proportion</p>
          <div className="flex h-10 overflow-hidden rounded-lg">
            {subnets.map((sn, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: `${((sn.hosts + 2) / totalHosts) * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={cn("flex items-center justify-center text-[10px] font-bold text-white", colors[i % colors.length])}
                title={`${sn.network}/${splitCidr}`}
              >
                {subnetCount <= 8 && sn.network.split(".").slice(2).join(".")}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}