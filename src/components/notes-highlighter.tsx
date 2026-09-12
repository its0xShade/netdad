"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Highlighter, StickyNote, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Note = { id: string; text: string; note?: string; color: string; lessonId: string };

const COLORS = ["#fde68a", "#a7f3d0", "#bae6fd", "#fbcfe8"];
const KEY = (lessonId: string) => `netdad-highlights-${lessonId}`;

function load(lessonId: string): Note[] {
  try { return JSON.parse(localStorage.getItem(KEY(lessonId)) || "[]"); } catch { return []; }
}
function save(lessonId: string, notes: Note[]) {
  localStorage.setItem(KEY(lessonId), JSON.stringify(notes));
}

export function NotesHighlighter({ lessonId }: { lessonId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [popup, setPopup] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => { setNotes(load(lessonId)); }, [lessonId]);

  // Mouseup on content → show popup if selection
  useEffect(() => {
    function onMouseUp() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) { setPopup(null); return; }
      const text = sel.toString().trim();
      if (!text || text.length < 2) { setPopup(null); return; }
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) { setPopup(null); return; }
      setPopup({ x: rect.left + rect.width / 2, y: rect.top + window.scrollY - 12, text });
    }
    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, []);

  function addHighlight(color: string) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !popup) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement("mark");
    span.style.backgroundColor = color;
    span.style.borderRadius = "3px";
    span.style.padding = "0 2px";
    span.className = "hl-note";
    try {
      range.surroundContents(span);
    } catch {
      // fallback: wrap just the text node
      const frag = range.extractContents();
      span.appendChild(frag);
      range.insertNode(span);
    }
    const id = `hl-${Date.now()}`;
    span.dataset.noteId = id;
    const newNote: Note = { id, text: popup.text, color, lessonId };
    const next = [...notes, newNote];
    setNotes(next);
    save(lessonId, next);
    setPopup(null);
    sel.removeAllRanges();
  }

  const removeHighlight = useCallback((id: string) => {
    document.querySelectorAll(`mark[data-note-id="${id}"]`).forEach((el) => {
      el.replaceWith(document.createTextNode(el.textContent || ""));
    });
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    save(lessonId, next);
  }, [notes, lessonId]);

  function clearAll() {
    if (!confirm("همه هایلایت‌های این درس پاک شوند؟")) return;
    document.querySelectorAll("mark.hl-note").forEach((el) => el.replaceWith(document.createTextNode(el.textContent || "")));
    setNotes([]);
    save(lessonId, []);
  }

  return (
    <>
      {/* Selection popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-[300] flex items-center gap-1 rounded-xl border border-border bg-white p-1.5 shadow-xl"
            style={{ left: popup.x, top: popup.y, transform: "translate(-50%, -100%)" }}
          >
            {COLORS.map((c) => (
              <button key={c} onClick={() => addHighlight(c)} className="size-6 rounded-full border border-black/10 transition-transform hover:scale-110" style={{ backgroundColor: c }} aria-label="هایلایت با این رنگ" />
            ))}
            <button onClick={() => addHighlight("#fff3bf")} className="ml-1 flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-text-muted hover:bg-gray-100">
              <StickyNote className="size-3" /> Note
            </button>
            <button onClick={() => setPopup(null)} className="ms-1 rounded-lg p-1 text-text-light hover:bg-gray-100">
              <X className="size-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating panel — list of highlights */}
      {notes.length > 0 && (
        <div className="fixed bottom-24 left-4 z-[90] w-64 rounded-2xl border border-border bg-white/95 p-3 shadow-lg backdrop-blur no-print">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-text-primary">
              <Highlighter className="size-3.5 text-primary-500" />
              هایلایت‌ها ({notes.length})
            </span>
            <button onClick={clearAll} className="text-[10px] text-red-400 hover:text-red-600">پاک کردن</button>
          </div>
          <div className="max-h-40 space-y-1.5 overflow-y-auto">
            {notes.map((n) => (
              <div key={n.id} className="group flex items-start gap-2 rounded-lg bg-gray-50 p-2">
                <span className="mt-0.5 size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: n.color }} />
                <p className="flex-1 text-[11px] leading-5 text-text-muted line-clamp-2">{n.text}</p>
                <button onClick={() => removeHighlight(n.id)} className="hidden text-text-light hover:text-red-500 group-hover:block">
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}