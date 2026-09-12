"use client";

import { cn } from "@/lib/utils";

// Lightweight educational SVG diagrams rendered per chapter — no external images needed.
// Each diagram is a stylized visual that reinforces the chapter's core concept.

export function LessonDiagram({ chapter }: { chapter: number }) {
  return (
    <div className="not-prose my-6 rounded-2xl border border-border bg-gradient-to-b from-gray-50 to-white p-6" dir="ltr">
      {chapter === 2 && <OsiDiagram />}
      {chapter === 8 && <TcpHandshake />}
      {chapter === 1 && <NetworkBasic />}
      {chapter === 5 && <SubnetDiagram />}
      {chapter === 3 && <CableDiagram />}
      {chapter === 4 && <SwitchDiagram />}
      {chapter === 7 && <RoutingDiagram />}
      {chapter === 9 && <DnsDiagram />}
      {chapter === 13 && <Ipv6Diagram />}
      {chapter === 11 && <SecurityDiagram />}
      {chapter === 10 && <WirelessDiagram />}
      {chapter === 12 && <TroubleshootDiagram />}
      {chapter === 6 && <ArpDiagram />}
      {chapter === 14 && <CloudDiagram />}
    </div>
  );
}

/* ─── Individual diagram components ─── */

function LayerStack({ layers, title }: { layers: string[]; title: string }) {
  const colors = ["bg-emerald-100 text-emerald-800 border-emerald-200", "bg-teal-100 text-teal-800 border-teal-200", "bg-cyan-100 text-cyan-800 border-cyan-200", "bg-sky-100 text-sky-800 border-sky-200", "bg-blue-100 text-blue-800 border-blue-200", "bg-indigo-100 text-indigo-800 border-indigo-200", "bg-violet-100 text-violet-800 border-violet-200"];
  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="mb-1 text-xs font-bold text-text-muted">{title}</p>
      {layers.map((l, i) => (
        <div key={l} className={cn("flex w-full max-w-xs items-center justify-between rounded-lg border px-4 py-2 text-sm font-bold", colors[i % colors.length])}>
          <span className="font-mono text-[10px] text-text-light">{i + 1}</span>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

function OsiDiagram() {
  const layers = ["Application", "Presentation", "Session", "Transport", "Network", "Data Link", "Physical"];
  return <LayerStack layers={layers} title="OSI Model — 7 Layers" />;
}

function TcpHandshake() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3 text-center">
        <div className="rounded-xl bg-emerald-100 px-5 py-2 text-sm font-bold text-emerald-800">Client</div>
        <div className="flex flex-col items-center gap-1 text-xs font-mono text-text-muted">
          <span className="rounded bg-blue-50 px-3 py-1 text-blue-700">SYN →</span>
          <span className="rounded bg-amber-50 px-3 py-1 text-amber-700">← SYN-ACK</span>
          <span className="rounded bg-emerald-50 px-3 py-1 text-emerald-700">ACK →</span>
        </div>
        <div className="rounded-xl bg-sky-100 px-5 py-2 text-sm font-bold text-sky-800">Server</div>
      </div>
    </div>
  );
}

function NetworkBasic() {
  return (
    <div className="flex items-center justify-center gap-4 text-center">
      <div className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-text-primary">PC</div>
      <div className="text-xs text-text-light">⇄</div>
      <div className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-text-primary">Switch</div>
      <div className="text-xs text-text-light">⇄</div>
      <div className="rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm font-bold text-primary-700">Router → Internet</div>
    </div>
  );
}

function SubnetDiagram() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="rounded-xl bg-primary-100 px-5 py-2 text-sm font-bold text-primary-800">192.168.1.0/24</div>
      <div className="flex gap-2">
        {["192.168.1.0/26", "192.168.1.64/26", "192.168.1.128/26", "192.168.1.192/26"].map((s) => (
          <div key={s} className="rounded-lg border border-primary-200 bg-white px-2 py-1.5 font-mono text-[10px] text-text-muted">{s}</div>
        ))}
      </div>
    </div>
  );
}

function CableDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-2">
        {["green", "orange", "blue", "brown"].map((c) => (
          <div key={c} className={`h-3 w-12 rounded-full`} style={{ backgroundColor: c === "brown" ? "#92400e" : c === "green" ? "#16a34a" : c === "orange" ? "#ea580c" : "#2563eb" }} />
        ))}
      </div>
      <p className="text-xs font-bold text-text-muted">RJ45 — 8 wires, 4 pairs</p>
    </div>
  );
}

function SwitchDiagram() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="grid grid-cols-4 gap-2">
        {["PC1", "PC2", "PC3", "PC4"].map((p) => <div key={p} className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-bold text-text-primary">{p}</div>)}
      </div>
      <div className="rounded-xl bg-primary-100 px-6 py-2 text-sm font-bold text-primary-800">Layer 2 Switch</div>
    </div>
  );
}

function RoutingDiagram() {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <div className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold">Network A</div>
      <div className="rounded-xl bg-primary-100 px-4 py-2 text-sm font-bold text-primary-800">Router</div>
      <div className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold">Network B</div>
    </div>
  );
}

function DnsDiagram() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <span>you type: netdad.ir</span>
        <span className="text-primary-500">→</span>
        <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-700">DNS → 104.21.x.x</span>
      </div>
    </div>
  );
}

function Ipv6Diagram() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="rounded-xl bg-indigo-50 px-5 py-3 font-mono text-sm font-bold text-indigo-800" dir="ltr">2001:0db8:85a3:0000:0000:8a2e:0370:7334</div>
      <p className="text-xs text-text-muted">128-bit address — 8 groups of 16-bit hex</p>
    </div>
  );
}

function SecurityDiagram() {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700">Internet</div>
      <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">🔒 Firewall</div>
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">Internal</div>
    </div>
  );
}

function WirelessDiagram() {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <div className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold">Laptop</div>
      <div className="text-primary-400 text-2xl">📶</div>
      <div className="text-primary-400 text-2xl">📶</div>
      <div className="rounded-xl bg-primary-100 px-4 py-2 text-sm font-bold text-primary-800">Access Point</div>
    </div>
  );
}

function TroubleshootDiagram() {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      {["1. Identify", "2. Theorize", "3. Test", "4. Fix", "5. Verify"].map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className="rounded-lg border border-border bg-white px-3 py-2 text-xs font-bold text-text-primary">{s}</div>
          {i < 4 && <span className="text-text-light">→</span>}
        </div>
      ))}
    </div>
  );
}

function ArpDiagram() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-xs font-bold text-text-muted">ARP — MAC resolution</p>
      <div className="rounded-xl bg-emerald-50 px-5 py-2 font-mono text-xs text-emerald-800">Who has 192.168.1.1? → Broadcast</div>
      <div className="rounded-xl bg-sky-50 px-5 py-2 font-mono text-xs text-sky-800">Reply: 192.168.1.1 is at AA:BB:CC:DD:EE:FF</div>
    </div>
  );
}

function CloudDiagram() {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <div className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold">Your App</div>
      <div className="text-primary-400 text-xl">☁️</div>
      <div className="rounded-xl bg-primary-100 px-5 py-2 text-sm font-bold text-primary-800">Cloud (AWS / Azure / GCP)</div>
    </div>
  );
}