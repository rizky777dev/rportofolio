"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#playground", label: "Playground" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);

  // rAF-throttled scroll listener -> hanya membaca scrollY & menulis DOM
  // class sekali per frame, bukan setiap event scroll (bisa ratusan/detik).
  const onScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      setScrolled(window.scrollY > 40);
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[500] border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-[var(--navbar-bg)] shadow-sm backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-5 py-4">
        <a href="#home" aria-label="Ke bagian atas" className="relative block h-8 w-[150px] shrink-0">
          {/* Logo asli navy di atas transparan -> di dark mode di-filter jadi putih
              (brightness-0 + invert) supaya tetap kontras di navbar gelap, tanpa
              perlu file logo terpisah per tema. */}
          <Image
            src="/assets/52823.png"
            alt="Rizky Developer"
            fill
            priority
            sizes="150px"
            className="object-contain object-left dark:brightness-0 dark:invert"
          />
        </a>

        <nav aria-label="Navigasi utama" className="hidden gap-5 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[0.92rem] font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Buka menu navigasi"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Navigasi mobile"
          className="flex flex-col gap-1 border-t border-border bg-bg px-5 py-4 md:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-inset hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export default memo(Navbar);
