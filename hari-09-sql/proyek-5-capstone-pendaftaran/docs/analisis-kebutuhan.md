# Analisis Kebutuhan

## Pengguna
- **Peserta:** mengisi pendaftaran pelatihan dan mencetak bukti pendaftaran PDF pada tahap lanjutan.
- **Admin:** melihat, mencari, mengubah, dan menghapus data pendaftar; login admin dan pengelolaan kuota dikembangkan pada Hari 11.

## Fitur wajib
- Form pendaftaran dengan validasi server.
- Daftar pendaftar dengan pencarian nama dan paginasi.
- Ubah dan hapus data pendaftar.
- Relasi data pendaftar dengan kelas.
- Prepared statement, output escaping, token CSRF untuk POST, dan konfigurasi kredensial terpisah.
- PRG (Post/Redirect/Get), penanganan error, dan skema basis data yang dapat diimpor.

## Fitur tambahan
- Bukti pendaftaran PDF (Hari 10).
- Login admin dan pembatasan kuota kelas (Hari 11).

## Batasan
- Sprint 0 berfokus pada fondasi CRUD pendaftar.
- Login admin, kuota kelas, dan pembuatan PDF belum termasuk implementasi Hari 9.
- Konfigurasi koneksi disediakan untuk lingkungan lokal dan perlu disesuaikan sebelum digunakan.
