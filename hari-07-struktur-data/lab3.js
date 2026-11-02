// Lab 3 - Pencarian dan Pengurutan
import assert from 'node:assert/strict';

const UKURAN_PERBANDINGAN = 1000;
const UKURAN_WAKTU = [10000, 100000];
const BATAS_BUBBLE_ULANG = 10000; // di atas ini bubble sort hanya diukur sekali (terlalu lama)
const JUMLAH_PERCOBAAN = 3;

/** Pencarian linear O(n); @returns {number} indeks atau -1. */
function cariLinear(daftar, target) {
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i] === target) return i;
  }
  return -1;
}

/** Pencarian biner O(log n), daftar WAJIB terurut; @returns {number} indeks atau -1. */
function cariBiner(daftarUrut, target) {
  let kiri = 0;
  let kanan = daftarUrut.length - 1;
  while (kiri <= kanan) {
    const tengah = Math.floor((kiri + kanan) / 2);
    if (daftarUrut[tengah] === target) return tengah;
    if (daftarUrut[tengah] < target) kiri = tengah + 1;
    else kanan = tengah - 1;
  }
  return -1;
}

/** Bubble sort O(n^2) pada salinan; statistik.perbandingan dihitung bila diberikan. */
function bubbleSort(daftar, statistik = { perbandingan: 0 }) {
  const hasil = [...daftar];
  for (let i = 0; i < hasil.length - 1; i++) {
    let adaTukar = false;
    for (let j = 0; j < hasil.length - 1 - i; j++) {
      statistik.perbandingan++;
      if (hasil[j] > hasil[j + 1]) {
        [hasil[j], hasil[j + 1]] = [hasil[j + 1], hasil[j]];
        adaTukar = true;
      }
    }
    if (!adaTukar) break;
  }
  return hasil;
}

/** Insertion sort pada salinan: O(n^2) terburuk, O(n) bila hampir terurut. */
function insertionSort(daftar, statistik = { perbandingan: 0 }) {
  const hasil = [...daftar];
  for (let i = 1; i < hasil.length; i++) {
    const kunci = hasil[i];
    let j = i - 1;
    while (j >= 0) {
      statistik.perbandingan++;
      if (hasil[j] <= kunci) break;
      hasil[j + 1] = hasil[j];
      j--;
    }
    hasil[j + 1] = kunci;
  }
  return hasil;
}

/** Merge sort O(n log n): membagi lalu menggabungkan. */
function mergeSort(daftar) {
  if (daftar.length <= 1) return daftar;
  const tengah = Math.floor(daftar.length / 2);
  return gabung(
    mergeSort(daftar.slice(0, tengah)),
    mergeSort(daftar.slice(tengah)),
  );
}

function gabung(kiri, kanan) {
  const hasil = [];
  let i = 0;
  let j = 0;
  while (i < kiri.length && j < kanan.length) {
    hasil.push(kiri[i] <= kanan[j] ? kiri[i++] : kanan[j++]);
  }
  return hasil.concat(kiri.slice(i), kanan.slice(j));
}

const urutBawaan = (daftar) => [...daftar].sort((a, b) => a - b);

// ---------- 1. Uji kasus tepi ----------
console.log('=== Lab 3: Pencarian dan Pengurutan ===');
console.log(
  '\n[1] Uji kasus tepi (kosong, satu elemen, terurut, terbalik, duplikat)',
);
const kasusUji = {
  kosong: [],
  'satu elemen': [7],
  'sudah terurut': [1, 2, 3, 4, 5],
  terbalik: [5, 4, 3, 2, 1],
  'berisi duplikat': [3, 1, 2, 3, 1, 2],
};
const algoritma = { bubbleSort, insertionSort, mergeSort };
for (const [nama, fungsi] of Object.entries(algoritma)) {
  for (const [kasus, data] of Object.entries(kasusUji)) {
    const salinanAwal = [...data];
    assert.deepEqual(fungsi(data), urutBawaan(data), `${nama} - ${kasus}`);
    assert.deepEqual(data, salinanAwal, `${nama} tidak boleh mengubah masukan`);
  }
  console.log(
    `${nama}`.padEnd(14),
    'LULUS pada 5 kasus uji; array asli tidak berubah',
  );
}
assert.equal(cariLinear([], 1), -1);
assert.equal(cariLinear([7], 7), 0);
assert.equal(cariLinear([3, 1, 2, 3], 3), 0);
assert.equal(cariBiner([], 1), -1);
assert.equal(cariBiner([7], 7), 0);
assert.equal(cariBiner([1, 2, 3, 4, 5], 5), 4);
assert.equal(cariBiner([1, 2, 3, 4, 5], 1), 0);
assert.equal(cariBiner([1, 2, 3, 4, 5], 9), -1);
assert.equal(cariBiner([1, 3, 5, 7], 4), -1);
console.log(
  'cariLinear    LULUS (kosong, satu elemen, duplikat -> indeks pertama)',
);
console.log(
  'cariBiner     LULUS (kosong, satu elemen, ujung kiri/kanan, tidak ada)',
);

// ---------- 2. Jumlah perbandingan ----------
const acak = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * n * 10));
const terurut = (n) => Array.from({ length: n }, (_, i) => i);
const terbalik = (n) => terurut(n).reverse();

console.log(`\n[2] Jumlah perbandingan untuk ${UKURAN_PERBANDINGAN} data`);
console.log(
  'Jenis data'.padEnd(16) + 'bubbleSort'.padEnd(14) + 'insertionSort',
);
const jenisData = [
  ['acak', acak],
  ['terurut', terurut],
  ['terbalik', terbalik],
];
for (const [nama, buat] of jenisData) {
  const data = buat(UKURAN_PERBANDINGAN);
  const bubble = { perbandingan: 0 };
  const insertion = { perbandingan: 0 };
  bubbleSort(data, bubble);
  insertionSort(data, insertion);
  console.log(
    nama.padEnd(16) +
      String(bubble.perbandingan).padEnd(14) +
      insertion.perbandingan,
  );
}

// ---------- 3. Waktu ----------
function ukurWaktu(fungsi, data) {
  const mulai = performance.now();
  fungsi(data);
  return performance.now() - mulai;
}

function rataWaktu(fungsi, data, ulang) {
  let total = 0;
  for (let k = 0; k < ulang; k++) total += ukurWaktu(fungsi, data);
  return total / ulang;
}

console.log('\n[3] Waktu (ms), data acak, rata-rata percobaan');
console.log(
  'n'.padEnd(10) +
    'bubbleSort'.padEnd(16) +
    'mergeSort'.padEnd(14) +
    'Array.sort',
);
mergeSort(acak(1000)); // pemanasan
for (const n of UKURAN_WAKTU) {
  const data = acak(n);
  const ulangBubble = n > BATAS_BUBBLE_ULANG ? 1 : JUMLAH_PERCOBAAN;
  const bubble = rataWaktu(bubbleSort, data, ulangBubble);
  const merge = rataWaktu(mergeSort, data, JUMLAH_PERCOBAAN);
  const bawaan = rataWaktu(urutBawaan, data, JUMLAH_PERCOBAAN);
  console.log(
    String(n).padEnd(10) +
      `${bubble.toFixed(1)}${ulangBubble === 1 ? ' (1x)' : ''}`.padEnd(16) +
      merge.toFixed(2).padEnd(14) +
      bawaan.toFixed(2),
  );
}
