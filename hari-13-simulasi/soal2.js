/*
function cariTertinggi(daftar) {
  let tertinggi = 0;
  for (let i = 1; i <= daftar.length; i++) {
    if (daftar[i] > tertinggi) tertinggi = daftar[i];
  }
  return tertinggi
}
console.log(cariTertinggi([-5, -2, -9]));
*/
//perbaikan

function cariTertinggi2(daftar) {
  let tertinggi = daftar[0];
  for (let i = 1; i < daftar.length; i++) {
    if (daftar[i] > tertinggi) tertinggi = daftar[i];
  }
  return tertinggi
}
console.log(cariTertinggi2([-5, -2, -9]));