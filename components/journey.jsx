"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./reveal";

const ITEMS = [
  {
    year: "2023 — 2024",
    role: "Bot Developer",
    desc: "Automating the future. Saya membangun WhatsApp Bot yang didukung oleh JavaScript dan scraping techniques. Saya mengubah alur manual menjadi otomatis, menciptakan sistem yang tidak hanya cepat, tetapi juga memberikan pengalaman pengguna (user experience) yang mulus dan interaktif.",
  },
  {
    year: "2025 — Sekarang",
    role: "Website Developer",
    desc: "Saya membangun website yang responsif dan berestetika tinggi. Fokus saya sederhana: menciptakan antarmuka yang bersih, navigasi yang intuitif, dan pengalaman pengguna yang mulus untuk setiap layar. Crafting professional digital solutions, one pixel at a time.",
  },
];

export default function Journey() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="journey" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        04 · Journey
      </Reveal>
      <Reveal as="h2" className="section-title">
        Journey &amp; Experience
      </Reveal>

      <div ref={trackRef} className="relative pl-8">
        <div className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-[2px] bg-border" />
        {/* scaleY, origin di atas -> compositor-only scroll-linked fill */}
        <motion.div
          style={{ scaleY: fill, originY: 0 }}
          className="gpu-layer absolute left-[7px] top-1 h-[calc(100%-8px)] w-[2px] bg-signature"
        />

        <div className="flex flex-col gap-10">
          {ITEMS.map((item) => (
            <Reveal key={item.role} className="relative">
              <span className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-bg" />
              <div className="rounded-lg border border-border bg-bg-elevated p-6 shadow-sm">
                <span className="font-mono text-xs text-accent">{item.year}</span>
                <h3 className="mt-1 font-display text-lg font-semibold">{item.role}</h3>
                <p className="mt-2 text-text-secondary">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
