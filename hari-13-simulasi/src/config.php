<?php
declare(strict_types=1);

const DB_HOST = 'localhost';
const DB_NAMA = 'pendaftaran_kursus';
const DB_USER = 'root';
const DB_PASS = '';

/**
 * Membuat (sekali) dan mengembalikan koneksi PDO.
 *
 * @return PDO Koneksi database.
 * @throws PDOException Jika koneksi gagal.
 */
function koneksi(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAMA . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }

    return $pdo;
}
