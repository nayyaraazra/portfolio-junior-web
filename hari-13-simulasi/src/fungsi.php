<?php
declare(strict_types=1);

const NAMA_MIN = 3;
const NAMA_MAKS = 100;
const POLA_HP = '/^(\+62|62|0)8[0-9]{8,11}$/';

/**
 * Escape output agar aman dari XSS.
 *
 * @param string $teks Teks mentah.
 * @return string Teks yang sudah di-escape.
 */
function e(string $teks): string
{
    return htmlspecialchars($teks, ENT_QUOTES, 'UTF-8');
}

/**
 * Mengambil daftar kursus sebagai map id => nama (akses O(1) per id).
 *
 * @param PDO $pdo Koneksi database.
 * @return array<int, string> Map id kursus ke nama kursus.
 * @throws PDOException Jika query gagal.
 */
function ambilKursus(PDO $pdo): array
{
    $baris = $pdo->query('SELECT id, nama FROM kursus ORDER BY nama')->fetchAll();

    return array_column($baris, 'nama', 'id');
}

/**
 * Memvalidasi input form pendaftaran di sisi server.
 *
 * @param array $input     Data mentah (mis. $_POST).
 * @param array $kursusMap Map id => nama kursus yang valid.
 * @return array{data: array, galat: array} Data bersih dan daftar pesan galat.
 * @throws InvalidArgumentException Tidak dilempar; galat dikembalikan dalam array.
 */
function validasiPendaftaran(array $input, array $kursusMap): array
{
    $nama     = trim((string) ($input['nama'] ?? ''));
    $email    = trim((string) ($input['email'] ?? ''));
    $noHp     = trim((string) ($input['no_hp'] ?? ''));
    $kursusId = (int) ($input['kursus_id'] ?? 0);
    $galat    = [];

    if (mb_strlen($nama) < NAMA_MIN || mb_strlen($nama) > NAMA_MAKS) {
        $galat[] = 'Nama harus ' . NAMA_MIN . '-' . NAMA_MAKS . ' karakter.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $galat[] = 'Format email tidak valid.';
    }
    if (!preg_match(POLA_HP, $noHp)) {
        $galat[] = 'Nomor HP tidak valid.';
    }
    if (!isset($kursusMap[$kursusId])) {
        $galat[] = 'Pilihan kursus tidak valid.';
    }

    return [
        'data'  => ['nama' => $nama, 'email' => $email, 'no_hp' => $noHp, 'kursus_id' => $kursusId],
        'galat' => $galat,
    ];
}

/**
 * Menyimpan peserta baru ke database.
 *
 * @param PDO   $pdo  Koneksi database.
 * @param array $data Data tervalidasi (nama, email, no_hp, kursus_id).
 * @return int ID peserta yang baru dibuat.
 * @throws PDOException Jika penyimpanan gagal.
 */
function simpanPeserta(PDO $pdo, array $data): int
{
    $stmt = $pdo->prepare(
        'INSERT INTO peserta (nama, email, no_hp, kursus_id)
         VALUES (:nama, :email, :no_hp, :kursus_id)'
    );
    $stmt->execute($data);

    return (int) $pdo->lastInsertId();
}

/**
 * Mengambil semua peserta beserta nama kursusnya.
 *
 * @param PDO $pdo Koneksi database.
 * @return array Daftar peserta (array asosiatif).
 * @throws PDOException Jika query gagal.
 */
function ambilPeserta(PDO $pdo): array
{
    return $pdo->query(
        'SELECT p.id, p.nama, p.email, p.no_hp, k.nama AS kursus, p.dibuat_pada
         FROM peserta p JOIN kursus k ON k.id = p.kursus_id
         ORDER BY p.id DESC'
    )->fetchAll();
}

/**
 * Mengambil satu peserta berdasarkan ID.
 *
 * @param PDO $pdo Koneksi database.
 * @param int $id  ID peserta (minimal 1).
 * @return array|null Data peserta, atau null jika tidak ditemukan.
 * @throws PDOException Jika query gagal.
 */
function ambilPesertaById(PDO $pdo, int $id): ?array
{
    $stmt = $pdo->prepare(
        'SELECT p.id, p.nama, p.email, p.no_hp, k.nama AS kursus, p.dibuat_pada
         FROM peserta p JOIN kursus k ON k.id = p.kursus_id
         WHERE p.id = :id'
    );
    $stmt->execute(['id' => $id]);
    $baris = $stmt->fetch();

    return $baris === false ? null : $baris;
}
