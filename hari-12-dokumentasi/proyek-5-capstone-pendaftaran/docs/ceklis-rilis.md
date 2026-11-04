# Ceklis Code Freeze, Uji Instalasi, dan Rilis

## 1. Code Freeze dan Rilis

| Butir | Ya/Tidak | Catatan |
|---|---|---|
| Semua fungsi publik memiliki DocBlock dengan `@param`, `@return`, `@throws` | | |
| Dokumen modul memiliki identitas, kegunaan, dan riwayat revisi terbaru | | |
| Dokumentasi sinkron dengan kode (diuji dengan generator dan uji baca teman) | | |
| README dapat diikuti dari nol pada mesin/basis data baru | | |
| Tidak ada kredensial nyata, `var_dump`, atau `console.log` tersisa | | |
| CHANGELOG.md, LICENSE, dan atribusi library lengkap | | |
| Tag v1.0.0 sudah dibuat dan didorong ke GitHub | | |

Perintah pemeriksaan cepat:

```
git grep -nE "var_dump|print_r|console\.log|debugger"
git grep -n "maululus"        # ganti dengan kata sandi database Anda; hasil harus kosong
git ls-files | grep -E "config/config.php|vendor/"   # hasil harus kosong
```

## 2. Catatan Uji Instalasi dari Nol

- Tanggal: (isi)
- Lokasi uji: (folder baru hasil `git clone ... uji-instalasi`)
- Database uji: (nama database baru)

| Langkah README | Berhasil? | Masalah/kendala | Perbaikan pada README |
|---|---|---|---|
| 1. Salin/clone proyek | | | |
| 2. Impor `database/skema.sql` | | | |
| 3. Salin `config.contoh.php` menjadi `config.php`, isi kredensial | | | |
| 4. `composer install` | | | |
| 5. `php database/buat-admin.php admin SandiKuat123` | | | |
| 6. Buka aplikasi di browser | | | |
| Uji: daftar sebagai peserta, login admin, cetak PDF | | | |
| Uji: `php tests/jalankan.php` | | | |

## 3. Rilis

```
git status
git add .
git commit -m "Hari 12: finalisasi dokumentasi dan rilis v1.0.0"
git tag -a v1.0.0 -m "Rilis 1.0.0: Sistem Pendaftaran Pelatihan"
git push origin main --tags
```
