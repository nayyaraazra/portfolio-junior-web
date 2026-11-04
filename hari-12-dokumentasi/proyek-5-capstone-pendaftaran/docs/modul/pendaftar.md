# Modul Pendaftar

| Bagian | Isi |
|---|---|
| ID modul / berkas | MOD-PND-001 / `src/pendaftar.php` |
| Versi dan status | 1.1.1 / aktif |
| Penulis dan tanggal | Nayyara Aqila / (4/11/2026) |
| Kegunaan | Akses data, validasi, dan aturan kuota untuk pendaftar pelatihan |
| Dependensi | `config/database.php` (PDO), `src/helpers.php`, `src/validasi.php` |
| Fungsi/kelas publik | Lihat tabel antarmuka di bawah |
| Catatan | Semua query memakai prepared statement; `daftarkanDenganKuota()` memakai transaksi dan `FOR UPDATE` |

## Antarmuka

| Nama | Ringkasan | Return | Exception |
|---|---|---|---|
| `KuotaPenuhException` | Dilempar saat kelas penuh | - | - |
| `daftarKelas(PDO)` | Semua kelas + kuota + jumlah terisi | `array` | `PDOException` |
| `ambilPendaftarById(PDO, int)` | Satu pendaftar | `?array` | `PDOException` |
| `emailSudahAda(PDO, string, ?int)` | Cek email ganda | `bool` | `PDOException` |
| `validasiPendaftar(array, PDO, ?int)` | Validasi form, hasil bersih + galat | `array{data, galat}` | `PDOException` |
| `tambahPendaftar(PDO, array)` | INSERT tanpa cek kuota (form admin) | `bool` | `PDOException` (kode 23000 = email ganda) |
| `ubahPendaftar(PDO, int, array)` | UPDATE | `bool` | `PDOException` |
| `hapusPendaftar(PDO, int)` | DELETE | `bool` | `PDOException` |
| `ambilSemuaPendaftar(PDO)` | Seluruh baris untuk DataTables | `array` | `PDOException` |
| `ambilBuktiPendaftar(PDO, int)` | Data bukti PDF | `?array` | `PDOException` |
| `daftarkanDenganKuota(PDO, array)` | INSERT dengan cek kuota dalam transaksi | `void` | `KuotaPenuhException`, `DomainException`, `PDOException` |
| `hitungPendaftar`, `ambilPendaftar` | Sisa paginasi Lab 3 | - | Ditandai `@deprecated` |

## Contoh pemakaian

```php
try {
    daftarkanDenganKuota($pdo, $data);
    setFlash('Pendaftaran berhasil.');
} catch (KuotaPenuhException $e) {
    $galat['kelas_id'] = $e->getMessage(); // minta peserta memilih kelas lain
}
```

## Riwayat revisi

| Versi | Tanggal | Perubahan | Penulis |
|---|---|---|---|
| 1.0.0 | (Hari 9) | CRUD pendaftar dan validasi dasar | Nayyara Aqila |
| 1.1.0 | (Hari 11) | Tambah `daftarkanDenganKuota` dan `KuotaPenuhException`; `daftarKelas` memuat kuota dan jumlah terisi | Nayyara Aqila |
| 1.1.1 | ( Hari 12) | Tambah DocBlock dan komentar alasan; `hitungPendaftar` dan `ambilPendaftar` ditandai usang | Nayyara Aqila |
