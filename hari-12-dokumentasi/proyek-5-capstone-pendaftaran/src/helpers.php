<?php
/**
 * Modul      : Helpers (src/helpers.php)
 * ID Modul   : MOD-HLP-001
 * Deskripsi  : Utilitas umum dan keamanan: escape output, redirect, token CSRF,
 *              dan pesan flash satu kali tampil.
 * Dependensi : Sesi PHP aktif ($_SESSION), dimulai di src/bootstrap.php
 *
 * @package PendaftaranPelatihan
 * @author  Nayyara Aqila
 * @version 1.0.1
 * @since   1.0.0
 */
declare(strict_types=1);

/**
 * Meng-escape teks agar aman ditampilkan di HTML (mencegah XSS).
 *
 * @param string|null $teks Teks mentah; null dianggap teks kosong.
 *
 * @return string Teks yang sudah di-escape (tanda kutip ganda dan tunggal ikut).
 */
function e(?string $teks): string
{
    return htmlspecialchars($teks ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Mengalihkan browser ke URL lain lalu menghentikan skrip.
 *
 * Efek samping: mengirim header Location dan memanggil exit. Harus dipanggil
 * sebelum ada output apa pun, kalau tidak PHP memberi peringatan "headers already sent".
 *
 * @param string $url Tujuan relatif atau absolut, mis. 'index.php'.
 *
 * @return never
 */
function redirect(string $url): never
{
    header('Location: ' . $url);
    exit;
}

/**
 * Mengambil token CSRF sesi ini; membuatnya bila belum ada.
 *
 * Efek samping: menulis $_SESSION['csrf'] pada pemanggilan pertama.
 *
 * @return string Token acak heksadesimal (64 karakter) untuk dipasang di input hidden form.
 *
 * @throws Exception Bila sumber acak sistem tidak tersedia (dari random_bytes()).
 */
function tokenCsrf(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf'];
}

/**
 * Memeriksa token CSRF pada permintaan POST.
 *
 * Dibandingkan dengan hash_equals() agar tahan serangan timing. Bila token kosong
 * atau tidak cocok: mengirim HTTP 403 dan menghentikan skrip.
 *
 * @return void
 */
function cekCsrf(): void
{
    $kiriman = (string) ($_POST['csrf'] ?? '');
    if (!hash_equals($_SESSION['csrf'] ?? '', $kiriman)) {
        http_response_code(403);
        exit('Permintaan tidak valid.');
    }
}

/**
 * Menyimpan pesan flash yang tampil satu kali pada halaman berikutnya.
 *
 * @param string $pesan Teks notifikasi (di-escape saat ditampilkan).
 *
 * @return void
 */
function setFlash(string $pesan): void
{
    $_SESSION['flash'] = $pesan;
}

/**
 * Mengambil lalu menghapus pesan flash.
 *
 * @return string|null Pesan flash, atau null bila tidak ada.
 */
function ambilFlash(): ?string
{
    $pesan = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);

    return $pesan;
}
