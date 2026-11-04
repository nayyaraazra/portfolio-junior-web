<?php
declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

$pdo = getConnection();
$kelas = daftarKelas($pdo);
$lama = ['nama' => '', 'email' => '', 'no_hp' => '', 'alamat' => '', 'kelas_id' => 0];
$galat = [];
$urlBatal = 'daftar.php'; // tombol Batal kembali ke form ini, bukan ke halaman admin

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    cekCsrf();
    $hasil = validasiPendaftar($_POST, $pdo, null);
    $lama = $hasil['data'];
    $galat = $hasil['galat'];

    if ($galat === []) {
        try {
            daftarkanDenganKuota($pdo, $lama);
            setFlash('Pendaftaran berhasil. Terima kasih!');
            redirect('daftar.php');
        } catch (KuotaPenuhException | DomainException $e) {
            // Pesan sengaja ditulis untuk peserta (bukan detail teknis): kelas penuh/tidak ada,
            // jadi tampil di kolom Kelas agar peserta memilih kelas lain.
            $galat['kelas_id'] = $e->getMessage();
        } catch (PDOException $e) {
            // 23000 = email ganda yang lolos pemeriksaan awal (request serentak); error lain dilempar.
            if ($e->getCode() === '23000') {
                $galat['email'] = 'Email sudah terdaftar.';
            } else {
                throw $e;
            }
        }
    }
}

$judul = 'Pendaftaran Pelatihan';
require __DIR__ . '/../templates/header.php';
?>
<h1 class='h4 mb-3'>Form Pendaftaran Pelatihan</h1>
<?php require __DIR__ . '/_form.php'; ?>
<?php require __DIR__ . '/../templates/footer.php'; ?>
