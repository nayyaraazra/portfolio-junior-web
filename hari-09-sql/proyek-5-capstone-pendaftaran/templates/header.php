<?php
declare(strict_types=1);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($judul ?? 'Pendaftaran Pelatihan') ?></title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1050px; margin: 2rem auto; padding: 0 1rem; color: #222; }
        header, footer { padding: 1rem 0; border-bottom: 1px solid #ddd; }
        footer { border-top: 1px solid #ddd; border-bottom: 0; margin-top: 2rem; }
        nav { margin: .8rem 0; } table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        th, td { border: 1px solid #ddd; padding: .65rem; text-align: left; }
        th { background: #f3f4f6; } label { display: inline-block; margin-bottom: .25rem; }
        input, select, textarea { padding: .45rem; min-width: 250px; max-width: 100%; }
        button { padding: .45rem .8rem; cursor: pointer; } .error { color: #a11; display: block; }
        .flash { background: #eef8ee; padding: .7rem; } .pagination a { margin-right: .6rem; }
    </style>
</head>
<body>
<header>
    <h1>Pendaftaran Pelatihan</h1>
    <nav><a href="index.php">Daftar</a> | <a href="tambah.php">Tambah</a></nav>
</header>
<main>
<?php if ($pesan = ambilFlash()): ?>
    <p class="flash" role="status"><?= e($pesan) ?></p>
<?php endif; ?>
