# Catatan Keamanan - Sprint 2 (Hari 11)

- Proyek: Proyek 5 - Sistem Pendaftaran Kelas
- Penguji: (isi nama)
- Tanggal uji: (isi tanggal)
- Lingkungan: (isi versi PHP, MySQL, browser)

## Ringkasan

| Serangan | Status akhir | Ref Bug |
|---|---|---|
| XSS | | |
| SQL Injection | | |
| CSRF | | |
| Akses tanpa login | | |
| Manipulasi id | | |
| Race condition kuota | | |

---

## 1. XSS (Cross-Site Scripting)

- **Cara menguji:** isi kolom nama dengan `<script>alert(1)</script>`, daftar, lalu periksa semua tempat nama ditampilkan.
- **Harapan:** tampil sebagai teks, tidak ada popup alert.

| Lokasi tampil | Hasil aktual | Status | Bukti |
|---|---|---|---|
| Daftar di `index.php` | | | `screenshots/xss-index.png` |
| Form `ubah.php` (atribut `value`) | | | `screenshots/xss-ubah.png` |
| `cetak.php` | | | `screenshots/xss-cetak.png` |
| Pesan flash | | | |

**Catatan/temuan:** (mis. ada output yang belum memakai `e()`, sudah diperbaiki di B-xx)

## 2. SQL Injection

- **Cara menguji:** isi `' OR '1'='1` pada pencarian dan pada login; coba juga `admin' --` sebagai username.
- **Harapan:** tidak ada efek khusus; pencarian tidak menampilkan seluruh data, login tetap gagal dengan pesan umum, tidak ada error SQL.

| Titik uji | Masukan | Hasil aktual | Status | Bukti |
|---|---|---|---|---|
| Pencarian | `' OR '1'='1` | | | `screenshots/sqli-cari.png` |
| Login (username) | `' OR '1'='1` | | | `screenshots/sqli-login.png` |
| Login (username) | `admin' --` | | | |

**Catatan:** (mis. seluruh query memakai prepared statement PDO: ya/tidak, sebutkan berkas yang diperiksa)

## 3. CSRF

- **Prasyarat:** login sebagai admin terlebih dahulu.
- **Cara menguji:**
  1. Buka DevTools, ubah nilai input hidden `csrf` pada form hapus menjadi `salah` (atau hapus inputnya), lalu submit.
  2. Buka `logout.php` lewat URL (metode GET).
- **Harapan:** POST tanpa/salah token ditolak dengan **403**; logout lewat GET ditolak atau tidak melakukan logout.

| Uji | Hasil aktual | Status | Bukti |
|---|---|---|---|
| Hapus dengan token salah | | | `screenshots/csrf-hapus-403.png` (tab Network) |
| Hapus tanpa token | | | |
| Logout lewat GET | | | |
| Form login tanpa token | | | |

## 4. Akses Tanpa Login

- **Cara menguji:** buka `index.php`, `tambah.php`, `ubah.php`, `hapus.php`, `cetak.php` tanpa sesi (jendela incognito). `daftar.php` harus tetap publik.
- **Harapan:** halaman admin diarahkan ke `login.php`.

| Halaman | Hasil aktual | Status |
|---|---|---|
| `index.php` | | |
| `tambah.php` | | |
| `ubah.php` | | |
| `hapus.php` | | |
| `cetak.php` | | |
| `daftar.php` (publik) | | |

Bukti: `screenshots/akses-tanpa-login.png`

## 5. Manipulasi ID

- **Cara menguji:** `ubah.php?id=abc`, `id=-1`, `id=99999`.
- **Harapan:** 404, tanpa pesan error mentah.

| Masukan | Hasil aktual | Status | Bukti |
|---|---|---|---|
| `id=abc` | | | |
| `id=-1` | | | |
| `id=99999` | | | |

## 6. Race Condition Kuota

- **Cara menguji:** sisakan kuota 1; kirim dua pendaftaran dari dua browser berbeda dengan selisih beberapa detik (sementara beri `sleep()` di dalam transaksi, lalu hapus setelah uji).
- **Harapan:** hanya satu berhasil, yang lain ditolak "Kuota kelas sudah penuh."

| Percobaan | Hasil aktual | Status | Bukti |
|---|---|---|---|
| Pendaftar 1 | | | |
| Pendaftar 2 | | | `screenshots/race-kuota.png` |

Jumlah pendaftar di database setelah uji: (isi). Seharusnya tidak melebihi kuota.

## 7. Praktik Keamanan Lain yang Diperiksa

| Butir | Ya/Tidak | Catatan |
|---|---|---|
| Sandi disimpan dengan `password_hash` (cek di phpMyAdmin) | | |
| Pesan gagal login tidak membocorkan username/sandi mana yang salah | | |
| `session_regenerate_id(true)` dipanggil setelah login | | |
| Logout lewat POST + CSRF, sesi dan cookie dihancurkan | | |
| Pembatasan percobaan login (catatan: berbasis sesi hanya latihan; produksi perlu berbasis IP/akun) | | |
| `display_errors` mati pada uji akhir, pesan error ke pengguna bersifat umum | | |

## Kesimpulan

(2-3 kalimat: celah apa yang sempat ditemukan, sudah diperbaiki di bug mana, dan kondisi akhir saat uji ulang.)
