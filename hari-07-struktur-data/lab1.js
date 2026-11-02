// Lab 1: Linked List
import assert from 'node:assert/strict';
import { LinkedList, LinkedQueue, Queue, Stack } from './structures.js';

const JUMLAH_ELEMEN = 100000;
const JUMLAH_PERCOBAAN = 3;

console.log('=== Lab 1: Linked List ===');

// 2. Uji LinkedList: addFirst, addLast, removeFirst, find, toArray, kasus kosong dan satu elemen
console.log('\n[2] Uji dasar LinkedList');
const daftar = new LinkedList();
assert.equal(daftar.isEmpty(), true);
assert.equal(daftar.removeFirst(), undefined);
assert.equal(daftar.peekFirst(), undefined);
assert.deepEqual(daftar.toArray(), []);
console.log('kosong        : isEmpty, removeFirst() ->', daftar.removeFirst());

daftar.addFirst('B');
assert.equal(daftar.size(), 1);
assert.equal(daftar.removeFirst(), 'B');
assert.equal(daftar.isEmpty(), true);
daftar.addLast('X');
assert.deepEqual(daftar.toArray(), ['X']); // tail ikut benar setelah kosong lagi
daftar.removeFirst();
console.log(
  'satu elemen   : addFirst lalu removeFirst -> kosong lagi, addLast tetap benar',
);

daftar.addLast('B');
daftar.addFirst('A');
daftar.addLast('C');
assert.deepEqual(daftar.toArray(), ['A', 'B', 'C']);
assert.equal(
  daftar.find((x) => x === 'B'),
  'B',
);
assert.equal(
  daftar.find((x) => x === 'Z'),
  undefined,
);
console.log(
  'addFirst/addLast ->',
  daftar.toArray(),
  '| find B ->',
  daftar.find((x) => x === 'B'),
  '| find Z ->',
  daftar.find((x) => x === 'Z'),
);
assert.equal(daftar.removeFirst(), 'A');
console.log(
  'removeFirst   ->',
  'A',
  '| sisa',
  daftar.toArray(),
  '| size',
  daftar.size(),
);

// 3. remove(data): kepala, tengah, ekor, tidak ada
console.log('\n[3] Uji remove(data)');
const buatDaftar = () => {
  const hasil = new LinkedList();
  ['A', 'B', 'C', 'D'].forEach((x) => hasil.addLast(x));
  return hasil;
};
const kasus = [
  ['kepala (A)', 'A', true, ['B', 'C', 'D']],
  ['tengah (C)', 'C', true, ['A', 'B', 'D']],
  ['ekor (D)', 'D', true, ['A', 'B', 'C']],
  ['tidak ada (Z)', 'Z', false, ['A', 'B', 'C', 'D']],
];
for (const [nama, nilai, harapanHasil, harapanIsi] of kasus) {
  const l = buatDaftar();
  assert.equal(l.remove(nilai), harapanHasil);
  assert.deepEqual(l.toArray(), harapanIsi);
  assert.equal(l.size(), harapanIsi.length);
  console.log(
    `hapus ${nama}`.padEnd(22),
    '->',
    String(harapanHasil).padEnd(5),
    l.toArray(),
  );
}
const ekor = buatDaftar();
ekor.remove('D');
ekor.addLast('E'); // bukti tail dipindah ke C: E harus tersambung
assert.deepEqual(ekor.toArray(), ['A', 'B', 'C', 'E']);
console.log('hapus ekor lalu addLast(E) ->', ekor.toArray(), '(tail terbarui)');
const satu = new LinkedList();
satu.addLast('A');
assert.equal(satu.remove('A'), true);
assert.equal(satu.isEmpty(), true);
assert.equal(satu.remove('A'), false);
console.log('hapus pada satu elemen dan pada list kosong ditangani');

// LinkedQueue
const antrean = new LinkedQueue();
assert.equal(antrean.dequeue(), undefined);
antrean.enqueue(1);
antrean.enqueue(2);
assert.equal(antrean.front(), 1);
assert.equal(antrean.dequeue(), 1);
assert.equal(antrean.size(), 1);
console.log('\nLinkedQueue   : FIFO benar, dequeue kosong -> undefined');

// Stack dan Queue dari Hari 6
const tumpukan = new Stack();
tumpukan.push(1);
tumpukan.push(2);
assert.equal(tumpukan.pop(), 2);
assert.equal(new Stack().pop(), undefined);
const queueHead = new Queue();
queueHead.enqueue('a');
assert.equal(queueHead.dequeue(), 'a');
assert.equal(queueHead.dequeue(), undefined);
console.log('Stack, Queue  : tersalin dari Hari 6 dan lolos uji kasus kosong');

// 4. Bandingkan kecepatan Queue array (shift) dengan LinkedQueue
/** Antrean sederhana berbasis array; dequeue memakai shift() sehingga O(n). */
class QueueArrayShift {
  #items = [];
  enqueue(item) {
    this.#items.push(item);
  }
  dequeue() {
    return this.#items.shift();
  }
  isEmpty() {
    return this.#items.length === 0;
  }
}

/** Mengisi lalu mengosongkan antrean; @returns {number[]} [waktu enqueue, waktu dequeue] ms. */
function ukurAntrean(buatAntrean) {
  const antrian = buatAntrean();
  const mulaiIsi = performance.now();
  for (let i = 0; i < JUMLAH_ELEMEN; i++) antrian.enqueue(i);
  const selesaiIsi = performance.now();
  while (!antrian.isEmpty()) antrian.dequeue();
  return [selesaiIsi - mulaiIsi, performance.now() - selesaiIsi];
}

console.log(
  `\n[4] Pengukuran ${JUMLAH_ELEMEN.toLocaleString('id-ID')} elemen (${JUMLAH_PERCOBAAN} percobaan)`,
);
const kandidat = [
  ['Queue array (shift)', () => new QueueArrayShift()],
  ['LinkedQueue', () => new LinkedQueue()],
  ['Queue head/tail (Hari 6)', () => new Queue()],
];
ukurAntrean(() => new LinkedQueue()); // pemanasan
console.log(
  'Struktur'.padEnd(26) +
    'enqueue (ms)'.padEnd(15) +
    'dequeue sampai kosong (ms)',
);
for (const [nama, buat] of kandidat) {
  const hasil = Array.from({ length: JUMLAH_PERCOBAAN }, () =>
    ukurAntrean(buat),
  );
  const rata = (kolom) =>
    hasil.reduce((total, h) => total + h[kolom], 0) / JUMLAH_PERCOBAAN;
  console.log(
    nama.padEnd(26) + rata(0).toFixed(2).padEnd(15) + rata(1).toFixed(2),
  );
}
