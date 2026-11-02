
<?php
require_once __DIR__ . '/../src/bootstrap.php';

$email = (string) ($_GET['email'] ?? 'sari@contoh.com');
$hasilBerbahaya = [];
$hasilAman = [];
$errorDemo = null;

try {
    $pdo = getConnection();

    // DEMO RENTAN: hanya untuk latihan lokal.
    $sqlBerbahaya =
        "SELECT id, nama, email FROM pendaftar WHERE email = '" .
        $email . "'";

    $hasilBerbahaya = $pdo->query($sqlBerbahaya)->fetchAll();

    // Versi aman menggunakan prepared statement.
    $stmt = $pdo->prepare(
        'SELECT id, nama, email FROM pendaftar WHERE email = :email'
    );

    $stmt->execute(['email' => $email]);
    $hasilAman = $stmt->fetchAll();

} catch (Throwable $e) {
    $errorDemo = 'Terjadi kesalahan saat menjalankan demo. Periksa log PHP.';
    error_log('Demo injeksi: ' . $e->getMessage());
}

$judul = 'Demonstrasi SQL Injection';
require __DIR__ . '/../templates/header.php';
?>


<h2>Demonstrasi SQL Injection</h2>
<p>Gunakan hanya di basis data lokal untuk latihan. Coba parameter URL <code>?email=x%27%20OR%20%271%27=%271</code>.</p>
<?php if ($errorDemo !== null): ?><p class="error"><?= e($errorDemo) ?></p><?php endif; ?>
<h3>Versi berbahaya (input digabung ke query)</h3>
<table><thead><tr><th>ID</th><th>Nama</th><th>Email</th></tr></thead><tbody>
<?php foreach ($hasilBerbahaya as $row): ?>
<tr><td><?= (int) $row['id'] ?></td><td><?= e($row['nama']) ?></td><td><?= e($row['email']) ?></td></tr>
<?php endforeach; ?>
</tbody></table>
<h3>Versi aman (prepared statement)</h3>
<table><thead><tr><th>ID</th><th>Nama</th><th>Email</th></tr></thead><tbody>
<?php foreach ($hasilAman as $row): ?>
<tr><td><?= (int) $row['id'] ?></td><td><?= e($row['nama']) ?></td><td><?= e($row['email']) ?></td></tr>
<?php endforeach; ?>
</tbody></table>
<p>Versi aman memperlakukan input sebagai nilai parameter sehingga input tidak mengubah struktur perintah SQL.</p>
<?php require __DIR__ . '/../templates/footer.php'; ?>
