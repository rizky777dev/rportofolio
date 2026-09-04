# Deploy ke GitHub Pages (custom domain via Cloudflare)

Proyek ini sudah dikonfigurasi sebagai **static export** (`output: "export"` di
`next.config.mjs`) karena GitHub Pages cuma bisa serve file statis (HTML/CSS/JS),
tidak ada server Node.js yang jalan. Konsekuensinya: form kontak TIDAK memakai
API Route sendiri, tapi memanggil layanan pihak ketiga (Web3Forms) langsung dari
browser.

## 1. Setup Web3Forms (buat form kontak bisa kirim email)

1. Buka https://web3forms.com
2. Masukkan email tujuan (`zkyeea@gmail.com`), klik "Create Access Key"
3. Cek email masuk, salin Access Key-nya
4. (Opsional tapi disarankan) di dashboard Web3Forms, set **Allowed Domains**
   ke `rizkyirawan.rcl.biz.id` supaya key ini cuma bisa dipakai dari situs kamu

## 2. Push project ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## 3. Set Access Key sebagai GitHub Secret

Repo di GitHub -> **Settings -> Secrets and variables -> Actions -> New repository secret**

- Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
- Value: (access key dari langkah 1)

Workflow di `.github/workflows/deploy.yml` sudah otomatis pakai secret ini saat build.

## 4. Aktifkan GitHub Pages via GitHub Actions

Repo -> **Settings -> Pages** -> bagian "Build and deployment" -> Source pilih
**GitHub Actions** (bukan "Deploy from a branch").

Setelah itu, setiap `git push` ke branch `main` akan otomatis build & deploy
lewat workflow yang sudah disiapkan (cek tab **Actions** di repo untuk lihat
progress/errornya).

## 5. Custom domain di GitHub Pages

Repo -> **Settings -> Pages** -> bagian "Custom domain" -> isi
`rizkyirawan.rcl.biz.id` -> Save.

File `public/CNAME` di proyek ini sudah berisi domain yang sama, jadi setting
ini tidak akan hilang setiap kali GitHub Actions deploy ulang.

## 6. DNS di Cloudflare

Di dashboard Cloudflare untuk domain `rcl.biz.id`, tambah record:

| Type  | Name      | Target                  | Proxy status |
|-------|-----------|--------------------------|--------------|
| CNAME | rizkyirawan | `<username>.github.io` | **DNS only** (awan abu-abu) |

**Penting:** waktu pertama kali setup, set proxy status ke **DNS only**
(bukan "Proxied"/awan oranye) dulu. GitHub perlu memverifikasi domain &
menerbitkan sertifikat HTTPS (Let's Encrypt) langsung ke server kamu; kalau
trafik sudah dibelokkan lewat Cloudflare dari awal, proses verifikasi/HTTPS
GitHub bisa gagal atau nyangkut.

Setelah domain di GitHub Pages menunjukkan status **"DNS check successful"**
dan opsi **"Enforce HTTPS"** sudah bisa dicentang (biasanya beberapa menit
sampai ~1 jam), baru boleh switch proxy status ke **Proxied** di Cloudflare
kalau kamu mau (untuk manfaat CDN/cache Cloudflare).

Kalau nanti diaktifkan Proxied, di Cloudflare buka **SSL/TLS** -> set mode ke
**Full (strict)** supaya tidak terjadi redirect loop.

Satu hal lagi: kalau proxy Cloudflare aktif, matikan fitur **Rocket Loader**
(Speed -> Optimization) untuk domain ini. Rocket Loader suka mengubah urutan
eksekusi script dan bisa bikin animasi/hydration React jadi patah-patah atau
malah error di beberapa kasus.

## 7. Testing lokal sebelum push

```bash
npm install
npm run dev
```
Buka **http://localhost:3000** di browser.

Untuk mengetes hasil build statis yang persis seperti yang akan di-deploy:
```bash
npm run build
npx serve out
```
lalu buka URL yang muncul di terminal (biasanya **http://localhost:3000**
atau **http://localhost:3001**).

## 8. URL production

Setelah semua langkah di atas selesai dan DNS sudah propagate:
**https://rizkyirawan.rcl.biz.id**
