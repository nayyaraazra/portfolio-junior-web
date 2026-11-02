<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

aturZonaWaktu();

$nama = 'Naya';
$umur = 21;
$aktif = true;
$status = $aktif ? 'Aktif' : 'Tidak aktif';

/**
 * Menangkap keluaran var_dump sebagai teks.
 */
function dumpSebagaiTeks(mixed $nilai): string
{
    ob_start();
    var_dump($nilai);

    return trim((string) ob_get_clean());
}

/**
 * Mengubah angka menjadi FizzBuzz.
 */
function fizzBuzz(int $angka): string
{
    return match (true) {
        $angka % 15 === 0 => 'FizzBuzz',
        $angka % 3 === 0 => 'Fizz',
        $angka % 5 === 0 => 'Buzz',
        default => (string) $angka,
    };
}

$nilaiContoh = [92, 78, 64, 40];
$hariIni = NAMA_HARI[(int) date('w')];
?>
<!DOCTYPE html>
<html lang='id'>
<head>
    <meta charset='UTF-8'>
    <title>Lab 1 - PHP Dasar</title>
    <style>
        body { font-family: sans-serif; margin: 1.5rem; }
        table { border-collapse: collapse; }
        td, th { border: 1px solid #999; padding: 2px 8px; text-align: right; }
        pre { background: #f3f4f6; padding: .5rem; }
    </style>
</head>
<body>
    <h1>Lab 1 - PHP Dasar</h1>

    <h2>Variabel dan var_dump</h2>
    <p>Nama: <?= e($nama) ?>, umur: <?= $umur ?>, status: <?= e($status) ?></p>
    <pre><?= e(dumpSebagaiTeks($nama)) ?>

<?= e(dumpSebagaiTeks($umur)) ?>

<?= e(dumpSebagaiTeks($aktif)) ?>

<?= e(dumpSebagaiTeks($status)) ?></pre>

    <h2>Tabel perkalian 1 sampai 10</h2>
    <table>
        <?php for ($baris = 1; $baris <= 10; $baris++): ?>
            <tr>
                <?php for ($kolom = 1; $kolom <= 10; $kolom++): ?>
                    <td><?= $baris * $kolom ?></td>
                <?php endfor; ?>
            </tr>
        <?php endfor; ?>
    </table>

    <h2>Ganjil / genap 1-20</h2>
    <ul>
        <?php for ($angka = 1; $angka <= 20; $angka++): ?>
            <li><?= $angka ?> = <?= $angka % 2 === 0 ? 'genap' : 'ganjil' ?></li>
        <?php endfor; ?>
    </ul>

    <h2>FizzBuzz 1-30</h2>
    <p>
        <?php for ($angka = 1; $angka <= 30; $angka++): ?>
            <?= e(fizzBuzz($angka)) ?><?= $angka < 30 ? ',' : '' ?>
        <?php endfor; ?>
    </p>

    <h2>Konversi nilai ke grade (match)</h2>
    <ul>
        <?php foreach ($nilaiContoh as $nilai): ?>
            <li>Nilai <?= $nilai ?> = grade <?= e(tentukanGrade($nilai)) ?></li>
        <?php endforeach; ?>
    </ul>

    <h2>Kalender sederhana</h2>
    <p>Hari ini: <strong><?= e($hariIni) ?></strong>, <?= e(date('d-m-Y')) ?></p>
</body>
</html>
