"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Trash2, X } from "lucide-react";
import { runCommand, banner, SUGGESTED_COMMANDS, type TermLine } from "@/lib/terminal-commands";
import { useHotkeys } from "@/components/motion/hotkey";
import { cn } from "@/lib/utils";

type Entry = { id: number; input: string; lines: TermLine[] };

export function NetworkTerminal({ onClose }: { onClose?: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, input: "", lines: banner() }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(true);

  // Autoscroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, open]);

  // Focus input on click anywhere
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function computeSuggestion(value: string, cmds: string[]) {
    const parts = value.trimStart().split(/\s+/);
    if (parts.length !== 1) return "";
    const match = cmds.find((c) => c.startsWith(parts[0].toLowerCase()) && c !== parts[0]);
    return match ?? "";
  }

  function run(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const { lines, clear } = runCommand(trimmed);
    if (clear) {
      setEntries((prev) => [{ id: idRef.current++, input: trimmed, lines: [] }]);
    } else {
      setEntries((prev) => [...prev, { id: idRef.current++, input: trimmed, lines }]);
    }
    setHistory((prev) => [trimmed, ...prev.slice(0, 29)]);
    setHistoryIdx(-1);
    setInput("");
    setSuggestion("");
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
        return;
      }
      const next = historyIdx - 1;
      setHistoryIdx(next);
      setInput(history[next]);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        setSuggestion("");
      }
    }
  };

  // Global hotkey: Ctrl+` toggles open
  useHotkeys([
    { key: "`", description: "باز/بستن ترمینال", handler: () => setOpen((v) => !v), modifiers: { ctrl: true } },
  ]);

  const promptText = "student@netdad:~$";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className={cn("w-full overflow-hidden rounded-2xl border border-border bg-[#0d1117] text-[13px] shadow-2xl", onClose && "fixed bottom-6 right-6 z-50 w-[min(90vw,560px)]")}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="ms-2 font-mono text-xs text-gray-400">netdad-simulator — bash</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="hidden font-mono text-[10px] text-gray-500 sm:inline">Ctrl+`</span>
              {onClose && (
                <button type="button" onClick={onClose} className="grid size-6 place-items-center rounded-md text-gray-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="بستن">
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-1.5 border-b border-white/5 bg-[#0d1117] px-4 py-2">
            {SUGGESTED_COMMANDS.slice(0, 4).map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => run(cmd)}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-gray-300 transition-colors hover:border-primary-400/50 hover:bg-primary-500/10 hover:text-primary-300"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Output */}
          <div ref={scrollRef} className="h-72 overflow-y-auto px-4 py-3 font-mono" onClick={() => inputRef.current?.focus()}>
            {entries.map((entry) => (
              <div key={entry.id} className="mb-1">
                {entry.input && (
                  <div className="flex gap-2 text-gray-300">
                    <span className="select-none text-primary-400">{promptText}</span>
                    <span>{entry.input}</span>
                  </div>
                )}
                {entry.lines.map((line, i) => (
                  <pre
                    key={i}
                    className={cn(
                      "whitespace-pre-wrap font-mono text-[12.5px] leading-6",
                      line.kind === "err" && "text-red-400",
                      line.kind === "ok" && "text-emerald-400",
                      line.kind === "warn" && "text-amber-400",
                      line.kind === "dim" && "text-gray-500",
                      (!line.kind || line.kind === "out") && "text-gray-300",
                    )}
                  >
                    {line.text || "\u00A0"}
                  </pre>
                ))}
              </div>
            ))}

            {/* Current prompt + input */}
            <div className="mt-1 flex items-center gap-2">
              <span className="select-none whitespace-nowrap text-primary-400">{promptText}</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setSuggestion(computeSuggestion(e.target.value, ["ping", "tracert", "ipconfig", "ifconfig", "nslookup", "arp", "netstat", "route", "whoami", "echo", "clear", "help", "exit"])); setHistoryIdx(-1); }}
                  onKeyDown={onKeyDown}
                  placeholder="help or ping google.com…"
                  className="w-full bg-transparent font-mono text-[13px] text-gray-100 caret-primary-400 outline-none placeholder:text-gray-600"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="دستور شبکه"
                />
                {/* Suggestion (ghost text) */}
                {suggestion && !input.endsWith(suggestion) && (
                  <span className="pointer-events-none absolute inset-y-0 left-0 hidden font-mono text-[13px] text-gray-600">
                    {suggestion.slice(input.length)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="flex items-center justify-between border-t border-white/10 bg-[#161b22] px-4 py-1.5">
            <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
              <Terminal className="size-3" />
              شبیه‌ساز — دستورات شبیه‌سازی‌شده‌اند
            </span>
            <button type="button" onClick={() => run("clear")} className="flex items-center gap-1 text-[10px] text-gray-500 transition-colors hover:text-gray-300" title="پاک‌کردن">
              <Trash2 className="size-3" />
              پاک‌کردن
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}