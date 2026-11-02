// Lab 5 - Mengukur Efisiensi (dijalankan 3 kali, hasil dirata-ratakan)
import { Queue } from './js/structures.js';

const N = 100000;
const PERCOBAAN = 3;

function ukur(fungsi) {
  const mulai = performance.now();
  fungsi();
  return performance.now() - mulai;
}

function satuPercobaan() {
  const angka = Array.from({ length: N }, (_, i) => i);
  const himpunan = new Set(angka);

  const includes = ukur(() => { for (let i = 0; i < 1000; i++) angka.includes(N - 1); });
  const setHas = ukur(() => { for (let i = 0; i < 1000; i++) himpunan.has(N - 1); });

  const arr = Array.from({ length: N }, (_, i) => i);
  const shift = ukur(() => { while (arr.length > 0) arr.shift(); });

  const q = new Queue();
  for (let i = 0; i < N; i++) q.enqueue(i);
  const dequeue = ukur(() => { while (!q.isEmpty()) q.dequeue(); });

  return { includes, setHas, shift, dequeue };
}

console.log(`=== Lab 5: Mengukur Efisiensi (N = ${N.toLocaleString('id-ID')}, ${PERCOBAAN} percobaan) ===\n`);
satuPercobaan(); // pemanasan JIT (tidak dihitung)

const hasil = [];
for (let k = 1; k <= PERCOBAAN; k++) {
  const r = satuPercobaan();
  hasil.push(r);
  console.log(`Percobaan ${k}: includes=${r.includes.toFixed(3)} | Set.has=${r.setHas.toFixed(3)} | shift=${r.shift.toFixed(3)} | dequeue=${r.dequeue.toFixed(3)}  (ms)`);
}

const rata = (kunci) => hasil.reduce((j, r) => j + r[kunci], 0) / hasil.length;
const baris = [
  ['Array.includes x 1000', rata('includes'), 'O(n) per pencarian'],
  ['Set.has x 1000', rata('setHas'), 'O(1) per pencarian'],
  ['Array.shift hingga kosong', rata('shift'), 'O(n) per operasi'],
  ['Queue.dequeue hingga kosong', rata('dequeue'), 'O(1) per operasi'],
];
console.log('\nRata-rata:');
console.log('Operasi'.padEnd(30) + 'Waktu (ms)'.padEnd(14) + 'Big-O');
for (const [nama, ms, big] of baris) console.log(nama.padEnd(30) + ms.toFixed(3).padEnd(14) + big);
console.log(`\nRasio includes/Set.has : ${(rata('includes') / rata('setHas')).toFixed(0)}x`);
console.log(`Rasio shift/dequeue    : ${(rata('shift') / rata('dequeue')).toFixed(2)}x`);
