USE db_pelatihan;

-- 1. Semua pendaftar diurutkan nama A-Z
SELECT id, nama, email, no_hp FROM pendaftar ORDER BY nama ASC;

-- 2. Lima pendaftar terbaru
SELECT id, nama, email, tgl_daftar FROM pendaftar ORDER BY tgl_daftar DESC LIMIT 5;

-- 3. Nama mengandung 'an'
SELECT id, nama, email FROM pendaftar WHERE nama LIKE '%an%';

-- 4. Nama pendaftar beserta nama kelas
SELECT p.nama, k.nama_kelas
FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id;

-- 5. Jumlah pendaftar per kelas
SELECT k.nama_kelas, COUNT(p.id) AS jumlah
FROM kelas k LEFT JOIN pendaftar p ON p.kelas_id = k.id
GROUP BY k.id, k.nama_kelas;

-- 6. Kelas yang belum memiliki pendaftar
SELECT k.id, k.nama_kelas
FROM kelas k LEFT JOIN pendaftar p ON p.kelas_id = k.id
WHERE p.id IS NULL;

-- 7. Ubah nomor HP satu pendaftar (ganti ID sesuai data latihan)
-- UPDATE pendaftar SET no_hp = '081111111111' WHERE id = 1;

-- 8. Hapus satu pendaftar (aktifkan hanya pada salinan data latihan)
-- DELETE FROM pendaftar WHERE id = 1;

-- 9. Uji email ganda (sengaja akan ditolak UNIQUE)
-- INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
-- VALUES ('Sari Duplikat', 'sari.ananda@contoh.com', '081234567898', 'Surakarta', 1);

-- 10. Uji penghapusan kelas yang masih memiliki pendaftar (sengaja ditolak FK)
-- DELETE FROM kelas WHERE id = 1;
