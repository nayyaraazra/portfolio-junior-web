// Lab 2 - Map dan Set

// 1. Frekuensi kata dengan Map, tampil terurut dari yang paling sering - O(n) + O(k log k)
function hitungFrekuensi(kata) {
  const frekuensi = new Map();
  for (const k of kata) {
    frekuensi.set(k, (frekuensi.get(k) || 0) + 1);
  }
  return frekuensi;
}

console.log('=== Lab 2: Map dan Set ===');
const kalimat = 'saya belajar web saya suka web';
const frek = hitungFrekuensi(kalimat.split(' '));
const terurut = [...frek.entries()].sort((a, b) => b[1] - a[1]);
console.log(`\n1. Frekuensi kata dari "${kalimat}":`);
for (const [kata, jumlah] of terurut) console.log(`   ${kata}: ${jumlah}`);

// 2. Hilangkan duplikat email dengan Set
const daftarEmail = ['a@x.com', 'b@x.com', 'a@x.com', 'c@x.com', 'b@x.com'];
const unik = [...new Set(daftarEmail)];
console.log('\n2. Sebelum:', daftarEmail, `(${daftarEmail.length})`);
console.log('   Sesudah:', unik, `(${unik.length})`);

// 3. Irisan dua daftar peserta dengan Set - O(n + m)
function irisan(a, b) {
  const himpunanA = new Set(a);
  return [...new Set(b)].filter((x) => himpunanA.has(x));
}
const kelasA = ['Sari', 'Budi', 'Citra', 'Dimas'];
const kelasB = ['Citra', 'Eka', 'Sari', 'Fitri'];
console.log('\n3. Kelas A :', kelasA);
console.log('   Kelas B :', kelasB);
console.log('   Irisan  :', irisan(kelasA, kelasB));
console.log('   Irisan dengan daftar kosong:', irisan(kelasA, []));

// 4. adaDuplikat versi Set - O(n)
function adaDuplikat(daftar) {
  const terlihat = new Set();
  for (const x of daftar) {
    if (terlihat.has(x)) return true;
    terlihat.add(x);
  }
  return false;
}
console.log('\n4. adaDuplikat');
console.log('   []            ->', adaDuplikat([]), '(harus false)');
console.log('   [7]           ->', adaDuplikat([7]), '(harus false)');
console.log('   [1,2,3]       ->', adaDuplikat([1, 2, 3]), '(harus false)');
console.log('   [1,2,3,2]     ->', adaDuplikat([1, 2, 3, 2]), '(harus true)');
console.log("   ['a','a']     ->", adaDuplikat(['a', 'a']), '(harus true)');
