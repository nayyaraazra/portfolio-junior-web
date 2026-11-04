# Ceklis Code Freeze, Uji Instalasi, dan Rilis

## 1. Code Freeze dan Rilis

| Butir | Ya/Tidak | Catatan |
|---|---|---|
| Semua fungsi publik memiliki DocBlock dengan `@param`, `@return`, `@throws` | Ya | |
| Dokumen modul memiliki identitas, kegunaan, dan riwayat revisi terbaru | Ya | |
| Dokumentasi sinkron dengan kode (diuji dengan generator dan uji baca teman) |  | |
| README dapat diikuti dari nol pada mesin/basis data baru | Ya | |
| Tidak ada kredensial nyata, `var_dump`, atau `console.log` tersisa |Ya | |
| CHANGELOG.md, LICENSE, dan atribusi library lengkap | Ya | |
| Tag v1.0.0 sudah dibuat dan didorong ke GitHub |ya | |

Perintah pemeriksaan cepat:

```
git grep -nE "var_dump|print_r|console\.log|debugger"
git grep -n ""        # kata sandi database
git ls-files | grep -E "config/config.php|vendor/"   # hasil harus kosong
```

## 2. Catatan Uji Instalasi dari Nol

| Langkah README | Berhasil? | Perbaikan pada README |
|---|---|---|---|
| 1. Salin/clone proyek | berhasil | - |
| 2. Impor `database/skema.sql` |berhasil| - |
| 3. Salin `config.contoh.php` menjadi `config.php`, isi kredensial | berhasil| - |
| 4. `composer install` |berhasil | - |
| 5. `php database/buat-admin.php admin SandiKuat123` |berhasil | - |
| 6. Buka aplikasi di browser |berhasil | - |
| Uji: daftar sebagai peserta, login admin, cetak PDF | berhasil| - |
| Uji: `php tests/jalankan.php` | Berhasil| - |

## 3. Rilis

```
git status
git add .
git commit -m "Hari 12: finalisasi dokumentasi dan rilis v1.0.0"
git tag -a v1.0.0 -m "Rilis 1.0.0: Sistem Pendaftaran Pelatihan"
git push origin main --tags
```
