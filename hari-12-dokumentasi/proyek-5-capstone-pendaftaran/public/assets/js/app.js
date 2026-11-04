/**
 * Modul      : app.js (public/assets/js/app.js)
 * ID Modul   : MOD-JS-001
 * Deskripsi  : Interaksi sisi browser: notifikasi flash, konfirmasi hapus, dan DataTables.
 * Dependensi : SweetAlert2 (Swal), jQuery, DataTables (dimuat di templates/footer.php)
 *
 * @module app
 * @author Nayyara Aqila
 * @version 1.0.1
 * @since 1.0.0
 */

/**
 * Menampilkan pesan flash dari server sebagai toast bila elemen #flash ada.
 * Pesan dibaca dari atribut data-pesan (sudah di-escape oleh PHP).
 *
 * @returns {void}
 */
function tampilkanFlash() {
  const flash = document.getElementById('flash');
  if (!flash) return;

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: flash.dataset.pesan,
    showConfirmButton: false,
    timer: 3000
  });
}

/**
 * Memasang dialog konfirmasi pada setiap form berkelas .form-hapus.
 * Form hanya dikirim bila admin menekan "Ya, hapus"; nama data dibaca dari data-nama.
 *
 * @returns {void}
 * @example
 * // <form class="form-hapus" data-nama="Sari" method="post" action="hapus.php">...</form>
 * pasangKonfirmasiHapus();
 */
function pasangKonfirmasiHapus() {
  document.querySelectorAll('.form-hapus').forEach((form) => {
    form.addEventListener('submit', (event) => {
      // Tahan pengiriman bawaan agar admin sempat membatalkan penghapusan permanen.
      event.preventDefault();
      Swal.fire({
        title: 'Hapus data?',
        text: `Data ${form.dataset.nama} akan dihapus permanen.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus',
        cancelButtonText: 'Batal'
      }).then((hasil) => {
        if (hasil.isConfirmed) form.submit();
      });
    });
  });
}

/**
 * Mengaktifkan DataTables pada tabel #tabelPendaftar (pencarian, urutan, paginasi).
 * Kolom terakhir (Aksi) tidak dapat diurutkan. Dilewati bila tabel atau jQuery tidak ada.
 *
 * @returns {void}
 */
function aktifkanDataTables() {
  const tabel = document.getElementById('tabelPendaftar');
  if (!tabel || !window.jQuery) return;

  window.jQuery(tabel).DataTable({
    pageLength: 10,
    language: { url: 'https://cdn.datatables.net/plug-ins/1.13.8/i18n/id.json' },
    columnDefs: [{ orderable: false, targets: -1 }]
  });
}

document.addEventListener('DOMContentLoaded', () => {
  tampilkanFlash();
  pasangKonfirmasiHapus();
  aktifkanDataTables();
});
