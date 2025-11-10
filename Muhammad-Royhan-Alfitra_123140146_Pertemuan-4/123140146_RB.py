# =====================================================
# Program Pengelolaan Data Nilai Mahasiswa
# =====================================================

# Data awal mahasiswa
mahasiswa_list = [
    {"nama": "Reza Kopling", "nim": "123001", "nilai_uts": 75, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Budi Mekanik", "nim": "123002", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Citra Apotek", "nim": "123003", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Sinta Futsal", "nim": "123004", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 60},
    {"nama": "Eko Cuci AC", "nim": "123005", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50}
]


# =====================================================
# Fungsi-Fungsi Dasar
# =====================================================

def hitung_nilai_akhir(uts, uas, tugas):
    """Menghitung nilai akhir dengan bobot 30% UTS, 40% UAS, 30% Tugas"""
    return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)


def tentukan_grade(nilai):
    """Menentukan grade berdasarkan nilai akhir"""
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


def tampilkan_data(mahasiswa_list):
    """Menampilkan data mahasiswa dalam format tabel"""
    print("\nDaftar Nilai Mahasiswa")
    print("=" * 70)
    print(f"{'NIM':<10} {'Nama':<15} {'UTS':<5} {'UAS':<5} {'Tugas':<7} {'Akhir':<7} {'Grade':<5}")
    print("-" * 70)

    for mhs in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        grade = tentukan_grade(nilai_akhir)
        print(f"{mhs['nim']:<10} {mhs['nama']:<15} {mhs['nilai_uts']:<5} {mhs['nilai_uas']:<5} {mhs['nilai_tugas']:<7} {nilai_akhir:<7.2f} {grade:<5}")
    
    print("=" * 70)


def cari_tertinggi_terendah(mahasiswa_list):
    """Mencari mahasiswa dengan nilai tertinggi dan terendah"""
    nilai_dengan_akhir = [
        (mhs, hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]))
        for mhs in mahasiswa_list
    ]
    tertinggi = max(nilai_dengan_akhir, key=lambda x: x[1])
    terendah = min(nilai_dengan_akhir, key=lambda x: x[1])
    return tertinggi, terendah


def tambah_mahasiswa(mahasiswa_list):
    """Menambah data mahasiswa baru"""
    print("\n=== Input Data Mahasiswa Baru ===")
    nama = input("Nama: ")
    nim = input("NIM: ")
    uts = float(input("Nilai UTS: "))
    uas = float(input("Nilai UAS: "))
    tugas = float(input("Nilai Tugas: "))

    mahasiswa_baru = {"nama": nama, "nim": nim, "nilai_uts": uts, "nilai_uas": uas, "nilai_tugas": tugas}
    mahasiswa_list.append(mahasiswa_baru)
    print(f"Data {nama} berhasil ditambahkan!")


def filter_berdasarkan_grade(mahasiswa_list, grade_target):
    """Menampilkan mahasiswa berdasarkan grade tertentu"""
    print(f"\nMahasiswa dengan Grade {grade_target}")
    print("=" * 50)
    for mhs in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
        grade = tentukan_grade(nilai_akhir)
        if grade == grade_target.upper():
            print(f"{mhs['nim']} - {mhs['nama']} ({nilai_akhir:.2f})")
    print("=" * 50)


def hitung_rata_rata(mahasiswa_list):
    """Menghitung rata-rata nilai akhir kelas"""
    total = 0
    for mhs in mahasiswa_list:
        total += hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
    rata2 = total / len(mahasiswa_list)
    return rata2


# =====================================================
# Menu Program Utama
# =====================================================

def main():
    while True:
        print("""
==============================
     MENU DATA MAHASISWA
==============================
1. Tampilkan Data Mahasiswa
2. Tambah Data Mahasiswa
3. Cari Nilai Tertinggi & Terendah
4. Filter Mahasiswa Berdasarkan Grade
5. Hitung Rata-rata Nilai Kelas
0. Keluar
""")
        pilihan = input("Pilih menu (0-5): ")

        if pilihan == "1":
            tampilkan_data(mahasiswa_list)
        elif pilihan == "2":
            tambah_mahasiswa(mahasiswa_list)
        elif pilihan == "3":
            tertinggi, terendah = cari_tertinggi_terendah(mahasiswa_list)
            print(f"\nMahasiswa Nilai Tertinggi: {tertinggi[0]['nama']} ({tertinggi[1]:.2f})")
            print(f"Mahasiswa Nilai Terendah : {terendah[0]['nama']} ({terendah[1]:.2f})")
        elif pilihan == "4":
            grade = input("Masukkan grade yang ingin difilter (A-E): ")
            filter_berdasarkan_grade(mahasiswa_list, grade)
        elif pilihan == "5":
            rata = hitung_rata_rata(mahasiswa_list)
            print(f"\nRata-rata nilai kelas adalah: {rata:.2f}")
        elif pilihan == "0":
            print("Terima kasih! Program selesai.")
            break
        else:
            print("Pilihan tidak valid, coba lagi!")

if __name__ == "__main__":
    main()
