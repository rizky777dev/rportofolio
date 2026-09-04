"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Mencegah hydration-mismatch: render placeholder netral sampai mounted,
  // BUKAN dengan menyembunyikan seluruh tombol (itu yang menyebabkan "lompatan"
  // layout). Placeholder punya dimensi identik jadi tidak ada CLS/flicker.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      aria-label="Ganti tema gelap/terang"
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-bg-inset transition-colors duration-200 hover:border-accent active:scale-95"
    >
      {/* transform+opacity saja -> girang di GPU, tidak pernah reflow */}
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="gpu-layer absolute grid place-items-center"
        >
          {isDark ? (
            <Moon size={18} className="text-accent" />
          ) : (
            <Sun size={18} className="text-[#E8A33D]" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
