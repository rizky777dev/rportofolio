"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Reveal from "./reveal";

const PROJECTS = [
  { title: "Store Website", url: "https://store.zkypro.my.id", category: "Web Application" },
  {
    title: "Portofolio 1",
    url: "https://rizky-information.netlify.app",
    category: "Personal Portofolio",
  },
  {
    title: "Portofolio 2",
    url: "https://portofolio.zkypro.my.id",
    category: "Personal Portfolio",
  },
];

function TiltCard({ title, url, category, delay }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // spring smoothing supaya tilt terasa "berat" secara fisik, bukan snap kasar
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <Reveal delay={delay} style={{ perspective: 800 }}>
      <motion.a
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="gpu-layer group relative block overflow-hidden rounded-lg border border-border bg-bg-elevated p-7 shadow-sm transition-shadow hover:shadow-glow"
      >
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-signature opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-30"
        />
        <span className="font-mono text-xs text-accent">{category}</span>
        <h3 className="mt-2 font-display text-xl font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-text-muted">{url.replace("https://", "")}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-primary">
          Kunjungi <ExternalLink size={14} />
        </span>
      </motion.a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        05 · Selected Work
      </Reveal>
      <Reveal as="h2" className="section-title">
        Featured Projects
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.title} {...p} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
