"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { Trash2, Zap, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Device = { id: string; type: "pc" | "router" | "switch" | "server" | "cloud"; x: number; y: number; label: string };
type Link = { from: string; to: string };

const DEVICE_TYPES = [
  { type: "pc" as const, label: "PC", icon: "💻", color: "bg-sky-100 border-sky-300" },
  { type: "router" as const, label: "Router", icon: "🌐", color: "bg-amber-100 border-amber-300" },
  { type: "switch" as const, label: "Switch", icon: "🔀", color: "bg-emerald-100 border-emerald-300" },
  { type: "server" as const, label: "Server", icon: "🖥️", color: "bg-violet-100 border-violet-300" },
  { type: "cloud" as const, label: "Cloud", icon: "☁️", color: "bg-gray-100 border-gray-300" },
];

let nextId = 1;

export function NetworkBuilder() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [linkingMode, setLinkingMode] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  function addDevice(type: Device["type"]) {
    const labels = { pc: `PC-${nextId}`, router: `Router-${nextId}`, switch: `Switch-${nextId}`, server: `Server-${nextId}`, cloud: "Internet" };
    setDevices((d) => [...d, { id: `d${nextId}`, type, x: 200 + Math.random() * 300, y: 150 + Math.random() * 200, label: labels[type] || `Device-${nextId}` }]);
    nextId++;
  }

  function removeDevice(id: string) {
    setDevices((d) => d.filter((dv) => dv.id !== id));
    setLinks((l) => l.filter((lk) => lk.from !== id && lk.to !== id));
  }

  function startLink(id: string) {
    if (!linkingMode) return;
    if (selectedDevice && selectedDevice !== id) {
      setLinks((l) => [...l, { from: selectedDevice, to: id }]);
      setSelectedDevice(null);
      setLinkingMode(false);
    } else {
      setSelectedDevice(id);
    }
  }

  function removeLink(i: number) {
    setLinks((l) => l.filter((_, idx) => idx !== i));
  }

  function onPointerDown(e: React.PointerEvent, id: string) {
    e.stopPropagation();
    if (linkingMode) { startLink(id); return; }
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragging(id);
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setSelectedDevice(id);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || !canvasRef.current) return;
    const canvas = canvasRef.current.getBoundingClientRect();
    setDevices((prev) =>
      prev.map((d) =>
        d.id === dragging
          ? { ...d, x: Math.max(0, Math.min(canvas.width - 80, e.clientX - canvas.left - offset.x)), y: Math.max(0, Math.min(canvas.height - 50, e.clientY - canvas.top - offset.y)) }
          : d
      )
    );
  }

  function onPointerUp() { setDragging(null); }

  function clearAll() { setDevices([]); setLinks([]); setSelectedDevice(null); }

  const deviceById = Object.fromEntries(devices.map((d) => [d.id, d]));

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-white p-3">
        <span className="text-xs font-bold text-text-muted ms-2">افزودن:</span>
        {DEVICE_TYPES.map((dt) => (
          <button key={dt.type} onClick={() => addDevice(dt.type)} className={cn("rounded-xl border px-3 py-2 text-xs font-semibold transition-all hover:shadow-sm", dt.color)}>
            {dt.icon} {dt.label}
          </button>
        ))}
        <div className="mx-1 h-6 w-px bg-border" />
        <button onClick={() => { setLinkingMode(!linkingMode); setSelectedDevice(null); }} className={cn("rounded-xl border px-3 py-2 text-xs font-semibold transition-colors", linkingMode ? "border-primary-400 bg-primary-50 text-primary-700" : "border-border text-text-muted hover:border-primary-300")}>
          <Link2 className="size-3 inline" /> {linkingMode ? "دو دستگاه را کلیک کن" : "اتصال"}
        </button>
        <button onClick={clearAll} className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50">
          <Trash2 className="size-3 inline" /> پاک کردن
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative h-[500px] overflow-hidden rounded-2xl border-2 border-dashed border-border bg-gray-50/50"
        style={{ cursor: dragging ? "grabbing" : "default" }}
      >
        {/* Grid dots */}
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        {/* SVG for links */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {links.map((lk, i) => {
            const from = deviceById[lk.from];
            const to = deviceById[lk.to];
            if (!from || !to) return null;
            return (
              <g key={i}>
                <line x1={from.x + 40} y1={from.y + 20} x2={to.x + 40} y2={to.y + 20} stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                <circle cx={(from.x + to.x) / 2 + 40} cy={(from.y + to.y) / 2 + 20} r="3" fill="#38bdf8" />
              </g>
            );
          })}
        </svg>

        {/* Devices */}
        {devices.map((dev) => {
          const dt = DEVICE_TYPES.find((t) => t.type === dev.type)!;
          const isSelected = selectedDevice === dev.id;
          return (
            <motion.div
              key={dev.id}
              onPointerDown={(e) => onPointerDown(e, dev.id)}
              className={cn(
                "absolute flex select-none flex-col items-center gap-1 border-2 rounded-xl px-3 py-2 shadow-sm cursor-grab active:cursor-grabbing transition-all",
                dt.color,
                isSelected && "ring-2 ring-primary-400 ring-offset-2",
                dragging === dev.id && "z-20 shadow-lg",
                linkingMode && "hover:ring-2 hover:ring-primary-300",
              )}
              style={{ left: dev.x, top: dev.y }}
            >
              <span className="text-lg">{dt.icon}</span>
              <span className="text-[10px] font-bold text-text-primary">{dev.label}</span>
            </motion.div>
          );
        })}

        {/* Empty state */}
        {devices.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-sm text-text-light">
            از نوار بالا دستگاه اضافه کن
          </div>
        )}
      </div>

      {/* Links list */}
      {links.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-bold text-text-muted">اتصالات:</p>
          {links.map((lk, i) => {
            const from = deviceById[lk.from];
            const to = deviceById[lk.to];
            if (!from || !to) return null;
            return (
              <div key={i} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5 text-xs">
                <span className="text-text-muted">{from.label} ↔ {to.label}</span>
                <button onClick={() => removeLink(i)} className="text-red-400 hover:text-red-600"><Trash2 className="size-3" /></button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}