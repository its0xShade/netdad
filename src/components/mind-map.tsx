"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Concept = { id: string; label: string; layer: string; desc: string; color: string };
type Edge = { from: string; to: string };

// Layer-by-layer concept map of networking
const CONCEPTS: Concept[] = [
  { id: "apps", label: "Applications", layer: "App", desc: "HTTP, DNS, DHCP, SMTP — what users touch", color: "bg-violet-500" },
  { id: "transport", label: "TCP / UDP", layer: "Transport", desc: "Reliability (TCP) vs speed (UDP). Ports, handshake, ACK", color: "bg-sky-500" },
  { id: "ip", label: "IP Addressing", layer: "Network", desc: "IPv4, IPv6, subnet masks, CIDR, routing", color: "bg-emerald-500" },
  { id: "arp", label: "ARP", layer: "Network", desc: "Resolves IP → MAC on local network", color: "bg-emerald-400" },
  { id: "routing", label: "Routing", layer: "Network", desc: "Routers forward packets between networks. Default gateway", color: "bg-emerald-600" },
  { id: "mac", label: "MAC Addresses", layer: "Data Link", desc: "48-bit hardware addresses on NICs", color: "bg-amber-500" },
  { id: "switch", label: "Switching", layer: "Data Link", desc: "Switches forward frames by MAC table", color: "bg-amber-400" },
  { id: "vlan", label: "VLANs", layer: "Data Link", desc: "Segment broadcast domains logically", color: "bg-amber-600" },
  { id: "phy", label: "Physical", layer: "Physical", desc: "Cables, fiber, Wi-Fi, signals, connectors", color: "bg-rose-500" },
  { id: "security", label: "Security", layer: "Across", desc: "Firewalls, VPNs, TLS, AAA — at every layer", color: "bg-red-500" },
  { id: "dns", label: "DNS", layer: "App", desc: "Names → IP addresses. Distributed database", color: "bg-violet-400" },
  { id: "nat", label: "NAT/PAT", layer: "Network", desc: "Private → public translation. Saves IPv4", color: "bg-emerald-300" },
];

const EDGES: Edge[] = [
  { from: "apps", to: "transport" },
  { from: "dns", to: "apps" },
  { from: "transport", to: "ip" },
  { from: "ip", to: "routing" },
  { from: "ip", to: "nat" },
  { from: "ip", to: "arp" },
  { from: "arp", to: "mac" },
  { from: "routing", to: "switch" },
  { from: "ip", to: "switch" },
  { from: "switch", to: "mac" },
  { from: "mac", to: "phy" },
  { from: "vlan", to: "switch" },
  { from: "security", to: "transport" },
  { from: "security", to: "ip" },
  { from: "security", to: "apps" },
];

const LAYER_ORDER = ["App", "Transport", "Network", "Data Link", "Physical"];

export function MindMap() {
  const [selected, setSelected] = useState<string | null>("ip");
  const [hovered, setHovered] = useState<string | null>(null);

  const conceptById = Object.fromEntries(CONCEPTS.map((c) => [c.id, c]));

  function neighbors(id: string): string[] {
    return EDGES.filter((e) => e.from === id || e.to === id).map((e) => (e.from === id ? e.to : e.from));
  }

  const layers = LAYER_ORDER.map((layer) => ({
    layer,
    concepts: CONCEPTS.filter((c) => c.layer === layer),
  }));

  // Position: each layer is a column; x = layer index, y = row
  const positions: Record<string, { x: number; y: number }> = {};
  layers.forEach((l, li) => {
    l.concepts.forEach((c, ci) => {
      positions[c.id] = { x: li * 240 + 100, y: ci * 120 + 60 };
    });
  });
  // Across layer (security) slides bottom
  const security = conceptById["security"];
  positions["security"] = { x: 720, y: 400 };

  const svgW = 240 * 5;
  const svgH = 420;

  function isConnected(a: string, b: string) {
    return EDGES.some((e) => (e.from === a && e.to === b) || (e.from === b && e.to === a));
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-white p-3 text-[11px] text-text-muted">
        <span className="font-bold text-text-primary">Concept Map:</span>
        {LAYER_ORDER.map((l) => (
          <span key={l} className="rounded-full bg-gray-100 px-2 py-0.5">{l}</span>
        ))}
        <span className="rounded-full bg-red-100 px-2 py-0.5 text-red-600">Security (across)</span>
        <span className="ms-auto hidden sm:inline">Click a node to see details</span>
      </div>

      {/* SVG Canvas */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-white p-4">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="min-w-[680px] w-full" style={{ height: svgH }}>
          {/* Layer backgrounds */}
          {LAYER_ORDER.map((l, li) => (
            <rect key={l} x={li * 240 + 10} y={10} width={220} height={380} rx={16} fill={li % 2 === 0 ? "#f8fafc" : "#f1f5f9"} stroke="none" />
          ))}

          {/* Edges */}
          {EDGES.map((e, i) => {
            const a = positions[e.from];
            const b = positions[e.to];
            const active = selected === e.from || selected === e.to;
            const connect = isConnected(selected as string, e.from) || isConnected(selected as string, e.to);
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={active || connect ? "#10b981" : "#cbd5e1"}
                strokeWidth={active || connect ? 2.5 : 1.5}
                strokeDasharray={active || connect ? "8,4" : "none"}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {CONCEPTS.map((c) => {
            const pos = positions[c.id];
            const isSel = selected === c.id;
            const isHover = hovered === c.id;
            const inNeighborhood = selected === null || selected === c.id || neighbors(selected).includes(c.id);
            return (
              <g
                key={c.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer"
                onClick={() => setSelected(isSel ? null : c.id)}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ opacity: inNeighborhood || isSel ? 1 : 0.35, transition: "opacity .2s" }}
              >
                <circle r={isSel || isHover ? 34 : 30} fill="white" stroke={c.color} strokeWidth={isSel ? 4 : 3} />
                <text textAnchor="middle" dy="4" fontSize="11" fontWeight="bold" fill="#334155" className="select-none">
                  {c.label.split(" ")[0].slice(0, 8)}
                </text>
                {/* Layer label */}
                <text textAnchor="middle" dy={-38} fontSize="8" fill={isSel ? c.color : "#94a3b8"}>
                  {c.layer}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <motion.div
        key={selected ?? "none"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-white p-5"
      >
        {selected && conceptById[selected] ? (
          <div className="flex items-start gap-4">
            <span className={cn("mt-0.5 size-9 shrink-0 rounded-xl", conceptById[selected].color)} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-text-primary">{conceptById[selected].label}</h3>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-text-muted">{conceptById[selected].layer}</span>
              </div>
              <p className="mt-1.5 text-sm leading-7 text-text-muted">{conceptById[selected].desc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {neighbors(selected).map((n) => (
                  <button key={n} onClick={() => setSelected(n)} className="rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary-700 transition-colors hover:bg-primary-100">
                    ← {conceptById[n].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted">Click any node to explore how the concepts connect.</p>
        )}
      </motion.div>
    </div>
  );
}