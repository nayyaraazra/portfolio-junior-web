const peserta = [
  { id: 1, nama: 'Sari', kelas: 'Web', nilai: 90 },
  { id: 2, nama: 'Budi', kelas: 'Web', nilai: 68 },
  { id: 3, nama: 'Citra', kelas: 'Data', nilai: 82 },
  { id: 4, nama: 'Andi', kelas: 'Web', nilai: 75 },
  { id: 5, nama: 'Dina', kelas: 'Data', nilai: 95 },
  { id: 6, nama: 'Eko', kelas: 'Web', nilai: 60 },
  { id: 7, nama: 'Fani', kelas: 'Data', nilai: 88 },
  { id: 8, nama: 'Gita', kelas: 'Web', nilai: 78 },
  { id: 9, nama: 'Hadi', kelas: 'Data', nilai: 55 },
  { id: 10, nama: 'Intan', kelas: 'Web', nilai: 85 },
  { id: 11, nama: 'Joko', kelas: 'Data', nilai: 72 }
];

function daftarPesertaLulus(peserta) {
  return peserta
    .filter((p) => p.nilai >= 70)
    .map((p) => p.nama);
}

function rataRataPerKelas(peserta) {
  const hasil = {};

  for (const p of peserta) {
    if (!hasil[p.kelas]) {
      hasil[p.kelas] = { total: 0, jumlah: 0 };
    }

    hasil[p.kelas].total += p.nilai;
    hasil[p.kelas].jumlah++;
  }

  for (const kelas in hasil) {
    hasil[kelas] =
      hasil[kelas].total / hasil[kelas].jumlah;
  }

  return hasil;
}

function pesertaTertinggi(peserta) {
  return peserta.reduce((tertinggi, p) =>
    p.nilai > tertinggi.nilai ? p : tertinggi
  );
}

function cariPeserta(peserta, kataKunci) {
  return peserta.filter((p) =>
    p.nama.toLowerCase().includes(kataKunci.toLowerCase())
  );
}

function daftarPeringkat(peserta) {
  return [...peserta]
    .sort((a, b) => b.nilai - a.nilai)
    .map((p, index) => ({
      peringkat: index + 1,
      nama: p.nama,
      nilai: p.nilai
    }));
}
function hapusDuplikatEmail(email) {
  return [...new Set(email)];
}

const email = [
  'sari@gmail.com',
  'budi@gmail.com',
  'sari@gmail.com',
  'citra@gmail.com',
  'budi@gmail.com',
  'dina@gmail.com'
];
// const namaWeb = peserta.filter((p) => p.kelas === 'Web').map((p) => p.nama);
// const rata = peserta.reduce((j, p) => j + p.nilai, 0) / peserta.length;
// const budi = peserta.find((p) => p.nama === 'Budi');
// const urutNilai = [...peserta].sort((a, b) => b.nilai - a.nilai);

// // Menghitung jumlah per kelas
// const perKelas = {};
// for (const p of peserta) {
//   perKelas[p.kelas] = (perKelas[p.kelas] || 0) + 1;
// }

console.log('1. Peserta yang lulus:');
console.log(daftarPesertaLulus(peserta));

console.log('\n2. Rata-rata nilai per kelas:');
console.log(rataRataPerKelas(peserta));

console.log('\n3. Peserta dengan nilai tertinggi:');
console.log(pesertaTertinggi(peserta));

console.log('\n4. Pencarian nama yang mengandung "an":');
console.log(cariPeserta(peserta, 'an'));

console.log('\n5. Daftar peringkat:');
console.table(daftarPeringkat(peserta));

console.log('\n6. Email setelah duplikat dihapus:');
console.log(hapusDuplikatEmail(email));