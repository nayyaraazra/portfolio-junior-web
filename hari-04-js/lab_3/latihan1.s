// Tugas: 
// 1.	Tabel perkalian 1 sampai 10 (perulangan bersarang). 
let i, j;
for (i = 1; i <= 10; i++) {
    let baris = "";
    for (j = 1; j <= 10; j++) {
        baris += (i * j) + "\t";
    }   
    console.log(baris);
}