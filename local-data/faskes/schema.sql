-- ===============================================
-- Skema Database: Analisis Lokasi Rumah Sakit
-- Berdasarkan Laporan Fasilitas Kesehatan Indonesia
-- ===============================================

-- 1. Tabel Provinsi
CREATE TABLE provinsi (
  id_provinsi     SERIAL PRIMARY KEY,
  nama            VARCHAR(100) NOT NULL UNIQUE,
  jumlah_penduduk_2021 BIGINT,
  jumlah_penduduk_2022 BIGINT
);

-- 2. Tabel Kapasitas Rumah Sakit per Provinsi
CREATE TABLE kapasitas_rumah_sakit (
  id_kapasitas    SERIAL PRIMARY KEY,
  id_provinsi     INTEGER NOT NULL REFERENCES provinsi(id_provinsi),
  tahun           SMALLINT NOT NULL,
  jumlah_rs       INTEGER NOT NULL,
  jumlah_tt       INTEGER NOT NULL,
  tt_per_1000     NUMERIC(5,2) NOT NULL,
  UNIQUE(id_provinsi, tahun)
);

-- 3. Tabel Kepemilikan Rumah Sakit per Provinsi
CREATE TABLE kepemilikan_rumah_sakit (
  id_kepemilikan  SERIAL PRIMARY KEY,
  id_provinsi     INTEGER NOT NULL REFERENCES provinsi(id_provinsi),
  tahun           SMALLINT NOT NULL DEFAULT 2022,
  kemenkes        INTEGER NOT NULL,
  pemprov         INTEGER NOT NULL,
  pemkab          INTEGER NOT NULL,
  tni_polri       INTEGER NOT NULL,
  bumn            INTEGER NOT NULL,
  lain_pemerintah INTEGER NOT NULL,
  swasta          INTEGER NOT NULL,
  total           INTEGER NOT NULL,
  UNIQUE(id_provinsi, tahun)
);

-- 4. Tabel Akreditasi Rumah Sakit per Provinsi
CREATE TABLE akreditasi_rumah_sakit (
  id_akreditasi         SERIAL PRIMARY KEY,
  id_provinsi           INTEGER NOT NULL REFERENCES provinsi(id_provinsi),
  tahun                 SMALLINT NOT NULL DEFAULT 2022,
  total_rs              INTEGER NOT NULL,
  rs_pem_akreditasi     INTEGER NOT NULL,
  rs_swa_akreditasi     INTEGER NOT NULL,
  total_akreditasi      INTEGER NOT NULL,
  persentase_akreditasi NUMERIC(5,2) NOT NULL,
  UNIQUE(id_provinsi, tahun)
);

-- 5. Tabel Ketersediaan Spesialis di RS Kelas C
CREATE TABLE spesialis_rumah_sakit (
  id_spesialis            SERIAL PRIMARY KEY,
  id_provinsi             INTEGER NOT NULL REFERENCES provinsi(id_provinsi),
  tahun                   SMALLINT NOT NULL DEFAULT 2022,
  jumlah_rs_kelas_c       INTEGER NOT NULL,
  rs_dengan_spesialis     INTEGER NOT NULL,
  persen_dengan_spesialis NUMERIC(5,2) NOT NULL,
  UNIQUE(id_provinsi, tahun)
);
