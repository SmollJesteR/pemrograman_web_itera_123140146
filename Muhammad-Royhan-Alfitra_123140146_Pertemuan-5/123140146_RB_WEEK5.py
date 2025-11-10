from abc import ABC, abstractmethod

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
        """Method abstrak yang harus diimplementasikan oleh subclass"""
        pass

# Subclass: Book

class Book(LibraryItem):
    def __init__(self, item_id, title, author, pages):
        super().__init__(item_id, title)
        self.__author = author     # private attribute
        self.__pages = pages       # private attribute
    
    def display_info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"[BOOK] ID: {self._item_id} | Judul: {self.title} | Penulis: {self.__author} | "
              f"Halaman: {self.__pages} | Status: {status}")

# Subclass: Magazine

class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.__issue_number = issue_number
    
    def display_info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"[MAGAZINE] ID: {self._item_id} | Judul: {self.title} | Edisi: {self.__issue_number} | Status: {status}")

# Class: Library

class Library:
    def __init__(self, name):
        self.__name = name
        self.__collection = []  # private list untuk menyimpan semua item
    
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
            item.display_info()  # Polymorphism: method ini bisa berbeda tergantung subclass
    
    def search_item(self, keyword):
        print(f"\n🔍 Hasil pencarian untuk '{keyword}':")
        found = False
        for item in self.__collection:
            if keyword.lower() in item.title.lower() or keyword == str(item._item_id):
                item.display_info()
                found = True
        if not found:
            print("Item tidak ditemukan.")

if __name__ == "__main__":
    library = Library("Perpustakaan Digital ITERA")
    
    # Tambah beberapa item
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