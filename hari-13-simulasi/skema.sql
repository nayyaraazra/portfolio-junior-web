CREATE DATABASE IF NOT EXISTS pendaftaran_kursus CHARACTER SET utf8mb4;
USE pendaftaran_kursus;

CREATE TABLE kursus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    kuota INT NOT NULL DEFAULT 30
);

CREATE TABLE peserta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    no_hp VARCHAR(20) NOT NULL,
    kursus_id INT NOT NULL,
    dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kursus_id) REFERENCES kursus(id)
);

INSERT INTO kursus (nama, kuota) VALUES
    ('Dasar HTML & CSS', 30),
    ('PHP Pemula', 30),
    ('JavaScript Dasar', 30);
