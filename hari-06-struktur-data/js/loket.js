/**
 * loket.js - Logika Antrean Loket (Fitur B), terpisah dari UI agar bisa diuji di Node.
 * Fitur: nomor di-reset tiap hari, riwayat 5 nomor terakhir yang dipanggil, Reset.
 */
import { Queue } from './structures.js';

export const MAKS_RIWAYAT = 5;

/** Mengubah angka menjadi nomor antrean, mis. 7 -> 'A007'. */
export function formatNomor(angka) {
  return 'A' + String(angka).padStart(3, '0');
}

/** Tanggal lokal 'YYYY-MM-DD' (dipakai untuk mendeteksi pergantian hari). */
export function tanggalHariIni(sekarang = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${sekarang.getFullYear()}-${p(sekarang.getMonth() + 1)}-${p(sekarang.getDate())}`;
}

export class Loket {
  /** @param {() => string} ambilTanggal Fungsi tanggal (bisa diganti saat pengujian). */
  constructor(ambilTanggal = tanggalHariIni) {
    this.ambilTanggal = ambilTanggal;
    this.reset();
  }

  /** Mengosongkan antrean, nomor kembali ke 0, riwayat dan "sedang dipanggil" dihapus. */
  reset() {
    this.antrian = new Queue();
    this.nomorTerakhir = 0;
    this.sedangDipanggil = null;
    this.riwayat = []; // terbaru di indeks 0
    this.tanggal = this.ambilTanggal();
  }

  /** Reset otomatis bila hari sudah berganti. @returns {boolean} true bila terjadi reset. */
  periksaGantiHari() {
    if (this.ambilTanggal() !== this.tanggal) {
      this.reset();
      return true;
    }
    return false;
  }

  /** Mengambil nomor baru; @returns {string} nomor yang diberikan. */
  ambilNomor() {
    this.periksaGantiHari();
    this.nomorTerakhir++;
    const nomor = formatNomor(this.nomorTerakhir);
    this.antrian.enqueue(nomor);
    return nomor;
  }

  /** Memanggil nomor terdepan. @returns {string|null} nomor, atau null bila antrean kosong. */
  panggilBerikutnya() {
    this.periksaGantiHari();
    if (this.antrian.isEmpty()) return null;
    const nomor = this.antrian.dequeue();
    this.sedangDipanggil = nomor;
    this.riwayat.unshift(nomor);
    if (this.riwayat.length > MAKS_RIWAYAT) this.riwayat.pop();
    return nomor;
  }

  /** @returns {string[]} Daftar nomor yang menunggu (depan -> belakang). */
  menunggu() {
    return this.antrian.toArray();
  }

  /** Data sederhana untuk disimpan (localStorage). */
  ekspor() {
    return {
      tanggal: this.tanggal,
      nomorTerakhir: this.nomorTerakhir,
      sedangDipanggil: this.sedangDipanggil,
      riwayat: [...this.riwayat],
      menunggu: this.menunggu(),
    };
  }

  /** Memulihkan data hasil ekspor; data hari lain diabaikan (otomatis reset harian). */
  impor(data) {
    this.reset();
    if (!data || data.tanggal !== this.tanggal) return;
    this.nomorTerakhir = Number(data.nomorTerakhir) || 0;
    this.sedangDipanggil = data.sedangDipanggil ?? null;
    this.riwayat = Array.isArray(data.riwayat) ? data.riwayat.slice(0, MAKS_RIWAYAT) : [];
    for (const nomor of data.menunggu || []) this.antrian.enqueue(nomor);
  }
}
