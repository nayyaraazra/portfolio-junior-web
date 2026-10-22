// 4.	Jumlah digit dari sebuah angka (mis. 4821 menjadi 15) memakai while, %, dan Math.floor. 


// 5.	Tebak angka: komputer memilih angka acak Math.floor(Math.random() * 100) + 1; pengguna menebak hingga benar dengan petunjuk lebih tinggi/rendah (do...while). 
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const angkaRahasia = Math.floor(Math.random() * 100) + 1;

function tebak() {
    rl.question("Tebak angka (1-100): ", (input) => {
        let tebakan = Number(input);

        if (tebakan < angkaRahasia) {
            console.log("Terlalu rendah");
            tebak();
        } else if (tebakan > angkaRahasia) {
            console.log("Terlalu tinggi");
            tebak();
        } else {
            console.log("Benar!");
            rl.close();
        }
    });
}

tebak();