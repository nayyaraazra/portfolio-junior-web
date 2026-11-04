<?php

function cariTertinggi($daftar)
{
    $tertinggi = 0;
    for ($i = 0; $i < count($daftar); $i++) {
        if ($daftar[$i] > $tertinggi) $tertinggi = $daftar[$i];
    }
    return $tertinggi;
}

function cariTerendah($daftar)
{
    $terendah = 100;
    for ($i = 0; $i < count($daftar); $i++) {
        if ($daftar[$i] < $terendah) $terendah = $daftar[$i];
    }
    return $terendah;
}
function cariRataRata($daftar)
{
    $jumlah = 0;
    for ($i = 0; $i < count($daftar); $i++) {
        $jumlah += $daftar[$i];
    }
    return $jumlah / count($daftar);
}
const BATASLULUS = 70;
function cariJumlahLulus($daftar)
{
    $lulus = [];
    for ($i = 0; $i < count($daftar); $i++) {
        if ($daftar[$i] >= BATASLULUS) $lulus[] = $daftar[$i];
    }
    return count($lulus);
}


function statistik($daftar)
{
    $hasil = [];
    $hasil['rata-rata'] = cariRataRata($daftar);
    $hasil['tertinggi'] = cariTertinggi($daftar);
    $hasil['terendah'] = cariTerendah($daftar);
    $hasil['jumlah lulus'] = cariJumlahLulus($daftar);
    return $hasil;
}

$daftar = [70, 80, 60, 90];
$hasil = statistik($daftar);
echo "Tertinggi: " . $hasil['tertinggi'] . "\n";
echo "Terendah: " . $hasil['terendah'] . "\n";
echo "Rata-rata: " . $hasil['rata-rata'] . "\n";
echo "Jumlah Lulus: " . $hasil['jumlah lulus'] . "\n";