# Form Builder

Pembuatan form secara visual dengan konfigurasi JSON yang dapat dibuka kembali.

## Fitur

- Drag-and-drop komponen dan urutan, dengan tombol tambah/naik/turun untuk keyboard dan perangkat sentuh.
- Text, email, number, textarea, select, radio, checkbox, label, placeholder, required, min/max, panjang minimum, dan pola regex HTML.
- Live preview aktif dengan validasi browser dan hasil submit.
- Simpan/buka lokal, import/export konfigurasi JSON.
- Export HTML mandiri dan React TSX dengan penanganan submit yang dapat digunakan.

## Teknologi

Vue.js 3, TypeScript, Vite, Vitest.

## Cara menjalankan

Memerlukan Node.js 22.12+.

```sh
npm ci
npm run dev
```

Buka alamat yang dicetak terminal. Jalankan `npm test` untuk pengujian dan `npm run build` untuk build produksi.
