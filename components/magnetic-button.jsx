"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Efek "magnetic" lama menghitung ulang & menulis style.transform di
 * setiap mousemove tanpa spring/throttle. Di sini posisi disimpan di
 * motion values (di luar React render loop) dan dihaluskan dengan
 * spring fisik (stiffness 150 / damping 15) -> gerak lembut & tetap 60fps+
 * karena hanya `transform: translate3d()` yang disentuh.
 */
export default function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`gpu-layer ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}
