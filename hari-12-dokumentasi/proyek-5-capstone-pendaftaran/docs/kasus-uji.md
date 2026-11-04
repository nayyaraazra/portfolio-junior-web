# Kasus Uji - Sprint 2 (Hari 11)

- Proyek: Proyek 5 - Sistem Pendaftaran Kelas
- Penguji: (isi nama)
- Tanggal uji: (isi tanggal)
- Lingkungan: PHP (isi versi), MySQL/MariaDB (isi versi), XAMPP, browser (isi)
- Cara pakai: jalankan tiap skenario, isi **Hasil aktual apa adanya**, lalu tandai status **LOLOS** atau **GAGAL**. Kasus GAGAL dicatat di `laporan-bug.md` (isi kolom Ref Bug).

## Tabel Kasus Uji

| ID | Kategori | Skenario | Masukan | Hasil diharapkan | Hasil aktual | Status | Ref Bug |
|---|---|---|---|---|---|---|---|
| TC-01 | Fungsional | Daftar valid | Semua kolom terisi benar | Tersimpan, pesan sukses | | | |
| TC-02 | Negatif | Nama kosong | Nama dikosongkan | Ditolak, pesan pada kolom nama | | | |
| TC-03 | Negatif | Email kosong | Email dikosongkan | Ditolak, pesan pada kolom email | | | |
| TC-04 | Negatif | HP kosong | HP dikosongkan | Ditolak, pesan pada kolom HP | | | |
| TC-05 | Negatif | Kelas belum dipilih | Kelas dikosongkan | Ditolak, pesan pada kolom kelas | | | |
| TC-06 | Negatif | Email ganda | Email yang sudah terdaftar | Ditolak dengan pesan | | | |
| TC-07 | Nilai batas | HP 9 digit | `081234567` | Ditolak | | | |
| TC-08 | Nilai batas | HP 10 digit | `0812345678` | Lolos | | | |
| TC-09 | Nilai batas | HP 13 digit | `0812345678901` | Lolos | | | |
| TC-10 | Nilai batas | HP 14 digit | `08123456789012` | Ditolak | | | |
| TC-11 | Negatif | HP berisi huruf | `08abc45678` | Ditolak | | | |
| TC-12 | Kasus tepi | Kuota tepat penuh | Daftar saat sisa kuota 0 | Ditolak, "Kuota kelas sudah penuh." | | | |
| TC-13 | Keamanan | Login benar | Username dan sandi admin yang benar | Masuk, diarahkan ke `index.php` | | | |
| TC-14 | Keamanan | Login salah | Sandi salah | Pesan umum "Username atau kata sandi salah." | | | |
| TC-15 | Keamanan | Akses admin tanpa login | Buka `index.php` tanpa sesi | Diarahkan ke `login.php` | | | |
| TC-16 | Keamanan | Manipulasi id | `ubah.php?id=abc`, `id=-1`, `id=99999` | 404, tanpa error mentah | | | |
| TC-17 | Keamanan | XSS pada nama | `<script>alert(1)</script>` | Tampil sebagai teks, tidak ada alert | | | |
| TC-18 | Keamanan | SQL Injection pada pencarian | `' OR '1'='1` | Tidak ada efek khusus | | | |
| TC-19 | Keamanan | Hapus tanpa token | POST hapus tanpa/salah token CSRF | Ditolak 403 | | | |
| TC-20 | Keamanan | Race condition kuota | 2 pendaftaran serentak, sisa kuota 1 | Hanya satu berhasil | | | |

## Kasus Tambahan (opsional)

| ID | Kategori | Skenario | Masukan | Hasil diharapkan | Hasil aktual | Status | Ref Bug |
|---|---|---|---|---|---|---|---|
| TC-21 | Keamanan | Logout lewat GET | Buka `logout.php` lewat URL | Ditolak / tidak logout | | | |
| TC-22 | Keamanan | Login dengan 5 kali gagal | 5x sandi salah, lalu coba lagi | Pesan "Terlalu banyak percobaan." | | | |
| TC-23 | Kasus tepi | Data kosong | Buka daftar saat tabel kosong | Tampil pesan kosong, tanpa error | | | |

## Ringkasan Hasil

- Total kasus: (isi)
- Lolos: (isi)
- Gagal: (isi)
- Setelah perbaikan dan re-test, kasus gagal yang sudah lolos: (isi)

## Uji Ulang (Re-test) dan Regresi

| Tanggal | Cakupan | Hasil |
|---|---|---|
| (isi) | Semua TC setelah perbaikan | (isi) |
| (isi) | `php tests/jalankan.php` | (isi: "Semua uji lolos.") |
| (isi) | Uji akhir dengan `display_errors` mati | (isi) |
