import tabula.io as tabula
import pandas as pd
import math

PDF_PATH = "faskes/laporan-fasilitas-kesehatan.pdf"
OUTPUT_SQL = "faskes/dump_rumah_sakit.sql"

# Fungsi bantu untuk membersihkan angka (misal: "1.234" → 1234)
def parse_int(x):
    if pd.isna(x):
        return None
    s = str(x).strip().replace(".", "").replace(",", "")
    return int(s) if s.isdigit() else None

# 1) Ekstrak tabel "Lampiran 8.c" (Populasi + Kapasitas RS per Provinsi)
#    Di PDF, tabel ini biasanya di halaman X (sesuaikan bila perlu).
#   Kita akan jalankan tabula.read_pdf dengan area yang kira‐kira sesuai.
#   Hasilnya nanti berisi kolom: Provinsi, Populasi 2021, Populasi 2022,
#   Jumlah RS 2021, Jumlah TT 2021, Jumlah RS 2022, Jumlah TT 2022.

# Jika tabel tersebar di beberapa halaman, panggil tabula.read_pdf berulang kali.
# Di contoh ini, kita anggap tabel Lampiran 8.c ada di halaman 12 dan 13.

tabel_8c_1 = tabula.read_pdf(PDF_PATH, pages=12, multiple_tables=False, lattice=True)[0]
tabel_8c_2 = tabula.read_pdf(PDF_PATH, pages=13, multiple_tables=False, lattice=True)[0]
df_8c = pd.concat([tabel_8c_1, tabel_8c_2], ignore_index=True)

# Bersihkan header dan ubah nama kolom menjadi konsisten:
df_8c.columns = [
    "Provinsi",
    "Populasi 2021",
    "Populasi 2022",
    "Jumlah RS 2021",
    "Jumlah TT 2021",
    "Jumlah RS 2022",
    "Jumlah TT 2022",
]

# Buang baris yang bukan nama provinsi (misal baris kosong atau footer)
df_8c = df_8c[df_8c["Provinsi"].notna() & df_8c["Provinsi"].str.strip().str.len()>0]
df_8c = df_8c[~df_8c["Provinsi"].str.contains("Total|Jumlah", na=False)]

# Terapkan parse_int ke kolom numerik
for col in ["Populasi 2021", "Populasi 2022", "Jumlah RS 2022", "Jumlah TT 2022"]:
    df_8c[col] = df_8c[col].apply(parse_int)

# Hitung tt_per_1000 untuk 2022
df_8c["TT_per_1000_2022"] = df_8c.apply(
    lambda row: round((row["Jumlah TT 2022"] / (row["Populasi 2022"] / 1000)), 2)
    if row["Populasi 2022"] and row["Jumlah TT 2022"] else None,
    axis=1
)

# 2) Ekstrak tabel "Lampiran 8.a" (Kepemilikan RS per Provinsi, tahun 2022)
#    Biasanya di halaman 8 atau 9—sesuaikan kalau letak sebenarnya beda.
tabel_8a_1 = tabula.read_pdf(PDF_PATH, pages=8, multiple_tables=False, lattice=True)[0]
tabel_8a_2 = tabula.read_pdf(PDF_PATH, pages=9, multiple_tables=False, lattice=True)[0]
df_8a = pd.concat([tabel_8a_1, tabel_8a_2], ignore_index=True)

# Contoh kolom: "Provinsi", "Kemenkes", "Provinsi", "Kab/Kota", "TNI/POLRI", "BUMN/Kementerian", "Lain", "Swasta", "Total"
df_8a.columns = [
    "Provinsi",
    "Kemenkes",
    "Pemprov",
    "Pemkab",
    "TNI_POLRI",
    "BUMN",
    "Lain_Pemerintah",
    "Swasta",
    "Total_Kategori"
]
df_8a = df_8a[df_8a["Provinsi"].notna() & ~df_8a["Provinsi"].str.contains("Total|Jumlah", na=False)]
for col in ["Kemenkes","Pemprov","Pemkab","TNI_POLRI","BUMN","Lain_Pemerintah","Swasta","Total_Kategori"]:
    df_8a[col] = df_8a[col].apply(parse_int)

# 3) Ekstrak tabel "Lampiran 8.d" (Akreditasi RS per Provinsi, 2022)
#    Biasanya di halaman 10 atau 11.
tabel_8d_1 = tabula.read_pdf(PDF_PATH, pages=10, multiple_tables=False, lattice=True)[0]
tabel_8d_2 = tabula.read_pdf(PDF_PATH, pages=11, multiple_tables=False, lattice=True)[0]
df_8d = pd.concat([tabel_8d_1, tabel_8d_2], ignore_index=True)

# Kolom contoh: "Provinsi", "Jumlah RS", "Pemerintah Terakreditasi", "Swasta Terakreditasi", "% Terakreditasi"
df_8d.columns = [
    "Provinsi",
    "Total_RS",
    "RS_Pem_Terakreditasi",
    "RS_Swa_Terakreditasi",
    "Persen_Terakreditasi"
]
df_8d = df_8d[df_8d["Provinsi"].notna() & ~df_8d["Provinsi"].str.contains("Total|Jumlah", na=False)]
for col in ["Total_RS","RS_Pem_Terakreditasi","RS_Swa_Terakreditasi"]:
    df_8d[col] = df_8d[col].apply(parse_int)
df_8d["Total_Akreditasi"] = df_8d["RS_Pem_Terakreditasi"] + df_8d["RS_Swa_Terakreditasi"]
df_8d["Persen_Terakreditasi"] = df_8d["Persen_Terakreditasi"].astype(float)

# 4) Ekstrak tabel "Lampiran 8.f" (Spesialis RS Kelas C per Provinsi, 2022)
#    Biasanya di halaman 16 atau 17.
tabel_8f_1 = tabula.read_pdf(PDF_PATH, pages=16, multiple_tables=False, lattice=True)[0]
tabel_8f_2 = tabula.read_pdf(PDF_PATH, pages=17, multiple_tables=False, lattice=True)[0]
df_8f = pd.concat([tabel_8f_1, tabel_8f_2], ignore_index=True)

# Kolom contoh: "Provinsi", "RS Kelas C", "RS dgn 7 Spesialis", "% dgn Spesialis"
df_8f.columns = [
    "Provinsi",
    "RS_Kelas_C",
    "RS_dengan_Spesialis",
    "Persen_dengan_Spesialis"
]
df_8f = df_8f[df_8f["Provinsi"].notna() & ~df_8f["Provinsi"].str.contains("Total|Jumlah", na=False)]
for col in ["RS_Kelas_C","RS_dengan_Spesialis"]:
    df_8f[col] = df_8f[col].apply(parse_int)
df_8f["Persen_dengan_Spesialis"] = df_8f["Persen_dengan_Spesialis"].astype(float)

# --- Sekarang, kita sudah punya lima DataFrame utama:
#     df_8c (populasi + RS/TT), df_8a (kepemilikan), df_8d (akreditasi), df_8f (spesialis)

# Pastikan urutan provinsi seragam (misalnya sort alphabetically)
# Kita pakai key "Provinsi" untuk join nantinya
df_8c = df_8c.sort_values("Provinsi").reset_index(drop=True)
df_8a = df_8a.sort_values("Provinsi").reset_index(drop=True)
df_8d = df_8d.sort_values("Provinsi").reset_index(drop=True)
df_8f = df_8f.sort_values("Provinsi").reset_index(drop=True)

# --------------- Menulis file SQL ---------------
with open(OUTPUT_SQL, "w", encoding="utf-8") as f:
    # 1) Tulis skema (CREATE TABLE) persis seperti sebelumnya
    f.write("-- ===============================================\n")
    f.write("-- Dump: Database Analisis Lokasi Rumah Sakit\n")
    f.write("-- Dihasilkan otomatis oleh generate_sql_dump.py\n")
    f.write("-- ===============================================\n\n")
    
    f.write("CREATE TABLE provinsi (\n")
    f.write("  id_provinsi     SERIAL PRIMARY KEY,\n")
    f.write("  nama            VARCHAR(100) NOT NULL UNIQUE,\n")
    f.write("  jumlah_penduduk_2021 BIGINT,\n")
    f.write("  jumlah_penduduk_2022 BIGINT\n")
    f.write(");\n\n")
    
    f.write("CREATE TABLE kapasitas_rumah_sakit (\n")
    f.write("  id_kapasitas    SERIAL PRIMARY KEY,\n")
    f.write("  id_provinsi     INTEGER NOT NULL REFERENCES provinsi(id_provinsi),\n")
    f.write("  tahun           SMALLINT NOT NULL,\n")
    f.write("  jumlah_rs       INTEGER NOT NULL,\n")
    f.write("  jumlah_tt       INTEGER NOT NULL,\n")
    f.write("  tt_per_1000     NUMERIC(5,2) NOT NULL,\n")
    f.write("  UNIQUE(id_provinsi, tahun)\n")
    f.write(");\n\n")
    
    f.write("CREATE TABLE kepemilikan_rumah_sakit (\n")
    f.write("  id_kepemilikan  SERIAL PRIMARY KEY,\n")
    f.write("  id_provinsi     INTEGER NOT NULL REFERENCES provinsi(id_provinsi),\n")
    f.write("  tahun           SMALLINT NOT NULL DEFAULT 2022,\n")
    f.write("  kemenkes        INTEGER NOT NULL,\n")
    f.write("  pemprov         INTEGER NOT NULL,\n")
    f.write("  pemkab          INTEGER NOT NULL,\n")
    f.write("  tni_polri       INTEGER NOT NULL,\n")
    f.write("  bumn            INTEGER NOT NULL,\n")
    f.write("  lain_pemerintah INTEGER NOT NULL,\n")
    f.write("  swasta          INTEGER NOT NULL,\n")
    f.write("  total           INTEGER NOT NULL,\n")
    f.write("  UNIQUE(id_provinsi, tahun)\n")
    f.write(");\n\n")
    
    f.write("CREATE TABLE akreditasi_rumah_sakit (\n")
    f.write("  id_akreditasi         SERIAL PRIMARY KEY,\n")
    f.write("  id_provinsi           INTEGER NOT NULL REFERENCES provinsi(id_provinsi),\n")
    f.write("  tahun                 SMALLINT NOT NULL DEFAULT 2022,\n")
    f.write("  total_rs              INTEGER NOT NULL,\n")
    f.write("  rs_pem_akreditasi     INTEGER NOT NULL,\n")
    f.write("  rs_swa_akreditasi     INTEGER NOT NULL,\n")
    f.write("  total_akreditasi      INTEGER NOT NULL,\n")
    f.write("  persentase_akreditasi NUMERIC(5,2) NOT NULL,\n")
    f.write("  UNIQUE(id_provinsi, tahun)\n")
    f.write(");\n\n")
    
    f.write("CREATE TABLE spesialis_rumah_sakit (\n")
    f.write("  id_spesialis            SERIAL PRIMARY KEY,\n")
    f.write("  id_provinsi             INTEGER NOT NULL REFERENCES provinsi(id_provinsi),\n")
    f.write("  tahun                   SMALLINT NOT NULL DEFAULT 2022,\n")
    f.write("  jumlah_rs_kelas_c       INTEGER NOT NULL,\n")
    f.write("  rs_dengan_spesialis     INTEGER NOT NULL,\n")
    f.write("  persen_dengan_spesialis NUMERIC(5,2) NOT NULL,\n")
    f.write("  UNIQUE(id_provinsi, tahun)\n")
    f.write(");\n\n")
    
    # 2) Tulis data INSERT ke tabel provinsi & kapasitas_rumah_sakit
    for idx, row in df_8c.iterrows():
        nama = row["Provinsi"].replace("'", "''")
        pop21 = row["Populasi 2021"] or "NULL"
        pop22 = row["Populasi 2022"] or "NULL"
        f.write(
            f"INSERT INTO provinsi (nama, jumlah_penduduk_2021, jumlah_penduduk_2022) "
            f"VALUES ('{nama}', {pop21}, {pop22});\n"
        )
        # ID provinsi akan otomatis berdasarkan urutan insert
        # Kita asumsikan order df_8c sama dengan order INSERT, sehingga id = idx+1
        prov_id = idx + 1
        jumlah_rs_2022 = row["Jumlah RS 2022"] or 0
        jumlah_tt_2022 = row["Jumlah TT 2022"] or 0
        tt_per_1000 = row["TT_per_1000_2022"] or 0.00
        f.write(
            f"INSERT INTO kapasitas_rumah_sakit (id_provinsi, tahun, jumlah_rs, jumlah_tt, tt_per_1000) "
            f"VALUES ({prov_id}, 2022, {jumlah_rs_2022}, {jumlah_tt_2022}, {tt_per_1000});\n"
        )
    f.write("\n")
    
    # 3) Tulis data INSERT ke tabel kepemilikan_rumah_sakit
    for idx, row in df_8a.iterrows():
        nama = row["Provinsi"].strip()
        # Cari id_provinsi berdasarkan nama di df_8c (urutan sama)
        try:
            prov_id = int(df_8c[df_8c["Provinsi"] == nama].index[0]) + 1
        except IndexError:
            continue  # jika provinsi tidak ditemukan, skip
        kemenkes = row["Kemenkes"] or 0
        pemprov = row["Pemprov"] or 0
        pemkab = row["Pemkab"] or 0
        tni_polri = row["TNI_POLRI"] or 0
        bumn = row["BUMN"] or 0
        lain = row["Lain_Pemerintah"] or 0
        swasta = row["Swasta"] or 0
        total = row["Total_Kategori"] or (kemenkes + pemprov + pemkab + tni_polri + bumn + lain + swasta)
        f.write(
            f"INSERT INTO kepemilikan_rumah_sakit "
            f"(id_provinsi, tahun, kemenkes, pemprov, pemkab, tni_polri, bumn, lain_pemerintah, swasta, total) "
            f"VALUES ({prov_id}, 2022, {kemenkes}, {pemprov}, {pemkab}, {tni_polri}, {bumn}, {lain}, {swasta}, {total});\n"
        )
    f.write("\n")
    
    # 4) Tulis data INSERT ke tabel akreditasi_rumah_sakit
    for idx, row in df_8d.iterrows():
        nama = row["Provinsi"].strip()
        try:
            prov_id = int(df_8c[df_8c["Provinsi"] == nama].index[0]) + 1
        except IndexError:
            continue
        total_rs = row["Total_RS"] or 0
        rs_pem = row["RS_Pem_Terakreditasi"] or 0
        rs_swa = row["RS_Swa_Terakreditasi"] or 0
        total_akred = row["Total_Akreditasi"] or (rs_pem + rs_swa)
        persen_akred = row["Persen_Terakreditasi"] or 0.00
        f.write(
            f"INSERT INTO akreditasi_rumah_sakit "
            f"(id_provinsi, tahun, total_rs, rs_pem_akreditasi, rs_swa_akreditasi, total_akreditasi, persentase_akreditasi) "
            f"VALUES ({prov_id}, 2022, {total_rs}, {rs_pem}, {rs_swa}, {total_akred}, {persen_akred});\n"
        )
    f.write("\n")
    
    # 5) Tulis data INSERT ke tabel spesialis_rumah_sakit
    for idx, row in df_8f.iterrows():
        nama = row["Provinsi"].strip()
        try:
            prov_id = int(df_8c[df_8c["Provinsi"] == nama].index[0]) + 1
        except IndexError:
            continue
        rs_kelas_c = row["RS_Kelas_C"] or 0
        rs_spes = row["RS_dengan_Spesialis"] or 0
        persen_spes = row["Persen_dengan_Spesialis"] or 0.00
        f.write(
            f"INSERT INTO spesialis_rumah_sakit "
            f"(id_provinsi, tahun, jumlah_rs_kelas_c, rs_dengan_spesialis, persen_dengan_spesialis) "
            f"VALUES ({prov_id}, 2022, {rs_kelas_c}, {rs_spes}, {persen_spes});\n"
        )
    f.write("\n")

print(f"File SQL dump berhasil dihasilkan: {OUTPUT_SQL}")
