# 🎓 Program Pengelolaan Data Nilai Mahasiswa

Program ini dibuat menggunakan **Python** untuk mengelola data nilai mahasiswa secara interaktif melalui terminal.  
Fitur-fiturnya mencakup perhitungan nilai akhir, penentuan grade, penambahan data baru, pencarian nilai tertinggi & terendah, serta perhitungan rata-rata nilai kelas.

---

## 📚 Deskripsi

Program ini menyimpan data mahasiswa dalam bentuk **list of dictionary** yang berisi:

- Nama
- NIM
- Nilai UTS
- Nilai UAS
- Nilai Tugas

Kemudian sistem akan menghitung nilai akhir menggunakan rumus:

```
Nilai Akhir = (0.3 * UTS) + (0.4 * UAS) + (0.3 * Tugas)
```

Berdasarkan nilai akhir, sistem akan menentukan **grade** dengan kriteria berikut:

| Nilai Akhir | Grade |
| ----------- | ----- |
| ≥ 80        | A     |
| ≥ 70        | B     |
| ≥ 60        | C     |
| ≥ 50        | D     |
| < 50        | E     |

---

## ⚙️ Fitur Utama

| No  | Fitur                               | Deskripsi                                                       |
| --- | ----------------------------------- | --------------------------------------------------------------- |
| 1   | **Tampilkan Data Mahasiswa**        | Menampilkan seluruh data mahasiswa dalam bentuk tabel           |
| 2   | **Tambah Data Mahasiswa**           | Menambahkan data baru (nama, NIM, nilai UTS/UAS/Tugas)          |
| 3   | **Cari Nilai Tertinggi & Terendah** | Menampilkan mahasiswa dengan nilai akhir tertinggi dan terendah |
| 4   | **Filter Berdasarkan Grade**        | Menampilkan mahasiswa berdasarkan grade tertentu (A–E)          |
| 5   | **Hitung Rata-rata Kelas**          | Menghitung rata-rata nilai akhir seluruh mahasiswa              |
| 0   | **Keluar**                          | Menutup program                                                 |

---

## 🧩 Struktur Data

Data mahasiswa disimpan dalam bentuk list of dictionary:

```python
mahasiswa_list = [
    {"nama": "Andi", "nim": "123001", "nilai_uts": 75, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Budi", "nim": "123002", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    ...
]
```

---

## 🧠 Fungsi Utama dalam Program

| Fungsi                                                   | Deskripsi                                                        |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| `hitung_nilai_akhir(uts, uas, tugas)`                    | Menghitung nilai akhir berdasarkan bobot                         |
| `tentukan_grade(nilai)`                                  | Menentukan grade berdasarkan nilai akhir                         |
| `tampilkan_data(mahasiswa_list)`                         | Menampilkan seluruh data dalam format tabel                      |
| `cari_tertinggi_terendah(mahasiswa_list)`                | Mengembalikan data mahasiswa dengan nilai tertinggi dan terendah |
| `tambah_mahasiswa(mahasiswa_list)`                       | Menambahkan data mahasiswa baru                                  |
| `filter_berdasarkan_grade(mahasiswa_list, grade_target)` | Menampilkan mahasiswa dengan grade tertentu                      |
| `hitung_rata_rata(mahasiswa_list)`                       | Menghitung rata-rata nilai akhir kelas                           |

---

## 🖥️ Cara Menjalankan Program

1. Pastikan sudah menginstal **Python 3.x**
2. Simpan file program dengan nama `nilai_mahasiswa.py`
3. Jalankan program melalui terminal:
   ```bash
   python nilai_mahasiswa.py
   ```
4. Pilih menu sesuai kebutuhan:
   ```
   ==============================
        MENU DATA MAHASISWA
   ==============================
   1. Tampilkan Data Mahasiswa
   2. Tambah Data Mahasiswa
   3. Cari Nilai Tertinggi & Terendah
   4. Filter Mahasiswa Berdasarkan Grade
   5. Hitung Rata-rata Nilai Kelas
   0. Keluar
   ```

---

## 🧾 Contoh Output

```
Daftar Nilai Mahasiswa
======================================================================
NIM        Nama                     UTS   UAS   Tugas   Akhir   Grade
----------------------------------------------------------------------
123001     Reza Kopling              75    85    80     80.50     A
123002     Budi Mekanik              60    65    70     65.50     C
123003     Citra Apotek              85    90    88     87.10     A
123004     Sinta Futsal              50    55    60     55.50     D
123005     Eko Cuci AC               40    45    50     45.50     E
======================================================================
```

---

## 🌟 Fitur Tambahan yang Dapat Dikembangkan

- Penyimpanan data ke file `.csv` atau database
- Tampilan tabel menggunakan library `tabulate`
- Pembuatan GUI sederhana dengan `tkinter`
- Ekspor laporan nilai ke file `.pdf`

---

## 👨‍💻 Dibuat oleh

**Nama:** Muhammad Royhan Alfitra
**NIM:** 123140146
**Kelas** RB

---
