# Fieldnotes — Pendidikan Vokasi AS

Presentasi web interaktif berbahasa Indonesia tentang Career and Technical
Education (CTE) di Amerika Serikat dan pelajaran yang dapat diadaptasi untuk
Indonesia. Dibuat dengan React, Vite, Tailwind CSS, Framer Motion, dan Lucide.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Untuk memeriksa hasil produksi:

```bash
npm run build
npm run preview
```

## Kontrol presentasi

- Tombol Previous/Next atau panah kiri/kanan untuk berpindah slide.
- Swipe ke kiri/kanan pada layar sentuh.
- Tombol Play/Pause untuk menjalankan atau menghentikan autoplay.
- Pilih thumbnail untuk langsung menuju slide.
- Tekan elemen diagram untuk membuka penjelasan singkat; di ponsel gunakan tombol
  “Lihat alur” pada area gambar untuk memilih bagian diagram.
- Tombol layar penuh untuk memperbesar area presentasi.
- Tombol Fieldnotes atau ikon kembali untuk menuju slide pembuka.
- Tombol Home/End untuk menuju slide pertama/terakhir; Space untuk Play/Pause.

Presentasi terdiri atas sampul dan 13 bagian materi. Slide contoh industri
menampilkan NVIDIA Deep Learning Institute dan AWS Academy beserta tautan ke
sumber resmi. Transisi menggunakan
shared-layout animation Framer Motion; preferensi reduced motion sistem juga
dihormati. Foto editorial dimuat dari Unsplash.
