
-- ===============================================
-- Schema: SDM
-- Skema database SDM Tenaga Medis berdasarkan laporan PDF
-- ===============================================

-- Buat schema jika belum ada
CREATE SCHEMA IF NOT EXISTS SDM;
SET search_path TO SDM;

-- 1. Tabel Provinsi
CREATE TABLE provinsi (
  id_provinsi SERIAL PRIMARY KEY,
  nama VARCHAR(100) UNIQUE NOT NULL
);

-- 2. Tabel Jenis Fasilitas
CREATE TABLE jenis_fasilitas (
  id_jenis SERIAL PRIMARY KEY,
  nama VARCHAR(50) NOT NULL
);

-- 3. Tabel Jenis Tenaga Kesehatan
CREATE TABLE jenis_tenaga_kesehatan (
  id_tenaga SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  spesialis BOOLEAN DEFAULT FALSE
);

-- 4. Tabel Jumlah SDM Kesehatan
CREATE TABLE jumlah_sdm (
  id SERIAL PRIMARY KEY,
  id_provinsi INTEGER REFERENCES provinsi(id_provinsi),
  id_jenis INTEGER REFERENCES jenis_fasilitas(id_jenis),
  id_tenaga INTEGER REFERENCES jenis_tenaga_kesehatan(id_tenaga),
  tahun SMALLINT NOT NULL,
  jumlah INTEGER NOT NULL
);

-- 5. Tabel Persentase Kecukupan SDM Puskesmas
CREATE TABLE kecukupan_sdm_puskesmas (
  id SERIAL PRIMARY KEY,
  id_provinsi INTEGER REFERENCES provinsi(id_provinsi),
  id_tenaga INTEGER REFERENCES jenis_tenaga_kesehatan(id_tenaga),
  tahun SMALLINT NOT NULL,
  persentase NUMERIC(5,2)
);

-- 6. Tabel Status Kecukupan Spesialis di RS
CREATE TABLE status_kecukupan_spesialis_rs (
  id SERIAL PRIMARY KEY,
  id_provinsi INTEGER REFERENCES provinsi(id_provinsi),
  kategori VARCHAR(50),
  cukup NUMERIC(5,2),
  kurang NUMERIC(5,2),
  lebih NUMERIC(5,2),
  tahun SMALLINT NOT NULL DEFAULT 2022
);

-- 7. Tabel Penugasan Residen
CREATE TABLE penugasan_residen (
  id SERIAL PRIMARY KEY,
  id_provinsi INTEGER REFERENCES provinsi(id_provinsi),
  tahun SMALLINT NOT NULL,
  jumlah_residen INTEGER,
  jumlah_kabupaten INTEGER,
  jumlah_puskesmas INTEGER
);
