import { hitung } from './operasi.js';

const layarEl = document.getElementById('layar');
const papan = document.getElementById('papan');
const riwayatEl = document.getElementById('riwayat');

let layar = '0';
let angkaPertama = null;
let operator = null;
let siapReset = false;
let riwayat = [];

function perbaruiLayar() {
  layarEl.textContent = layar;
}

function masukkanAngka(digit) {
  if (layar === 'Error') bersihkan();

  if (digit === '.' && layar.includes('.') && !siapReset) return;

  if (siapReset) {
    layar = digit === '.' ? '0.' : digit;
    siapReset = false;
  } else if (layar === '0' && digit !== '.') {
    layar = digit;
  } else {
    layar += digit;
  }
}

function tampilkanRiwayat(teks) {
  riwayat.unshift(teks);
  riwayat = riwayat.slice(0, 5);
  riwayatEl.replaceChildren();

  for (const catatan of riwayat) {
    const item = document.createElement('li');
    item.textContent = catatan;
    riwayatEl.append(item);
  }
}

function hitungHasil() {
  if (operator === null || angkaPertama === null) return;

  const a = angkaPertama;
  const b = Number(layar);
  const op = operator;

  try {
    const hasil = hitung(op, a, b);
    const hasilRapi = Number(hasil.toFixed(10));
    tampilkanRiwayat(`${a} ${op} ${b} = ${hasilRapi}`);
    layar = String(hasilRapi);
  } catch (error) {
    layar = error.message;
  }

  operator = null;
  angkaPertama = null;
  siapReset = true;
}

function pilihOperator(op) {
  if (layar === 'Error') return;

  if (operator !== null && !siapReset) hitungHasil();
  if (layar === 'Error') return;

  angkaPertama = Number(layar);
  operator = op;
  siapReset = true;
}

function bersihkan() {
  layar = '0';
  angkaPertama = null;
  operator = null;
  siapReset = false;
}

papan.addEventListener('click', (event) => {
  const tombol = event.target.closest('button');
  if (!tombol) return;

  if (tombol.dataset.angka !== undefined) {
    masukkanAngka(tombol.dataset.angka);
  } else if (tombol.dataset.operator) {
    pilihOperator(tombol.dataset.operator);
  } else if (tombol.dataset.aksi === 'sama') {
    hitungHasil();
  } else if (tombol.dataset.aksi === 'hapus') {
    bersihkan();
  }

  perbaruiLayar();
});

document.addEventListener('keydown', (event) => {
  if (/^[0-9.]$/.test(event.key)) {
    masukkanAngka(event.key);
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    pilihOperator(event.key);
  } else if (event.key === 'Enter' || event.key === '=') {
    hitungHasil();
  } else if (event.key === 'Escape' || event.key === 'Delete') {
    bersihkan();
  } else if (event.key === 'Backspace' && layar !== 'Error') {
    layar = layar.length > 1 ? layar.slice(0, -1) : '0';
  } else {
    return;
  }

  event.preventDefault();
  perbaruiLayar();
});

perbaruiLayar();
