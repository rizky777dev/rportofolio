/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // WAJIB untuk GitHub Pages: Pages cuma serve file statis, tidak ada Node
  // server untuk jalanin API Routes atau Image Optimization on-demand.
  // 'export' membuat `next build` menghasilkan HTML/CSS/JS statis murni di
  // folder out/, siap di-upload ke Pages tanpa server apapun.
  output: "export",
  images: {
    // Image Optimization API next/image butuh server -> tidak tersedia di
    // static export. unoptimized:true membuat <Image> tetap dipakai (fill,
    // lazy-load, dsb jalan normal di browser) tapi tanpa resize/convert
    // otomatis di server.
    unoptimized: true,
  },
  // Supaya setiap route menghasilkan folder/index.html (about/index.html,
  // bukan about.html) -> paling kompatibel dengan static hosting seperti
  // GitHub Pages. Untuk situs single-page ini efeknya minimal, tapi aman
  // untuk masa depan kalau nanti ditambah halaman baru.
  trailingSlash: true,
  experimental: {
    // PENTING: dimatikan sepenuhnya. Next.js secara default otomatis
    // "mengoptimasi" import dari sejumlah paket populer -- termasuk
    // lucide-react, framer-motion, dan react-icons/* -- dengan menganalisis
    // kode secara statis lalu meng-tree-shake bagian yang "tidak dipakai".
    // Analisis statis ini TIDAK SEMPURNA: dua bug berbeda sudah ketemu di
    // proyek ini gara-gara ini (react-icons/fa di skills.jsx, dan akses
    // dinamis motion[Tag] di reveal.jsx) -- keduanya bikin komponen jadi
    // `undefined` saat build ("Element type is invalid... got: undefined")
    // padahal kodenya sendiri benar. Array kosong di sini MENIMPA daftar
    // default itu jadi tidak ada paket yang dioptimasi lagi -> menutup
    // seluruh kelas bug ini sekaligus, bukan cuma tempat yang kebetulan
    // sudah ketemu. Trade-off: bundle JS jadi sedikit lebih besar (tidak
    // masalah untuk situs portofolio sekelas ini), tapi build jadi 100%
    // dapat diprediksi.
    optimizePackageImports: [],
  },
};

export default nextConfig;
