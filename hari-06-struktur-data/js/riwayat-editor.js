/**
 * riwayat-editor.js - Logika Undo/Redo (Fitur A) dengan dua Stack, terpisah dari UI.
 * Riwayat dibatasi (default 50 langkah) agar memori tidak boros.
 */
import { Stack } from './structures.js';

export const MAKS_RIWAYAT_UNDO = 50;

export class RiwayatEditor {
  constructor(teksAwal = '', batas = MAKS_RIWAYAT_UNDO) {
    this.undoStack = new Stack(batas);
    this.redoStack = new Stack(batas);
    this.teksSekarang = teksAwal;
  }

  /** Mencatat snapshot baru. Tidak mencatat bila teks tidak berubah. @returns {boolean} tercatat? */
  catat(teksBaru) {
    if (teksBaru === this.teksSekarang) return false;
    this.undoStack.push(this.teksSekarang);
    this.teksSekarang = teksBaru;
    this.redoStack.clear(); // aksi baru menghapus jalur "redo"
    return true;
  }

  /** @returns {string|undefined} teks setelah undo, atau undefined bila tidak ada riwayat. */
  undo() {
    if (this.undoStack.isEmpty()) return undefined;
    this.redoStack.push(this.teksSekarang);
    this.teksSekarang = this.undoStack.pop();
    return this.teksSekarang;
  }

  /** @returns {string|undefined} teks setelah redo, atau undefined bila tidak ada yang diulang. */
  redo() {
    if (this.redoStack.isEmpty()) return undefined;
    this.undoStack.push(this.teksSekarang);
    this.teksSekarang = this.redoStack.pop();
    return this.teksSekarang;
  }

  bisaUndo() { return !this.undoStack.isEmpty(); }
  bisaRedo() { return !this.redoStack.isEmpty(); }
  jumlahUndo() { return this.undoStack.size(); }
  jumlahRedo() { return this.redoStack.size(); }
}
