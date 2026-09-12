"use client";

import { useState } from "react";
import { TerminalSquare, X } from "lucide-react";
import { NetworkTerminal } from "@/components/network-terminal";
import { motion, AnimatePresence } from "motion/react";

export function TerminalLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="fixed bottom-6 left-6 z-50 grid size-12 place-items-center rounded-full bg-[#0d1117] text-emerald-400 shadow-xl shadow-black/25 transition-colors hover:bg-[#161b22]"
        aria-label={open ? "بستن ترمینال" : "باز کردن ترمینال شبیه‌ساز"}
        title="ترمینال شبکه (Ctrl+`)"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="size-5" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <TerminalSquare className="size-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Terminal panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-20 left-6 z-50 w-[min(92vw,640px)]"
          >
            <NetworkTerminal onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}