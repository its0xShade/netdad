"use client";
import { useEffect, useState, useCallback } from "react";

const KEY = "netdad_progress";

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCompleted(JSON.parse(raw));
    } catch {}
  }, []);

  const isCompleted = useCallback((id: string) => completed.includes(id), [completed]);

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { completed, isCompleted, toggle };
}