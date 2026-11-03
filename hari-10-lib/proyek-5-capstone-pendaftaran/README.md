# Proyek 5: Sistem Pendaftaran Pelatihan

## Persiapan
1. PHP 8.1+ dengan ekstensi `pdo_mysql`, `mbstring`, `dom`, `gd`, dan MySQL/MariaDB aktif.
2. Buat database dengan mengimpor `database/skema.sql` (phpMyAdmin atau `mysql`).
3. Salin `config/config.contoh.php` menjadi `config/config.php`, lalu sesuaikan kredensial.
4. Pasang dependency PHP: `composer install`
5. Jalankan: `php -S localhost:8000 -t public`, lalu buka `http://localhost:8000`.

## Halaman
- `index.php` — daftar pendaftar (DataTables), ubah, hapus (konfirmasi SweetAlert2), cetak bukti PDF
- `tambah.php` / `ubah.php` — form admin
- `daftar.php` — form pendaftaran publik (tanpa login)
- `cetak.php?id=N` — bukti pendaftaran PDF (Dompdf)

## Library
Lihat `docs/daftar-library.md`.

## Catatan
- `config/config.php` berisi konfigurasi lokal dan tidak boleh di-commit.
- `vendor/` dan `node_modules/` tidak di-commit; `composer.lock` di-commit.
