/**
 * structures.js - Stack, LinkedList, dan LinkedQueue untuk Proyek 3.
 * Murni struktur data (tanpa DOM); detail internal memakai private field (#)
 * sehingga tidak dapat diubah dari luar kelas.
 */

/** Error untuk input yang tidak valid. */
export class ValidasiError extends Error {
  constructor(pesan, kolom) {
    super(pesan);
    this.name = 'ValidasiError';
    this.kolom = kolom;
  }
}

/** Stack (LIFO) berbasis array; ujung akhir array adalah puncak. */
export class Stack {
  #items = [];
  #batas;

  /**
   * @param {number} [batas=Infinity] Ukuran maksimal; elemen tertua dibuang bila terlampaui.
   * @throws {ValidasiError} bila batas bukan bilangan lebih dari 0.
   */
  constructor(batas = Infinity) {
    if (!(batas > 0)) {
      throw new ValidasiError('Batas stack harus lebih dari 0', 'batas');
    }
    this.#batas = batas;
  }

  /** Menaruh item di puncak. O(1). */
  push(item) {
    this.#items.push(item);
    if (this.#items.length > this.#batas) this.#items.shift();
  }

  /** @returns {*} Item puncak yang dihapus, atau undefined bila kosong. O(1). */
  pop() {
    return this.#items.pop();
  }

  /** @returns {*} Item puncak tanpa menghapus, atau undefined bila kosong. O(1). */
  peek() {
    return this.#items[this.#items.length - 1];
  }

  /** @returns {boolean} true bila tidak ada elemen. */
  isEmpty() {
    return this.#items.length === 0;
  }

  /** @returns {number} Jumlah elemen. */
  size() {
    return this.#items.length;
  }

  /** Mengosongkan stack. */
  clear() {
    this.#items = [];
  }

  /** @returns {Array} Salinan isi dari dasar ke puncak. */
  toArray() {
    return [...this.#items];
  }
}

/** Node untuk linked list (hanya dipakai di dalam modul ini). */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/** Singly linked list dengan penunjuk head dan tail. */
export class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  /** Menambah data di awal. O(1). */
  addFirst(data) {
    const node = new Node(data);
    node.next = this.#head;
    this.#head = node;
    if (this.#tail === null) this.#tail = node;
    this.#size++;
  }

  /** Menambah data di akhir. O(1). */
  addLast(data) {
    const node = new Node(data);
    if (this.#tail === null) {
      this.#head = node;
    } else {
      this.#tail.next = node;
    }
    this.#tail = node;
    this.#size++;
  }

  /** @returns {*} Data awal yang dihapus, atau undefined bila kosong. O(1). */
  removeFirst() {
    if (this.#head === null) return undefined;
    const data = this.#head.data;
    this.#head = this.#head.next;
    if (this.#head === null) this.#tail = null;
    this.#size--;
    return data;
  }

  /**
   * Menghapus node pertama yang bernilai data (kepala, tengah, ekor). O(n).
   * @returns {boolean} true bila ada node yang dihapus.
   */
  remove(data) {
    if (this.#head === null) return false;
    if (this.#head.data === data) {
      this.removeFirst();
      return true;
    }
    const sebelum = this.#cariSebelum(data);
    if (sebelum === null) return false;
    const target = sebelum.next;
    sebelum.next = target.next;
    if (target === this.#tail) this.#tail = sebelum;
    this.#size--;
    return true;
  }

  /** @returns {Node|null} Node tepat sebelum node bernilai data, atau null. */
  #cariSebelum(data) {
    let saatIni = this.#head;
    while (saatIni.next !== null) {
      if (saatIni.next.data === data) return saatIni;
      saatIni = saatIni.next;
    }
    return null;
  }

  /** @returns {*} Data awal tanpa menghapus, atau undefined bila kosong. */
  peekFirst() {
    return this.#head === null ? undefined : this.#head.data;
  }

  /**
   * @param {function(*): boolean} predikat
   * @returns {*} Data pertama yang cocok, atau undefined. O(n).
   */
  find(predikat) {
    let saatIni = this.#head;
    while (saatIni !== null) {
      if (predikat(saatIni.data)) return saatIni.data;
      saatIni = saatIni.next;
    }
    return undefined;
  }

  /** @returns {number} Jumlah node. */
  size() {
    return this.#size;
  }

  /** @returns {boolean} true bila tidak ada node. */
  isEmpty() {
    return this.#size === 0;
  }

  /** @returns {Array} Semua data dari kepala ke ekor. */
  toArray() {
    const hasil = [];
    let saatIni = this.#head;
    while (saatIni !== null) {
      hasil.push(saatIni.data);
      saatIni = saatIni.next;
    }
    return hasil;
  }
}

/** Queue berbasis linked list: semua operasi O(1) dan detail internal tersembunyi. */
export class LinkedQueue {
  #daftar = new LinkedList();

  /** Menambah item di belakang. O(1). */
  enqueue(item) {
    this.#daftar.addLast(item);
  }

  /** @returns {*} Item terdepan yang dihapus, atau undefined bila kosong. O(1). */
  dequeue() {
    return this.#daftar.removeFirst();
  }

  /** @returns {*} Item terdepan tanpa menghapus, atau undefined bila kosong. */
  front() {
    return this.#daftar.peekFirst();
  }

  /** @returns {boolean} true bila tidak ada elemen. */
  isEmpty() {
    return this.#daftar.isEmpty();
  }

  /** @returns {number} Jumlah elemen. */
  size() {
    return this.#daftar.size();
  }

  /** @returns {Array} Isi antrean dari depan ke belakang. */
  toArray() {
    return this.#daftar.toArray();
  }
}
