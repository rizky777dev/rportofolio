"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Reveal from "./reveal";
// PENTING: import di-ambil lewat namespace (`import * as`), BUKAN destructuring
// langsung dari barrel ("import { SiCss3 } from 'react-icons/si'"). Next.js
// (fitur experimental `optimizePackageImports`, aktif otomatis untuk
// react-icons sejak versi 14.x) menganalisis barrel file react-icons/si
// secara statis untuk tree-shaking. Untuk sebagian nama icon tertentu
// (di project ini: SiCss3, SiCsharp, SiVisualstudiocode) analisis itu salah
// dan hasilnya `undefined` saat build -> saat undefined itu dipakai sebagai
// komponen JSX (`<Icon />`), React melempar "Element type is invalid ...
// got: undefined" tepat pada saat prerender static export. Meng-import lewat
// namespace object menghindari jalur analisis barrel tsb sehingga semua named
// export diambil dari module asli, bukan dari hasil optimasi yang buggy.
import * as SiIcons from "react-icons/si";
// react-icons/fa juga ikut dianalisis oleh Next.js optimizePackageImports,
// jadi harus lewat namespace import - destructuring langsung
// ("import { FaJava } from 'react-icons/fa'") bisa menghasilkan undefined
// saat prerender static export ("Element type is invalid... got: undefined").
import * as FaIcons from "react-icons/fa";

const { FaJava, FaDatabase, FaNetworkWired } = FaIcons;

const {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiCplusplus,
  SiCsharp,
  SiGo,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiVisualstudiocode,
} = SiIcons;

/**
 * Urutan grup itu sendiri adalah informasi: Frontend selalu tampil duluan
 * (prioritas utama sesuai brief), lalu Backend, ditutup Database & Tools.
 * Angka 01/02/03 di header tiap grup BUKAN dekorasi -- itu literal urutan
 * prioritas stack yang diminta, jadi penomoran di sini dibenarkan.
 *
 * "mono: true" menandai logo yang aslinya hitam/nyaris-hitam (Next.js,
 * Express.js, GitHub). Logo begini butuh warna kebalikan tema supaya tidak
 * hilang di background gelap -- lihat resolveIconColor().
 */
const GROUPS = [
  {
    label: "Frontend Development",
    note: "bahasa & framework antarmuka",
    items: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000", mono: true },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Sass / SCSS", icon: SiSass, color: "#CC6699" },
    ],
  },
  {
    label: "Backend Development",
    note: "bahasa, framework & arsitektur server",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000", mono: true },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Java", icon: FaJava, color: "#EA2D2E" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "C#", icon: SiCsharp, color: "#239120" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "REST API", icon: FaNetworkWired, color: "#FF6C37" },
    ],
  },
  {
    label: "Database & Tools",
    note: "penyimpanan data & platform pendukung",
    items: [
      { name: "SQL", icon: FaDatabase, color: "#4479A1" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#181717", mono: true },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC" },
    ],
  },
];

// Container men-drive stagger, tiap pill men-drive animasi float-up + scale-in
// sendiri. staggerChildren 0.03s sesuai brief -- cukup cepat agar barisan
// panjang tidak terasa lambat, tapi tetap kebaca sebagai "muncul berurutan".
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.05 } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

function resolveIconColor(color, mono, isDark) {
  if (!mono) return color;
  return isDark ? "#F2F2F0" : "#16181D";
}

function Pill({ name, icon: Icon, color, mono }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const iconColor = resolveIconColor(color, mono, isDark);

  return (
    <motion.div
      variants={pillVariants}
      whileHover={{
        y: -5,
        scale: 1.05,
        borderColor: color,
        boxShadow: `0 0 0 1px ${color}40, 0 12px 28px -8px ${color}66`,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="gpu-layer flex cursor-default items-center gap-2 rounded-pill border border-border bg-bg-elevated/70 px-4 py-2.5 shadow-sm backdrop-blur-sm"
    >
      <motion.span
        aria-hidden="true"
        whileHover={{ rotate: [0, -12, 10, -4, 0] }}
        transition={{ duration: 0.5 }}
        className="gpu-layer flex text-base leading-none"
        style={{ color: iconColor }}
      >
        <Icon />
      </motion.span>
      <span className="whitespace-nowrap text-sm font-medium text-text-primary">{name}</span>
    </motion.div>
  );
}

function SkillGroup({ order, label, note, items }) {
  return (
    <div className="mb-10 last:mb-0">
      <Reveal className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{String(order).padStart(2, "0")}</span>
        <span className="font-display text-sm font-semibold text-text-primary">{label}</span>
        <span className="hidden font-mono text-xs text-text-muted sm:inline">— {note}</span>
        <span className="h-px flex-1 bg-border" />
      </Reveal>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
      >
        {items.map((item) => (
          <Pill key={item.name} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        03 · Stack
      </Reveal>
      <Reveal as="h2" className="section-title">
        Technical Skills
      </Reveal>
      <Reveal className="mb-10 -mt-6 text-text-secondary">
        Frontend jadi prioritas utama, disusul backend, lalu database &amp; tools.
      </Reveal>

      {GROUPS.map((group, i) => (
        <SkillGroup key={group.label} order={i + 1} {...group} />
      ))}
    </section>
  );
}
