
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;

/**
 * Menghitung rata-rata dari daftar nilai.
 * @param {number[]} daftar - Daftar nilai siswa.
 * @returns {number} Rata-rata nilai atau 0 jika daftar kosong.
 */
function hitungRataRata(daftar) {
  if (daftar.length === 0) return 0;
  return daftar.reduce((jumlah, n) => jumlah + n, 0) / daftar.length;
}

/**
 * Mencari nilai tertinggi dari daftar nilai.
 * @param {number[]} daftar - Daftar nilai siswa.
 * @returns {number|null} Nilai tertinggi atau null jika daftar kosong.
 */
function cariTertinggi(daftar) {
  return daftar.length === 0 ? null : Math.max(...daftar);
}

/**
 * Mencari nilai terendah dari daftar nilai.
 * @param {number[]} daftar - Daftar nilai siswa.
 * @returns {number|null} Nilai terendah atau null jika daftar kosong.
 */
function cariTerendah(daftar) {
  return daftar.length === 0 ? null : Math.min(...daftar);
}

/**
 * Menentukan grade berdasarkan nilai siswa.
 * @param {number} nilai - Nilai siswa.
 * @returns {string} Grade A, B, C, atau D.
 */
function tentukanGrade(nilai) {
  if (nilai >= 85) return 'A';
  if (nilai >= 70) return 'B';
  if (nilai >= 55) return 'C';
  return 'D';
}

/**
 * Menentukan status kelulusan siswa.
 * @param {number} nilai - Nilai siswa.
 * @returns {string} Status Lulus atau Tidak lulus.
 */
function tentukanStatus(nilai) {
  return nilai >= BATAS_LULUS ? 'Lulus' : 'Tidak lulus';
}

/**
 * Memeriksa apakah nilai berada dalam rentang 0 sampai 100.
 * @param {number} nilai - Nilai yang akan diperiksa.
 * @returns {boolean} True jika nilai valid, false jika tidak.
 */
function nilaiValid(nilai) {
  return Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}

/**
 * Menampilkan menu utama pengolah nilai.
 * @returns {void}
 */
function tampilkanMenu() {
  console.log('\n===== PENGOLAH NILAI =====');
  console.log('1. Input nilai siswa');
  console.log('2. Tampilkan statistik');
  console.log('3. Tampilkan predikat per siswa');
  console.log('4. Keluar');
}

/**
 * Menampilkan laporan nama, nilai, grade, dan status siswa.
 * @param {string} nama - Nama siswa.
 * @param {number} nilai - Nilai siswa.
 * @returns {void}
 */
function tampilkanLaporan(nama, nilai) {
  const grade = tentukanGrade(nilai);
  const status = tentukanStatus(nilai);
  console.log(`Nama: ${nama}, Nilai: ${nilai}, Grade: ${grade}, Status: ${status}`);
}

/**
 * Menjalankan pengujian sederhana untuk fungsi pengolah nilai.
 * @returns {void}
 */
function jalankanPengujian() {
  console.assert(hitungRataRata([80, 90]) === 85, 'rata-rata 80,90 harus 85');
  console.assert(hitungRataRata([]) === 0, 'rata-rata array kosong harus 0');
  console.assert(tentukanGrade(85) === 'A', 'nilai 85 harus A');
  console.assert(tentukanGrade(69) === 'C', 'nilai 69 harus C');
  console.assert(nilaiValid(101) === false, '101 tidak valid');
}

/**
 * Menjalankan aplikasi pengolah nilai melalui menu interaktif.
 * @returns {Promise<void>} Promise yang selesai setelah aplikasi ditutup.
 */
async function main() {
  const rl = readline.createInterface({ input, output });
  const daftarNama = [];
  const daftarNilai = [];
  let jalan = true;

  while (jalan) {
    tampilkanMenu();

    const pilihan = await rl.question('Pilih menu (1-4): ');

    switch (pilihan) {
      case '1': {
        const nama = (await rl.question('Nama siswa: ')).trim();
        const nilai = Number(await rl.question('Nilai (0-100): '));

        if (nama === '' || !nilaiValid(nilai)) {
          console.log('Nama tidak boleh kosong dan nilai harus antara 0-100.');
          break;
        }

        daftarNama.push(nama);
        daftarNilai.push(nilai);
        console.log(`Data siswa ${nama} dengan nilai ${nilai} berhasil ditambahkan.`);
        break;
      }

      case '2': {
        if (daftarNama.length === 0) {
          console.log('Belum ada data siswa.');
          break;
        }

        const rataRata = hitungRataRata(daftarNilai);
        const nilaiTertinggi = cariTertinggi(daftarNilai);
        const nilaiTerendah = cariTerendah(daftarNilai);

        console.log(`Rata-rata nilai: ${rataRata.toFixed(2)}`);
        console.log(`Nilai tertinggi: ${nilaiTertinggi}`);
        console.log(`Nilai terendah: ${nilaiTerendah}`);
        break;
      }

      case '3': {
        if (daftarNama.length === 0) {
          console.log('Belum ada data siswa.');
          break;
        }

        for (let i = 0; i < daftarNama.length; i++) {
          tampilkanLaporan(daftarNama[i], daftarNilai[i]);
        }
        break;
      }

      case '4':
        jalan = false;
        console.log('Terima kasih.');
        break;

      default:
        console.log('Pilihan tidak valid.');
    }
  }

  rl.close();
}

jalankanPengujian();

main();
