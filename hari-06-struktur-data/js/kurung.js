/**
 * kurung.js - Fungsi berbasis Stack: validasi kurung, balik string, palindrom.
 */
import { Stack } from './structures.js';

/** Memeriksa apakah tanda kurung ( ) [ ] { } dalam teks seimbang. O(n). */
export function kurungSeimbang(teks) {
  const pasangan = { ')': '(', ']': '[', '}': '{' };
  const tumpukan = new Stack();

  for (const karakter of teks) {
    if ('([{'.includes(karakter)) {
      tumpukan.push(karakter);
    } else if (karakter in pasangan) {
      if (tumpukan.isEmpty() || tumpukan.pop() !== pasangan[karakter]) {
        return false;
      }
    }
  }
  return tumpukan.isEmpty();
}

/** Membalik string dengan Stack (masuk berurutan, keluar terbalik). O(n). */
export function balikString(teks) {
  const tumpukan = new Stack();
  for (const karakter of teks) tumpukan.push(karakter);
  let hasil = '';
  while (!tumpukan.isEmpty()) hasil += tumpukan.pop();
  return hasil;
}

/** Palindrom: sama dibaca dari depan/belakang (abaikan huruf besar dan non-alfanumerik). */
export function adalahPalindrom(teks) {
  const bersih = teks.toLowerCase().replace(/[^a-z0-9]/g, '');
  return bersih === balikString(bersih);
}
