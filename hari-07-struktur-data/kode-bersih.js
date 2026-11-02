// Versi bersih dari kode-buruk.js 
const PAJAK = 0.11;
const BATAS_GRADE = { A: 85, B: 70, C: 55 };
const RATA_RATA_BAGUS = 80;

/**
 * Menghitung rata-rata nilai.
 * @param {number[]} daftarNilai
 * @returns {number} rata-rata, atau 0 bila daftar kosong.
 */
function hitungRataRata(daftarNilai) {
  if (daftarNilai.length === 0) return 0;
  const jumlah = daftarNilai.reduce((total, nilai) => total + nilai, 0);
  return jumlah / daftarNilai.length;
}
/**
 * Menentukan grade huruf dari nilai.
 * @param {number} nilai
 * @returns {'A'|'B'|'C'|'D'}
 */
function tentukanGrade(nilai) {
  if (nilai >= BATAS_GRADE.A) return 'A';
  if (nilai >= BATAS_GRADE.B) return 'B';
  if (nilai >= BATAS_GRADE.C) return 'C';
  return 'D';
}
/**
 * Menghitung harga setelah pajak.
 * @param {number} harga
 * @returns {number}
 */
function hitungHargaDenganPajak(harga) {
  return harga * (1 + PAJAK);
}

const daftarNilai = [80, 65, 90];
const rataRata = hitungRataRata(daftarNilai);

if (rataRata === RATA_RATA_BAGUS) {
  console.log('bagus');
}
console.log(tentukanGrade(rataRata));
console.log(hitungHargaDenganPajak(100000));
