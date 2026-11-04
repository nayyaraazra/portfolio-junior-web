<?php
/**
 * Menghapus pendaftar berdasarkan ID
 * @param PDO $pdo
 * @param int $id
 * @return bool
 */
function hapusPendaftar(PDO $pdo, int $id): bool
{
    $stmt = $pdo->prepare('DELETE FROM pendaftar WHERE id = :id');
    $stmt->execute(['id' => $id]);
    return $stmt->rowCount() > 0;
}