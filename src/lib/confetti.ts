"use client";

export function fireConfetti() {
  const c = (window as unknown as { confetti?: (opts?: Record<string, unknown>) => void }).confetti;
  if (!c) return;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
  c({ ...defaults, particleCount: 40, origin: { x: 0.3, y: 0.6 } });
  c({ ...defaults, particleCount: 40, origin: { x: 0.7, y: 0.6 } });
  setTimeout(() => {
    c({ ...defaults, particleCount: 60, origin: { x: 0.5, y: 0.5 }, colors: ["#10b981", "#059669", "#047857"] });
  }, 200);
}