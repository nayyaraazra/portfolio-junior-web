# Sistem Pendaftaran Pelatihan

Aplikasi web pendaftaran peserta pelatihan (PHP, MySQL, Bootstrap). Rilis **v1.0.0**.

## Fitur
- Form pendaftaran publik dengan validasi sisi klien dan server
- Kuota kelas dengan transaksi database (`FOR UPDATE`) dan pesan jelas saat penuh
- Login admin (sandi ter-hash, sesi aman, CSRF, logout lewat POST)
- Panel admin: daftar (DataTables), tambah, ubah, hapus (konfirmasi SweetAlert2), cetak bukti PDF
- Peringkat kelas berdasarkan jumlah pendaftar

## Teknologi dan Library
PHP 8.x, MySQL/MariaDB, Bootstrap 5.3.3 (MIT), DataTables 1.13.8 (MIT), jQuery 3.7.1 (MIT), SweetAlert2 11.26.25 (MIT), Dompdf 3.1.6 (LGPL-2.1). Detail dan lisensi: [`docs/daftar-library.md`](docs/daftar-library.md).

## Persyaratan
- XAMPP/Laragon dengan **PHP 8.1+** dan ekstensi `pdo_mysql`, `mbstring`, `dom`, `gd`
- MySQL/MariaDB aktif
- [Composer](https://getcomposer.org/)
- Git

## Instalasi
1. Salin atau clone proyek ke `htdocs/proyek-5-capstone-pendaftaran` (atau folder lain).
2. Impor database: buka phpMyAdmin, tab **Import**, pilih `database/skema.sql` (membuat database `db_pelatihan`, tabel, dan data contoh). Atau lewat terminal: `mysql -u root -p < database/skema.sql`
3. Salin `config/config.contoh.php` menjadi `config/config.php`, lalu isi `user` dan `sandi` database Anda.
4. Pasang dependensi: `composer install`
5. Buat akun admin (ganti username dan sandi, minimal 8 karakter): `php database/buat-admin.php admin SandiKuat123`
6. Buka aplikasi:
   - Dengan Apache: `http://localhost/proyek-5-capstone-pendaftaran/public/` (tambahkan port bila Apache Anda memakai port lain, mis. `localhost:8080`)
   - Tanpa Apache: `php -S localhost:8000 -t public`, lalu buka `http://localhost:8000`

Halaman penting:
- Peserta: `public/daftar.php` (tanpa login)
- Admin: `public/login.php`, lalu `index.php`

## Struktur Folder
`config/`, `src/`, `public/`, `templates/`, `database/`, `docs/`, `tests/`. Penjelasan: [`docs/arsitektur.md`](docs/arsitektur.md), [`docs/peta-modul.md`](docs/peta-modul.md).

## Pengujian
- Otomatis: `php tests/jalankan.php` (harus menampilkan "Semua uji lolos.")
- Manual: skenario di [`docs/kasus-uji.md`](docs/kasus-uji.md); catatan keamanan di [`docs/catatan-keamanan.md`](docs/catatan-keamanan.md)

## Dokumentasi
- Referensi API (phpDocumentor): `docs/api/index.html`; cadangan manual: [`docs/api.md`](docs/api.md)
- Dokumen modul: [`docs/modul/`](docs/modul/)
- Laporan bug: [`docs/laporan-bug.md`](docs/laporan-bug.md)
- Panduan pengguna: [`docs/panduan-pengguna.md`](docs/panduan-pengguna.md)
- Riwayat versi: [`CHANGELOG.md`](CHANGELOG.md)

### Membuat ulang dokumentasi API
```
php phpDocumentor.phar -d src -t docs/api
npx jsdoc public/assets/js -r -d docs/api-js
```
`phpDocumentor.phar` diunduh dari situs resmi phpDocumentor dan diletakkan di akar proyek (tidak di-commit).

## Catatan Keamanan
- `config/config.php` berisi kredensial lokal dan tidak boleh di-commit.
- Sandi admin pada contoh di atas hanya untuk pengembangan; ganti di lingkungan nyata.
- Pembatasan percobaan login berbasis sesi hanya latihan; produksi memerlukan pembatasan berbasis IP atau akun.

## Lisensi dan Penulis
Nayyara Aqila - lisensi MIT (lihat [`LICENSE`](LICENSE)).
