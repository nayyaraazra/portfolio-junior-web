# Changelog

Format mengikuti [Keep a Changelog](https://keepachangelog.com/) dan [Semantic Versioning](https://semver.org/).

## [1.0.0] -  (4/11/2026)
### Ditambahkan
- Login admin (`password_hash`, regenerasi sesi), proteksi halaman admin, logout lewat POST dengan CSRF
- Kuota kelas dengan transaksi dan `SELECT ... FOR UPDATE`, sisa kuota pada pilihan kelas
- Peringkat kelas pada halaman admin (`peringkatKelas()`)
- Uji otomatis sederhana (`tests/jalankan.php`)
- Dokumentasi: DocBlock/JSDoc, dokumen modul, peta modul, arsitektur, panduan pengguna, README, CHANGELOG, LICENSE
### Diperbaiki
- Halaman admin dapat dibuka tanpa login (`wajibLogin()` belum dipasang)
- Login berhasil mengarah ke halaman yang tidak ada (`admin.php`)
- Logout lewat GET tanpa CSRF dan tidak mengakhiri sesi
- Pendaftaran dapat melebihi kuota kelas
- Navbar: tombol Keluar berada di luar `<li>`; menu admin tampil untuk pengunjung

## [0.2.0] - (30/10/2026)
### Ditambahkan
- Antarmuka Bootstrap, DataTables, SweetAlert2
- Cetak bukti pendaftaran PDF (Dompdf)

## [0.1.0] - (29/10/2026)
### Ditambahkan
- CRUD pendaftar dengan PDO dan prepared statement, validasi dasar, form pendaftaran publik
