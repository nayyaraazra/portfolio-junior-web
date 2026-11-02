// Lab 2 - Tree dan Graph
import assert from 'node:assert/strict';
import { BinarySearchTree, LinkedQueue } from './structures.js';

console.log('=== Lab 2: Tree dan Graph ===');

// 1. Pohon folder: cetakPohon, hitungNode, cariNode
const folder = {
  nama: 'proyek',
  anak: [
    { nama: 'css', anak: [] },
    { nama: 'js', anak: [{ nama: 'app.js', anak: [] }] },
  ],
};

function cetakPohon(node, tingkat = 0) {
  console.log(' '.repeat(tingkat * 2) + node.nama);
  for (const anak of node.anak) {
    cetakPohon(anak, tingkat + 1);
  }
}

function hitungNode(node) {
  let total = 1;
  for (const anak of node.anak) total += hitungNode(anak);
  return total;
}

/**
 * Mencari node bernama `nama` secara rekursif.
 * @returns {string|null} Jalur lengkap, mis. 'proyek/js/app.js', atau null bila tidak ada.
 */
function cariNode(node, nama, jalurInduk = '') {
  const jalur = jalurInduk === '' ? node.nama : `${jalurInduk}/${node.nama}`;
  if (node.nama === nama) return jalur;
  for (const anak of node.anak) {
    const hasil = cariNode(anak, nama, jalur);
    if (hasil !== null) return hasil;
  }
  return null;
}

console.log('\n[1] Pohon folder');
cetakPohon(folder);
console.log('hitungNode              ->', hitungNode(folder));
console.log("cariNode('app.js')      ->", cariNode(folder, 'app.js'));
console.log("cariNode('proyek')      ->", cariNode(folder, 'proyek'));
console.log("cariNode('tidak-ada')   ->", cariNode(folder, 'tidak-ada'));
assert.equal(cariNode(folder, 'app.js'), 'proyek/js/app.js');
assert.equal(cariNode(folder, 'tidak-ada'), null);
assert.equal(hitungNode(folder), 4);

// 2. Binary Search Tree
console.log('\n[2] Binary Search Tree');
const pohon = new BinarySearchTree();
for (const nilai of [50, 30, 70, 20, 40, 60, 80]) pohon.insert(nilai);
console.log('inOrder()   ->', pohon.inOrder());
console.log('has(60)     ->', pohon.has(60));
console.log('has(65)     ->', pohon.has(65));
assert.deepEqual(pohon.inOrder(), [20, 30, 40, 50, 60, 70, 80]);
assert.equal(pohon.has(60), true);
assert.equal(pohon.has(65), false);
assert.deepEqual(new BinarySearchTree().inOrder(), []);
assert.equal(new BinarySearchTree().has(1), false);
console.log('pohon kosong: inOrder() -> [] dan has() -> false (tanpa error)');

// 3. Graf jaringan 6 kota (adjacency list)
const jaringan = {
  Jakarta: ['Bandung', 'Semarang'],
  Bandung: ['Jakarta', 'Yogyakarta'],
  Semarang: ['Jakarta', 'Yogyakarta', 'Surabaya'],
  Yogyakarta: ['Bandung', 'Semarang', 'Malang'],
  Surabaya: ['Semarang', 'Malang'],
  Malang: ['Yogyakarta', 'Surabaya'],
};

/** BFS (melebar) memakai LinkedQueue; @returns {string[]} urutan kunjungan. */
function bfs(graf, mulai) {
  const dikunjungi = new Set([mulai]);
  const antrean = new LinkedQueue();
  const urutan = [];
  antrean.enqueue(mulai);
  while (!antrean.isEmpty()) {
    const simpul = antrean.dequeue();
    urutan.push(simpul);
    for (const tetangga of graf[simpul]) {
      if (dikunjungi.has(tetangga)) continue;
      dikunjungi.add(tetangga);
      antrean.enqueue(tetangga);
    }
  }
  return urutan;
}

/** DFS (mendalam) rekursif; @returns {string[]} urutan kunjungan. */
function dfs(graf, simpul, dikunjungi = new Set()) {
  dikunjungi.add(simpul);
  for (const tetangga of graf[simpul]) {
    if (!dikunjungi.has(tetangga)) dfs(graf, tetangga, dikunjungi);
  }
  return [...dikunjungi];
}

/**
 * Jarak terpendek dalam jumlah sisi (BFS).
 * @returns {number} jumlah sisi, atau -1 bila tujuan tidak terjangkau.
 * @throws {Error} bila asal atau tujuan tidak ada di graf.
 */
function jarakTerpendek(graf, asal, tujuan) {
  if (!(asal in graf) || !(tujuan in graf)) {
    throw new Error(`Kota tidak dikenal: ${asal in graf ? tujuan : asal}`);
  }
  const jarak = new Map([[asal, 0]]);
  const antrean = new LinkedQueue();
  antrean.enqueue(asal);
  while (!antrean.isEmpty()) {
    const simpul = antrean.dequeue();
    if (simpul === tujuan) return jarak.get(simpul);
    for (const tetangga of graf[simpul]) {
      if (jarak.has(tetangga)) continue;
      jarak.set(tetangga, jarak.get(simpul) + 1);
      antrean.enqueue(tetangga);
    }
  }
  return -1;
}

console.log('\n[3] Graf 6 kota');
console.log('bfs(Jakarta) ->', bfs(jaringan, 'Jakarta').join(', '));
console.log('dfs(Jakarta) ->', dfs(jaringan, 'Jakarta').join(', '));
const uji = [
  ['Jakarta', 'Jakarta', 0],
  ['Jakarta', 'Bandung', 1],
  ['Jakarta', 'Yogyakarta', 2],
  ['Jakarta', 'Malang', 3],
  ['Bandung', 'Surabaya', 3],
];
for (const [asal, tujuan, harapan] of uji) {
  const hasil = jarakTerpendek(jaringan, asal, tujuan);
  assert.equal(hasil, harapan);
  console.log(`jarakTerpendek(${asal} -> ${tujuan})`.padEnd(42), hasil, 'sisi');
}
assert.equal(jarakTerpendek({ A: [], B: [] }, 'A', 'B'), -1);
console.log('kota terpisah (tidak terjangkau)          ->', -1);
assert.throws(
  () => jarakTerpendek(jaringan, 'Jakarta', 'Medan'),
  /Kota tidak dikenal: Medan/,
);
console.log(
  "kota tidak dikenal ('Medan')              -> Error: Kota tidak dikenal: Medan",
);
assert.equal(bfs({ A: [] }, 'A').length, 1);
