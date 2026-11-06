# Laporan Bug – bug-simulasi.php

| No | Bug | Jenis | Penyebab | Perbaikan | Re-test |
|----|-----|-------|----------|-----------|---------|
| 1 | Titik koma hilang setelah `count($peserta)` | Syntax | Statement tidak diakhiri `;` | Tambahkan `;` | File berjalan tanpa parse error |
| 2 | `$daftar[2]['nama']` | Runtime (Undefined array key) | Array hanya 2 elemen (indeks 0-1) | Gunakan indeks `0` | Output "Budi/Sari" benar, tanpa warning |
| 3 | `... / count($daftarUmur) - 1` | Logic | Rata-rata dikurangi 1; array kosong → pembagian nol | Hapus `- 1`; tambah guard array kosong | `rataUmur([20, 30])` = 25 |
