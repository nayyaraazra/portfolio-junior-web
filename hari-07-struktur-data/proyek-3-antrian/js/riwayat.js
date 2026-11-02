/**
 * riwayat.js - Logika undo/redo editor catatan (Fitur B) dengan dua Stack.
 * Tidak mengakses DOM sehingga mudah diuji.
 */
import { Stack, ValidasiError } from './structures.js';

export const MAKS_RIWAYAT = 50;

export class RiwayatCatatan {
  #undoStack = new Stack(MAKS_RIWAYAT);
  #redoStack = new Stack(MAKS_RIWAYAT);
  #teksSekarang;

  /** @param {string} [teksAwal=''] */
  constructor(teksAwal = '') {
    RiwayatCatatan.#pastikanTeks(teksAwal);
    this.#teksSekarang = teksAwal;
  }

  static #pastikanTeks(teks) {
    if (typeof teks !== 'string') {
      throw new ValidasiError('Catatan harus berupa teks', 'catatan');
    }
  }

  /**
   * Mencatat teks baru; riwayat redo dihapus.
   * @returns {boolean} false bila teks sama dengan teks sekarang (tidak dicatat).
   * @throws {ValidasiError} bila teks bukan string.
   */
  catat(teksBaru) {
    RiwayatCatatan.#pastikanTeks(teksBaru);
    if (teksBaru === this.#teksSekarang) return false;
    this.#undoStack.push(this.#teksSekarang);
    this.#teksSekarang = teksBaru;
    this.#redoStack.clear();
    return true;
  }

  /** @returns {string|undefined} Teks setelah undo, atau undefined bila tidak ada riwayat. */
  undo() {
    if (this.#undoStack.isEmpty()) return undefined;
    this.#redoStack.push(this.#teksSekarang);
    this.#teksSekarang = this.#undoStack.pop();
    return this.#teksSekarang;
  }

  /** @returns {string|undefined} Teks setelah redo, atau undefined bila tidak ada. */
  redo() {
    if (this.#redoStack.isEmpty()) return undefined;
    this.#undoStack.push(this.#teksSekarang);
    this.#teksSekarang = this.#redoStack.pop();
    return this.#teksSekarang;
  }

  teksSekarang() {
    return this.#teksSekarang;
  }

  bisaUndo() {
    return !this.#undoStack.isEmpty();
  }

  bisaRedo() {
    return !this.#redoStack.isEmpty();
  }

  jumlahUndo() {
    return this.#undoStack.size();
  }

  jumlahRedo() {
    return this.#redoStack.size();
  }
}
