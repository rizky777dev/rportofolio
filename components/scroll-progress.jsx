"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Versi lama menganimasikan `width` -> memicu layout/reflow di setiap
 * frame scroll. Di sini kita animasikan `scaleX` (transform) pada elemen
 * yang origin-nya di kiri -> murni compositor, tidak pernah reflow.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="gpu-layer fixed left-0 top-0 z-[9999] h-[3px] w-full origin-left bg-signature"
    />
  );
}
