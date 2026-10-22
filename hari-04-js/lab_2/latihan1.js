const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Masukkan nilai: ", (input) => {
    let nilai = parseInt(input);
    let status1, status2;

    if (nilai % 2 === 0) {
        status1 = "genap";
    } else {
        status1 = "ganjil";
    }

    if (nilai > 0) {
        status2 = "positif";
    } else if (nilai < 0) {
        status2 = "negatif";
    } else {
        status2 = "nol";
    }

    console.log(`Bilangan ${status1}`);
    console.log(`Nilai ${status2}`);

    rl.close();
});