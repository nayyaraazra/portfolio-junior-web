# Tabel Bug Hunt Hari 9

| No. | Gejala | Penyebab | Perbaikan |
|---|---|---|---|
| 1 | SQLSTATE[HY000] [1045] Access denied | Kredensial salah di config.php | Perbaiki pengguna/sandi |
| 2 | SQLSTATE[HY000] [1049] Unknown database | Nama database salah atau belum diimpor | Impor skema.sql dan samakan nama database |
| 3 | SQLSTATE[23000] 1062 Duplicate entry | Email ganda tidak divalidasi | Periksa emailSudahAda dan tangani pesan ramah |
| 4 | Unknown column 'nama_kelas' | Kolom bukan di tabel yang di-SELECT, lupa JOIN | Tambahkan JOIN kelas |
| 5 | Query digabung dengan string dari $_GET['id'] | Rentan SQL Injection | Gunakan prepared statement |
| 6 | LIMIT '10' menimbulkan error sintaks | Nilai LIMIT terikat sebagai string | bindValue(..., PDO::PARAM_INT) |
| 7 | Seluruh data terhapus | DELETE tanpa WHERE | Tambahkan WHERE id = :id dan uji pada salinan data |
