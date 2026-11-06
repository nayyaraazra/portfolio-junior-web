/**
 * Menjumlahkan a, b, dan elemen pertama dari c.
 *
 * @param {number} a - Angka pertama.
 * @param {number} b - Angka kedua.
 * @param {number[]} c - Array angka; hanya elemen pertama (indeks 0) yang dipakai.
 * @returns {number} Hasil dari a + b + c[0].
 * @example
 * call(1, 2, [3, 4]); // 6
 */
function call(a, b, c) {
  return a + b + c[0];
}

/**
 * Menjumlahkan dua angka.
 *
 * @param {number} num1 - Angka pertama.
 * @param {number} num2 - Angka kedua.
 * @returns {number} Total dari kedua angka.
 *
 * @example
 * addTwoNumbers(2, 3); // 5
 */
var addTwoNumbers = function (num1, num2) {
  return num1 + num2;
};