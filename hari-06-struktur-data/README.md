# Hari 6 - Struktur Data I: Array, Objek, Stack, dan Queue

Diklat Junior Web Programmer, unit J.620100.004.02 Menggunakan Struktur Data (bagian 1 Proyek 3).

## Struktur folder

```
hari-06-struktur-data/
├── package.json               "type": "module" agar import/export jalan di Node
├── lab1.js ... lab5.js        Praktik Lab 1-5
├── bug-struktur.js            Bug Hunt: 6 kesalahan + perbaikannya
├── tes-pbl.js                 Uji logika Undo/Redo dan Antrean Loket
├── antrian.html               PBL Fitur B - Antrean Loket
├── editor.html                PBL Fitur A - Editor Undo/Redo
├── analisis-struktur-data.md  Dokumen Analisis Pemilihan Struktur Data (3 studi kasus)
├── hasil/                     Keluaran uji (.txt) dan tangkapan layar (.png)
└── js/
    ├── structures.js          Stack dan Queue (O(1)) dengan komentar fungsi
    ├── kurung.js              kurungSeimbang, balikString, adalahPalindrom
    ├── loket.js               Logika Antrean Loket (reset harian, riwayat 5, Reset)
    ├── riwayat-editor.js      Logika Undo/Redo (dua Stack, batas 50 langkah)
    ├── antrian.js             UI Antrean Loket
    └── editor.js              UI Editor (debounce)
```

## Cara menjalankan

Node.js 18+ diperlukan untuk bagian konsol.

```bash
npm run semua   # lab1-lab4, tes-pbl, bug-struktur
npm run lab5    # pengukuran efisiensi (sekitar 45 detik; Array.shift 100.000 data memang lambat)
```

Halaman web memakai ES Module sehingga tidak bisa dibuka lewat `file://`. Jalankan server lokal:

```bash
npm run serve   # lalu buka http://localhost:8080/antrian.html dan /editor.html
```

## Commit

```bash
git add .
git commit -m 'Hari 6: Stack, Queue, undo/redo, antrean loket'
git push
```
