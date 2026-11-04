# Doc Hunt dan Uji Baca Teman

## 1. Doc Hunt (repositori contoh dari instruktur)

Isi dari temuan Anda pada repositori yang dibagikan instruktur. Kategori masalah yang dicari (lihat modul Lab 5):

| No | Masalah dokumentasi | Dampak | Perbaikan | Lokasi di repositori contoh (isi) | Sudah diperbaiki? |
|---|---|---|---|---|---|
| 1 | `@param` tidak sama dengan tanda tangan fungsi | Pemakai salah memanggil | Sinkronkan DocBlock dengan tanda tangan fungsi | | |
| 2 | Tidak ada `@throws` padahal fungsi melempar exception | Exception tak tertangani | Tambahkan `@throws` dan cara menangani | | |
| 3 | Komentar tidak sesuai kode (mis. "ke atas" padahal dibulatkan ke bawah) | Menyesatkan | Perbaiki komentar atau kode | | |
| 4 | `@return` salah tipe | Tipe salah | Perbaiki tipe | | |
| 5 | README memuat langkah/berkas yang sudah tidak ada | Instalasi gagal | Perbarui langkah dan uji dari nol | | |
| 6 | Kata sandi database nyata tertulis di README | Kebocoran data | Hapus, pakai `config.contoh.php`, ganti kredensial | | |

Tambahkan baris bila ada temuan lain.

## 2. Uji Baca Teman (modul `auth`)

- Teman penguji: (isi nama)
- Tanggal: (isi tanggal)
- Teman membaca hanya `docs/` (tanpa melihat kode) lalu mencoba memahami modul `auth`.

| No | Pertanyaan teman yang tidak terjawab oleh dokumen | Perbaikan pada dokumen |
|---|---|---|
| 1 | (isi) | (isi) |
| 2 | (isi) | (isi) |
| 3 | (isi) | (isi) |

## 3. Uji Sinkronisasi (Lab 4 butir 4)

| Langkah | Hasil |
|---|---|
| Ubah satu parameter fungsi tanpa mengubah DocBlock | (isi fungsi yang dicoba) |
| Jalankan phpDocumentor, amati ketidaksesuaian | (isi yang tampak) |
| Perbaiki DocBlock, jalankan ulang | (isi hasil) |
