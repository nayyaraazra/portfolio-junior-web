<?php
/**
 * Modul      : Validasi (src/validasi.php)
 * ID Modul   : MOD-VAL-001
 * Deskripsi  : Logika murni (tanpa database/sesi) agar mudah diuji otomatis:
 *              validasi nomor HP, hitung sisa kuota, format nomor bukti, peringkat kelas.
 * Dependensi : tidak ada
 *
 * @package PendaftaranPelatihan
 * @author  Nayyara Aqila
 * @version 1.1.0
 * @since   1.0.0
 */
declare(strict_types=1);

/**
 * Memeriksa format nomor HP Indonesia.
 *
 * Aturan bisnis: diawali "08" diikuti 8-11 digit, jadi total 10-13 digit.
 *
 * @param string $noHp Nomor HP tanpa spasi atau tanda baca.
 *
 * @return bool true bila valid.
 */
function validNoHp(string $noHp): bool
{
    return preg_match('/^08[0-9]{8,11}$/', $noHp) === 1;
}

/**
 * Menghitung sisa kuota kelas.
 *
 * max(0, ...) menjaga hasil tidak negatif bila data terisi sempat melebihi kuota
 * (mis. data lama atau kuota diturunkan admin).
 *
 * @param int $kuota  Kapasitas kelas.
 * @param int $terisi Jumlah pendaftar saat ini.
 *
 * @return int Sisa kuota, minimal 0.
 */
function hitungSisaKuota(int $kuota, int $terisi): int
{
    return max(0, $kuota - $terisi);
}

/**
 * Membuat nomor bukti pendaftaran.
 *
 * @param int $tahun Tahun pendaftaran (4 digit).
 * @param int $id    ID pendaftar; diisi nol di kiri hingga 6 digit.
 *
 * @return string Contoh: "REG-2026-000007".
 */
function formatNomorBukti(int $tahun, int $id): string
{
    return sprintf('REG-%d-%06d', $tahun, $id);
}

/**
 * Mengurutkan kelas dari yang paling banyak pendaftar (peringkat kelas).
 *
 * Struktur data: array asosiatif per kelas diurutkan dengan usort(). Bila jumlah
 * terisi sama, urutan jatuh ke nama kelas A-Z agar hasil stabil dan dapat diuji.
 *
 * @param array<int, array{nama_kelas: string, kuota: int|string, terisi: int|string}> $daftarKelas
 *        Hasil daftarKelas() atau data setara.
 *
 * @return array<int, array{nama_kelas: string, kuota: int, terisi: int, sisa: int}>
 *         Daftar berperingkat (indeks 0 = terbanyak); array kosong bila masukan kosong.
 */
function peringkatKelas(array $daftarKelas): array
{
    $hasil = [];
    foreach ($daftarKelas as $k) {
        $kuota = (int) $k['kuota'];
        $terisi = (int) $k['terisi'];
        $hasil[] = [
            'nama_kelas' => (string) $k['nama_kelas'],
            'kuota' => $kuota,
            'terisi' => $terisi,
            'sisa' => hitungSisaKuota($kuota, $terisi),
        ];
    }

    usort($hasil, static fn (array $a, array $b): int =>
        $b['terisi'] <=> $a['terisi'] ?: strcmp($a['nama_kelas'], $b['nama_kelas']));

    return $hasil;
}
