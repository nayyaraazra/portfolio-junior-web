/**
 * app.js - Penghubung DOM untuk antrean (antrian.js) dan editor (riwayat.js).
 * Hanya mengatur tampilan dan event; aturan bisnis ada di modul lain.
 */
import { AntrianLoket, PESAN_ANTREAN_KOSONG } from './antrian.js';
import { RiwayatCatatan, MAKS_RIWAYAT } from './riwayat.js';

const KUNCI_CATATAN = 'catatan-terakhir';
const JEDA_KETIK_MS = 600;
const KONFIRMASI_RESET = 'Reset antrean? Semua nomor dan riwayat akan dihapus.';

const $ = (id) => document.getElementById(id);
const antrian = new AntrianLoket();
const riwayat = new RiwayatCatatan(muatCatatan());
let timerKetik = null;

function tampilkanPesan(teks, galat = false) {
  $('pesan').textContent = teks;
  $('pesan').classList.toggle('galat', galat);
}

function isiDaftar(elemen, isi) {
  const fragmen = document.createDocumentFragment();
  for (const teks of isi) {
    const li = document.createElement('li');
    li.textContent = teks;
    fragmen.append(li);
  }
  elemen.replaceChildren(fragmen);
}

function tampilkanAntrean() {
  $('dipanggil').textContent = antrian.sedangDipanggil() ?? '-';
  $('jumlah').textContent = antrian.jumlahMenunggu();
  isiDaftar($('daftar'), antrian.daftarMenunggu());
  isiDaftar($('riwayat-panggilan'), antrian.riwayatPanggilan());
}

function tampilkanEditor() {
  $('undo').disabled = !riwayat.bisaUndo();
  $('redo').disabled = !riwayat.bisaRedo();
  $('info-riwayat').textContent =
    `Riwayat: ${riwayat.jumlahUndo()} undo, ${riwayat.jumlahRedo()} redo (maks ${MAKS_RIWAYAT} langkah)`;
}

function muatCatatan() {
  try {
    return localStorage.getItem(KUNCI_CATATAN) ?? '';
  } catch {
    return ''; // penyimpanan diblokir: mulai dengan catatan kosong
  }
}

function simpanCatatan(teks) {
  try {
    localStorage.setItem(KUNCI_CATATAN, teks);
  } catch {
    tampilkanPesan('Catatan tidak dapat disimpan di peramban ini.', true);
  }
}

function ambilNomor() {
  tampilkanPesan(`Nomor ${antrian.ambilNomor()} berhasil diambil.`);
  tampilkanAntrean();
}

function panggilBerikutnya() {
  const nomor = antrian.panggilBerikutnya();
  if (nomor === null) {
    tampilkanPesan(PESAN_ANTREAN_KOSONG, true);
  } else {
    tampilkanPesan(`Memanggil nomor ${nomor}.`);
  }
  tampilkanAntrean();
}

function resetAntrean() {
  if (!confirm(KONFIRMASI_RESET)) return;
  antrian.reset();
  tampilkanPesan('Antrean di-reset. Nomor mulai lagi dari A001.');
  tampilkanAntrean();
}

/** Mencatat isi editor sebagai satu langkah riwayat (dipanggil setelah jeda mengetik). */
function catatSnapshot() {
  clearTimeout(timerKetik);
  timerKetik = null;
  const teks = $('editor').value;
  if (riwayat.catat(teks)) simpanCatatan(teks);
  tampilkanEditor();
}

function terapkan(ubah) {
  catatSnapshot(); // ketikan yang belum tercatat tidak boleh hilang
  const teks = ubah();
  if (teks === undefined) return;
  $('editor').value = teks;
  simpanCatatan(teks);
  tampilkanEditor();
}

function pasangEvent() {
  $('ambil').addEventListener('click', ambilNomor);
  $('panggil').addEventListener('click', panggilBerikutnya);
  $('reset').addEventListener('click', resetAntrean);
  $('undo').addEventListener('click', () => terapkan(() => riwayat.undo()));
  $('redo').addEventListener('click', () => terapkan(() => riwayat.redo()));
  $('editor').addEventListener('input', () => {
    clearTimeout(timerKetik);
    timerKetik = setTimeout(catatSnapshot, JEDA_KETIK_MS);
  });
}

$('editor').value = riwayat.teksSekarang();
pasangEvent();
tampilkanAntrean();
tampilkanEditor();
