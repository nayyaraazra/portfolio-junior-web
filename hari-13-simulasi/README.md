# Sistem Pendaftaran Kursus Singkat

## Gambaran
Aplikasi web PHP + MySQL untuk mendaftar kursus: form responsif (Bootstrap), daftar peserta dengan pencarian (DataTables), dan ekspor bukti pendaftaran ke PDF (Dompdf).

## Instalasi
1. Pasang XAMPP/Laragon, jalankan Apache dan MySQL; cek `php -v`.
2. Salin folder ke `htdocs/simulasi-naya/`.
3. Impor `skema.sql` ke MySQL; sesuaikan kredensial di `src/config.php`.
4. Jalankan `composer require dompdf/dompdf` di folder ini.
5. Cek `http://localhost/simulasi-naya/tes.php`.

## Penggunaan
Buka `http://localhost/simulasi-naya/index.php`, isi form, lalu unduh bukti PDF dari tautan hasil pendaftaran atau tabel peserta.

## Library
Bootstrap 5.3.3 (MIT), DataTables 1.13.8 (MIT), jQuery 3.7.1 (MIT), Dompdf (LGPL-2.1).

## Struktur data
Kursus disimpan sebagai map `id => nama` (array asosiatif) untuk validasi dan lookup O(1).
