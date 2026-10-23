/**
 * Menjumlahkan dua angka.
 * @param {number} a Angka pertama.
 * @param {number} b Angka kedua.
 * @returns {number} Hasil penjumlahan.
 */
export const tambah = (a, b) => a + b;

/**
 * Mengurangi angka kedua dari angka pertama.
 * @param {number} a Angka pertama.
 * @param {number} b Angka kedua.
 * @returns {number} Hasil pengurangan.
 */
export const kurang = (a, b) => a - b;

/**
 * Mengalikan dua angka.
 * @param {number} a Angka pertama.
 * @param {number} b Angka kedua.
 * @returns {number} Hasil perkalian.
 */
export const kali = (a, b) => a * b;

/**
 * Membagi angka pertama dengan angka kedua.
 * @param {number} a Angka pertama.
 * @param {number} b Angka kedua.
 * @returns {number} Hasil pembagian.
 * @throws {Error} Jika angka kedua adalah nol.
 */
export function bagi(a, b) {
  if (b === 0) throw new Error('Tidak bisa dibagi nol');
  return a / b;
}

/**
 * Menjalankan operasi berdasarkan operator.
 * @param {string} operator Operator matematika.
 * @param {number} a Angka pertama.
 * @param {number} b Angka kedua.
 * @returns {number} Hasil operasi.
 */
export function hitung(operator, a, b) {
  switch (operator) {
    case '+': return tambah(a, b);
    case '-': return kurang(a, b);
    case '*': return kali(a, b);
    case '/': return bagi(a, b);
    default: throw new Error('Operator tidak dikenal');
  }
}
