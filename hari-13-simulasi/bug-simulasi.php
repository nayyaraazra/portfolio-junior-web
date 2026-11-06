<?php
declare(strict_types=1);

/**
 * Menghitung sisa kuota kursus.
 *
 * @param int   $kuota   Kuota total.
 * @param array $peserta Daftar peserta terdaftar.
 * @return int Sisa kuota.
 * @throws TypeError Jika argumen bukan tipe yang sesuai (strict_types).
 */
function hitungSisaKuota(int $kuota, array $peserta): int
{
    $terisi = count($peserta); // perbaikan: titik koma ditambahkan
    return $kuota - $terisi;
}

/**
 * Menghitung rata-rata umur.
 *
 * @param array $daftarUmur Daftar umur (angka).
 * @return float Rata-rata umur.
 * @throws InvalidArgumentException Jika daftar umur kosong.
 */
function rataUmur(array $daftarUmur): float
{
    if (count($daftarUmur) === 0) {
        throw new InvalidArgumentException('Daftar umur tidak boleh kosong.');
    }

    return array_sum($daftarUmur) / count($daftarUmur); // perbaikan: hapus "- 1"
}

$daftar = [['nama' => 'Sari'], ['nama' => 'Budi']];
echo 'Sisa kuota: ' . hitungSisaKuota(30, $daftar) . PHP_EOL;
echo 'Nama pertama: ' . $daftar[0]['nama']; // perbaikan: indeks 0
