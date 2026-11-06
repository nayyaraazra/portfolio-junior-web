<?php
declare(strict_types=1);

require __DIR__ . '/src/config.php';
require __DIR__ . '/src/fungsi.php';

session_start();

$galat = [];
$lama  = ['nama' => '', 'email' => '', 'no_hp' => '', 'kursus_id' => 0];

try {
    $pdo       = koneksi();
    $kursusMap = ambilKursus($pdo);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $hasil = validasiPendaftaran($_POST, $kursusMap);
        $lama  = $hasil['data'];
        $galat = $hasil['galat'];

        if (count($galat) === 0) {
            $id = simpanPeserta($pdo, $hasil['data']);
            $_SESSION['sukses'] = $id;
            header('Location: index.php');
            exit;
        }
    }

    $peserta = ambilPeserta($pdo);
} catch (PDOException $ex) {
    error_log($ex->getMessage());
    exit('Terjadi kesalahan pada basis data.');
}

$sukses = $_SESSION['sukses'] ?? null;
unset($_SESSION['sukses']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pendaftaran Kursus Singkat</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css">
</head>
<body class="bg-light">
<main class="container py-4">
    <h1 class="h3 mb-4">Pendaftaran Kursus Singkat</h1>

    <?php if ($sukses !== null): ?>
        <div class="alert alert-success">
            Pendaftaran berhasil.
            <a href="bukti.php?id=<?= (int) $sukses ?>">Unduh bukti PDF</a>
        </div>
    <?php endif; ?>

    <?php if (count($galat) > 0): ?>
        <div class="alert alert-danger">
            <ul class="mb-0">
                <?php foreach ($galat as $pesan): ?>
                    <li><?= e($pesan) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form method="post" class="card card-body mb-4" novalidate>
        <div class="row g-3">
            <div class="col-12 col-md-6">
                <label for="nama" class="form-label">Nama</label>
                <input type="text" id="nama" name="nama" class="form-control" required
                       minlength="3" maxlength="100" value="<?= e($lama['nama']) ?>">
            </div>
            <div class="col-12 col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-control" required
                       value="<?= e($lama['email']) ?>">
            </div>
            <div class="col-12 col-md-6">
                <label for="no_hp" class="form-label">Nomor HP</label>
                <input type="tel" id="no_hp" name="no_hp" class="form-control" required
                       pattern="(\+62|62|0)8[0-9]{8,11}" value="<?= e($lama['no_hp']) ?>">
            </div>
            <div class="col-12 col-md-6">
                <label for="kursus_id" class="form-label">Pilihan Kursus</label>
                <select id="kursus_id" name="kursus_id" class="form-select" required>
                    <option value="">-- Pilih kursus --</option>
                    <?php foreach ($kursusMap as $idKursus => $namaKursus): ?>
                        <option value="<?= (int) $idKursus ?>"
                            <?= (int) $lama['kursus_id'] === $idKursus ? 'selected' : '' ?>>
                            <?= e($namaKursus) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Daftar</button>
    </form>

    <h2 class="h5">Daftar Peserta</h2>
    <div class="table-responsive">
        <table id="tabel-peserta" class="table table-striped">
            <thead>
                <tr><th>ID</th><th>Nama</th><th>Email</th><th>No. HP</th><th>Kursus</th><th>Bukti</th></tr>
            </thead>
            <tbody>
                <?php foreach ($peserta as $p): ?>
                    <tr>
                        <td><?= (int) $p['id'] ?></td>
                        <td><?= e($p['nama']) ?></td>
                        <td><?= e($p['email']) ?></td>
                        <td><?= e($p['no_hp']) ?></td>
                        <td><?= e($p['kursus']) ?></td>
                        <td><a href="bukti.php?id=<?= (int) $p['id'] ?>">PDF</a></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</main>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.8/js/dataTables.bootstrap5.min.js"></script>
<script>
    $('#tabel-peserta').DataTable();
</script>
</body>
</html>
