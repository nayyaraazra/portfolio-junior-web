// unit: J.620100.004.02 

// soal 1
class Sepeda {
    constructor(jariJari) {
        this.jariJari = jariJari;
    }
    diameter() {
        return this.jariJari * 2;
    }
}
const s = new Sepeda(35);
console.log('1. Diameter sepeda (r=35):', s.diameter(), 'cm');

// soal 2
var keranjang = [
    {id: 1, nama: 'Buku', harga: 80000, banyak: 2},
    {id: 2, nama: 'Jeans', harga: 90000, banyak: 1},
];

function totalHarga(keranjang) {
    return keranjang.reduce((total, item) => total + (item.harga * item.banyak), 0);
}
console.log('2. Total keranjang:', totalHarga(keranjang));

// soal 3
var etalase = [
    {id:1, barang:'T-shirt', harga:80000},
    {id:2, barang:'Jeans', harga:90000},
    {id:3, barang:'Tote Bag', harga:20000},
    {id:4, barang:'School Bag', harga:25000},
    {id:5, barang: 'Shoes', harga: 120000}
]

function urutkanHarga(etalase) {
    return etalase.sort((a, b) => a.harga - b.harga);
}
console.log('3. Urut harga:', urutkanHarga(etalase).map(item => `${item.barang}: Rp${item.harga}`).join(', '));

// soal 4
function cariBarang(etalase, namaBarang) {
    return etalase.find(item => item.barang.toLowerCase() === namaBarang.toLowerCase());
}
console.log('4. Cari barang "tote bag":', cariBarang(etalase, 'tote bag'));

// soal 5
function barangTermurah(etalase) {
    if (etalase.length === 0)
        return null;
    return etalase.reduce((min, item) => (item.harga < min.harga ? item:min));
}
console.log('5. Barang termurah:', barangTermurah(etalase));