"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock3, ArrowRight } from "lucide-react";
import MagneticButton from "./magnetic-button";

function getGreeting(hour) {
  if (hour < 11) return "Selamat pagi, saya";
  if (hour < 15) return "Selamat siang, saya";
  if (hour < 19) return "Selamat sore, saya";
  return "Selamat malam, saya";
}

export default function Hero() {
  // Dihitung di client (useEffect) supaya render server & client pertama
  // selalu identik -> tidak ada hydration warning/flicker teks greeting.
  const [greeting, setGreeting] = useState("Halo, saya");
  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="section-inner grid w-full items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="gpu-layer mb-4 flex items-center gap-2 font-mono text-sm text-text-secondary"
          >
            <Clock3 size={15} className="text-accent" /> {greeting}
          </motion.p>

          <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.25 }}
              className="gpu-layer block"
            >
              Rizky
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
              className="gpu-layer block bg-signature bg-clip-text text-transparent"
            >
              Irawan
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
            className="gpu-layer mt-5 text-lg text-text-secondary"
          >
            Web Developer <span className="mx-2 text-border-strong">|</span> Crafting Digital Experiences
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.75 }}
            className="gpu-layer mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton href="#projects" className="btn btn--primary">
              <span>Lihat Karya</span> <ArrowRight size={17} />
            </MagneticButton>
            <MagneticButton href="#contact" className="btn btn--ghost">
              <span>Hubungi Saya</span>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          className="gpu-layer relative mx-auto aspect-square w-full max-w-[380px]"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-full bg-signature opacity-30 blur-3xl"
          />
          <Image
            src="/assets/52824.jpg"
            alt="Foto Rizky Irawan"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 380px"
            className="relative rounded-[28px] border border-border object-cover shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
