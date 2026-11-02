/**
 * editor.js - UI Editor Undo/Redo. Logika dua Stack ada di riwayat-editor.js.
 * Tantangan: riwayat maksimal 50 langkah (di RiwayatEditor) dan snapshot disimpan
 * hanya setelah jeda mengetik (debounce), bukan tiap ketukan.
 */
import { RiwayatEditor } from './riwayat-editor.js';

const JEDA_MS = 600;

const editor = document.getElementById('editor');
const tombolUndo = document.getElementById('undo');
const tombolRedo = document.getElementById('redo');
const info = document.getElementById('info');

const riwayat = new RiwayatEditor('');
let timer = null;

function perbaruiTombol() {
  tombolUndo.disabled = !riwayat.bisaUndo();
  tombolRedo.disabled = !riwayat.bisaRedo();
  info.textContent = `Riwayat: ${riwayat.jumlahUndo()} undo, ${riwayat.jumlahRedo()} redo`;
}

/** Menyimpan snapshot sekarang (dipanggil setelah jeda mengetik atau sebelum undo/redo). */
function simpanSnapshot() {
  clearTimeout(timer);
  timer = null;
  riwayat.catat(editor.value);
  perbaruiTombol();
}

editor.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(simpanSnapshot, JEDA_MS);
});

tombolUndo.addEventListener('click', () => {
  simpanSnapshot(); // pastikan ketikan yang belum tersimpan tidak hilang
  const teks = riwayat.undo();
  if (teks === undefined) return;
  editor.value = teks;
  perbaruiTombol();
});

tombolRedo.addEventListener('click', () => {
  simpanSnapshot();
  const teks = riwayat.redo();
  if (teks === undefined) return;
  editor.value = teks;
  perbaruiTombol();
});

perbaruiTombol();
