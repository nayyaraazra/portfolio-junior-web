// Uji logika PBL: Undo/Redo (Fitur A) dan Antrean Loket (Fitur B)
import assert from 'node:assert/strict';
import { RiwayatEditor } from './js/riwayat-editor.js';
import { Loket, formatNomor, MAKS_RIWAYAT } from './js/loket.js';

let lulus = 0;
function uji(nama, fn) {
  fn();
  lulus++;
  console.log(`  LULUS  ${nama}`);
}

console.log('=== Uji Fitur A: Undo/Redo (dua Stack) ===');
uji('awal: tidak ada riwayat, undo/redo tidak error', () => {
  const r = new RiwayatEditor('');
  assert.equal(r.bisaUndo(), false);
  assert.equal(r.bisaRedo(), false);
  assert.equal(r.undo(), undefined);
  assert.equal(r.redo(), undefined);
});
uji('ketik "a","ab","abc" lalu undo x3 kembali ke kosong', () => {
  const r = new RiwayatEditor('');
  r.catat('a'); r.catat('ab'); r.catat('abc');
  assert.equal(r.jumlahUndo(), 3);
  assert.equal(r.undo(), 'ab');
  assert.equal(r.undo(), 'a');
  assert.equal(r.undo(), '');
  assert.equal(r.undo(), undefined);          // sudah habis
  assert.equal(r.teksSekarang, '');
});
uji('redo mengembalikan teks urutan terbalik', () => {
  const r = new RiwayatEditor('');
  r.catat('a'); r.catat('ab');
  r.undo(); r.undo();
  assert.equal(r.redo(), 'a');
  assert.equal(r.redo(), 'ab');
  assert.equal(r.redo(), undefined);
});
uji('mengetik baru setelah undo menghapus riwayat redo', () => {
  const r = new RiwayatEditor('');
  r.catat('a'); r.catat('ab');
  r.undo();
  assert.equal(r.bisaRedo(), true);
  r.catat('ax');
  assert.equal(r.bisaRedo(), false);
  assert.equal(r.teksSekarang, 'ax');
});
uji('teks yang sama tidak dicatat dua kali', () => {
  const r = new RiwayatEditor('');
  assert.equal(r.catat('a'), true);
  assert.equal(r.catat('a'), false);
  assert.equal(r.jumlahUndo(), 1);
});
uji('riwayat dibatasi 50 langkah (tantangan)', () => {
  const r = new RiwayatEditor('');
  for (let i = 1; i <= 80; i++) r.catat('t' + i);
  assert.equal(r.jumlahUndo(), 50);
  let langkah = 0;
  while (r.undo() !== undefined) langkah++;
  assert.equal(langkah, 50);
  assert.equal(r.teksSekarang, 't30');        // 80 - 50 = langkah tertua yang masih tersimpan
});

console.log('\n=== Uji Fitur B: Antrean Loket (Queue) ===');
uji('format nomor A001, A010, A123', () => {
  assert.equal(formatNomor(1), 'A001');
  assert.equal(formatNomor(10), 'A010');
  assert.equal(formatNomor(123), 'A123');
});
uji('panggil pada antrean kosong -> null (tanpa error)', () => {
  const l = new Loket(() => '2026-01-01');
  assert.equal(l.panggilBerikutnya(), null);
  assert.equal(l.sedangDipanggil, null);
});
uji('urutan FIFO: yang ambil nomor lebih dulu dipanggil lebih dulu', () => {
  const l = new Loket(() => '2026-01-01');
  l.ambilNomor(); l.ambilNomor(); l.ambilNomor();
  assert.deepEqual(l.menunggu(), ['A001', 'A002', 'A003']);
  assert.equal(l.panggilBerikutnya(), 'A001');
  assert.equal(l.panggilBerikutnya(), 'A002');
  assert.equal(l.sedangDipanggil, 'A002');
  assert.equal(l.antrian.size(), 1);
});
uji('riwayat menyimpan maksimal 5 nomor terakhir (terbaru di depan)', () => {
  const l = new Loket(() => '2026-01-01');
  for (let i = 0; i < 8; i++) l.ambilNomor();
  for (let i = 0; i < 8; i++) l.panggilBerikutnya();
  assert.equal(l.riwayat.length, MAKS_RIWAYAT);
  assert.deepEqual(l.riwayat, ['A008', 'A007', 'A006', 'A005', 'A004']);
});
uji('tombol Reset mengosongkan semuanya, nomor mulai lagi dari A001', () => {
  const l = new Loket(() => '2026-01-01');
  l.ambilNomor(); l.ambilNomor(); l.panggilBerikutnya();
  l.reset();
  assert.equal(l.antrian.isEmpty(), true);
  assert.equal(l.sedangDipanggil, null);
  assert.deepEqual(l.riwayat, []);
  assert.equal(l.ambilNomor(), 'A001');
});
uji('nomor di-reset otomatis saat hari berganti', () => {
  let hari = '2026-01-01';
  const l = new Loket(() => hari);
  l.ambilNomor(); l.ambilNomor();
  assert.equal(l.nomorTerakhir, 2);
  hari = '2026-01-02';
  assert.equal(l.ambilNomor(), 'A001');
  assert.equal(l.menunggu().length, 1);
});
uji('ekspor/impor: data hari yang sama dipulihkan, hari lain diabaikan', () => {
  let hari = '2026-01-01';
  const l = new Loket(() => hari);
  l.ambilNomor(); l.ambilNomor(); l.ambilNomor(); l.panggilBerikutnya();
  const data = l.ekspor();

  const l2 = new Loket(() => hari);
  l2.impor(data);
  assert.deepEqual(l2.menunggu(), ['A002', 'A003']);
  assert.equal(l2.sedangDipanggil, 'A001');
  assert.equal(l2.ambilNomor(), 'A004');

  hari = '2026-01-02';
  const l3 = new Loket(() => hari);
  l3.impor(data);
  assert.equal(l3.nomorTerakhir, 0);
  assert.deepEqual(l3.menunggu(), []);
});

console.log(`\nSEMUA UJI PBL LULUS (${lulus} uji)`);
