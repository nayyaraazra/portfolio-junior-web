
export function hitungRataRata(daftar) {
  if (daftar.length === 0) return 0;

  return daftar.reduce((jumlah, nilai) => jumlah + nilai, 0)
    / daftar.length;
}

export function cariTertinggi(daftar) {
  return daftar.length === 0 ? null : Math.max(...daftar);
}

export function cariTerendah(daftar) {
  return daftar.length === 0 ? null : Math.min(...daftar);
}
