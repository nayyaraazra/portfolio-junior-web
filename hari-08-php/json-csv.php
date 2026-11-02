<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

const FILE_JSON = FOLDER_DATA . '/peserta.json';
const FILE_CSV = FOLDER_DATA . '/peserta.csv';

$langkah = [];
$pesertaCsv = [];
$ujiGagal = [];

try {
    // JSON: simpan, baca kembali, tambah satu peserta, simpan ulang
    simpanJson(FILE_JSON, ambilDataPeserta());
    $langkah[] = 'Disimpan ke peserta.json: ' . count(bacaJson(FILE_JSON)) . ' peserta.';

    $daftar = bacaJson(FILE_JSON);
    $daftar[] = ['nama' => 'Dimas', 'kelas' => 'Mobile', 'nilai' => 75];
    simpanJson(FILE_JSON, $daftar);
    $langkah[] = 'Setelah menambah Dimas dan menyimpan ulang: ' . count(bacaJson(FILE_JSON)) . ' peserta.';

    // CSV: ekspor lalu impor kembali
    eksporCsv(FILE_CSV, $daftar);
    $pesertaCsv = imporCsv(FILE_CSV);
    $langkah[] = 'Diekspor ke peserta.csv lalu diimpor kembali: ' . count($pesertaCsv) . ' baris.';
} catch (RuntimeException $e) {
    error_log($e->getMessage());
    $langkah[] = 'Terjadi kesalahan: ' . $e->getMessage();
}

// Uji penanganan kegagalan: berkas tidak ada dan JSON rusak
foreach (
    [
        'Berkas JSON tidak ada' => fn (): array => bacaJson(FOLDER_DATA . '/tidak-ada.json'),
        'JSON rusak' => fn (): array => decodeJson('{"nama": "Sari", '),
        'Berkas CSV tidak ada' => fn (): array => imporCsv(FOLDER_DATA . '/tidak-ada.csv'),
    ] as $nama => $uji
) {
    try {
        $uji();
        $ujiGagal[$nama] = 'Tidak ada error (tidak seharusnya terjadi).';
    } catch (RuntimeException $e) {
        $ujiGagal[$nama] = $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang='id'>
<head>
    <meta charset='UTF-8'>
    <title>Lab 4 - JSON dan CSV</title>
    <style>
        body { font-family: sans-serif; margin: 1.5rem; }
        table { border-collapse: collapse; }
        td, th { border: 1px solid #999; padding: 2px 8px; }
    </style>
</head>
<body>
    <h1>Lab 4 - JSON dan CSV</h1>
    <ul>
        <?php foreach ($langkah as $isi): ?>
            <li><?= e($isi) ?></li>
        <?php endforeach; ?>
    </ul>

    <h2>Hasil impor CSV</h2>
    <?= buatTabelPeserta($pesertaCsv) ?>

    <h2>Uji penanganan kegagalan</h2>
    <table>
        <tr><th>Kasus</th><th>Pesan</th></tr>
        <?php foreach ($ujiGagal as $nama => $pesan): ?>
            <tr><td><?= e($nama) ?></td><td><?= e($pesan) ?></td></tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
