/**
 * Memvalidasi nama minimal tiga karakter setelah spasi tepi dihapus.
 * @param {string} nilai Nama yang dimasukkan.
 * @returns {string} Pesan error atau string kosong jika valid.
 */
export function validasiNama(nilai) {
  return nilai.trim().length >= 3 ? '' : 'Nama minimal 3 karakter.';
}

/**
 * Memvalidasi format alamat email sederhana.
 * @param {string} nilai Email yang dimasukkan.
 * @returns {string} Pesan error atau string kosong jika valid.
 */
export function validasiEmail(nilai) {
  const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pola.test(nilai.trim()) ? '' : 'Format email tidak valid.';
}

/**
 * Memvalidasi nomor HP Indonesia yang diawali 08 dan berjumlah 10-13 digit.
 * @param {string} nilai Nomor HP yang dimasukkan.
 * @returns {string} Pesan error atau string kosong jika valid.
 */
export function validasiHp(nilai) {
  return /^08[0-9]{8,11}$/.test(nilai.trim())
    ? ''
    : 'Nomor HP harus diawali 08 dan terdiri dari 10-13 digit.';
}

/**
 * Memvalidasi sandi minimal 8 karakter dengan huruf dan angka.
 * @param {string} nilai Kata sandi yang dimasukkan.
 * @returns {string} Pesan error atau string kosong jika valid.
 */
export function validasiSandi(nilai) {
  const kuat = nilai.length >= 8 && /[0-9]/.test(nilai) && /[A-Za-z]/.test(nilai);
  return kuat ? '' : 'Sandi minimal 8 karakter dan harus mengandung huruf serta angka.';
}

/**
 * Memastikan konfirmasi sama dengan kata sandi.
 * @param {string} nilai Konfirmasi kata sandi.
 * @param {string} sandi Kata sandi asli.
 * @returns {string} Pesan error atau string kosong jika cocok.
 */
export function validasiKonfirmasi(nilai, sandi) {
  return nilai === sandi ? '' : 'Konfirmasi kata sandi tidak cocok.';
}
