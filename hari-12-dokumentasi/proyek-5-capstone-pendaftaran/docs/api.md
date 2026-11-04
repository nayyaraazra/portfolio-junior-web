# Referensi API Manual

Cadangan bila `phpDocumentor` tidak dapat dipasang. Versi lengkap hasil generator ada di `docs/api/index.html` (PHP) dan `docs/api-js/` (JavaScript).

## PHP

| Fungsi | Parameter | Return | Exception |
|---|---|---|---|
| `getConnection()` | - | `PDO` | `PDOException` bila koneksi gagal |
| `e(?string $teks)` | teks mentah | `string` ter-escape | - |
| `redirect(string $url)` | URL tujuan | `never` | - |
| `tokenCsrf()` | - | `string` | `Exception` bila sumber acak tidak ada |
| `cekCsrf()` | - | `void` | - (HTTP 403 + exit bila gagal) |
| `setFlash(string $pesan)` | pesan | `void` | - |
| `ambilFlash()` | - | `?string` | - |
| `validNoHp(string $noHp)` | nomor HP | `bool` | - |
| `hitungSisaKuota(int $kuota, int $terisi)` | kuota, terisi | `int` >= 0 | - |
| `formatNomorBukti(int $tahun, int $id)` | tahun, ID | `string` | - |
| `peringkatKelas(array $daftarKelas)` | hasil `daftarKelas()` | `array` berperingkat | - |
| `cariAdmin(PDO $pdo, string $username)` | koneksi, username | `?array` | `PDOException` |
| `prosesLogin(PDO $pdo, string $username, string $sandi)` | koneksi, username, sandi | `bool` | `PDOException` |
| `wajibLogin()` | - | `void` | - |
| `logout()` | - | `void` | - |
| `daftarKelas(PDO $pdo)` | koneksi | `array` | `PDOException` |
| `ambilPendaftarById(PDO $pdo, int $id)` | koneksi, ID | `?array` | `PDOException` |
| `emailSudahAda(PDO $pdo, string $email, ?int $kecualiId)` | koneksi, email, ID dikecualikan | `bool` | `PDOException` |
| `validasiPendaftar(array $input, PDO $pdo, ?int $idUbah)` | input, koneksi, ID ubah | `array{data, galat}` | `PDOException` |
| `tambahPendaftar(PDO $pdo, array $d)` | koneksi, 5 kolom | `bool` | `PDOException` |
| `ubahPendaftar(PDO $pdo, int $id, array $d)` | koneksi, ID, 5 kolom | `bool` | `PDOException` |
| `hapusPendaftar(PDO $pdo, int $id)` | koneksi, ID | `bool` | `PDOException` |
| `ambilSemuaPendaftar(PDO $pdo)` | koneksi | `array` | `PDOException` |
| `ambilBuktiPendaftar(PDO $pdo, int $id)` | koneksi, ID | `?array` | `PDOException` |
| `daftarkanDenganKuota(PDO $pdo, array $data)` | koneksi, data tervalidasi | `void` | `KuotaPenuhException`, `DomainException`, `PDOException` |

## JavaScript (`public/assets/js/app.js`)

| Fungsi | Deskripsi | Return |
|---|---|---|
| `tampilkanFlash()` | Toast dari elemen `#flash` | `void` |
| `pasangKonfirmasiHapus()` | Dialog konfirmasi pada `.form-hapus` | `void` |
| `aktifkanDataTables()` | DataTables pada `#tabelPendaftar` | `void` |
