"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-right bg-gradient-to-l from-primary-400 via-primary-500 to-primary-600"
      style={{ scaleX, opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
      aria-hidden
    />
  );
}