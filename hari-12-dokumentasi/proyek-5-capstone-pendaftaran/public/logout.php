<?php
declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';

// Logout hanya lewat POST + token CSRF (bukan link biasa).
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect(empty($_SESSION['admin_id']) ? 'login.php' : 'index.php');
}

cekCsrf();
logout();
redirect('login.php');
