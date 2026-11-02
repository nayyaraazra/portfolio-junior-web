
import assert from 'node:assert/strict';
import { Stack } from './js/structures.js';
import { kurungSeimbang, balikString, adalahPalindrom } from './js/kurung.js';

console.log('=== Lab 3: Stack ===');

// 2. Uji dasar: push 3 elemen, peek, pop sampai kosong, lalu pop pada stack kosong
const s = new Stack();
assert.equal(s.isEmpty(), true);
assert.equal(s.peek(), undefined, 'peek stack kosong tidak error');
s.push('A'); s.push('B'); s.push('C');
console.log('push A,B,C  -> size', s.size(), '| isi (dasar->puncak):', s.toArray());
assert.equal(s.size(), 3);
assert.equal(s.peek(), 'C');
console.log('peek        ->', s.peek(), '(tidak menghapus, size tetap', s.size() + ')');
assert.equal(s.pop(), 'C');
assert.equal(s.pop(), 'B');
assert.equal(s.size(), 1);               // kasus satu elemen
assert.equal(s.peek(), 'A');
assert.equal(s.pop(), 'A');
assert.equal(s.isEmpty(), true);
assert.equal(s.pop(), undefined);        // pop pada stack kosong: tidak error
assert.equal(s.size(), 0);               // size tidak menjadi negatif
console.log('pop x3 lalu pop pada stack kosong -> undefined (tanpa error), size =', s.size());

// Batas ukuran (dipakai riwayat Undo)
const t = new Stack(3);
[1, 2, 3, 4, 5].forEach((x) => t.push(x));
assert.deepEqual(t.toArray(), [3, 4, 5]);
console.log('Stack(batas 3) setelah push 1..5 ->', t.toArray(), '(elemen tertua dibuang)');

// clear
t.clear();
assert.equal(t.isEmpty(), true);

// 3. Kurung seimbang
const uji = [
  ['(a+b)*[c-d]', true],
  ['(a+b]', false],
  ['((a)', false],
  ['', true],
  ['{[()]}', true],
  ['{[(])}', false],
  [')(', false],
  ['tanpa kurung', true],
];
console.log('\nkurungSeimbang:');
for (const [teks, harapan] of uji) {
  const hasil = kurungSeimbang(teks);
  assert.equal(hasil, harapan, `kurungSeimbang('${teks}')`);
  console.log(`  '${teks}'`.padEnd(20), '->', String(hasil).padEnd(5), hasil === harapan ? 'LULUS' : 'GAGAL');
}

// 4. Balik string dan palindrom
console.log('\nbalikString:');
for (const [teks, harapan] of [['halo', 'olah'], ['', ''], ['a', 'a'], ['Struktur Data', 'ataD rutkurtS']]) {
  assert.equal(balikString(teks), harapan);
  console.log(`  '${teks}' -> '${balikString(teks)}'  LULUS`);
}
console.log('\nadalahPalindrom:');
for (const [teks, harapan] of [['katak', true], ['Kasur ini rusak', true], ['A man, a plan, a canal: Panama', true], ['halo', false], ['', true], ['a', true]]) {
  assert.equal(adalahPalindrom(teks), harapan);
  console.log(`  '${teks}' -> ${adalahPalindrom(teks)}  LULUS`);
}

console.log('\nSEMUA UJI LAB 3 LULUS');
