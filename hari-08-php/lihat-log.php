<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

$baris = bacaLogTerakhir();
?>
<!DOCTYPE html>
<html lang='id'>
<head>
    <meta charset='UTF-8'>
    <title>Log Pengunjung</title>
</head>
<body>
    <h1>Log Pengunjung (<?= JUMLAH_LOG_TAMPIL ?> baris terakhir)</h1>
    <?php if ($baris === []): ?>
        <p>Log masih kosong.</p>
    <?php else: ?>
        <ol>
            <?php foreach ($baris as $isi): ?>
                <li><?= e($isi) ?></li>
            <?php endforeach; ?>
        </ol>
    <?php endif; ?>
</body>
</html>
