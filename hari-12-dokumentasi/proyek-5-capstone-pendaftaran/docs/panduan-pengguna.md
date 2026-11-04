# Panduan Pengguna

Ganti setiap `(tangkapan layar)` dengan gambar di folder `docs/gambar/`, mis. `![Form pendaftaran](gambar/form-pendaftaran.png)`.

## A. Peserta: mendaftar pelatihan

1. Buka halaman pendaftaran: `.../public/daftar.php`.
2. Isi **Nama** (minimal 3 karakter), **Email**, **No. HP** (diawali 08, total 10-13 digit), pilih **Kelas**, dan isi **Alamat**.
3. Perhatikan teks di pilihan kelas: `(sisa N)` berarti masih ada tempat, `(penuh)` berarti kuota habis.
4. Klik **Simpan**.
5. Bila berhasil, muncul notifikasi "Pendaftaran berhasil. Terima kasih!".
6. Bila ada kolom merah, perbaiki sesuai pesan di bawah kolom lalu Simpan lagi. Pesan "Kuota kelas sudah penuh." berarti pilih kelas lain.

(tangkapan layar: form pendaftaran, pesan sukses, pesan kuota penuh)

## B. Admin: masuk dan keluar

1. Buka `.../public/login.php` (atau buka halaman admin mana pun, Anda akan dialihkan).
2. Isi **Username** dan **Kata sandi**, klik **Masuk**.
3. Untuk keluar, klik tombol **Keluar** di pojok kanan atas navbar.

(tangkapan layar: halaman login, navbar dengan tombol Keluar)

## C. Admin: mengelola pendaftar

| Tugas | Langkah |
|---|---|
| Melihat daftar | Menu **Daftar**. Cari, urutkan, dan pindah halaman lewat kontrol di atas/bawah tabel |
| Melihat peringkat kelas | Tabel "Peringkat Kelas" di atas daftar |
| Menambah | Menu **Tambah**, isi form, **Simpan** |
| Mengubah | Klik **Ubah** pada baris, ubah data, **Simpan** |
| Menghapus | Klik **Hapus**, lalu **Ya, hapus** pada dialog konfirmasi |
| Mencetak bukti | Klik **Cetak**; bukti PDF terbuka di tab baru |

(tangkapan layar: daftar pendaftar, dialog hapus, bukti PDF)

## D. Pemecahan masalah singkat

| Gejala | Penyebab umum | Solusi |
|---|---|---|
| "Username atau kata sandi salah." | Salah ketik atau akun belum dibuat | Periksa ejaan; admin dibuat dengan `php database/buat-admin.php <username> <sandi>` |
| "Terlalu banyak percobaan." | 5 kali gagal login dalam satu sesi | Tutup browser lalu coba lagi |
| "Permintaan tidak valid." (403) | Token form kedaluwarsa | Muat ulang halaman lalu kirim ulang |
| "Terjadi kesalahan pada sistem." | Kesalahan server (mis. database mati) | Pastikan MySQL menyala; periksa log Apache |
