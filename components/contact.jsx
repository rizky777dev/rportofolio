"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Instagram, Loader2, CheckCircle2, XCircle } from "lucide-react";
import Reveal from "./reveal";

// Ikon WhatsApp & TikTok tidak ada di lucide-react secara default -> SVG inline ringan.
function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1.1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.6-.4z" />
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M16.6 5.8a4.3 4.3 0 0 1-3-3.8h-3v13.4a2.6 2.6 0 1 1-1.8-2.5V9.6a5.9 5.9 0 1 0 4.8 5.8V9.3a7.3 7.3 0 0 0 4.5 1.5V7.6a4.3 4.3 0 0 1-1.5-1.8z" />
    </svg>
  );
}

const EMAIL = "zkyeea@gmail.com";
const WHATSAPP = "6285137577716";
// Access key gratis dari https://web3forms.com (submit email kamu, key
// langsung dikirim instan). Web3Forms didesain untuk dipanggil langsung
// dari browser di situs statis (GitHub Pages, dsb) -> tidak butuh server
// sendiri. Key ini publik/client-side by design (bukan rahasia seperti
// API key SMTP), tapi tetap disarankan set allowed domain di dashboard
// Web3Forms supaya cuma domain kamu yang boleh pakai key ini.
// SENGAJA TIDAK ADA FALLBACK HARDCODED DI SINI. Key harus selalu datang
// dari .env.local (lokal) atau GitHub Secret NEXT_PUBLIC_WEB3FORMS_KEY
// (saat build di Actions) -> lihat .env.local.example & DEPLOY.md.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  // status.type: "loading" | "success" | "error"
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "Semua field wajib diisi." });
      return;
    }
    if (form.company) {
      // Honeypot terisi -> kemungkinan besar bot. Diam-diam anggap sukses.
      setStatus({ type: "success", text: "Pesan terkirim! Saya akan segera membalas." });
      setForm({ name: "", email: "", message: "", company: "" });
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus({
        type: "error",
        text: "Form belum dikonfigurasi (access key kosong). Silakan hubungi lewat email/WA di bawah.",
      });
      return;
    }

    setStatus({ type: "loading", text: "Mengirim pesan..." });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Pesan baru dari ${form.name} lewat portfolio`,
          from_name: "Portfolio Rizky Irawan",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengirim pesan.");
      }

      setStatus({ type: "success", text: "Pesan terkirim! Saya akan segera membalas." });
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      setStatus({
        type: "error",
        text: `${err.message} Kamu juga bisa langsung email/WA saya.`,
      });
    }
  }

  return (
    <section id="contact" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        10 · Contact
      </Reveal>
      <Reveal as="h2" className="section-title">
        Get In Touch
      </Reveal>

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal className="flex flex-col gap-5">
          <p className="text-lg text-text-secondary">
            Punya proyek, ide, atau sekadar mau menyapa? Kotak masuk saya selalu terbuka.
          </p>

          <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-text-secondary hover:text-accent">
            <Mail size={18} /> <span>{EMAIL}</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-text-secondary hover:text-accent"
          >
            <WhatsAppIcon /> <span>+62 851-3757-7716</span>
          </a>

          <div className="mt-2 flex gap-3">
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-accent hover:text-accent"
            >
              <Mail size={18} />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-accent hover:text-accent"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="https://instagram.com/air_minerall7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-accent hover:text-accent"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://tiktok.com/zkyyyy077"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-accent hover:text-accent"
            >
              <TikTokIcon />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} as="form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Honeypot: tersembunyi dari mata & tab order manusia, tapi bot form-filler
              biasanya tetap mengisinya. Kalau terisi, request dianggap spam di server. */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="fromName" className="text-sm font-medium">
              Nama
            </label>
            <input
              id="fromName"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama lengkap kamu"
              className="rounded-md border border-border bg-bg px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fromEmail" className="text-sm font-medium">
              Email
            </label>
            <input
              id="fromEmail"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="kamu@email.com"
              className="rounded-md border border-border bg-bg px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="messageBody" className="text-sm font-medium">
              Pesan
            </label>
            <textarea
              id="messageBody"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tulis pesanmu di sini..."
              className="resize-none rounded-md border border-border bg-bg px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={status?.type === "loading"}
            className="btn btn--primary btn--full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status?.type === "loading" ? (
              <>
                <span>Mengirim...</span>
                <Loader2 size={16} className="gpu-layer animate-spin" />
              </>
            ) : (
              <>
                <span>Kirim Pesan</span> <Send size={16} />
              </>
            )}
          </button>

          {/* transform+opacity saja -> transisi status masuk/keluar tetap di GPU */}
          <AnimatePresence mode="wait">
            {status && status.type !== "loading" && (
              <motion.p
                key={status.type + status.text}
                role="status"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`gpu-layer flex items-center gap-2 text-sm ${
                  status.type === "error" ? "text-danger" : "text-accent-2"
                }`}
              >
                {status.type === "error" ? (
                  <XCircle size={16} className="shrink-0" />
                ) : (
                  <CheckCircle2 size={16} className="shrink-0" />
                )}
                <span>{status.text}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
