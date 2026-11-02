<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

$peserta = ambilDataPeserta();
$rataRata = hitungRataRata($peserta);
$tertinggi = cariTertinggi($peserta);
$lulus = filterLulus($peserta);
$lulus90 = filterLulus($peserta, 85);
$terurut = urutkanNilai($peserta);
$perKelas = kelompokkanPerKelas($peserta);
?>
<!DOCTYPE html>
<html lang='id'>
<head>
    <meta charset='UTF-8'>
    <title>Lab 2 - Fungsi dan Array Asosiatif</title>
    <style>
        body { font-family: sans-serif; margin: 1.5rem; }
        table { border-collapse: collapse; margin-bottom: 1rem; }
        td, th { border: 1px solid #999; padding: 2px 8px; }
    </style>
</head>
<body>
    <h1>Lab 2: Fungsi dan Array Asosiatif</h1>

    <h2>Data peserta (urutan awal)</h2>
    <?= buatTabelPeserta($peserta) ?>

    <h2>Ringkasan</h2>
    <ul>
        <li>Rata-rata nilai: <?= e(number_format($rataRata, 2)) ?></li>
        <li>
            Nilai tertinggi:
            <?= $tertinggi === null ? '-' : e($tertinggi['nama'] . ' (' . $tertinggi['nilai'] . ')') ?>
        </li>
        <li>Lulus (batas 70): <?= e(implode(', ', array_column($lulus, 'nama'))) ?></li>
        <li>Lulus (batas 85): <?= e(implode(', ', array_column($lulus90, 'nama'))) ?></li>
        <li>Daftar kosong: rata-rata <?= hitungRataRata([]) ?>, tertinggi
            <?= cariTertinggi([]) === null ? 'null' : '?' ?></li>
    </ul>

    <h2>Diurutkan dari nilai tertinggi</h2>
    <?= buatTabelPeserta($terurut) ?>

    <h2>Dikelompokkan per kelas</h2>
    <?php foreach ($perKelas as $kelas => $anggota): ?>
        <h3>Kelas <?= e((string) $kelas) ?></h3>
        <?= buatTabelPeserta($anggota) ?>
    <?php endforeach; ?>
</body>
</html>
