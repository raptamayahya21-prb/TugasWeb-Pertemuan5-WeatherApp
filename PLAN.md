# 🌦️ Project Roadmap & Requirements Specification: Weather App

Dokumen ini memuat seluruh spesifikasi kebutuhan, ketentuan teknis, arsitektur, dan tahapan pengerjaan untuk **Tugas Rutin 5: Weather App** serta catatan tugas terkait mata kuliah **Pemrograman Web (Semester 3 - Blok 1)**.

---

## 📌 1. Ikhtisar Proyek (Project Overview)

Membangun aplikasi cuaca (*Weather Application*) modern dan responsif berbasis Web menggunakan **OpenWeatherMap API**, dengan standar JavaScript modern (ES6+), penanganan kesalahan (*error handling*) yang komprehensif, status pemuatan (*loading state*), serta fitur-fitur interaktif tambahan (bonus).

---

## 🎯 2. Ketentuan Teknis & Spesifikasi (Technical Requirements)

### ✅ Persyaratan Wajib (Mandatory Checklist)
- [x] **Modern ES6+ Syntax**:
  - Menggunakan `const` dan `let` (menghindari penggunaan `var`).
  - Menggunakan *Arrow Functions* (`const getWeatherData = async () => { ... }`).
  - Menggunakan *Template Literals* (`` `https://api.openweathermap.org/...` ``).
  - Destrukturisasi objek & array (*Object/Array Destructuring*).
- [x] **Asynchronous JavaScript**:
  - Menggunakan `async/await` yang dipadukan dengan `Fetch API`.
  - Menggunakan blok `try...catch` untuk *robust error handling*.
- [x] **Array Methods (Minimal 1 method)**:
  - Menggunakan minimal 1 array method standar ES6+ (`map()`, `filter()`, atau `reduce()`), khususnya untuk pemrosesan data ramalan cuaca (forecast) atau riwayat pencarian.
- [x] **Data Cuaca Lengkap**:
  - Nama Kota & Negara.
  - Suhu Saat Ini (*Current Temperature*).
  - Deskripsi Cuaca (*Weather Description*, misal: Cerah, Hujan Ringan, Berawan).
  - Ikon Cuaca resmi/custom (*Weather Icon*).
  - Kelembaban Udara (*Humidity* dalam %).
  - *Data pendukung:* Kecepatan angin (*Wind Speed*), Tekanan (*Pressure*), Terasa Seperti (*Feels Like*).
- [x] **Error Handling**:
  - Menangani error **404 (Kota Tidak Ditemukan)** dengan feedback UI yang ramah.
  - Menangani **Network Error / Offline State** saat koneksi internet bermasalah.
  - Validasi input (mencegah pencarian string kosong).
- [x] **Loading State**:
  - Menampilkan indikator loading (spinner / skeleton loader) saat data sedang di-fetch.
- [x] **Desain Responsif & Mobile-Friendly**:
  - Tampilan optimal di berbagai ukuran layar (*Mobile, Tablet, Desktop*).
  - Menggunakan layout modern (CSS Flexbox & Grid).

---

## 🌟 3. Fitur Bonus (Bonus Features)

- [x] **Riwayat Pencarian (Search History via LocalStorage)**:
  - Menyimpan daftar pencarian kota terakhir ke dalam `localStorage`.
  - Tombol cepat untuk memilih kembali kota dari riwayat pencarian.
  - Opsi menghapus riwayat pencarian.
- [x] **Toggle Satuan Suhu (°C / °F)**:
  - Kemampuan beralih antara Celsius (°C) dan Fahrenheit (°F) secara instan.
- [x] **Ramalan Cuaca 5 Hari (5-Day Forecast)**:
  - Menampilkan prediksi cuaca untuk 5 hari ke depan dengan pengelompokan data per hari menggunakan metode array (`filter()` & `map()`).
- [x] *(Tambahan Estetika)* **Visual Modern & Dinamis**:
  - Tema Glassmorphism / Sleek Dark Theme.
  - Perubahan latar belakang dinamis (*Dynamic Background*) sesuai kondisi cuaca (Cerah, Hujan, Badai, Salju, Berawan).

---

## 📁 4. Struktur Arsitektur File (Project Structure)

```text
Weather App/
├── index.html          # Markup semantik & struktur antarmuka
├── style.css           # Styling modern (Vanilla CSS, Glassmorphism, Responsive)
├── script.js           # Logika aplikasi (Fetch API, ES6+, LocalStorage, DOM manipulation)
├── PLAN.md             # Dokumen perencanaan & spesifikasi tugas
├── README.md           # Dokumentasi proyek untuk repository GitHub
└── assets/             # Aset gambar, ikon, atau font (jika diperlukan)
```

---

## 🚀 5. Rencana Tahapan Pengerjaan (Implementation Roadmap)

### **Fase 1: Persiapan & Konfigurasi Dasar** [COMPLETED]
1. Setup file `index.html`, `style.css`, dan `script.js`.
2. Persiapan API Key dari OpenWeatherMap.
3. Menyiapkan struktur dasar markup HTML semantik (Search bar, Weather display card, Forecast section, Error modal/banner, Loading indicator).

### **Fase 2: Desain UI/UX & Styling (Mobile-First)** [COMPLETED]
1. Menerapkan CSS Variables untuk tema warna, typography (Google Fonts seperti Inter / Outfit), dan efek transisi.
2. Mendesain kartu cuaca utama (*glassmorphic card*), input bar, tombol interaktif, dan status badges.
3. Menata tampilan forecast 5 hari dengan card horizontal/grid yang responsif.
4. Menerapkan animasi *loading spinner* dan state error yang elegan.

### **Fase 3: Logika JavaScript & Integrasi API (ES6+)** [COMPLETED]
1. Modul Fetch Data (`getWeatherByCity`, `getForecastByCity`) dengan `async/await`.
2. Penanganan Error: respon non-200 (404, 401), network failure, empty inputs.
3. Transformasi dan filtering data forecast 5 hari menggunakan `filter()` & `map()`.
4. Render data ke DOM menggunakan *Template Literals* dan manipulasi elemen.

### **Fase 4: Implementasi Fitur Bonus** [COMPLETED]
1. Integrasi `localStorage` untuk riwayat pencarian (simpan, tampilkan, hapus).
2. Mekanisme konversi satuan suhu (°C / °F) secara reaktif.
3. Deteksi lokasi cuaca saat ini (Geolocation API) sebagai nilai tambah.

### **Fase 5: Testing, Refactoring & Dokumentasi** [COMPLETED]
1. Pengujian skenario:
   - Pencarian kota valid (contoh: Medan, Jakarta, London, Tokyo).
   - Pencarian kota tidak ada (404).
   - Mode offline / tanpa koneksi internet.
   - Responsivitas pada resolusi mobile (< 480px), tablet (768px), dan desktop (1024px+).
2. Pembersihan kode (linting, konsistensi nama fungsi, komentar penjelasan).
3. Pembaruan file `README.md` dengan panduan cara menjalankan aplikasi, fitur, dan screenshot.
