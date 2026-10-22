let nilai1 = 10;
let nilai2 = 5;
let pilih = "/";

let hasil;

switch (pilih) {
    case "+":
        hasil = nilai1 + nilai2;
        break;
    case "-":
        hasil = nilai1 - nilai2;
        break;
    case "*":
        hasil = nilai1 * nilai2;
        break;
    case "/":
        if (nilai2 === 0) {
            hasil = "Tidak terdefinisi";
        } else {
            hasil = nilai1 / nilai2;
        }
        break;
    default:
        hasil = "Pilihan tidak valid";
}

console.log(hasil);