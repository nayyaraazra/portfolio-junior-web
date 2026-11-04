# Modul Auth

| Bagian | Isi |
|---|---|
| ID modul / berkas | MOD-AUT-001 / `src/auth.php` |
| Versi dan status | 1.0.1 / aktif |
| Penulis dan tanggal | Nayyara Aqila / (isi tanggal) |
| Kegunaan | Autentikasi admin berbasis sesi dan `password_hash` |
| Dependensi | `config/database.php` (PDO), `src/helpers.php` (`redirect()`), tabel `admin` |
| Fungsi publik | `cariAdmin`, `prosesLogin`, `wajibLogin`, `logout` |
| Catatan keamanan | Sandi disimpan sebagai hash; regenerasi sesi saat login (anti session fixation); pesan galat login umum; logout lewat POST dengan token CSRF; pembatasan percobaan berbasis sesi hanya latihan (produksi: berbasis IP/akun) |

## Antarmuka

| Fungsi | Ringkasan | Return |
|---|---|---|
| `cariAdmin(PDO $pdo, string $username)` | Mencari admin berdasarkan username | `?array` |
| `prosesLogin(PDO $pdo, string $username, string $sandi)` | Verifikasi sandi, regenerasi sesi, simpan `admin_id` | `bool` |
| `wajibLogin()` | Alihkan ke `login.php` bila belum login | `void` |
| `logout()` | Kosongkan sesi, hapus cookie, `session_destroy()` | `void` |

## Contoh pemakaian

```php
<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';
wajibLogin();   // di awal setiap halaman admin
```

## Riwayat revisi

| Versi | Tanggal | Perubahan | Penulis |
|---|---|---|---|
| 1.0.0 | (isi tanggal Hari 11) | Login admin: `cariAdmin`, `prosesLogin`, `wajibLogin`, `logout` | Nayyara Aqila |
| 1.0.1 | (isi tanggal Hari 12) | Tambah DocBlock; perbaiki pemakaian: `wajibLogin()` dipasang di semua halaman admin dan logout hanya lewat POST + CSRF | Nayyara Aqila |
