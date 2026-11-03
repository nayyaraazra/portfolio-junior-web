CREATE DATABASE IF NOT EXISTS db_pelatihan
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_pelatihan;

CREATE TABLE IF NOT EXISTS kelas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kelas VARCHAR(100) NOT NULL,
    kuota INT NOT NULL DEFAULT 30
) ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pendaftar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    no_hp VARCHAR(20) NOT NULL,
    alamat TEXT NULL,
    kelas_id INT NOT NULL,
    tgl_daftar TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pendaftar_kelas FOREIGN KEY (kelas_id) REFERENCES kelas(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_pendaftar_nama ON pendaftar (nama);

INSERT INTO kelas (nama_kelas, kuota)
SELECT 'Web Programming', 30
WHERE NOT EXISTS (SELECT 1 FROM kelas WHERE nama_kelas = 'Web Programming');

INSERT INTO kelas (nama_kelas, kuota)
SELECT 'Desain Grafis', 25
WHERE NOT EXISTS (SELECT 1 FROM kelas WHERE nama_kelas = 'Desain Grafis');

INSERT INTO kelas (nama_kelas, kuota)
SELECT 'Basis Data', 20
WHERE NOT EXISTS (SELECT 1 FROM kelas WHERE nama_kelas = 'Basis Data');

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
SELECT 'Sari Ananda', 'sari.ananda@contoh.com', '081234567890', 'Surakarta', id
FROM kelas WHERE nama_kelas = 'Web Programming'
AND NOT EXISTS (SELECT 1 FROM pendaftar WHERE email = 'sari.ananda@contoh.com');

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
SELECT 'Andi Saputra', 'andi.saputra@contoh.com', '081234567891', 'Semarang', id
FROM kelas WHERE nama_kelas = 'Web Programming'
AND NOT EXISTS (SELECT 1 FROM pendaftar WHERE email = 'andi.saputra@contoh.com');

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
SELECT 'Anisa Putri', 'anisa.putri@contoh.com', '081234567892', 'Yogyakarta', id
FROM kelas WHERE nama_kelas = 'Desain Grafis'
AND NOT EXISTS (SELECT 1 FROM pendaftar WHERE email = 'anisa.putri@contoh.com');

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
SELECT 'Bima Pratama', 'bima.pratama@contoh.com', '081234567893', 'Solo', id
FROM kelas WHERE nama_kelas = 'Basis Data'
AND NOT EXISTS (SELECT 1 FROM pendaftar WHERE email = 'bima.pratama@contoh.com');

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
SELECT 'Citra Lestari', 'citra.lestari@contoh.com', '081234567894', 'Klaten', id
FROM kelas WHERE nama_kelas = 'Web Programming'
AND NOT EXISTS (SELECT 1 FROM pendaftar WHERE email = 'citra.lestari@contoh.com');

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
SELECT 'Dian Anggraini', 'dian.anggraini@contoh.com', '081234567895', 'Salatiga', id
FROM kelas WHERE nama_kelas = 'Desain Grafis'
AND NOT EXISTS (SELECT 1 FROM pendaftar WHERE email = 'dian.anggraini@contoh.com');

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
SELECT 'Fajar Nugraha', 'fajar.nugraha@contoh.com', '081234567896', 'Magelang', id
FROM kelas WHERE nama_kelas = 'Basis Data'
AND NOT EXISTS (SELECT 1 FROM pendaftar WHERE email = 'fajar.nugraha@contoh.com');

INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
SELECT 'Hana Anjani', 'hana.anjani@contoh.com', '081234567897', 'Purwokerto', id
FROM kelas WHERE nama_kelas = 'Web Programming'
AND NOT EXISTS (SELECT 1 FROM pendaftar WHERE email = 'hana.anjani@contoh.com');
