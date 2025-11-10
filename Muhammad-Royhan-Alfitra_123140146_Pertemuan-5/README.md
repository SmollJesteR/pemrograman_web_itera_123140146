# 📚 Sistem Manajemen Perpustakaan Sederhana (OOP Python)

Program ini merupakan implementasi sederhana dari **manajemen perpustakaan** menggunakan konsep **Object-Oriented Programming (OOP)** dalam bahasa pemrograman **Python**.  
Fokus utama proyek ini adalah penerapan konsep:

- **Abstract Class**
- **Inheritance**
- **Encapsulation**
- **Polymorphism**
- **Property Decorator**

---

## 🧩 Fitur Utama

Sistem ini dapat digunakan untuk:

1. Menambahkan item (buku, majalah, dll) ke dalam koleksi perpustakaan
2. Menampilkan seluruh koleksi item yang tersedia
3. Mencari item berdasarkan **judul** atau **ID item**

---

## 🏗️ Struktur Kelas

### 1. `LibraryItem` (Abstract Class)

Kelas dasar abstrak untuk semua jenis item di perpustakaan.  
Mendefinisikan atribut umum seperti:

- `item_id`
- `title`
- `is_available`

Serta memiliki method abstrak:

```python
@abstractmethod
def display_info(self):
    pass
```

---

### 2. `Book` (Subclass)

Mewarisi dari `LibraryItem`.  
Menambahkan atribut khusus:

- `__author`
- `__pages`

Mengimplementasikan method `display_info()` untuk menampilkan informasi buku.

---

### 3. `Magazine` (Subclass)

Turunan dari `LibraryItem`.  
Menambahkan atribut:

- `__issue_number`

Juga mengimplementasikan `display_info()` untuk menampilkan detail majalah.

---

### 4. `Library`

Kelas yang berfungsi untuk mengelola koleksi perpustakaan.  
Menyimpan item dalam list privat `__collection`.  
Fungsi utama:

- `add_item(item)` → Menambah item ke perpustakaan
- `show_all_items()` → Menampilkan semua koleksi
- `search_item(keyword)` → Mencari item berdasarkan ID atau judul

---

## 🔐 Penerapan Konsep OOP

| Konsep                 | Implementasi                               | Penjelasan                                                                                        |
| ---------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Abstraction**        | `LibraryItem` sebagai abstract class       | Menyembunyikan detail implementasi item dan memaksa subclass mengimplementasikan `display_info()` |
| **Inheritance**        | `Book` & `Magazine` mewarisi `LibraryItem` | Menggunakan atribut dan method umum dari class induk                                              |
| **Encapsulation**      | Atribut `__collection`, `__author`, dll    | Melindungi data internal agar tidak diakses langsung                                              |
| **Polymorphism**       | Method `display_info()`                    | Dipanggil dengan cara yang sama, tapi hasil berbeda tergantung subclass                           |
| **Property Decorator** | `@property` pada `is_available`            | Mengontrol akses baca/tulis dengan validasi tipe data                                             |

---

## 💻 Kode Program Lengkap

```python
from abc import ABC, abstractmethod

# =====================================================
# Abstract Class: LibraryItem
# =====================================================
class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._item_id = item_id       # protected attribute
        self._title = title            # protected attribute
        self._is_available = True      # protected attribute

    @property
    def title(self):
        return self._title

    @property
    def is_available(self):
        return self._is_available

    @is_available.setter
    def is_available(self, status):
        if isinstance(status, bool):
            self._is_available = status
        else:
            raise ValueError("Status ketersediaan harus berupa boolean (True/False)")

    @abstractmethod
    def display_info(self):
        pass


# =====================================================
# Subclass: Book
# =====================================================
class Book(LibraryItem):
    def __init__(self, item_id, title, author, pages):
        super().__init__(item_id, title)
        self.__author = author
        self.__pages = pages

    def display_info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"[BOOK] ID: {self._item_id} | Judul: {self.title} | Penulis: {self.__author} | "
              f"Halaman: {self.__pages} | Status: {status}")


# =====================================================
# Subclass: Magazine
# =====================================================
class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.__issue_number = issue_number

    def display_info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"[MAGAZINE] ID: {self._item_id} | Judul: {self.title} | Edisi: {self.__issue_number} | Status: {status}")


# =====================================================
# Class: Library
# =====================================================
class Library:
    def __init__(self, name):
        self.__name = name
        self.__collection = []

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self.__collection.append(item)
            print(f"✅ Item '{item.title}' berhasil ditambahkan ke perpustakaan.")
        else:
            print("❌ Item yang ditambahkan harus turunan dari LibraryItem.")

    def show_all_items(self):
        print(f"\n📚 Daftar Koleksi di {self.__name}:")
        if not self.__collection:
            print("Belum ada koleksi dalam perpustakaan.")
        for item in self.__collection:
            item.display_info()

    def search_item(self, keyword):
        print(f"\n🔍 Hasil pencarian untuk '{keyword}':")
        found = False
        for item in self.__collection:
            if keyword.lower() in item.title.lower() or keyword == str(item._item_id):
                item.display_info()
                found = True
        if not found:
            print("Item tidak ditemukan.")


# =====================================================
# Contoh Penggunaan Program
# =====================================================
if __name__ == "__main__":
    library = Library("Perpustakaan Digital ITERA")

    book1 = Book("B001", "Pemrograman Python Dasar", "A. Rahman", 250)
    book2 = Book("B002", "Machine Learning for Beginner", "B. Sutanto", 300)
    magazine1 = Magazine("M001", "National Geographic", "Edisi November 2025")

    library.add_item(book1)
    library.add_item(book2)
    library.add_item(magazine1)

    library.show_all_items()

    book1.is_available = False

    library.search_item("Python")
    library.search_item("M001")
```

---

## 📦 Output Contoh Program

```
✅ Item 'Pemrograman Python Dasar' berhasil ditambahkan ke perpustakaan.
✅ Item 'Machine Learning for Beginner' berhasil ditambahkan ke perpustakaan.
✅ Item 'National Geographic' berhasil ditambahkan ke perpustakaan.

📚 Daftar Koleksi di Perpustakaan Digital ITERA:
[BOOK] ID: B001 | Judul: Pemrograman Python Dasar | Penulis: A. Rahman | Halaman: 250 | Status: Tersedia
[BOOK] ID: B002 | Judul: Machine Learning for Beginner | Penulis: B. Sutanto | Halaman: 300 | Status: Tersedia
[MAGAZINE] ID: M001 | Judul: National Geographic | Edisi: Edisi November 2025 | Status: Tersedia

🔍 Hasil pencarian untuk 'Python':
[BOOK] ID: B001 | Judul: Pemrograman Python Dasar | Penulis: A. Rahman | Halaman: 250 | Status: Dipinjam

🔍 Hasil pencarian untuk 'M001':
[MAGAZINE] ID: M001 | Judul: National Geographic | Edisi: Edisi November 2025 | Status: Tersedia
```

---

## 👨‍💻 Pengembang

**Nama:** Muhammad Royhan Alfitra  
**NIM:** 123140146  
**Kelas:** RB
