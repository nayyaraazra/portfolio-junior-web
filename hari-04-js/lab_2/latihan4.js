// 4. Penentu kategori BMI (berat / (tinggi * tinggi)): kurang (di bawah 18,5), normal (18,5-24,9), lebih (25-29,9), obesitas (30 ke atas).
let berat = 0, tinggi = 0, BMI = 0, status = "";

berat = 70;
tinggi = 176.5;

BMI = berat / (tinggi * tinggi);

if (BMI < 18.5) {
    status = "kurang";
} else if (BMI <= 24.9) {
    status = "normal";
} else if (BMI <= 29.9) {
    status = "lebih";
} else {
    status = "obesitas";
}

console.log("Status BMI: " + status);