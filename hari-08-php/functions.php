<?php

declare(strict_types=1);

const ZONA_WAKTU = 'Asia/Jakarta';
const BATAS_LULUS = 70;
const BATAS_GRADE_A = 85;
const BATAS_GRADE_C = 55;
const JUMLAH_LOG_TAMPIL = 20;
const FOLDER_DATA = __DIR__ . '/data';
const FILE_LOG = FOLDER_DATA . '/log.txt';
const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/**
 * Mengatur zona waktu aplikasi.
 */
function aturZonaWaktu(): void
{
    date_default_timezone_set(ZONA_WAKTU);
}

/**
 * Escape output HTML (mencegah XSS).
 */
function e(string $teks): string
{
    return htmlspecialchars($teks, ENT_QUOTES, 'UTF-8');
}

/**
 * Data contoh peserta untuk latihan.
 *
 * @return array<int, array{nama: string, kelas: string, nilai: int}>
 */
function ambilDataPeserta(): array
{
    return [
        ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
        ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
        ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
    ];
}

/**
 * Menentukan grade huruf dari nilai.
 */
function tentukanGrade(int $nilai): string
{
    return match (true) {
        $nilai >= BATAS_GRADE_A => 'A',
        $nilai >= BATAS_LULUS => 'B',
        $nilai >= BATAS_GRADE_C => 'C',
        default => 'D',
    };
}

/**
 * Menghitung rata-rata nilai dari daftar peserta.
 *
 * @param array<int, array{nilai: int}> $daftar
 */
function hitungRataRata(array $daftar): float
{
    if ($daftar === []) {
        return 0.0;
    }

    return array_sum(array_column($daftar, 'nilai')) / count($daftar);
}

/**
 * Mencari peserta dengan nilai tertinggi.
 *
 * @param array<int, array{nama: string, kelas: string, nilai: int}> $daftar
 * @return array{nama: string, kelas: string, nilai: int}|null null bila daftar kosong
 */
function cariTertinggi(array $daftar): ?array
{
    if ($daftar === []) {
        return null;
    }
    $tertinggi = $daftar[0];
    foreach ($daftar as $peserta) {
        if ($peserta['nilai'] > $tertinggi['nilai']) {
            $tertinggi = $peserta;
        }
    }

    return $tertinggi;
}

/**
 * Menyaring peserta yang nilainya mencapai batas lulus.
 */
function filterLulus(array $peserta, int $batas = BATAS_LULUS): array
{
    return array_values(array_filter(
        $peserta,
        fn (array $p): bool => $p['nilai'] >= $batas
    ));
}

/**
 * Mengurutkan peserta dari nilai tertinggi; array asli tidak berubah (salinan).
 */
function urutkanNilai(array $peserta): array
{
    usort($peserta, fn (array $a, array $b): int => $b['nilai'] <=> $a['nilai']);

    return $peserta;
}

/**
 * Mengelompokkan peserta per kelas, mis. ['Web' => [...], 'Data' => [...]].
 */
function kelompokkanPerKelas(array $peserta): array
{
    $hasil = [];
    foreach ($peserta as $p) {
        $hasil[$p['kelas']][] = $p;
    }

    return $hasil;
}

/**
 * Menyaring peserta berdasarkan sebagian nama, tanpa peka huruf besar-kecil.
 */
function cariPeserta(array $peserta, string $kata): array
{
    if ($kata === '') {
        return $peserta;
    }

    return array_values(array_filter(
        $peserta,
        fn (array $p): bool => stripos($p['nama'], $kata) !== false
    ));
}

/**
 * Membuat folder bila belum ada.
 *
 * @throws RuntimeException bila folder tidak dapat dibuat
 */
function pastikanFolder(string $folder): void
{
    if (!is_dir($folder) && !mkdir($folder, 0755, true) && !is_dir($folder)) {
        throw new RuntimeException('Folder data tidak dapat dibuat.');
    }
}

/**
 * Mengubah teks JSON menjadi array.
 *
 * @throws RuntimeException bila JSON rusak
 */
function decodeJson(string $isi): array
{
    $data = json_decode($isi, true);
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
        throw new RuntimeException('JSON rusak: ' . json_last_error_msg());
    }

    return $data;
}

/**
 * Membaca berkas JSON menjadi array.
 *
 * @throws RuntimeException bila berkas tidak ada, tidak terbaca, atau JSON rusak
 */
function bacaJson(string $jalur): array
{
    if (!is_file($jalur)) {
        throw new RuntimeException('Berkas tidak ditemukan: ' . basename($jalur));
    }
    $isi = file_get_contents($jalur);
    if ($isi === false) {
        throw new RuntimeException('Berkas tidak dapat dibaca: ' . basename($jalur));
    }

    return decodeJson($isi);
}

/**
 * Menyimpan array ke berkas JSON (folder dibuat bila belum ada).
 *
 * @throws RuntimeException bila gagal menulis
 */
function simpanJson(string $jalur, array $data): void
{
    pastikanFolder(dirname($jalur));
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false || file_put_contents($jalur, $json, LOCK_EX) === false) {
        throw new RuntimeException('Gagal menulis berkas: ' . basename($jalur));
    }
}

/**
 * Mengekspor peserta ke CSV (baris pertama berisi judul kolom).
 *
 * @throws RuntimeException bila gagal menulis
 */
function eksporCsv(string $jalur, array $peserta): void
{
    pastikanFolder(dirname($jalur));
    $gagang = fopen($jalur, 'w');
    if ($gagang === false) {
        throw new RuntimeException('Gagal membuka berkas: ' . basename($jalur));
    }
    fputcsv($gagang, ['nama', 'kelas', 'nilai']);
    foreach ($peserta as $p) {
        fputcsv($gagang, [$p['nama'], $p['kelas'], $p['nilai']]);
    }
    fclose($gagang);
}

/**
 * Mengimpor CSV peserta menjadi array (melewati baris judul).
 *
 * @throws RuntimeException bila berkas tidak ada atau tidak terbaca
 */
function imporCsv(string $jalur): array
{
    $gagang = is_file($jalur) ? fopen($jalur, 'r') : false;
    if ($gagang === false) {
        throw new RuntimeException('Berkas CSV tidak dapat dibuka: ' . basename($jalur));
    }
    $hasil = [];
    fgetcsv($gagang);
    while (($kolom = fgetcsv($gagang)) !== false) {
        $hasil[] = ['nama' => $kolom[0], 'kelas' => $kolom[1], 'nilai' => (int) $kolom[2]];
    }
    fclose($gagang);

    return $hasil;
}

/**
 * Menambah satu baris "waktu | IP | kata kunci" ke log pengunjung.
 *
 * @throws RuntimeException bila gagal menulis
 */
function catatLog(string $kataKunci): void
{
    pastikanFolder(FOLDER_DATA);
    $bersih = trim((string) preg_replace('/[\r\n|]+/', ' ', $kataKunci));
    $ip = $_SERVER['REMOTE_ADDR'] ?? '-';
    $baris = date('Y-m-d H:i:s') . ' | ' . $ip . ' | ' . $bersih . PHP_EOL;
    if (file_put_contents(FILE_LOG, $baris, FILE_APPEND | LOCK_EX) === false) {
        throw new RuntimeException('Log tidak dapat ditulis.');
    }
}

/**
 * Mengambil baris log terbaru lebih dulu.
 *
 * @return string[] kosong bila log belum ada
 */
function bacaLogTerakhir(int $jumlah = JUMLAH_LOG_TAMPIL): array
{
    if (!is_file(FILE_LOG)) {
        return [];
    }
    $baris = file(FILE_LOG, FILE_IGNORE_NEW_LINES);

    return $baris === false ? [] : array_slice(array_reverse($baris), 0, $jumlah);
}

/**
 * Membuat tabel HTML peserta (nomor, nama, kelas, nilai, grade); semua isi di-escape.
 */
function buatTabelPeserta(array $daftar): string
{
    if ($daftar === []) {
        return '<p>Tidak ada data.</p>';
    }
    $html = '<table><tr><th>No</th><th>Nama</th><th>Kelas</th><th>Nilai</th><th>Grade</th></tr>';
    foreach (array_values($daftar) as $indeks => $p) {
        $html .= '<tr><td>' . ($indeks + 1) . '</td><td>' . e($p['nama']) . '</td><td>' . e($p['kelas'])
            . '</td><td>' . $p['nilai'] . '</td><td>' . e(tentukanGrade($p['nilai'])) . '</td></tr>';
    }

    return $html . '</table>';
}
