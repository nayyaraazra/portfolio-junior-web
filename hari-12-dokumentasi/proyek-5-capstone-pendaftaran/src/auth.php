<?php
/**
 * Modul      : Auth (src/auth.php)
 * ID Modul   : MOD-AUT-001
 * Deskripsi  : Autentikasi admin berbasis sesi dan password_hash.
 * Dependensi : config/database.php (PDO), src/helpers.php (redirect)
 *
 * @package PendaftaranPelatihan
 * @author  Nayyara Aqila
 * @version 1.0.1
 * @since   1.0.0
 */
declare(strict_types=1);

/**
 * Mencari admin berdasarkan username.
 *
 * @param PDO    $pdo      Koneksi database aktif.
 * @param string $username Username persis (peka huruf besar/kecil mengikuti collation tabel).
 *
 * @return array{id: int|string, username: string, password_hash: string}|null
 *         Baris admin, atau null bila username tidak ada.
 *
 * @throws PDOException Bila query gagal.
 */
function cariAdmin(PDO $pdo, string $username): ?array
{
    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admin WHERE username = :u');
    $stmt->execute(['u' => $username]);
    $baris = $stmt->fetch();
    return $baris === false ? null : $baris;
}

/**
 * Memverifikasi username dan sandi, lalu membuka sesi admin.
 *
 * Efek samping bila berhasil: session_regenerate_id(true) (mencegah session fixation)
 * dan menulis $_SESSION['admin_id']. Hasil false sama untuk "username tidak ada" dan
 * "sandi salah" agar pemanggil tidak membocorkan mana yang keliru.
 *
 * @param PDO    $pdo      Koneksi database aktif.
 * @param string $username Username dari form.
 * @param string $sandi    Sandi mentah dari form.
 *
 * @return bool true bila login berhasil, false bila gagal.
 *
 * @throws PDOException Bila query gagal.
 */
function prosesLogin(PDO $pdo, string $username, string $sandi): bool
{
    $admin = cariAdmin($pdo, $username);
    if ($admin === null || !password_verify($sandi, $admin['password_hash'])) {
        return false;
    }
    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $admin['id'];
    return true;
}

/**
 * Menjaga halaman admin: pengunjung tanpa sesi login dialihkan ke login.php.
 *
 * Wajib dipanggil di awal setiap halaman admin, tepat setelah bootstrap.php dimuat.
 *
 * @return void
 */
function wajibLogin(): void
{
    if (empty($_SESSION['admin_id'])) {
        redirect('login.php');
    }
}

/**
 * Mengakhiri sesi admin sepenuhnya.
 *
 * Efek samping: mengosongkan $_SESSION, menghapus cookie sesi di browser, dan
 * memanggil session_destroy(). Cookie ikut dihapus agar ID lama tidak dipakai ulang.
 *
 * @return void
 */
function logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
}
