
<?php
require_once __DIR__ . '/../config/database.php';

try {
    getConnection();
    echo 'Koneksi database berhasil.';
} catch (Throwable $e) {
    error_log($e->__toString());
    http_response_code(500);
    echo 'Koneksi gagal. Periksa log Apache.';
}
