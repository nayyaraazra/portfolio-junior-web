<?php

declare(strict_types=1);

const FILE_TAMU = __DIR__ . '/data/tamu.json';
const MAKS_PESAN = 500;
const MIN_NAMA = 3;

/**
 * Escape output HTML (mencegah XSS).
 */
function e(string $teks): string
{
    return htmlspecialchars($teks, ENT_QUOTES, 'UTF-8');
}

/**
 * Merapikan spasi: beberapa spasi/baris baru menjadi satu spasi, tepi dipangkas.
 */
function bersihkanSpasi(string $teks): string
{
    return trim((string) preg_replace('/\s+/', ' ', $teks));
}

/**
 * Memvalidasi input buku tamu.
 *
 * @param array<string, mixed> $input Data mentah (biasanya $_POST).
 * @return array{data: array<string, string>, galat: array<string, string>}
 */
function validasiTamu(array $input): array
{
    $data = [
        'nama' => bersihkanSpasi((string) ($input['nama'] ?? '')),
        'email' => trim((string) ($input['email'] ?? '')),
        'pesan' => trim((string) ($input['pesan'] ?? '')),
    ];
    $galat = [];

    if (mb_strlen($data['nama']) < MIN_NAMA) {
        $galat['nama'] = 'Nama minimal ' . MIN_NAMA . ' karakter.';
    }
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'Format email tidak valid.';
    }
    $panjang = mb_strlen($data['pesan']);
    if ($panjang === 0 || $panjang > MAKS_PESAN) {
        $galat['pesan'] = 'Pesan wajib diisi, maksimal ' . MAKS_PESAN . ' karakter.';
    }

    return ['data' => $data, 'galat' => $galat];
}

/**
 * Membaca seluruh tamu dari berkas JSON.
 *
 * @return array<int, array<string, mixed>> kosong bila berkas belum ada
 * @throws RuntimeException bila berkas tidak terbaca atau JSON rusak
 */
function ambilSemuaTamu(): array
{
    if (!file_exists(FILE_TAMU)) {
        return [];
    }
    $isi = file_get_contents(FILE_TAMU);
    if ($isi === false) {
        throw new RuntimeException('Berkas data tidak dapat dibaca.');
    }
    $daftar = json_decode($isi, true);
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($daftar)) {
        throw new RuntimeException('Berkas data rusak: ' . json_last_error_msg());
    }

    return $daftar;
}

/**
 * Menambahkan satu tamu ke berkas JSON (folder dibuat otomatis bila belum ada).
 *
 * @param array<string, string> $data Data tamu yang sudah divalidasi.
 * @return bool true bila berhasil disimpan
 */
function simpanTamu(array $data): bool
{
    $folder = dirname(FILE_TAMU);
    if (!is_dir($folder) && !mkdir($folder, 0755, true)) {
        return false;
    }

    try {
        $daftar = ambilSemuaTamu();
    } catch (RuntimeException $e) {
        error_log($e->getMessage());

        return false; // jangan menimpa berkas yang rusak
    }
    $data['id'] = $daftar === [] ? 1 : max(array_column($daftar, 'id')) + 1;
    $data['waktu'] = date('Y-m-d H:i:s');
    $daftar[] = $data;

    $json = json_encode($daftar, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    return $json !== false && file_put_contents(FILE_TAMU, $json, LOCK_EX) !== false;
}

/**
 * Mencari tamu berdasarkan sebagian nama (tanpa peka huruf besar-kecil).
 *
 * @param array<int, array<string, mixed>> $daftar
 * @return array<int, array<string, mixed>> semua tamu bila $kata kosong
 */
function cariTamu(array $daftar, string $kata): array
{
    if ($kata === '') {
        return $daftar;
    }

    return array_values(array_filter(
        $daftar,
        fn (array $tamu): bool => stripos($tamu['nama'], $kata) !== false
    ));
}
