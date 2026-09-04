"use client";

import { memo, useCallback, useRef, useState } from "react";
import { Play, Terminal } from "lucide-react";
import Reveal from "./reveal";

const DEFAULT_CODE = `const dev = {
  nama: 'Rizky Irawan',
  role: 'Web Developer',
  focus: 'Digital Experience'
};

console.log(\`Halo! Saya \${dev.nama}, seorang \${dev.role}.\`);`;

function formatLogArg(arg) {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) return `${arg.name}: ${arg.message}`;
  try {
    return JSON.stringify(arg, null, 2);
  } catch {
    return String(arg);
  }
}

/**
 * Playground kode JS interaktif. Dijalankan lewat `new Function()` di
 * dalam try/catch (bukan eval langsung di scope komponen) supaya kode
 * pengguna tidak bisa menyentuh closure React di sekitarnya. console.log
 * di-"tangkap" sementara lewat proxy object yang dikirim sebagai argumen,
 * bukan dengan menimpa window.console global (lebih aman, otomatis
 * dikembalikan tanpa efek samping ke bagian lain halaman).
 */
function CodePlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [lines, setLines] = useState([
    { type: "info", text: 'Klik "Run Code" untuk mengeksekusi.' },
  ]);
  const [running, setRunning] = useState(false);
  const textareaRef = useRef(null);

  const runCode = useCallback(() => {
    setRunning(true);
    const output = [];
    const sandboxConsole = {
      log: (...args) => output.push({ type: "log", text: args.map(formatLogArg).join(" ") }),
      error: (...args) => output.push({ type: "error", text: args.map(formatLogArg).join(" ") }),
      warn: (...args) => output.push({ type: "warn", text: args.map(formatLogArg).join(" ") }),
      info: (...args) => output.push({ type: "info", text: args.map(formatLogArg).join(" ") }),
    };

    try {
      // eslint-disable-next-line no-new-func
      const sandboxed = new Function("console", `"use strict";\n${code}`);
      const result = sandboxed(sandboxConsole);
      if (result !== undefined) {
        output.push({ type: "result", text: `=> ${formatLogArg(result)}` });
      }
      if (output.length === 0) {
        output.push({ type: "info", text: "(tidak ada output — coba tambahkan console.log)" });
      }
    } catch (err) {
      // Error ditangkap & ditampilkan dengan pesan spesifik dari mesin JS,
      // bukan pesan generik, supaya user tahu persis baris/alasan errornya.
      output.push({ type: "error", text: `${err.name}: ${err.message}` });
    }

    setLines(output);
    setRunning(false);
  }, [code]);

  function handleKeyDown(e) {
    // Tab menyisipkan 2 spasi alih-alih memindah fokus keluar textarea
    if (e.key === "Tab") {
      e.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.slice(0, start) + "  " + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
    // Ctrl/Cmd + Enter -> jalankan langsung
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  }

  return (
    <section id="playground" className="section-inner">
      <Reveal as="p" className="section-eyebrow">
        07 · Interactive Playground
      </Reveal>
      <Reveal as="h2" className="section-title">
        Live Code Playground
      </Reveal>
      <Reveal className="mb-6 -mt-6 text-text-secondary">
        Tulis JavaScript, tekan Run, lihat hasilnya langsung di panel console.
      </Reveal>

      <Reveal delay={0.1} className="overflow-hidden rounded-lg border border-border bg-bg-elevated shadow-md">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-danger" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8A33D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-2" />
          <span className="ml-3 font-mono text-xs text-text-muted">script.js</span>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="relative border-b border-border md:border-b-0 md:border-r">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              aria-label="Editor kode JavaScript"
              className="h-72 w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-text-primary outline-none md:h-96"
            />
            <button
              type="button"
              onClick={runCode}
              disabled={running}
              className="btn btn--primary absolute bottom-4 right-4 !py-2 !px-4 text-sm"
            >
              <span>Run Code</span> <Play size={15} />
            </button>
          </div>

          <div className="flex h-72 flex-col bg-bg-inset md:h-96">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-xs text-text-muted">
              <Terminal size={14} /> <span>Output</span>
            </div>
            <div className="flex-1 overflow-auto p-4 font-mono text-sm" aria-live="polite">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={
                    line.type === "error"
                      ? "mb-1.5 whitespace-pre-wrap text-danger"
                      : line.type === "warn"
                        ? "mb-1.5 whitespace-pre-wrap text-[#E8A33D]"
                        : line.type === "result"
                          ? "mb-1.5 whitespace-pre-wrap text-accent-2"
                          : "mb-1.5 whitespace-pre-wrap text-text-secondary"
                  }
                >
                  {line.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default memo(CodePlayground);
