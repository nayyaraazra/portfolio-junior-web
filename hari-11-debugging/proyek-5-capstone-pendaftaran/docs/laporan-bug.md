# Laporan Bug - Sprint 2 (Hari 11)

## Tabel Laporan Bug

| ID | Jenis | Gejala | Penyebab | Perbaikan |
|---|---|---|---|---|
| B-01 | Runtime | Mendaftar dengan email yang sudah ada menampilkan error mentah / halaman 500: `SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry '...' for key 'email'` | `daftarkanDenganKuota()` hanya ditangkap sebagai `KuotaPenuhException` di `daftar.php`; `PDOException` kode 1062 dari `INSERT` tidak ditangani | Tangkap `PDOException` di `daftar.php`, bila `$e->getCode() === '23000'` isi `$galat['email'] = 'Email sudah terdaftar.'`; selain itu tampilkan pesan umum dan catat detail dengan `error_log()` |
| B-02 | Logic | Mendaftar dengan `kelas_id` yang tidak ada (mis. DevTools diubah ke `99999`) menampilkan "Kuota kelas sudah penuh." padahal kelasnya tidak ada | `fetchColumn()` mengembalikan `false` untuk kelas yang tidak ditemukan, lalu `(int) false` = 0, sehingga `COUNT >= 0` selalu benar | Setelah query kuota, periksa `=== false`; bila ya, `throw` pesan "Kelas tidak ditemukan." dan validasi `kelas_id` sebagai angka positif sebelum query |
| B-03 | Runtime | `ubah.php?id=abc`, `id=-1`, atau `id=99999` menampilkan Warning/Notice atau halaman kosong, bukan 404 | `$_GET['id']` dipakai langsung tanpa validasi; hasil `fetch()` bernilai `false` tetapi tetap diakses seperti array | Validasi dengan `filter_var($_GET['id'] ?? '', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]])`; bila tidak valid atau data tidak ada, kirim `http_response_code(404)` dan tampilkan pesan umum |
| B-04 | Logic (keamanan) | Nama `<script>alert(1)</script>` menjalankan popup alert di salah satu halaman (mis. `cetak.php` atau atribut `value` pada `ubah.php`) | Output `$nama` ditampilkan tanpa `e()` / `htmlspecialchars()` | Bungkus semua output data pengguna dengan `e()`, termasuk di dalam atribut HTML; cek ulang dengan `git grep -n "echo \$"` |
| B-05 | Logic (keamanan) | Salah satu halaman admin (mis. `hapus.php` atau `cetak.php`) masih bisa dibuka tanpa login | `wajibLogin();` belum dipasang di berkas tersebut | Tambahkan `wajibLogin();` tepat setelah `require_once bootstrap.php`; uji semua halaman admin di jendela incognito |

