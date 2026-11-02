<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

aturZonaWaktu();

$kata = trim((string) ($_GET['q'] ?? ''));
$pesanGalat = null;

try {
    catatLog($kata);
} catch (RuntimeException $e) {
    error_log($e->getMessage());
    $pesanGalat = 'Log pengunjung tidak dapat dicatat.';
}

$hasil = cariPeserta(ambilDataPeserta(), $kata);
?>
<!DOCTYPE html>
<html lang='id'>
<head>
    <meta charset='UTF-8'>
    <title>Cari Peserta</title>
    <style>
        body { font-family: sans-serif; margin: 1.5rem; }
        table { border-collapse: collapse; }
        td, th { border: 1px solid #999; padding: 2px 8px; }
    </style>
</head>
<body>
    <h1>Cari Peserta</h1>
    <form method='get' action='cari.php'>
        <label for='q'>Nama</label>
        <input id='q' name='q' value='<?= e($kata) ?>'>
        <button type='submit'>Cari</button>
    </form>

    <?php if ($pesanGalat !== null): ?>
        <p role='alert'><?= e($pesanGalat) ?></p>
    <?php endif; ?>

    <?php if ($hasil === []): ?>
        <p>Tidak ada peserta dengan nama yang mengandung &quot;<?= e($kata) ?>&quot;.</p>
    <?php else: ?>
        <?= buatTabelPeserta($hasil) ?>
    <?php endif; ?>
</body>
</html>
