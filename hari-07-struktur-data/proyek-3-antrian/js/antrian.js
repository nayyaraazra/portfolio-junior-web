/**
 * antrian.js - Logika antrean loket (Fitur A) memakai LinkedQueue.
 * Tidak mengakses DOM sehingga mudah diuji.
 */
import { LinkedQueue } from './structures.js';

export const AWALAN_NOMOR = 'A';
export const LEBAR_NOMOR = 3;
export const MAKS_RIWAYAT_PANGGILAN = 5;
export const PESAN_ANTREAN_KOSONG =
  'Antrean kosong. Tekan "Ambil Nomor" untuk menambah antrean.';

/** Mengubah angka menjadi nomor antrean, mis. 7 -> 'A007'. */
export function formatNomor(angka) {
  return AWALAN_NOMOR + String(angka).padStart(LEBAR_NOMOR, '0');
}

export class AntrianLoket {
  #antrean = new LinkedQueue();
  #nomorTerakhir = 0;
  #sedangDipanggil = null;
  #riwayat = [];

  /** Mengambil nomor baru; @returns {string} nomor yang diberikan. */
  ambilNomor() {
    this.#nomorTerakhir++;
    const nomor = formatNomor(this.#nomorTerakhir);
    this.#antrean.enqueue(nomor);
    return nomor;
  }

  /** Memanggil nomor terdepan (FIFO); @returns {string|null} nomor, atau null bila antrean kosong. */
  panggilBerikutnya() {
    if (this.#antrean.isEmpty()) return null;
    const nomor = this.#antrean.dequeue();
    this.#sedangDipanggil = nomor;
    this.#riwayat.unshift(nomor);
    this.#riwayat.length = Math.min(
      this.#riwayat.length,
      MAKS_RIWAYAT_PANGGILAN,
    );
    return nomor;
  }

  /** Mengosongkan antrean, nomor kembali ke A001, riwayat dihapus. */
  reset() {
    this.#antrean = new LinkedQueue();
    this.#nomorTerakhir = 0;
    this.#sedangDipanggil = null;
    this.#riwayat = [];
  }

  /** @returns {string|null} Nomor yang sedang dipanggil, atau null. */
  sedangDipanggil() {
    return this.#sedangDipanggil;
  }

  /** @returns {number} Jumlah nomor yang menunggu. */
  jumlahMenunggu() {
    return this.#antrean.size();
  }

  /** @returns {string[]} Nomor yang menunggu, dari depan ke belakang. */
  daftarMenunggu() {
    return this.#antrean.toArray();
  }

  /** @returns {string[]} Riwayat panggilan terbaru lebih dulu (maks 5). */
  riwayatPanggilan() {
    return [...this.#riwayat];
  }
}
