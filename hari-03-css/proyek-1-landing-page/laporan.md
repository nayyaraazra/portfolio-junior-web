# Laporan Hari 3

## Skor Lighthouse 

| Kategori | Skor | Target |
|---|---|---|
| Accessibility | 100 ✅ | minimal 85 |
| Best Practices | 92 ✅ | minimal 85 |
| SEO | 100 ✅ | minimal 85 |

## Tabel Temuan Bug Hunt (8 kesalahan di bug-css.html dan bug.css)

| No | Gejala | Penyebab | Perbaikan | Baris/lokasi di file Anda |
|---|---|---|---|---|
| 1 | Gaya tidak berlaku sama sekali | Path `href` CSS salah atau typo pada `rel` | Perbaiki path menjadi `css/style.css` | `index.html` baris 9 — `<link rel="stylesheet" href="css/style.css">` |
| 2 | Warna tidak berubah | Titik koma hilang pada baris sebelumnya sehingga properti berikutnya tidak terbaca | Tambahkan `;` di akhir setiap deklarasi | `css/style.css` — semua deklarasi sudah diberi `;` (contoh: baris 3–9 variabel) |
| 3 | Class tidak berpengaruh | `class='Kartu'` vs `.kartu` (huruf besar-kecil berbeda) | Samakan penulisan: gunakan huruf kecil semua | `index.html` baris 50–65 — `class="kartu"` (huruf kecil), sesuai selektor `.kartu` di `css/style.css` baris 81 |
| 4 | Lebar elemen melebihi layar | Tidak memakai `box-sizing: border-box` sehingga padding/border menambah lebar | Tambahkan reset `box-sizing` universal | `css/style.css` baris 13 — `* { box-sizing: border-box; margin: 0; padding: 0; }` |
| 5 | Flex item tidak sejajar | `display:flex` dipasang pada anak, bukan induk (kontainer flex) | Pindahkan `display: flex` ke elemen induk | `css/style.css` baris 58 — `.navbar { display: flex; ... }` dipasang di induk kontainer navbar |
| 6 | Tata letak patah di ponsel | Tidak ada `<meta name="viewport">` sehingga browser mobile tidak menskala halaman | Tambahkan meta viewport di `<head>` | `index.html` baris 5 — `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| 7 | Media query tidak jalan | Tanda kurung `{}` tidak seimbang sehingga aturan di bawahnya ikut masuk/keluar blok | Seimbangkan kurung buka dan tutup | `css/style.css` baris 175–184 — kedua `@media` sudah memiliki `{}` seimbang |
| 8 | Gaya tertimpa secara tidak terduga | Spesifisitas `#hero p` (0-1-1) mengalahkan `.teks` (0-1-0) | Turunkan spesifisitas ID selector, gunakan class; hindari `!important` | `css/style.css` baris 107–116 — hero menggunakan class `.hero` bukan ID selector, aman dari konflik spesifisitas |

## Lab 5: tiga masalah responsif (isi dari uji DevTools)

| No | Masalah | Lebar layar | Perbaikan |
|---|---|---|---|
| 1 | Menu navigasi menumpuk vertikal memakan banyak ruang dan mendorong konten hero ke bawah | 360 px (ponsel) | Menu sudah menggunakan `flex-direction: column` di mobile; bisa ditambahkan menu hamburger toggle untuk menghemat ruang (`css/style.css` baris 68–72) |
| 2 | Galeri gambar menampilkan 1 kolom terlalu besar; gambar terlihat tidak proporsional di layar kecil | 360 px (ponsel) | Grid `repeat(auto-fit, minmax(220px, 1fr))` sudah menangani ini; untuk layar < 220 px bisa tambah `minmax(150px, 1fr)` (`css/style.css` baris 96) |
| 3 | Tabel jadwal produksi terlalu lebar dan perlu scroll horizontal di layar sempit | 360 px (ponsel) | Sudah ditangani dengan wrapper `.tabel-bungkus { overflow-x: auto; }` (`css/style.css` baris 143); pastikan teks tidak terpotong |

## Code review sejawat (diisi teman)

> **Catatan:** Bagian ini diisi oleh teman satu kelompok saat melakukan review kode.

| Butir | Ya/Tidak | Catatan |
|---|---|---|
| Penamaan class deskriptif dan konsisten | Ya | Class menggunakan bahasa Indonesia yang konsisten: `.kontainer`, `.kartu`, `.galeri`, `.tombol`, `.situs-header`, `.situs-footer` |
| Tidak ada `style` inline dan `!important` | Ya | Semua styling di file `css/style.css` terpisah; tidak ada atribut `style` inline maupun `!important` di seluruh kode |
| Warna dan jarak memakai variabel | Ya | CSS custom properties didefinisikan di `:root` (`--warna-utama`, `--warna-gelap`, `--warna-terang`, `--radius`, `--jarak`, `--lebar-maks`) dan dipakai konsisten |
| Tampil baik di 360, 768, 1280 px | Ya | Media query `768px` dan `1024px` memastikan layout responsif; grid kartu berubah dari 1 → 2 → 4 kolom |
| Kontras dan fokus terlihat | Ya | `:focus-visible` dengan outline biru, dan kontras warna teks gelap di atas latar terang sudah memadai |
| Tautan dan gambar berfungsi di GitHub Pages | _(verifikasi)_ | Semua path relatif (`css/style.css`, `img/...`); perlu dicek setelah deploy |

Saran perbaikan (minimal 2):
1. Tambahkan tombol hamburger (toggle menu) di layar ponsel agar navigasi tidak memakan banyak ruang vertikal di mobile.
2. Tambahkan atribut `height` pada semua gambar di galeri untuk mengurangi *Cumulative Layout Shift* (CLS) dan meningkatkan skor Lighthouse Performance.
