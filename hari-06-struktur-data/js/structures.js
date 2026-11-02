/**
 * structures.js - Implementasi struktur data Hari 6: Stack (LIFO) dan Queue (FIFO).
 * Dipakai oleh lab3, lab4, lab5, editor Undo/Redo, dan Antrean Loket.
 * Semua operasi inti berkompleksitas O(1).
 */

/**
 * Stack (tumpukan) - prinsip LIFO: yang terakhir masuk, pertama keluar.
 * Disimpan dalam array; ujung akhir array adalah "puncak" (top).
 */
export class Stack {
  /**
   * @param {number} [batas=Infinity] Ukuran maksimal. Bila terlampaui, elemen
   *   paling bawah (tertua) dibuang. Dipakai untuk membatasi riwayat Undo.
   */
  constructor(batas = Infinity) {
    this.items = [];
    this.batas = batas;
  }

  /** Menaruh item di puncak. O(1) (O(batas) hanya saat membuang elemen tertua). */
  push(item) {
    this.items.push(item);
    if (this.items.length > this.batas) this.items.shift();
  }

  /** Mengambil dan menghapus item puncak. Stack kosong -> undefined (tidak error). O(1). */
  pop() {
    return this.isEmpty() ? undefined : this.items.pop();
  }

  /** Melihat item puncak tanpa menghapus. Stack kosong -> undefined. O(1). */
  peek() {
    return this.isEmpty() ? undefined : this.items[this.items.length - 1];
  }

  /** @returns {boolean} true bila tidak ada elemen. O(1). */
  isEmpty() {
    return this.items.length === 0;
  }

  /** @returns {number} Jumlah elemen. O(1). */
  size() {
    return this.items.length;
  }

  /** Mengosongkan stack. */
  clear() {
    this.items = [];
  }

  /** @returns {Array} Salinan isi stack, dari dasar ke puncak (aman dibaca dari luar kelas). */
  toArray() {
    return [...this.items];
  }
}

/**
 * Queue (antrean) - prinsip FIFO: yang pertama masuk, pertama keluar.
 * Versi efisien: objek + penanda head/tail sehingga semua operasi O(1)
 * (berbeda dengan Array.shift() yang O(n)).
 */
export class Queue {
  constructor() {
    this.items = {};
    this.head = 0; // indeks elemen terdepan
    this.tail = 0; // indeks kosong berikutnya di belakang
  }

  /** Menambah item di belakang antrean. O(1). */
  enqueue(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  /** Mengambil dan menghapus item terdepan. Antrean kosong -> undefined. O(1). */
  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  /** Melihat item terdepan tanpa menghapus. Antrean kosong -> undefined. O(1). */
  front() {
    return this.items[this.head];
  }

  /** @returns {boolean} true bila tidak ada elemen. O(1). */
  isEmpty() {
    return this.tail === this.head;
  }

  /** @returns {number} Jumlah elemen (tail - head). O(1). */
  size() {
    return this.tail - this.head;
  }

  /** Mengosongkan antrean dan mengembalikan penanda ke 0. */
  clear() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  /**
   * @returns {Array} Isi antrean dari depan ke belakang. O(n).
   * Dipakai UI agar tidak membaca properti internal head/tail/items (enkapsulasi).
   */
  toArray() {
    const hasil = [];
    for (let i = this.head; i < this.tail; i++) hasil.push(this.items[i]);
    return hasil;
  }
}
