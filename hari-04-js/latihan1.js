
//deklarasi variabel
let nama = "Nayyara Aqila";
let umur = 10;
let tinggi_badan =170;
let status_aktif = true;

console.log(`Halo ${nama}, umur saya ${umur} tahun, tinggi badan saya ${tinggi_badan} cm, status aktif: ${status_aktif}`);

//cek tipe data
console.log(typeof ('5' + 3));
console.log(typeof('5' * 3));
console.log(typeof(0.1 + 0.2));
console.log(typeof(Number('abc')));
console.log(typeof(10/3))
console.log(typeof(10%3))
console.log(typeof(2 ** 10))

// luas dan keliling lingkaran
let jari_jari = 7;
let luas = Math.PI * jari_jari ** 2;
console.log(`Luas lingkaran dengan jari-jari ${jari_jari} adalah ${luas}`);
let keliling = 2 * Math.PI * jari_jari;
console.log(`Keliling lingkaran dengan jari-jari ${jari_jari} adalah ${keliling}`);

// jumlah detik dalam 1 hari
let detik_per_hari = 24 * 60 * 60;
console.log(`Jumlah detik dalam 1 hari adalah ${detik_per_hari} detik`);

// jumlah konversi suhu celsius ke fahrenheit
let celsius = 25;
let fahrenheit = (celsius * 9/5) + 32;
console.log(`${celsius} derajat Celsius sama dengan ${fahrenheit} derajat Fahrenheit`);

// // Program A: konversi nilai ke huruf 
// const nilai = Number(prompt('Nilai (0-100):')); 
// let grade; 
// if (nilai >= 85) grade = 'A'; 
// else if (nilai >= 70) grade = 'B'; 
// else if (nilai >= 55) grade = 'C'; 
// else grade = 'D'; 
// console.log(`Grade: ${grade}`); 
 
// // Program B: tahun kabisat 
// const tahun = Number(prompt('Tahun:')); 
// const kabisat = (tahun % 4 === 0 && tahun % 100 !== 0) || tahun % 400 === 0; 
// console.log(kabisat ? 'Kabisat' : 'Bukan kabisat'); 

