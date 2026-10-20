## 🗂️ Struktur Folder Proyek

Sesuai konvensi penulisan HTML Hari 2, struktur folder proyek diatur sebagai berikut:

```text
proyek-1-landing-page/
├── index.html
├── tentang.html
├── kontak.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── img/
│   └── foto.jpg
└── README.md
```

---

## Perbaikan Error dan Warning

| No | Masalah | Penyebab | Perbaikan |
|----|----------|-----------|-----------|
| 1 | Warning: atribut `lang` belum ada | Tag `<html>` tidak mendeklarasikan bahasa dokumen | Menambahkan `lang="id"` pada tag `<html>` |
| 2 | Error: character encoding tidak dideklarasikan | Tidak ada tag charset pada bagian `<head>` | Menambahkan `<meta charset="UTF-8">` |
| 3 | Warning: penggunaan `border="1"` | Atribut `border` pada `<table>` sudah usang (obsolete) di HTML5 | Menggunakan CSS sederhana untuk membuat border tabel |
| 4 | Warning: jumlah kolom footer tidak sesuai | Footer hanya menghasilkan 3 kolom, sedangkan tabel memiliki 4 kolom | Mengubah `colspan="2"` menjadi `colspan="3"` |
| 5 | Struktur tabel tidak valid | Terdapat tag `<br>` di dalam elemen tabel | Menghapus tag `<br>` dari dalam tabel |

