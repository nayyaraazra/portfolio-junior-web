const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Masukkan durasi parkir dalam jam: ", (input) => {
    let durasiJam = Number(input);

    let sisaJam = durasiJam % 24;
    let totalHari = Math.floor(durasiJam / 24);
    let bayar = 0;

    if (sisaJam > 0) {
        if (sisaJam <= 2) {
            bayar = 3000;
        } else {
            bayar = 3000 + (sisaJam - 2) * 2000;
        }

        if (bayar > 15000) {
            bayar = 15000;
        }
    }

    let totalBayar = totalHari * 15000 + bayar;

    console.log("Total bayar: Rp" + totalBayar);

    rl.close();
});