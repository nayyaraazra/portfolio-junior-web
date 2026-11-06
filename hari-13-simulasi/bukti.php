<?php
declare(strict_types=1);

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/config.php';
require __DIR__ . '/src/fungsi.php';

use Dompdf\Dompdf;

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

if ($id === false || $id === null || $id < 1) {
    http_response_code(400);
    exit('ID tidak valid.');
}

try {
    $peserta = ambilPesertaById(koneksi(), $id);
} catch (PDOException $ex) {
    error_log($ex->getMessage());
    http_response_code(500);
    exit('Terjadi kesalahan pada basis data.');
}

if ($peserta === null) {
    http_response_code(404);
    exit('Peserta tidak ditemukan.');
}

$html = '<h2>Bukti Pendaftaran Kursus</h2><table cellpadding="4">'
    . '<tr><td>No. Pendaftaran</td><td>: ' . (int) $peserta['id'] . '</td></tr>'
    . '<tr><td>Nama</td><td>: ' . e($peserta['nama']) . '</td></tr>'
    . '<tr><td>Email</td><td>: ' . e($peserta['email']) . '</td></tr>'
    . '<tr><td>No. HP</td><td>: ' . e($peserta['no_hp']) . '</td></tr>'
    . '<tr><td>Kursus</td><td>: ' . e($peserta['kursus']) . '</td></tr>'
    . '<tr><td>Tanggal</td><td>: ' . e($peserta['dibuat_pada']) . '</td></tr>'
    . '</table>';

$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper('A5');
$dompdf->render();
$dompdf->stream('bukti-' . $peserta['id'] . '.pdf', ['Attachment' => true]);
