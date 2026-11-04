<?php
/**
 * Modul      : Pendaftar (src/pendaftar.php)
 * ID Modul   : MOD-PND-001
 * Deskripsi  : Akses data, validasi, dan aturan kuota untuk pendaftar pelatihan.
 * Dependensi : config/database.php (PDO), src/helpers.php, src/validasi.php
 *
 * @package PendaftaranPelatihan
 * @author  Nayyara Aqila
 * @version 1.1.1
 * @since   1.0.0
 */
declare(strict_types=1);

/**
 * Dilempar oleh daftarkanDenganKuota() ketika kelas sudah mencapai kuota.
 * Penanganan: tampilkan pesannya pada kolom kelas dan minta peserta memilih kelas lain.
 */
final class KuotaPenuhException extends RuntimeException
{
}

/**
 * Mengambil semua kelas beserta kuota dan jumlah pendaftar saat ini.
 *
 * @param PDO $pdo Koneksi database aktif.
 *
 * @return array<int, array{id: int|string, nama_kelas: string, kuota: int|string, terisi: int|string}>
 *         Diurutkan menurut nama kelas A-Z; array kosong bila belum ada kelas.
 *
 * @throws PDOException Bila query gagal.
 */
function daftarKelas(PDO $pdo): array
{
    $sql = 'SELECT k.id, k.nama_kelas, k.kuota,
                   (SELECT COUNT(*) FROM pendaftar p WHERE p.kelas_id = k.id) AS terisi
            FROM kelas k ORDER BY k.nama_kelas';

    return $pdo->query($sql)->fetchAll();
}

/**
 * Menghitung pendaftar yang namanya memuat kata kunci.
 *
 * @deprecated Sejak Lab 4 daftar memakai DataTables (ambilSemuaPendaftar()); fungsi ini
 *             tersisa dari paginasi sisi server Lab 3 dan tidak dipanggil halaman mana pun.
 *
 * @param PDO    $pdo  Koneksi database aktif.
 * @param string $kata Kata kunci pencarian nama (boleh kosong = semua).
 *
 * @return int Jumlah baris yang cocok.
 *
 * @throws PDOException Bila query gagal.
 */
function hitungPendaftar(PDO $pdo, string $kata): int
{
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE nama LIKE :kata');
    $stmt->execute(['kata' => '%' . $kata . '%']);

    return (int) $stmt->fetchColumn();
}

/**
 * Mengambil satu halaman pendaftar yang namanya memuat kata kunci.
 *
 * @deprecated Sejak Lab 4 diganti ambilSemuaPendaftar(); lihat hitungPendaftar().
 *
 * @param PDO    $pdo    Koneksi database aktif.
 * @param string $kata   Kata kunci pencarian nama.
 * @param int    $batas  Jumlah baris per halaman (LIMIT), minimal 1.
 * @param int    $offset Baris awal (OFFSET), minimal 0.
 *
 * @return array<int, array<string, mixed>> Baris pendaftar terbaru lebih dulu.
 *
 * @throws PDOException Bila query gagal.
 */
function ambilPendaftar(PDO $pdo, string $kata, int $batas, int $offset): array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, k.nama_kelas
            FROM pendaftar p
            JOIN kelas k ON k.id = p.kelas_id
            WHERE p.nama LIKE :kata
            ORDER BY p.id DESC LIMIT :batas OFFSET :offset';
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':kata', '%' . $kata . '%');
    $stmt->bindValue(':batas', $batas, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll();
}

/**
 * Mengambil satu pendaftar berdasarkan ID.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id  ID pendaftar (minimal 1).
 *
 * @return array<string, mixed>|null Baris pendaftar, atau null bila tidak ditemukan.
 *
 * @throws PDOException Bila query gagal.
 */
function ambilPendaftarById(PDO $pdo, int $id): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM pendaftar WHERE id = :id');
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();

    return $baris === false ? null : $baris;
}

/**
 * Memeriksa apakah email sudah dipakai pendaftar lain.
 *
 * @param PDO      $pdo       Koneksi database aktif.
 * @param string   $email     Email (sudah huruf kecil dan ter-trim).
 * @param int|null $kecualiId ID pendaftar yang dikecualikan saat mengubah data sendiri;
 *                            null saat menambah.
 *
 * @return bool true bila email sudah terdaftar.
 *
 * @throws PDOException Bila query gagal.
 */
function emailSudahAda(PDO $pdo, string $email, ?int $kecualiId): bool
{
    if ($kecualiId === null) {
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE email = :email');
        $stmt->execute(['email' => $email]);
    } else {
        $stmt = $pdo->prepare(
            'SELECT COUNT(*) FROM pendaftar WHERE email = :email AND id <> :id'
        );
        $stmt->execute(['email' => $email, 'id' => $kecualiId]);
    }

    return (int) $stmt->fetchColumn() > 0;
}

/**
 * Memvalidasi masukan form pendaftar dan mengembalikan data bersih serta galat.
 *
 * Aturan: nama minimal 3 karakter, email berformat benar dan belum terdaftar,
 * nomor HP lolos validNoHp(), kelas harus ada di tabel kelas.
 *
 * @param array<string, mixed> $input  Data mentah (biasanya $_POST).
 * @param PDO                  $pdo    Koneksi untuk memeriksa email ganda dan kelas.
 * @param int|null             $idUbah ID pendaftar yang sedang diubah, null saat menambah.
 *
 * @return array{data: array<string, mixed>, galat: array<string, string>}
 *         `galat` kosong bila seluruh masukan valid.
 *
 * @throws PDOException Bila query pemeriksaan gagal.
 */
function validasiPendaftar(array $input, PDO $pdo, ?int $idUbah): array
{
    $data = [
        'nama' => trim((string) ($input['nama'] ?? '')),
        'email' => strtolower(trim((string) ($input['email'] ?? ''))),
        'no_hp' => trim((string) ($input['no_hp'] ?? '')),
        'alamat' => trim((string) ($input['alamat'] ?? '')),
        'kelas_id' => (int) ($input['kelas_id'] ?? 0),
    ];
    $galat = [];

    if (mb_strlen($data['nama']) < 3) {
        $galat['nama'] = 'Nama minimal 3 karakter.';
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'Format email tidak valid.';
    } elseif (emailSudahAda($pdo, $data['email'], $idUbah)) {
        $galat['email'] = 'Email sudah terdaftar.';
    }

    if (!validNoHp($data['no_hp'])) {
        $galat['no_hp'] = 'Nomor HP diawali 08 dan 10-13 digit.';
    }

    $idsKelas = array_map('intval', array_column(daftarKelas($pdo), 'id'));
    if (!in_array($data['kelas_id'], $idsKelas, true)) {
        $galat['kelas_id'] = 'Pilih kelas yang tersedia.';
    }

    return ['data' => $data, 'galat' => $galat];
}

/**
 * Menyimpan pendaftar baru TANPA memeriksa kuota.
 *
 * Untuk pendaftaran publik gunakan daftarkanDenganKuota(); fungsi ini dipakai juga
 * oleh form admin (tambah.php) yang boleh melampaui kuota.
 *
 * @param PDO                  $pdo Koneksi database aktif.
 * @param array<string, mixed> $d   Tepat lima kunci: nama, email, no_hp, alamat, kelas_id.
 *
 * @return bool true bila INSERT berhasil.
 *
 * @throws PDOException Bila INSERT gagal, mis. SQLSTATE 23000 (email ganda, kode 1062)
 *                      atau kelas tidak ada (kode 1452).
 */
function tambahPendaftar(PDO $pdo, array $d): bool
{
    $sql = 'INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
            VALUES (:nama, :email, :no_hp, :alamat, :kelas_id)';

    return $pdo->prepare($sql)->execute($d);
}

/**
 * Mengubah data satu pendaftar.
 *
 * @param PDO                  $pdo Koneksi database aktif.
 * @param int                  $id  ID pendaftar yang diubah (minimal 1).
 * @param array<string, mixed> $d   Lima kunci: nama, email, no_hp, alamat, kelas_id.
 *
 * @return bool true bila UPDATE berhasil dijalankan (tetap true walau tidak ada baris berubah).
 *
 * @throws PDOException Bila UPDATE gagal, mis. SQLSTATE 23000 karena email ganda.
 */
function ubahPendaftar(PDO $pdo, int $id, array $d): bool
{
    $sql = 'UPDATE pendaftar SET nama = :nama, email = :email, no_hp = :no_hp,
            alamat = :alamat, kelas_id = :kelas_id WHERE id = :id';

    return $pdo->prepare($sql)->execute($d + ['id' => $id]);
}

/**
 * Menghapus satu pendaftar secara permanen.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id  ID pendaftar (minimal 1).
 *
 * @return bool true bila perintah DELETE berhasil dijalankan (juga bila ID tidak ada).
 *
 * @throws PDOException Bila query gagal.
 */
function hapusPendaftar(PDO $pdo, int $id): bool
{
    return $pdo->prepare('DELETE FROM pendaftar WHERE id = :id')->execute(['id' => $id]);
}

/**
 * Mengambil seluruh pendaftar beserta nama kelas untuk tabel DataTables.
 *
 * Pencarian, pengurutan, dan paginasi dilakukan di browser oleh DataTables.
 *
 * @param PDO $pdo Koneksi database aktif.
 *
 * @return array<int, array<string, mixed>> Baris terbaru lebih dulu; kosong bila belum ada data.
 *
 * @throws PDOException Bila query gagal.
 */
function ambilSemuaPendaftar(PDO $pdo): array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, p.tgl_daftar, k.nama_kelas
            FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id
            ORDER BY p.id DESC';

    return $pdo->query($sql)->fetchAll();
}

/**
 * Mengambil data satu pendaftar untuk bukti pendaftaran PDF.
 *
 * @param PDO $pdo Koneksi database aktif.
 * @param int $id  ID pendaftar (minimal 1).
 *
 * @return array<string, mixed>|null Baris berisi nama, email, no_hp, tgl_daftar, nama_kelas;
 *                                   null bila ID tidak ditemukan.
 *
 * @throws PDOException Bila query gagal.
 */
function ambilBuktiPendaftar(PDO $pdo, int $id): ?array
{
    $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, p.tgl_daftar, k.nama_kelas
            FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id
            WHERE p.id = :id';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();

    return $baris === false ? null : $baris;
}

/**
 * Menambahkan pendaftar baru dengan pemeriksaan kuota kelas.
 *
 * Seluruh proses berjalan dalam satu transaksi dan baris kelas dikunci
 * (FOR UPDATE) agar dua pendaftar serentak tidak melebihi kuota.
 *
 * @param PDO                  $pdo  Koneksi database aktif.
 * @param array<string, mixed> $data Data tervalidasi: nama, email, no_hp, alamat, kelas_id.
 *
 * @return void
 *
 * @throws KuotaPenuhException Bila jumlah pendaftar kelas sudah mencapai kuota.
 *                             Pulihkan dengan menampilkan pesan dan meminta peserta memilih kelas lain.
 * @throws DomainException     Bila kelas_id tidak ada di tabel kelas.
 * @throws PDOException        Bila query gagal (mis. email ganda, SQLSTATE 23000); transaksi dibatalkan.
 */
function daftarkanDenganKuota(PDO $pdo, array $data): void
{
    $pdo->beginTransaction();
    try {
        // Kunci baris kelas sampai commit/rollback agar dua pendaftar serentak
        // tidak sama-sama melihat "masih ada sisa 1" lalu keduanya lolos (race condition).
        $stmt = $pdo->prepare('SELECT kuota FROM kelas WHERE id = :id FOR UPDATE');
        $stmt->execute(['id' => $data['kelas_id']]);
        $kuota = $stmt->fetchColumn();

        // fetchColumn() mengembalikan false bila kelas tidak ada; tanpa pemeriksaan ini
        // (int) false = 0 sehingga pesan yang muncul menyesatkan ("kuota penuh").
        if ($kuota === false) {
            throw new DomainException('Kelas tidak ditemukan.');
        }

        $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE kelas_id = :id');
        $stmt->execute(['id' => $data['kelas_id']]);

        if ((int) $stmt->fetchColumn() >= (int) $kuota) {
            throw new KuotaPenuhException('Kuota kelas sudah penuh.');
        }

        tambahPendaftar($pdo, $data);
        $pdo->commit();
    } catch (Throwable $e) {
        // Batalkan transaksi agar kunci baris kelas dilepas dan tidak ada data setengah jadi,
        // lalu lempar ulang supaya pemanggil (daftar.php) memutuskan pesan ke pengguna.
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        throw $e;
    }
}
