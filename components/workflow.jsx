"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./reveal";

const STEPS = [
  {
    title: "Research & Wireframe",
    desc: "Memahami tujuan & pengguna dulu, lalu menyusun struktur halaman kasar sebelum menyentuh visual.",
  },
  {
    title: "Clean Architecture",
    desc: "Menyusun struktur kode & data yang jelas sejak awal, supaya mudah dikembangkan tanpa jadi berantakan.",
  },
  {
    title: "Pixel Perfect Styling",
    desc: "Detail spacing, tipografi, dan animasi dipoles sampai terasa presisi di setiap breakpoint layar.",
  },
  {
    title: "Deployment",
    desc: "Rilis ke hosting, uji ulang di perangkat nyata, lalu serah terima dengan dokumentasi singkat.",
  },
];

export default function Workflow() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="workflow" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        08 · Workflow &amp; Principles
      </Reveal>
      <Reveal as="h2" className="section-title">
        How I Work
      </Reveal>
      <Reveal className="mb-10 -mt-6 text-text-secondary">
        Empat langkah tetap yang saya pakai di setiap proyek, kecil maupun besar.
      </Reveal>

      <div ref={trackRef} className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-[2px] bg-border lg:block" />
        <motion.div
          style={{ scaleX: fill, originX: 0 }}
          className="gpu-layer absolute left-0 right-0 top-6 hidden h-[2px] bg-signature lg:block"
        />
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.12} className="relative">
            <div className="relative z-10 mb-4 grid h-12 w-12 place-items-center rounded-full border border-accent bg-bg-elevated font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{step.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
