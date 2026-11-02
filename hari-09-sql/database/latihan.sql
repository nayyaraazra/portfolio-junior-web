
-- 1. Tampilkan semua pendaftar, nama A-Z
SELECT id, nama, email
FROM pendaftar
ORDER BY nama ASC;

-- 2. Tampilkan 5 pendaftar terbaru
SELECT id, nama, email, tgl_daftar
FROM pendaftar
ORDER BY tgl_daftar DESC, id DESC
LIMIT 5;

-- 3. Cari pendaftar dengan nama mengandung "an"
SELECT id, nama, email
FROM pendaftar
WHERE nama LIKE '%an%'
ORDER BY nama ASC;

-- 4. Nama pendaftar beserta nama kelas (JOIN)
SELECT p.nama, p.email, k.nama_kelas
FROM pendaftar AS p
JOIN kelas AS k ON k.id = p.kelas_id
ORDER BY p.nama ASC;

-- 5. Hitung jumlah pendaftar per kelas
SELECT k.nama_kelas, COUNT(p.id) AS jumlah
FROM kelas AS k
LEFT JOIN pendaftar AS p ON p.kelas_id = k.id
GROUP BY k.id, k.nama_kelas;

-- 6. Tampilkan kelas yang belum memiliki pendaftar
SELECT k.id, k.nama_kelas
FROM kelas AS k
LEFT JOIN pendaftar AS p ON p.kelas_id = k.id
WHERE p.id IS NULL;

-- 7. Ubah nomor HP satu pendaftar
-- Ganti ID 1 jika diperlukan.
UPDATE pendaftar
SET no_hp = '081111111111'
WHERE id = 1;

-- 8. Hapus satu pendaftar
-- Jalankan pada data latihan yang boleh dihapus.
DELETE FROM pendaftar
WHERE id = 8;

-- 9. Coba masukkan email yang sudah ada
-- Sengaja akan gagal jika email tersebut sudah digunakan.
INSERT INTO pendaftar
    (nama, email, no_hp, alamat, kelas_id)
VALUES
    ('Uji Duplikat', 'sari.ananda@example.com',
     '081234567899', 'Semarang', 1);

-- 10. Coba hapus kelas yang masih memiliki pendaftar
-- Sengaja akan gagal jika kelas tersebut masih direferensikan.
DELETE FROM kelas
WHERE id = 1;
