/**
 * structures.js - Struktur data Hari 6-7: Stack, Queue, LinkedList, LinkedQueue,
 * dan BinarySearchTree. Murni struktur data (tanpa DOM); detail internal memakai
 * private field (#) sehingga tidak dapat diubah dari luar kelas.
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

/** Queue (FIFO) berbasis objek dengan penanda head/tail; semua operasi O(1). */
export class Queue {
  #items = {};
  #head = 0;
  #tail = 0;

  /** Menambah item di belakang. O(1). */
  enqueue(item) {
    this.#items[this.#tail] = item;
    this.#tail++;
  }

  /** @returns {*} Item terdepan yang dihapus, atau undefined bila kosong. O(1). */
  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.#items[this.#head];
    delete this.#items[this.#head];
    this.#head++;
    return item;
  }

  /** @returns {*} Item terdepan tanpa menghapus, atau undefined bila kosong. */
  front() {
    return this.#items[this.#head];
  }

  /** @returns {boolean} true bila tidak ada elemen. */
  isEmpty() {
    return this.#tail === this.#head;
  }

  /** @returns {number} Jumlah elemen. */
  size() {
    return this.#tail - this.#head;
  }

  /** @returns {Array} Isi antrean dari depan ke belakang. */
  toArray() {
    const hasil = [];
    for (let i = this.#head; i < this.#tail; i++) hasil.push(this.#items[i]);
    return hasil;
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

/** Node untuk pohon pencarian biner (hanya dipakai di dalam modul ini). */
class BstNode {
  constructor(nilai) {
    this.nilai = nilai;
    this.kiri = null;
    this.kanan = null;
  }
}

/** Binary Search Tree: anak kiri lebih kecil, anak kanan lebih besar atau sama. */
export class BinarySearchTree {
  #akar = null;

  /** Menyisipkan nilai. O(log n) pada pohon seimbang, O(n) pada pohon miring. */
  insert(nilai) {
    const baru = new BstNode(nilai);
    if (this.#akar === null) {
      this.#akar = baru;
      return;
    }
    let induk = this.#akar;
    let arah = nilai < induk.nilai ? 'kiri' : 'kanan';
    while (induk[arah] !== null) {
      induk = induk[arah];
      arah = nilai < induk.nilai ? 'kiri' : 'kanan';
    }
    induk[arah] = baru;
  }

  /** @returns {boolean} true bila nilai ada di pohon. */
  has(nilai) {
    let saatIni = this.#akar;
    while (saatIni !== null) {
      if (nilai === saatIni.nilai) return true;
      saatIni = nilai < saatIni.nilai ? saatIni.kiri : saatIni.kanan;
    }
    return false;
  }

  /** @returns {Array} Semua nilai terurut (penelusuran in-order, rekursif). */
  inOrder() {
    const hasil = [];
    const telusuri = (node) => {
      if (node === null) return;
      telusuri(node.kiri);
      hasil.push(node.nilai);
      telusuri(node.kanan);
    };
    telusuri(this.#akar);
    return hasil;
  }
}
