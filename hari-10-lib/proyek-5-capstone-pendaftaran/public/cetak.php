<?php
declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

// Bug Hunt no. 3: pesan jelas bila composer install belum dijalankan.
$autoload = __DIR__ . '/../vendor/autoload.php';
if (!is_file($autoload)) {
    http_response_code(500);
    exit('Library PDF belum terpasang. Jalankan: composer install');
}
require_once $autoload;

use Dompdf\Dompdf;
use Dompdf\Options;

$id = filter_var($_GET['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
$bukti = ($id === false || $id === null) ? null : ambilBuktiPendaftar(getConnection(), $id);

if ($bukti === null) {
    http_response_code(404);
    exit('Data tidak ditemukan.');
}

$nomor = sprintf('REG-%s-%06d', date('Y', strtotime($bukti['tgl_daftar'])), $bukti['id']);

// Tampung HTML ke variabel; JANGAN ada echo/spasi sebelum stream() (Bug Hunt no. 4).
ob_start();
require __DIR__ . '/../templates/bukti.php';
$html = (string) ob_get_clean();

$options = new Options();
$options->set('isRemoteEnabled', false); // PDF tidak boleh mengambil sumber dari internet

$dompdf = new Dompdf($options);
$dompdf->loadHtml($html);
$dompdf->setPaper('A5', 'portrait');
$dompdf->render();
$dompdf->stream($nomor . '.pdf', ['Attachment' => false]); // tampil di browser
