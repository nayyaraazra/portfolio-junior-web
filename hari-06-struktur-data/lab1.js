const peserta = [
  { id: 1, nama: 'Sari', kelas: 'Web', nilai: 90, aktif: true },
  { id: 2, nama: 'Budi', kelas: 'Web', nilai: 68, aktif: true },
  { id: 3, nama: 'Citra', kelas: 'Data', nilai: 82, aktif: false },
  { id: 4, nama: 'Dimas', kelas: 'Mobile', nilai: 75, aktif: true },
  { id: 5, nama: 'Eka', kelas: 'Data', nilai: 88, aktif: true },
  { id: 6, nama: 'Fitri', kelas: 'Web', nilai: 94, aktif: true },
  { id: 7, nama: 'Gilang', kelas: 'Mobile', nilai: 59, aktif: false },
  { id: 8, nama: 'Hana', kelas: 'Data', nilai: 71, aktif: true },
  { id: 9, nama: 'Indra', kelas: 'Web', nilai: 80, aktif: true },
  { id: 10, nama: 'Joko', kelas: 'Mobile', nilai: 66, aktif: true },
];

// 1. Tampilkan peserta aktif saja 
function pesertaAktif(daftar) {
  return daftar.filter((p) => p.aktif);
}

// 2. Urut berdasarkan nama tanpa mengubah array asli: salin dulu dengan spread - O(n log n)
function urutkanNama(daftar) {
  return [...daftar].sort((a, b) => a.nama.localeCompare(b.nama));
}

// 3. Cari berdasarkan id (find); tangani bila tidak ditemukan - O(n)
function cariById(daftar, id) {
  const hasil = daftar.find((p) => p.id === id);
  return hasil ?? null;
}

// 4. Jumlah peserta per kelas dengan objek penghitung - O(n)
function hitungPerKelas(daftar) {
  const penghitung = {};
  for (const p of daftar) {
    penghitung[p.kelas] = (penghitung[p.kelas] || 0) + 1;
  }
  return penghitung;
}

// 5. Tambah, ubah, hapus peserta
function tambahPeserta(daftar, baru) {
  daftar.push(baru); // O(1)
}
function ubahPeserta(daftar, id, perubahan) {
  const p = cariById(daftar, id);
  if (!p) return false;
  Object.assign(p, perubahan);
  return true;
}
function hapusPeserta(daftar, id) {
  const indeks = daftar.findIndex((p) => p.id === id);
  if (indeks === -1) return false;
  daftar.splice(indeks, 1); // O(n): elemen sesudahnya bergeser
  return true;
}

// 6. Ubah array menjadi objek berindeks id (reduce) -> pencarian O(1)
function indeksById(daftar) {
  return daftar.reduce((hasil, p) => {
    hasil[p.id] = p;
    return hasil;
  }, {});
}

console.log('=== Lab 1: Array dan Objek ===');
console.log('\n1. Peserta aktif:', pesertaAktif(peserta).map((p) => p.nama).join(', '));

const salinanSebelum = JSON.stringify(peserta);
console.log('\n2. Urut nama:', urutkanNama(peserta).map((p) => p.nama).join(', '));
console.log('   Array asli tidak berubah:', JSON.stringify(peserta) === salinanSebelum);

console.log('\n3. Cari id 5   :', cariById(peserta, 5));
console.log('   Cari id 99  :', cariById(peserta, 99), '(tidak ditemukan ditangani -> null)');

console.log('\n4. Jumlah per kelas:', hitungPerKelas(peserta));

console.log('\n5. Tambah / ubah / hapus');
tambahPeserta(peserta, { id: 11, nama: 'Kirana', kelas: 'Web', nilai: 85, aktif: true });
console.log('   Setelah tambah  : jumlah =', peserta.length);
console.log('   Ubah id 2 ->', ubahPeserta(peserta, 2, { nilai: 78, aktif: false }), cariById(peserta, 2));
console.log('   Ubah id 99 ->', ubahPeserta(peserta, 99, { nilai: 0 }));
console.log('   Hapus id 3 ->', hapusPeserta(peserta, 3), '| hapus id 99 ->', hapusPeserta(peserta, 99));
console.log('   Hasil akhir     :', peserta.map((p) => `${p.id}:${p.nama}`).join(', '));

console.log('\n6. Objek berindeks id (pencarian O(1))');
const byId = indeksById(peserta);
console.log('   byId[5]  :', byId[5]);
console.log('   byId[99] :', byId[99], '(undefined bila tidak ada)');
