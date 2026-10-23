
import {
  hitungRataRata,
  cariTertinggi,
  cariTerendah
} from './matematika.js';

const inputNilai = document.getElementById('nilai');
const tombol = document.getElementById('hitung');
const hasil = document.getElementById('hasil');

tombol.addEventListener('click', () => {
  const teks = inputNilai.value.trim();

  if (teks === '') {
    hasil.textContent = 'Masukkan daftar nilai terlebih dahulu.';
    return;
  }

  const nilai = teks.split(',').map((item) => item.trim());

  if (nilai.some((item) => item === '')) {
    hasil.textContent = 'Format nilai tidak valid.';
    return;
  }

  const daftarNilai = nilai.map(Number);

  if (daftarNilai.some((item) =>
    !Number.isFinite(item) || item < 0 || item > 100
  )) {
    hasil.textContent = 'Semua nilai harus berupa angka 0-100.';
    return;
  }

  const rataRata = hitungRataRata(daftarNilai);
  const tertinggi = cariTertinggi(daftarNilai);
  const terendah = cariTerendah(daftarNilai);

  hasil.innerHTML = `
    <p>Daftar nilai: ${daftarNilai.join(', ')}</p>
    <p>Rata-rata: ${rataRata.toFixed(2)}</p>
    <p>Nilai tertinggi: ${tertinggi}</p>
    <p>Nilai terendah: ${terendah}</p>
  `;
});
