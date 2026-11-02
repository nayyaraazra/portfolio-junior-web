// Lab 4 - Queue (uji di Node). Simulasi antrean loket versi web: antrian.html
import assert from 'node:assert/strict';
import { Queue } from './js/structures.js';

console.log('=== Lab 4: Queue ===');
const q = new Queue();

// Kosong
assert.equal(q.isEmpty(), true);
assert.equal(q.size(), 0);
assert.equal(q.front(), undefined);
assert.equal(q.dequeue(), undefined);
console.log('queue baru: isEmpty =', q.isEmpty(), '| dequeue() ->', q.dequeue(), '(tanpa error)');

// enqueue 3 elemen
q.enqueue('A001'); q.enqueue('A002'); q.enqueue('A003');
assert.equal(q.size(), 3);
assert.equal(q.front(), 'A001');
console.log('enqueue A001,A002,A003 -> size', q.size(), '| front', q.front(), '| isi', q.toArray());

// dequeue hingga kosong (urutan FIFO)
assert.equal(q.dequeue(), 'A001');
assert.equal(q.dequeue(), 'A002');
assert.equal(q.size(), 1);                 // kasus satu elemen
assert.equal(q.front(), 'A003');
assert.equal(q.dequeue(), 'A003');
assert.equal(q.isEmpty(), true);
console.log('dequeue x3 -> urutan A001, A002, A003 (FIFO), isEmpty =', q.isEmpty());

// dequeue pada queue kosong
assert.equal(q.dequeue(), undefined);
assert.equal(q.size(), 0);                 // size tidak negatif
console.log('dequeue pada queue kosong -> undefined, size =', q.size());

// Dipakai ulang setelah kosong
q.enqueue('B001');
assert.equal(q.front(), 'B001');
assert.equal(q.size(), 1);
console.log('enqueue lagi setelah kosong -> front', q.front(), '| size', q.size());

// toArray memberi salinan (tidak membuka properti internal)
const salinan = q.toArray();
salinan.push('X');
assert.equal(q.size(), 1);
console.log('toArray() mengembalikan salinan; mengubahnya tidak memengaruhi queue');

// clear
q.clear();
assert.equal(q.isEmpty(), true);
assert.deepEqual(q.toArray(), []);
console.log('clear() -> isEmpty =', q.isEmpty());

console.log('\nSEMUA UJI LAB 4 LULUS');
