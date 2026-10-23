import {
  validasiNama,
  validasiEmail,
  validasiHp,
  validasiSandi,
  validasiKonfirmasi
} from './aturan.js';

const form = document.getElementById('form-daftar');
const tombolKirim = document.getElementById('kirim');
const ringkasan = document.getElementById('ringkasan');
const ringkasanData = document.getElementById('ringkasan-data');

const aturan = {
  nama: (nilai) => validasiNama(nilai),
  email: (nilai) => validasiEmail(nilai),
  hp: (nilai) => validasiHp(nilai),
  sandi: (nilai) => validasiSandi(nilai),
  konfirmasi: (nilai) => validasiKonfirmasi(nilai, form.elements.sandi.value)
};

function tampilkanGalat(nama, pesan) {
  document.getElementById(`galat-${nama}`).textContent = pesan;
  form.elements[nama].setAttribute('aria-invalid', pesan ? 'true' : 'false');
}

function periksaField(nama) {
  const pesan = aturan[nama](form.elements[nama].value);
  tampilkanGalat(nama, pesan);
  return pesan === '';
}

function semuaValid() {
  return Object.keys(aturan).every((nama) =>
    aturan[nama](form.elements[nama].value) === ''
  );
}

function perbaruiTombol() {
  tombolKirim.disabled = !semuaValid();
}

form.addEventListener('input', (event) => {
  const nama = event.target.name;
  if (!(nama in aturan)) return;

  periksaField(nama);

  if (nama === 'sandi' && form.elements.konfirmasi.value !== '') {
    periksaField('konfirmasi');
  }

  perbaruiTombol();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const valid = Object.keys(aturan).map((nama) => periksaField(nama));
  if (!valid.every(Boolean)) {
    perbaruiTombol();
    return;
  }

  ringkasan.hidden = false;
  ringkasanData.textContent =
    `Nama: ${form.elements.nama.value.trim()} | Email: ${form.elements.email.value.trim()} | HP: ${form.elements.hp.value.trim()}`;

  form.reset();
  Object.keys(aturan).forEach((nama) => tampilkanGalat(nama, ''));
  tombolKirim.disabled = true;
});
