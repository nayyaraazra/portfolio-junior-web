// 2.	Pola segitiga bintang dan piramida; bentuk persegi angka. 
let n = 5; // jumlah baris
// pola segitiga bintang
console.log("Pola Segitiga Bintang:");      
for (i = 1; i <= n; i++) {
    let baris = "";
    for (j = 1; j <= i; j++) {
        baris += "* ";
    }
    console.log(baris);
}
// pola piramida
console.log("Pola Piramida:");