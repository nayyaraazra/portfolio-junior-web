<?php
/**
 * Modul      : Database (config/database.php)
 * ID Modul   : MOD-DB-001
 * Deskripsi  : Menyediakan satu koneksi PDO bersama untuk seluruh aplikasi.
 * Dependensi : config/config.php (kredensial lokal, tidak di-commit), ekstensi pdo_mysql
 *
 * @package PendaftaranPelatihan
 * @author  Nayyara Aqila
 * @version 1.0.0
 * @since   1.0.0
 */
declare(strict_types=1);

/**
 * Mengembalikan koneksi PDO ke database aplikasi (dibuat sekali, dipakai ulang).
 *
 * Koneksi memakai mode exception, hasil fetch berupa array asosiatif, dan prepared
 * statement asli (bukan emulasi) agar parameter tidak pernah digabung ke teks SQL.
 *
 * @return PDO Koneksi aktif dengan charset utf8mb4.
 *
 * @throws PDOException Bila MySQL mati atau kredensial salah (mis. SQLSTATE 1045/1049).
 *                      Ditangkap oleh exception handler di src/bootstrap.php.
 */
function getConnection(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $c = require __DIR__ . '/config.php';
        $dsn = "mysql:host={$c['host']};dbname={$c['nama_db']};charset=utf8mb4";
        $pdo = new PDO($dsn, $c['user'], $c['sandi'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }

    return $pdo;
}
