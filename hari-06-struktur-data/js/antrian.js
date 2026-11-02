/**
 * antrian.js - UI Antrean Loket. Logika ada di loket.js, struktur data di structures.js.
 * UI hanya membaca data lewat method publik (toArray, size), bukan head/tail/items.
 */
import { Loket } from './loket.js';

const KUNCI = 'antrean-loket';
const loket = new Loket();

const dipanggil = document.getElementById('dipanggil');
const jumlah = document.getElementById('jumlah');
const daftar = document.getElementById('daftar');
const riwayat = document.getElementById('riwayat');
const tanggal = document.getElementById('tanggal');

function simpan() {
  try { localStorage.setItem(KUNCI, JSON.stringify(loket.ekspor())); } catch { /* abaikan */ }
}

function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI);
    if (mentah) loket.impor(JSON.parse(mentah));
  } catch { /* data rusak: mulai baru */ }
}

function isiList(elemen, daftarTeks) {
  elemen.textContent = '';
  for (const teks of daftarTeks) {
    const li = document.createElement('li');
    li.textContent = teks;
    elemen.append(li);
  }
}

function tampilkan() {
  loket.periksaGantiHari();
  dipanggil.textContent = loket.sedangDipanggil ?? '-';
  jumlah.textContent = loket.antrian.size();
  isiList(daftar, loket.menunggu());
  isiList(riwayat, loket.riwayat);
  tanggal.textContent = `Tanggal antrean: ${loket.tanggal} (nomor di-reset otomatis tiap hari)`;
  simpan();
}

document.getElementById('ambil').addEventListener('click', () => {
  loket.ambilNomor();
  tampilkan();
});

document.getElementById('panggil').addEventListener('click', () => {
  const nomor = loket.panggilBerikutnya();
  tampilkan();
  if (nomor === null) dipanggil.textContent = 'Antrean kosong';
});

document.getElementById('reset').addEventListener('click', () => {
  loket.reset();
  tampilkan();
});

muat();
tampilkan();
