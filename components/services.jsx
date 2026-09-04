import {
  MonitorSmartphone,
  MessageCircleMore,
  Database,
  Shapes,
  Server,
  GitBranch,
} from "lucide-react";
import Reveal from "./reveal";

const SERVICES = [
  {
    icon: MonitorSmartphone,
    title: "Responsive Web Design",
    desc: "Website yang tetap rapi dan cepat di semua ukuran layar — dari HP kecil sampai monitor ultrawide, lengkap dengan micro-interaction.",
  },
  {
    icon: MessageCircleMore,
    title: "WhatsApp Bot Automation",
    desc: "Mengubah alur manual jadi otomatis: auto-reply, notifikasi, hingga integrasi sistem lain lewat bot WhatsApp berbasis JavaScript.",
  },
  {
    icon: Database,
    title: "API Integration & Scraping",
    desc: "Menyambungkan aplikasi ke sumber data eksternal — konsumsi REST API maupun scraping terstruktur saat API resmi tak tersedia.",
  },
  {
    icon: Shapes,
    title: "UI/UX Prototyping",
    desc: "Merancang alur & tampilan sebelum ditulis jadi kode — supaya keputusan desain teruji lebih dulu, bukan tebak-tebakan di tengah proyek.",
  },
  {
    icon: Server,
    title: "Database & Backend Setup",
    desc: "Struktur data MySQL/PHP yang rapi di belakang layar, supaya fitur di depan (form, dashboard, autentikasi) jalan dengan stabil.",
  },
  {
    icon: GitBranch,
    title: "Version Control & Deployment",
    desc: "Kelola histori kode dengan Git/GitHub yang bersih, lalu bantu deploy proyekmu ke hosting sampai benar-benar live.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        06 · Services
      </Reveal>
      <Reveal as="h2" className="section-title">
        What I Can Do For You
      </Reveal>
      <Reveal className="mb-6 -mt-6 text-text-secondary">
        Empat area utama tempat saya paling sering membantu klien &amp; proyek pribadi.
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal
            key={s.title}
            delay={(i % 3) * 0.1}
            className="group relative overflow-hidden rounded-lg border border-border bg-bg-elevated p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-accent-soft text-accent">
              <s.icon size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
