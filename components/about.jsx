import Image from "next/image";
import { MapPin, CodeXml, Globe } from "lucide-react";
import Reveal from "./reveal";

export default function About() {
  return (
    <section id="about" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        01 · Profile
      </Reveal>
      <Reveal as="h2" className="section-title">
        About Me
      </Reveal>

      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr_1fr] md:gap-10">
        <Reveal delay={0.05} className="mx-auto w-full max-w-[220px] md:mx-0">
          <div className="gpu-layer relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border shadow-md">
            <Image
              src="/assets/52824.jpg"
              alt="Foto Rizky Irawan"
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="text-lg leading-relaxed text-text-secondary">
          <p>
            Saya <strong className="text-text-primary">Rizky Irawan</strong>, salah satu siswa
            kelas 9 dari MTs di Lampung Tengah dengan fokus pada pengembangan digital
            experience. Perjalanan saya di dunia coding dimulai pada 2023, dan sejak 2025
            saya telah mendedikasikan diri untuk mendalami web development. Saya tidak
            sekadar menulis kode; saya merancang antarmuka. Dengan memadukan estetika visual
            dan animasi yang smooth, saya berupaya menciptakan pengalaman pengguna yang
            imersif dan interaktif.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-text-secondary">
            <MapPin size={18} className="text-accent" />
            <span>Lampung Tengah, Indonesia</span>
          </div>
          <div className="flex items-center gap-3 text-text-secondary">
            <CodeXml size={18} className="text-accent" />
            <span>Coding sejak 2023</span>
          </div>
          <div className="flex items-center gap-3 text-text-secondary">
            <Globe size={18} className="text-accent" />
            <span>Web Dev sejak 2025</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
