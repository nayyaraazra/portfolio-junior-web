<?php
/**
 * Modul      : Bootstrap (src/bootstrap.php)
 * ID Modul   : MOD-BTS-001
 * Deskripsi  : Titik awal setiap halaman: memulai sesi, memuat konfigurasi dan modul,
 *              serta memasang penanganan exception global.
 * Dependensi : config/config.php, config/database.php, src/helpers.php,
 *              src/validasi.php, src/pendaftar.php, src/auth.php
 *
 * @package PendaftaranPelatihan
 * @author  Nayyara Aqila
 * @version 1.1.0
 * @since   1.0.0
 */
declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

$konfigurasi = require __DIR__ . '/../config/config.php';
// Pesan error teknis hanya tampil di mode pengembangan ('debug' => true);
// di produksi pengguna tidak boleh melihat jalur berkas atau query.
ini_set('display_errors', $konfigurasi['debug'] ? '1' : '0');
error_reporting(E_ALL);

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/validasi.php';
require_once __DIR__ . '/pendaftar.php';
require_once __DIR__ . '/auth.php';

// Exception yang tidak ditangkap halaman: detail dicatat ke log server, sedangkan
// pengguna hanya menerima pesan umum (HTTP 500) agar tidak membocorkan detail teknis.
set_exception_handler(static function (Throwable $e): void {
    error_log($e->getMessage());
    http_response_code(500);
    echo 'Terjadi kesalahan pada sistem. Silakan coba lagi.';
});
