# Laporan Bug - Sprint 2 (Hari 11)

## Tabel Laporan Bug

| ID | Jenis | Gejala | Penyebab | Perbaikan |
|---|---|---|---|---|
| B-01 | Logic (keamanan) | Halaman admin (`index.php`, `tambah.php`, `ubah.php`) terbuka tanpa login: server membalas 200, bukan diarahkan ke `login.php` | `wajibLogin();` belum dipasang di `index.php`, `tambah.php`, `ubah.php`, `hapus.php`, dan `cetak.php` | Tambahkan `wajibLogin();` tepat setelah `require_once bootstrap.php` di kelima berkas |
| B-02 | Logic | Login dengan akun benar menghasilkan 302 ke `admin.php`, lalu halaman 404 (Not Found) | `login.php` mengarahkan ke `admin.php` yang tidak ada, dan menyimpan kunci sesi `admin_login` dan `username` yang tidak dipakai `wajibLogin()` (yang memeriksa `admin_id`) | Ganti `redirect('admin.php')` menjadi `redirect('index.php')`; hapus dua baris `$_SESSION['admin_login']` dan `$_SESSION['username']` |
| B-03 | Logic (keamanan) | Membuka `logout.php` lewat URL (GET) langsung "logout", tetapi `index.php` tetap 200 dengan cookie sesi lama, artinya sesi tidak berakhir | `logout.php` tanpa cek metode POST dan `cekCsrf()`, hanya `unset($_SESSION['admin_login'])`, tidak memanggil `logout()` yang menghapus `admin_id`, sesi, dan cookie | Tulis ulang `logout.php`: hanya terima POST, panggil `cekCsrf()`, lalu `logout()`, lalu redirect ke `login.php` |
| B-04 | Logic | Pendaftaran tidak dibatasi kuota: pendaftar bisa melebihi kuota kelas | `daftar.php` memanggil `tambahPendaftar()` langsung tanpa memeriksa `kuota` dan `COUNT(*)` kelas; belum ada transaksi `FOR UPDATE` | Tambah `KuotaPenuhException` dan `daftarkanDenganKuota()` (transaksi + `FOR UPDATE`) di `src/pendaftar.php`; `daftar.php` memanggilnya dan menampilkan pesan "Kuota kelas sudah penuh."; dropdown menampilkan sisa kuota |
| B-05 | Syntax (markup) | Tombol Keluar berada langsung di dalam `<ul>` tanpa `<li>` (HTML tidak valid, jarak/tata letak navbar tidak rapi); menu admin juga tampil untuk pengunjung yang belum login | Form dimasukkan sebagai anak langsung `<ul class='navbar-nav'>` di `templates/header.php` | Bungkus form dengan `<li class='nav-item'>`; tampilkan menu Daftar/Tambah dan tombol Keluar hanya saat `admin_id` ada, selain itu tampilkan link Login Admin |

Jenis: Syntax / Runtime / Logic.

## Detail Pendukung (format T7)

| ID | Tingkat keparahan | Lokasi (berkas:baris) | Langkah reproduksi | Pesan/kode error | Hasil re-test (Lolos/Gagal, tanggal) | Bukti |
|---|---|---|---|---|---|---|
| B-01 | Kritis | `public/index.php:4`, `tambah.php:4`, `ubah.php:4`, `hapus.php:4`, `cetak.php:4` | 1. Buka jendela incognito (tanpa login) 2. Buka `/index.php`, `/tambah.php`, `/ubah.php?id=1` | Tidak ada error; halaman admin tampil (HTTP 200) | | `screenshots/B-01-sebelum.png`, `screenshots/B-01-sesudah.png` |
| B-02 | Tinggi | `public/login.php:17` | 1. Buka `/login.php` 2. Masuk dengan akun admin yang benar 3. Perhatikan halaman tujuan | HTTP 404 pada `/admin.php` | | `screenshots/B-02-sebelum.png`, `screenshots/B-02-sesudah.png` |
| B-03 | Tinggi | `public/logout.php:5` | 1. Login 2. Buka `/logout.php` lewat URL 3. Buka `/index.php` dengan sesi yang sama | Tidak ada error; `index.php` tetap terbuka (HTTP 200) | | `screenshots/B-03-sebelum.png`, `screenshots/B-03-sesudah.png` |
| B-04 | Sedang | `public/daftar.php:20` | 1. Pilih kelas dengan kuota hampir penuh (atau turunkan `kuota` di tabel `kelas`) 2. Daftar sampai melewati kuota | Tidak ada pesan; data tetap tersimpan melebihi kuota | | `screenshots/B-04-sebelum.png`, `screenshots/B-04-sesudah.png` |
| B-05 | Rendah | `templates/header.php:21-31` | 1. Login 2. Perhatikan navbar; 3. Periksa HTML di DevTools (Elements) | `<form>` sebagai anak langsung `<ul>`; tidak ada pesan error | | `screenshots/B-05-sebelum.png`, `screenshots/B-05-sesudah.png` |

## Uji Regresi Setelah Semua Perbaikan

| Pemeriksaan | Hasil | Tanggal |
|---|---|---|
| `php tests/jalankan.php` | | |
| Semua kasus uji di `kasus-uji.md` dijalankan ulang | | |
| Tidak ada `var_dump`, `print_r`, `console.log`, `debugger` tersisa | | |
| Log Apache/PHP bebas Warning dan Notice | | |
