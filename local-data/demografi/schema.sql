-- Schema untuk Data Demografi Provinsi
CREATE TABLE Provinces (
    province_id INT PRIMARY KEY,
    province_name VARCHAR(255) NOT NULL,
    area_km2 DECIMAL(10, 2),
    num_regencies INT,
    num_cities INT,
    total_regencies_cities INT,
    num_districts INT,
    num_urban_villages INT,
    num_rural_villages INT,
    population_male INT,
    population_female INT,
    total_population INT,
    sex_ratio DECIMAL(4, 1),
    population_density_per_km2 INT,
    year INT DEFAULT 2022,
    source VARCHAR(255) DEFAULT 'Kementerian Dalam Negeri, 2022 (Keputusan Menteri Dalam Negeri Nomor 050-145 Tahun 2022)'
);

-- Schema untuk Jumlah Penduduk Menurut Kelompok Umur dan Jenis Kelamin (Data Nasional)
CREATE TABLE PopulationByAgeGroup (
    age_group_id INT PRIMARY KEY AUTO_INCREMENT,
    age_group_years VARCHAR(50) NOT NULL,
    male_population INT,
    female_population INT,
    total_population INT,
    sex_ratio DECIMAL(4, 1),
    year INT DEFAULT 2022,
    source VARCHAR(255) DEFAULT 'Jumlah Penduduk Proyeksi Interim 2020-2023, BPS 2023'
);

-- Schema untuk Jumlah Penduduk Menurut Provinsi Tahun 2021-2022
CREATE TABLE ProvincePopulationTrends (
    province_population_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    population_thousand DECIMAL(10, 1),
    source VARCHAR(255) DEFAULT 'Hasil Sensus Penduduk 2020 (September), BPS 2023; Jumlah Penduduk Proyeksi Interim 2020-2023, BPS 2022',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Jumlah Penduduk Kelompok Tertentu Berdasarkan Jenis Kelamin (Data Nasional)
CREATE TABLE SpecificPopulationGroups (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(255) NOT NULL,
    male_count INT,
    female_count INT,
    total_count INT,
    year INT DEFAULT 2022,
    source VARCHAR(255) DEFAULT 'Jumlah Penduduk Proyeksi Interim 2020-2023, BPS 2023'
);

-- Schema untuk Data Kemiskinan (Nasional dan Perkotaan/Perdesaan)
CREATE TABLE PovertyData (
    poverty_id INT PRIMARY KEY AUTO_INCREMENT,
    year_period VARCHAR(50) NOT NULL,
    poor_population_million_urban DECIMAL(4, 1),
    poor_population_million_rural DECIMAL(4, 1),
    poor_population_million_total DECIMAL(4, 1),
    poverty_percentage_urban DECIMAL(5, 2),
    poverty_percentage_rural DECIMAL(5, 2),
    poverty_percentage_total DECIMAL(5, 2),
    poverty_line_rp_capita_month_urban DECIMAL(10, 1),
    poverty_line_rp_capita_month_rural DECIMAL(10, 1),
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023'
);

-- Schema untuk Garis Kemiskinan, Jumlah, dan Persentase Penduduk Miskin Menurut Provinsi dan Tipe Daerah
CREATE TABLE ProvincePovertyDetails (
    province_poverty_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    semester_period VARCHAR(50), -- e.g., 'II (September)'
    poverty_line_urban_rp DECIMAL(10, 2),
    poor_population_urban_thousand DECIMAL(10, 2),
    poverty_percentage_urban DECIMAL(5, 2),
    poverty_line_rural_rp DECIMAL(10, 2),
    poor_population_rural_thousand DECIMAL(10, 2),
    poverty_percentage_rural DECIMAL(5, 2),
    poverty_line_total_rp DECIMAL(10, 2),
    poor_population_total_thousand DECIMAL(10, 2),
    poverty_percentage_total DECIMAL(5, 2),
    year INT DEFAULT 2022,
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Indeks Kedalaman Kemiskinan (P1) dan Indeks Keparahan Kemiskinan (P2) Menurut Provinsi
CREATE TABLE PovertyIndices (
    poverty_index_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    semester_period VARCHAR(50),
    p1_urban DECIMAL(3, 2),
    p1_rural DECIMAL(3, 2),
    p1_total DECIMAL(3, 2),
    p2_urban DECIMAL(3, 2),
    p2_rural DECIMAL(3, 2),
    p2_total DECIMAL(3, 2),
    year INT DEFAULT 2022,
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Indeks Gini Menurut Provinsi
CREATE TABLE GiniIndex (
    gini_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    gini_index_value DECIMAL(3, 2),
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Rata-rata Pengeluaran Per Kapita Sebulan Menurut Kelompok Komoditas
CREATE TABLE AverageExpenditure (
    expenditure_id INT PRIMARY KEY AUTO_INCREMENT,
    commodity_group VARCHAR(255) NOT NULL,
    urban_expenditure INT,
    rural_expenditure INT,
    total_expenditure INT,
    year INT DEFAULT 2022,
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023 (Susenas Maret 2023)'
);

-- Schema untuk Tingkat Pengangguran Terbuka (TPT) Menurut Provinsi
CREATE TABLE OpenUnemploymentRate (
    unemployment_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    february_tpt_percent DECIMAL(4, 2),
    august_tpt_percent DECIMAL(4, 2),
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Rata-rata Lama Sekolah Menurut Provinsi
CREATE TABLE AverageYearsOfSchooling (
    schooling_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    average_years DECIMAL(4, 2),
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Angka Melek Huruf Menurut Provinsi dan Jenis Kelamin
CREATE TABLE LiteracyRate (
    literacy_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    male_percentage DECIMAL(4, 1),
    female_percentage DECIMAL(4, 1),
    total_percentage DECIMAL(4, 1),
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Angka Partisipasi Sekolah (APS) Menurut Provinsi
CREATE TABLE SchoolParticipationRates (
    aps_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    aps_7_12_years DECIMAL(4, 1),
    aps_13_15_years DECIMAL(4, 1),
    aps_16_18_years DECIMAL(4, 1),
    aps_19_24_years DECIMAL(4, 1),
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 21021',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Angka Partisipasi Kasar (APK) Pendidikan Menurut Provinsi dan Jenis Kelamin
CREATE TABLE GrossEnrollmentRates (
    apk_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    sd_sederajat_male DECIMAL(5, 2),
    smp_sederajat_male DECIMAL(5, 2),
    sm_sederajat_male DECIMAL(5, 2),
    pt_19_24_male DECIMAL(5, 2),
    sd_sederajat_female DECIMAL(5, 2),
    smp_sederajat_female DECIMAL(5, 2),
    sm_sederajat_female DECIMAL(5, 2),
    pt_19_24_female DECIMAL(5, 2),
    sd_sederajat_total DECIMAL(5, 2),
    smp_sederajat_total DECIMAL(5, 2),
    sm_sederajat_total DECIMAL(5, 2),
    pt_19_24_total DECIMAL(5, 2),
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Angka Partisipasi Murni (APM) Pendidikan Menurut Provinsi
CREATE TABLE NetEnrollmentRates (
    apm_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    sd_mi_paket_a DECIMAL(5, 2),
    smp_mts_paket_b DECIMAL(5, 2),
    sm_smk_ma_paket_c DECIMAL(5, 2),
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Indeks Pembangunan Manusia (IPM) dan Peringkat Menurut Provinsi
CREATE TABLE HumanDevelopmentIndex (
    hdi_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    ipm DECIMAL(5, 2),
    rank INT,
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);

-- Schema untuk Komponen IPM Menurut Provinsi
CREATE TABLE HDIComponents (
    hdi_component_id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT,
    year INT NOT NULL,
    life_expectancy_at_birth_years DECIMAL(4, 2),
    expected_years_of_schooling DECIMAL(4, 2),
    average_years_of_schooling DECIMAL(4, 2),
    per_capita_expenditure_adjusted_rp_thousands INT,
    source VARCHAR(255) DEFAULT 'Badan Pusat Statistik, 2023',
    FOREIGN KEY (province_id) REFERENCES Provinces(province_id)
);
