"use client";

import { memo, useEffect, useRef } from "react";

/**
 * Ambient constellation background.
 * Optimasi kinerja (10-20fps -> 60-120fps):
 *  - Satu rAF loop untuk seluruh canvas, TIDAK ada setInterval.
 *  - devicePixelRatio dibatasi (max 2) supaya tidak menggambar jutaan
 *    piksel sia-sia di layar retina/4K.
 *  - Posisi mouse ditangkap lewat ref biasa (bukan React state) supaya
 *    mousemove TIDAK memicu re-render komponen 60x/detik.
 *  - resize di-debounce lewat rAF, bukan langsung dieksekusi per event.
 *  - Loop otomatis berhenti (cancelAnimationFrame) saat unmount dan saat
 *    prefers-reduced-motion aktif -> tidak ada listener/RAF yang bocor.
 */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let rafId = null;
    let resizeRafId = null;
    const pointer = { x: -9999, y: -9999 };

    const isDark = () => document.documentElement.classList.contains("dark");

    function seed() {
      const density = Math.min(90, Math.floor((width * height) / 18000));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function onResize() {
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(resize);
    }

    function onPointerMove(e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      const dotColor = isDark() ? "139, 127, 255" : "91, 79, 233";
      const lineColor = isDark() ? "45, 212, 207" : "14, 165, 165";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14000) {
          const force = (14000 - distSq) / 14000;
          p.x -= dx * force * 0.01;
          p.y -= dy * force * 0.01;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, 0.6)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < 12000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${0.12 * (1 - d2 / 12000)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    resize();
    rafId = requestAnimationFrame(tick);

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full opacity-[0.55] transition-opacity duration-300 dark:opacity-70"
    />
  );
}

// memo: canvas tidak pernah butuh re-render dari parent (page.jsx) yang
// berubah karena state lain (mis. tab playground) -> mencegah re-mount sia-sia.
export default memo(ParticleField);
