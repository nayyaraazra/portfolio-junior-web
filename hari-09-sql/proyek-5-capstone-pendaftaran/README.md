# Proyek 5: Sistem Pendaftaran Pelatihan

## Persiapan
1. Pastikan PHP dengan ekstensi `pdo_mysql` dan MySQL/MariaDB aktif.
2. Buat database dengan mengimpor `database/skema.sql` melalui phpMyAdmin.
3. Salin `config/config.contoh.php` menjadi `config/config.php`, lalu sesuaikan kredensial database.
4. Jalankan aplikasi dengan document root diarahkan ke folder `public/`, atau dari root proyek jalankan `php -S localhost:8000 -t public`.
5. Buka `http://localhost:8000`.

## Catatan
- `config/config.php` berisi konfigurasi lokal dan tidak boleh di-commit.
- `database/latihan.sql` berisi query latihan Hari 9.
- `public/injeksi.php` merupakan demonstrasi edukasi SQL Injection dan sebaiknya hanya digunakan di lingkungan latihan lokal.
