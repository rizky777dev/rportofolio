"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./reveal";

const FAQS = [
  {
    q: "Apa fokus utama kamu di bidang pemrograman?",
    a: "Saya fokus pada logika logika dasar pemrograman dan pengembangan antarmuka web modern menggunakan JavaScript. Saya juga terbiasa menggunakan kerangka kerja seperti Next.js untuk membangun aplikasi web yang cepat dan terstruktur.",
  },
  {
    q: "Selain web development, teknologi atau tool apa lagi yang sering kamu eksplorasi?",
    a: "Saya cukup aktif mengeksplorasi konsep pemrosesan logika, kontrol versi seperti GitHub untuk mengelola repositori kode, serta alat bantu konfigurasi proyek berbasis JavaScript.",
  },
  {
    q: "Bagaimana alur kerja kamu saat memulai sebuah proyek baru?",
    a: "Biasanya dimulai dari persiapan repositori, penyiapan berkas konfigurasi proyek (seperti penataan file dan dependensi), baru kemudian mengeksekusi struktur komponen dan tampilannya secara bertahap.",
  },
  {
    q: "Seperti apa gaya kamu dalam menyelesaikan sebuah masalah atau bug?",
    a: "Saya tipe orang yang teliti, detail, dan suka memastikan segala sesuatu presisi—termasuk meminimalisir kesalahan penulisan (typo) pada data atau antarmuka. Jika ada eror, saya akan cek urutan langkahnya secara sistematis sampai ketemu solusi terbaiknya.",
  },
  {
    q: "Bagaimana cara kerja WhatsApp Bot yang kamu kembangkan?",
    a: "Bot dikembangkan menggunakan Node.js dengan memanfaatkan pustaka integrasi (seperti Baileys atau whatsapp-web.js). Bot berjalan di server backend untuk mendengarkan pesan masuk secara real-time via webhook/event listener, memproses logika, lalu mengirimkan balasan otomatis.",
  },
];

function FaqItem({ q, a, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay} className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium"
      >
        <span>{q}</span>
        <Plus
          size={18}
          className={`shrink-0 text-accent transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        />
      </button>
      {/* grid-template-rows 0fr -> 1fr: animasi buka/tutup tanpa mengukur
          height lewat JS (tidak ada layout thrashing dari getBoundingClientRect). */}
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-5 text-text-secondary">{a}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        09 · Frequently Asked Questions
      </Reveal>
      <Reveal as="h2" className="section-title">
        Got Questions?
      </Reveal>

      <div>
        {FAQS.map((f, i) => (
          <FaqItem key={f.q} {...f} delay={i * 0.06} />
        ))}
      </div>
    </section>
  );
}
