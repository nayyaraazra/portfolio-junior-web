# Kasus Uji - Sprint 2 (Hari 11)

## Tabel Kasus Uji

| ID | Kategori | Skenario | Masukan | Hasil diharapkan | Hasil aktual |
|---|---|---|---|---|---|
| TC-01 | Fungsional | Daftar valid | Semua kolom terisi benar | Tersimpan, pesan sukses | berhasil| 
| TC-02 | Negatif | Nama kosong | Nama dikosongkan | Ditolak, pesan pada kolom nama |berhasil | 
| TC-03 | Negatif | Email kosong | Email dikosongkan | Ditolak, pesan pada kolom email | berhasil| 
| TC-04 | Negatif | HP kosong | HP dikosongkan | Ditolak, pesan pada kolom HP |berhasil | 
| TC-05 | Negatif | Kelas belum dipilih | Kelas dikosongkan | Ditolak, pesan pada kolom kelas |berhasil | 
| TC-06 | Negatif | Email ganda | Email yang sudah terdaftar | Ditolak dengan pesan | Berhasil| 
| TC-07 | Nilai batas | HP 9 digit | `081234567` | Ditolak | Berhasil| 
| TC-08 | Nilai batas | HP 10 digit | `0812345678` | Lolos | Berhasil | 
| TC-09 | Nilai batas | HP 13 digit | `0812345678901` | Lolos | Berhasil| 
| TC-10 | Nilai batas | HP 14 digit | `08123456789012` | Ditolak | Berhasil | 
| TC-11 | Negatif | HP berisi huruf | `08abc45678` | Ditolak | Berhasil | 
| TC-12 | Kasus tepi | Kuota tepat penuh | Daftar saat sisa kuota 0 | Ditolak, "Kuota kelas sudah penuh." | Berhasil | 
| TC-13 | Keamanan | Login benar | Username dan sandi admin yang benar | Masuk, diarahkan ke `index.php` | Berhasil | 
| TC-14 | Keamanan | Login salah | Sandi salah | Pesan umum "Username atau kata sandi salah." | Belum berhasil | 
| TC-15 | Keamanan | Akses admin tanpa login | Buka `index.php` tanpa sesi | Diarahkan ke `login.php` | Belum berhasil| 
| TC-16 | Keamanan | Manipulasi id | `ubah.php?id=abc`, `id=-1`, `id=99999` | 404, tanpa error mentah | Belum berhasil | 
| TC-17 | Keamanan | XSS pada nama | `<script>alert(1)</script>` | Tampil sebagai teks, tidak ada alert | berhasil | 
| TC-18 | Keamanan | SQL Injection pada pencarian | `' OR '1'='1` | Tidak ada efek khusus | berhasil | 
| TC-19 | Keamanan | Hapus tanpa token | POST hapus tanpa/salah token CSRF | Ditolak 403 | berhasil | 
| TC-20 | Keamanan | Race condition kuota | 2 pendaftaran serentak, sisa kuota 1 | Hanya satu berhasil |belum berhasil| 

## Ringkasan Hasil

- Total kasus: 20
- Lolos: 16
- Gagal: 4
- Setelah perbaikan dan re-test, kasus gagal yang sudah lolos: 4 (semua sudah diperbaiki)
