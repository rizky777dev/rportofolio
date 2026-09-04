"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Briefcase, Coffee, TrendingDown } from "lucide-react";
import Reveal from "./reveal";

const MILESTONES = [
  { label: "Projects Completed", target: 10, icon: Briefcase },
  { label: "Cups of Coffee", target: 999, icon: Coffee },
  { label: "Failed Project", sublabel: "(Learning Curve)", target: 1, icon: TrendingDown },
];

function CounterCard({ icon: Icon, target, label, sublabel, delay }) {
  const numRef = useRef(null);
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });

  // Counter ditulis langsung ke DOM lewat ref, BUKAN lewat useState per
  // frame -> menghindari ~60 re-render React per detik untuk animasi yang
  // sebenarnya cukup update tekstual sederhana.
  // CATATAN DURASI: 1200ms di sini sengaja, sama alasannya kayak skill bar --
  // ini counter "menghitung naik", bukan feedback UI instan. requestAnimationFrame
  // sendiri jalan di 60-120fps penuh (tiap tick = 1 frame), jadi tetap mulus;
  // yang panjang cuma total durasinya, bukan ada frame yang di-skip/lag.
  useEffect(() => {
    if (!inView || !numRef.current) return;
    const duration = 1200;
    const start = performance.now();
    let raf;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      numRef.current.textContent = Math.round(eased * target).toString();
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <Reveal delay={delay} ref={wrapRef} className="rounded-lg border border-border bg-bg-elevated p-8 text-center shadow-sm">
      <Icon size={26} className="mx-auto mb-4 text-accent" />
      <p className="font-display text-4xl font-semibold">
        <span ref={numRef}>0</span>
      </p>
      <p className="mt-2 text-sm text-text-secondary">
        {label} {sublabel && <span className="text-text-muted">{sublabel}</span>}
      </p>
    </Reveal>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        02 · Numbers
      </Reveal>
      <Reveal as="h2" className="section-title">
        Impact &amp; Milestones
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {MILESTONES.map((m, i) => (
          <CounterCard key={m.label} {...m} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
