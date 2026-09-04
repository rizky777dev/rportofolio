<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:5B4FE9,100:0EA5A5&height=200&section=header&text=Rizky%20Irawan&fontSize=48&fontColor=ffffff&fontAlignY=38&desc=Web%20Developer%20%7C%20UI%2FUX%20Enthusiast&descAlignY=58&descSize=18&animation=fadeIn" width="100%" alt="header banner" />

<img src="public/assets/52824.jpg" width="140" style="border-radius:50%;border:3px solid #5B4FE9;" alt="Foto Rizky Irawan" />

<br/>

<a href="https://rizkyirawan.rcl.biz.id">
  <img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=600&size=22&duration=2600&pause=900&color=5B4FE9&center=true&vCenter=true&width=560&lines=Crafting+digital+experiences%2C+one+pixel+at+a+time;Responsive+Web+Design+%26+Smooth+Animations;WhatsApp+Bot+Automation+%26+API+Integration;UI%2FUX+Prototyping+with+Next.js+%2B+Framer+Motion" alt="Typing SVG" />
</a>

<br/><br/>

[![Portfolio](https://img.shields.io/badge/Portfolio-rizkyirawan.rcl.biz.id-5B4FE9?style=for-the-badge&logo=vercel&logoColor=white)](https://rizkyirawan.rcl.biz.id)
[![Email](https://img.shields.io/badge/Email-zkyeea%40gmail.com-0EA5A5?style=for-the-badge&logo=gmail&logoColor=white)](mailto:zkyeea@gmail.com)
[![Location](https://img.shields.io/badge/Based%20in-Lampung%2C%20Indonesia-8B7FFF?style=for-the-badge&logo=googlemaps&logoColor=white)](#)

</div>

<br/>

## 👋 Tentang Saya

Saya **Rizky Irawan**, seorang pelajar dari Lampung Tengah, Indonesia yang antusias mendalami **web development**. Perjalanan coding saya dimulai pada **2023**, dan sejak **2025** saya fokus mendedikasikan diri di dunia pengembangan web — bukan sekadar menulis kode, tapi merancang pengalaman.

Saya percaya web yang baik adalah perpaduan antara **estetika visual**, **performa**, dan **interaksi yang terasa hidup**. Repo ini adalah portofolio pribadi saya — sekaligus tempat saya bereksperimen dengan animasi, arsitektur frontend modern, dan micro-interaction yang halus.

```txt
const rizky = {
  role: "Web Developer",
  based_in: "Lampung Tengah, Indonesia",
  codingSince: 2023,
  focus: ["Frontend Engineering", "UI/UX", "Automation"],
  currentlyLearning: ["Backend Architecture", "Database Design"],
  funFact: "Lebih suka animasi 60fps daripada tidur tepat waktu 😅",
};
```

<br/>

## ✨ Apa yang Bisa Saya Kerjakan

<table>
<tr>
<td width="50%" valign="top">

**🎨 Responsive Web Design**
Website yang tetap rapi & cepat di semua ukuran layar — dari HP kecil sampai monitor ultrawide, lengkap dengan micro-interaction.

**🤖 WhatsApp Bot Automation**
Mengubah alur manual jadi otomatis: auto-reply, notifikasi, hingga integrasi sistem lain lewat bot berbasis JavaScript.

**🔌 API Integration & Scraping**
Menyambungkan aplikasi ke sumber data eksternal — konsumsi REST API maupun scraping terstruktur.

</td>
<td width="50%" valign="top">

**🧩 UI/UX Prototyping**
Merancang alur & tampilan sebelum ditulis jadi kode, supaya keputusan desain teruji lebih dulu.

**🗄️ Database & Backend Setup**
Struktur data MySQL/PHP yang rapi di belakang layar, supaya fitur di depan jalan stabil.

**🔀 Version Control**
Mengelola histori kode dengan Git/GitHub yang bersih & terstruktur.

</td>
</tr>
</table>

<br/>

## 🖥️ Tentang Website Ini

Website ini adalah **single-page portfolio** yang dibangun dengan filosofi *"terasa hidup, tapi tetap ringan"* — setiap elemen yang bergerak punya alasan, bukan sekadar hiasan.

### Cara Kerja

- **Rendering** — dibangun di atas **Next.js App Router**, di-*compile* menjadi **static export** murni (HTML/CSS/JS), sehingga bisa di-*hosting* di mana saja tanpa server Node.js yang berjalan.
- **Reveal on scroll** — setiap section punya komponen `<Reveal>` generik yang memicu animasi *fade + slide* saat elemen masuk viewport, memakai **Intersection Observer** di balik layar (`useInView`), dan hanya berjalan sekali per elemen agar hemat kerja JS di halaman yang panjang.
- **Physics-based motion** — animasi angka (statistik), progress bar, dan hover effect digerakkan oleh **spring physics** (Framer Motion), bukan `ease` linear biasa, supaya gerakannya terasa natural.
- **Tema gelap/terang** — dikelola oleh `next-themes`, dengan skrip anti-*flicker* yang menyuntikkan tema yang benar sebelum React sempat *hydrate*.
- **Aksesibilitas** — menghormati `prefers-reduced-motion`, kontras warna terjaga di kedua tema, dan navigasi penuh via keyboard.
- **Formulir kontak** — mengirim pesan langsung dari browser tanpa backend sendiri, cocok untuk arsitektur static export.

### Struktur Halaman

| # | Section | Isi |
|---|---------|-----|
| 01 | **About** | Profil singkat & fokus keahlian |
| 02 | **Stats** | Angka & pencapaian (animated counter) |
| 03 | **Skills** | Tech stack — dikelompokkan Frontend → Backend → Database & Tools |
| 04 | **Journey** | Linimasa perjalanan belajar |
| 05 | **Projects** | Proyek-proyek yang pernah dikerjakan |
| 06 | **Services** | Layanan yang bisa saya bantu kerjakan |
| 07 | **Code Playground** | Editor JavaScript interaktif langsung di browser |
| 08 | **Workflow** | Alur kerja dari riset sampai deployment |
| 09 | **FAQ** | Pertanyaan yang sering ditanyakan |
| 10 | **Contact** | Formulir & kanal untuk menghubungi saya |

<br/>

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=html,css,js,ts,react,nextjs,vue,tailwind,bootstrap,sass,nodejs,express,python,php,java,cpp,cs,go,mysql,postgres,mongodb,git,github,vscode&theme=dark" alt="tech stack icons" />

</div>

<br/>

<div align="center">

**Frontend**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**Backend & Bahasa Lain**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![Java](https://img.shields.io/badge/Java-EA2D2E?style=flat-square&logo=openjdk&logoColor=white)

**Database & Tools**

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)

</div>

<br/>

## 🎬 Sorotan Animasi & Interaksi

- Section **Technical Skills** menampilkan tech stack sebagai *capsule pills* dengan entrance animation berurutan (*staggered*) dan efek *glow* saat di-*hover*, warnanya menyesuaikan warna khas tiap teknologi.
- Counter statistik menghitung naik dengan *easing* kubik saat pertama kali terlihat di layar.
- Progress bar & angka digerakkan oleh satu *motion value* yang sama, supaya keduanya selalu sinkron sempurna.
- Semua animasi memakai `transform` & `opacity` (bukan properti yang memicu *layout reflow*), dioptimalkan untuk tetap mulus di 60–120 FPS.

<br/>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0EA5A5,100:5B4FE9&height=120&section=footer" width="100%" alt="footer banner" />

**Terima kasih sudah mampir ✨**
Kalau ada proyek yang ingin didiskusikan, jangan ragu untuk [menghubungi saya](mailto:zkyeea@gmail.com).

</div>
