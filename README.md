# 🌦️ AuraWeather - Modern Weather & 5-Day Forecast Web Application

Aplikasi prakiraan cuaca modern, interaktif, dan responsif berbasis Web yang dibangun menggunakan **Vanilla JavaScript (ES6+)**, **Vanilla CSS (Glassmorphism & Responsive Design)**, dan **OpenWeatherMap REST API**. 

Proyek ini dibuat untuk memenuhi spesifikasi dan kriteria penilaian **Tugas Rutin 5: Pemrograman Web (Semester 3 - Blok 1)**.

---

## 📖 Daftar Isi (Table of Contents)
- [✨ Fitur Utama Aplikasi](#-fitur-utama-aplikasi)
- [🖥️ Panduan Cara Menggunakan Aplikasi (User Guide)](#️-panduan-cara-menggunakan-aplikasi-user-guide)
- [🧠 Penjelasan Alur Kode & Arsitektur Logika (Technical Overview)](#-penjelasan-alur-kode--arsitektur-logika-technical-overview)
- [🛠️ Standar Teknologi & Spesifikasi ES6+](#️-standar-teknologi--spesifikasi-es6)
- [📁 Struktur Direktori File](#-struktur-direktori-file)
- [🚀 Cara Menjalankan Proyek Secara Lokal](#-cara-menjalankan-proyek-secara-lokal)
- [🔑 Panduan Pengaturan API Key OpenWeatherMap](#-panduan-pengaturan-api-key-openweathermap)
- [❓ Tanya Jawab & Troubleshooting (FAQ)](#-tanya-jawab--troubleshooting-faq)

---

## ✨ Fitur Utama Aplikasi

1. **Prakiraan Cuaca Real-Time (*Current Weather*)**:
   - Menampilkan nama kota dan kode negara resmi.
   - Tanggal dan hari lengkap yang disesuaikan dengan zona waktu lokal kota tersebut.
   - Suhu udara utama dengan angka besar dan badge status cuaca.
   - Ikon cuaca resmi beresolusi tinggi (*OpenWeatherMap Icon*) + fallback ikon Font Awesome.
   - Deskripsi kondisi cuaca dalam **Bahasa Indonesia** (contoh: *hujan rintik-rintik, cerah berawan, awan pecah*).
   - Parameter cuaca lengkap:
     - 🌡️ **Terasa Seperti (*Feels Like*)**: Perkiraan suhu yang dirasakan tubuh manusia.
     - 💧 **Kelembaban Udara (*Humidity*)**: Persentase kelembaban udara.
     - 💨 **Kecepatan Angin (*Wind Speed*)**: Kecepatan angin dalam meter/detik (`m/s`) atau mil/jam (`mph`).
     - ⏱️ **Tekanan Udara (*Pressure*)**: Tekanan atmosfer dalam satuan hectopascal (`hPa`).

2. **Ramalan Cuaca 5 Hari (*5-Day Forecast*)**:
   - Menampilkan prediksi cuaca 5 hari ke depan dalam susunan kartu grid yang responsif.
   - Setiap kartu memuat nama hari, tanggal singkat, ikon cuaca, suhu tertinggi/terendah harian, serta deskripsi cuaca.

3. **Deteksi Lokasi Otomatis (*Geolocation API*)**:
   - Tombol khusus untuk mendeteksi koordinat GPS perangkat Anda secara instan dan menampilkan cuaca di titik Anda berada saat ini.

4. **Toggle Satuan Suhu Reaktif (°C / °F)**:
   - Tombol sakelar di header untuk beralih instan antara **Celsius (°C)** dan **Fahrenheit (°F)**.
   - Preferensi satuan otomatis tersimpan di browser via `localStorage`.

5. **Riwayat Pencarian Cerdas (*Search History*)**:
   - Setiap kota yang berhasil dicari otomatis tersimpan ke dalam `localStorage` (maksimal 6 kota terakhir).
   - Chip kota interaktif: klik nama kota untuk mencari ulang secara instan.
   - Opsi hapus satu kota tertentu (ikon `x`) atau tombol **"Hapus Semua"** untuk membersihkan riwayat.

6. **Latar Belakang & Atmosfer Dinamis (*Dynamic Theme Background*)**:
   - Warna gradien latar belakang dan efek cahaya berpendar berubah otomatis menyesuaikan cuaca kota yang sedang dibuka (Cerah/Clear, Berawan/Clouds, Hujan/Rain, Gerimis/Drizzle, Badai Petir/Thunderstorm, Salju/Snow, atau Kabut/Mist).

7. **Error Handling & Indikator Loading Komprehensif**:
   - Feedback yang ramah saat **Kota Tidak Ditemukan (404)** atau salah ketik.
   - Animasi *Loading Spinner* elegan saat data sedang diambil dari server.
   - Peringatan otomatis jika koneksi internet terputus (**Offline Detection**).
   - Validasi input untuk mencegah pengiriman form kosong.

---

## 🖥️ Panduan Cara Menggunakan Aplikasi (User Guide)

Berikut langkah praktis untuk mengoperasikan seluruh fitur di web ini:

### 1. Mencari Cuaca Berdasarkan Nama Kota
1. Ketik nama kota pada kolom input pencarian (contoh: `Medan`, `Jakarta`, `Tokyo`, `London`, `Bandung`).
2. Tekan tombol **"Cari"** atau tekan tombol **Enter** pada keyboard Anda.
3. Aplikasi akan menampilkan animasi *loading spinner* sesaat, kemudian data cuaca saat ini dan ramalan 5 hari akan langsung tampil di layar.
4. Jika ingin menghapus ketikan di kolom input, klik ikon silang (**X**) di sisi kanan input bar.

### 2. Menggunakan Deteksi Lokasi Saya (Geolocation)
1. Klik tombol berikon target lokasi (**🎯 / Crosshair**) di sebelah tombol Cari.
2. Browser akan meminta izin akses lokasi (*"Allow location access?"*). Pilih **Allow / Izinkan**.
3. Aplikasi akan otomatis membaca koordinat lintang & bujur perangkat Anda dan menampilkan cuaca lokasi Anda saat ini.

### 3. Mengubah Satuan Suhu (°C ⇄ °F)
1. Di pojok kanan atas (header), terdapat tombol toggle **°C | °F**.
2. Klik **°F** untuk mengubah seluruh tampilan suhu menjadi Fahrenheit dan kecepatan angin menjadi `mph`.
3. Klik **°C** untuk kembali ke Celsius dan kecepatan angin `m/s`.
4. Pengaturan ini akan tersimpan otomatis, sehingga saat Anda membuka kembali web ini di masa depan, satuan terakhir Anda tetap aktif.

### 4. Menggunakan Riwayat Pencarian
1. Setelah Anda mencari beberapa kota, deretan tombol kapsul (*chips*) riwayat akan muncul di bawah kolom pencarian.
2. **Pencarian Cepat**: Klik salah satu chip kota (misal: `Jakarta`) untuk langsung melihat cuacanya tanpa mengetik ulang.
3. **Hapus Satu Kota**: Klik tanda silang kecil (**x**) pada chip kota yang ingin dibuang dari daftar.
4. **Hapus Semua**: Klik tombol **"Hapus Semua"** di kanan atas riwayat untuk mengosongkan seluruh riwayat pencarian.

---

## 🧠 Penjelasan Alur Kode & Arsitektur Logika (Technical Overview)

Bagi pengembang atau kebutuhan pemahaman presentasi tugas, berikut cara kerja internal kode di file `script.js`:

```
[ Pengguna Memasukkan Kota / Lokasi ]
                 │
                 ▼
      [ Validasi Input & State ] ──(Jika Kosong)──► [ Tampilkan Error Banner ]
                 │
                 ▼
      [ showLoading() Diaktifkan ]
                 │
                 ▼
      [ Fetch ke OpenWeatherMap API ] ──(Gagal/404)──► [ showError(pesan) & hideLoading() ]
                 │
                 ▼ (Sukses)
   ┌────────────────────────────────────────────────────────┐
   │ 1. Current Weather Endpoint (/weather)                 │
   │ 2. 5-Day Forecast Endpoint (/forecast)                 │
   └────────────────────────────────────────────────────────┘
                 │
                 ▼
      [ Transformasi Data Forecast (ES6 Array Methods) ]
      • Mengelompokkan 40 entri cuaca 3-jam ke grup per tanggal.
      • filter() : Menyaring 5 hari ke depan selain hari ini.
      • map()    : Mengekstrak data siang hari (12:00) & hitung min/max temp.
                 │
                 ▼
      [ Render ke DOM (Template Literals) ]
      • Update teks nama kota, suhu, deskripsi, parameter grid.
      • Pasang ikon cuaca resmi (dengan fallback error handler).
      • Render kartu-kartu ramalan 5 hari ke grid container.
      • Update kelas tema body: updateWeatherTheme(condition).
                 │
                 ▼
      [ Sinkronisasi LocalStorage ]
      • Simpan kota ke riwayat pencarian (tanpa duplikasi).
      • Render ulang komponen chip riwayat.
                 │
                 ▼
      [ hideLoading() - UI Siap Berinteraksi ]
```

---

## 🛠️ Standar Teknologi & Spesifikasi ES6+

Aplikasi ini dibangun murni tanpa framework eksternal, dengan mematuhi standar modern:

| Kategori | Implementasi pada Proyek |
| :--- | :--- |
| **Variabel Deklarasi** | Hanya menggunakan `const` dan `let`, sepenuhnya bebas dari `var`. |
| **Fungsi (Functions)** | Menggunakan *Arrow Functions* modern (`const fn = async () => { ... }`). |
| **String Formatting** | Menggunakan *Template Literals* (`` `${variable}` ``) untuk URL API dan rendering HTML. |
| **Destrukturisasi** | *Object & Array Destructuring* untuk membongkar respons data API (`const { name, main: { temp } } = data;`). |
| **Asynchronous JS** | Menggunakan `async/await` dipadukan dengan native `Fetch API` dan blok `try...catch`. |
| **Array Methods** | Menggunakan `filter()`, `map()`, `reduce()`, `forEach()`, dan `find()` dalam pengolahan data ramalan cuaca dan riwayat. |
| **Penyimpanan Lokal** | `window.localStorage` untuk menyimpan riwayat pencarian dan preferensi satuan suhu. |
| **Styling** | Vanilla CSS3 dengan CSS Variables, Flexbox, Grid, Glassmorphism (`backdrop-filter`), dan Animasi Keyframes. |
| **Ikon & Font** | Google Fonts (*Outfit* & *Plus Jakarta Sans*), Font Awesome 6 CDN. |

---

## 📁 Struktur Direktori File

```text
Weather App/
├── index.html          # Struktur markup semantik HTML5 (Header, Search, Weather Card, Forecast, Modal)
├── style.css           # Styling modern (CSS Variables, Glassmorphism, Responsive Media Queries)
├── script.js           # Logika aplikasi (Fetch API, ES6+, LocalStorage, Event Handlers, DOM Render)
├── PLAN.md             # Dokumen spesifikasi teknis dan roadmap pengerjaan tugas
├── README.md           # Dokumentasi lengkap proyek dan panduan penggunaan
└── assets/             # Direktori penyimpanan aset pendukung (gambar/ikon/media)
```

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Karena proyek ini berbasis *Client-Side* murni, Anda tidak perlu menginstall Node.js atau dependency backend:

### Opsi 1: Menggunakan Ekstensi VS Code Live Server (Sangat Disarankan)
1. Buka folder proyek ini di **Visual Studio Code**.
2. Pastikan ekstensi **Live Server** (oleh Ritwick Dey) sudah terpasang.
3. Buka file `index.html`, klik kanan di area editor, lalu pilih **"Open with Live Server"** (atau tekan shortcut `Alt + L, Alt + O`).
4. Web akan otomatis terbuka di browser pada alamat `http://127.0.0.1:5500/index.html`.

### Opsi 2: Buka Langsung File HTML di Browser
1. Buka folder proyek di File Explorer komputer Anda.
2. Klik ganda (double click) pada file `index.html`.
3. File akan langsung terbuka di browser default Anda (Chrome, Edge, Firefox, Brave, dll.).

---

## 🔑 Panduan Pengaturan API Key OpenWeatherMap

Aplikasi ini menggunakan layanan API resmi dari [OpenWeatherMap](https://openweathermap.org/).

Konfigurasi API Key terletak pada baris awal file `script.js`:

```javascript
const CONFIG = {
    // Masukkan API Key Anda di bawah ini:
    API_KEY: 'b190a0605344cc4f3af08d0dd473dd25', 
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    GEO_URL: 'https://api.openweathermap.org/geo/1.0',
    ICON_BASE_URL: 'https://openweathermap.org/img/wn',
    STORAGE_KEY_HISTORY: 'weather_app_search_history',
    STORAGE_KEY_UNIT: 'weather_app_unit',
    DEFAULT_CITY: 'Medan'
};
```

> **Catatan jika ingin menggunakan API Key sendiri:**
> 1. Daftar akun gratis di [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up).
> 2. Buka tab **API keys** di dashboard akun Anda dan salin kuncinya.
> 3. Ganti nilai `API_KEY` di file `script.js` dengan kunci baru Anda. *(Aktivasi API Key baru dari OpenWeatherMap biasanya membutuhkan waktu 10-30 menit sebelum aktif di server).*

---

## ❓ Tanya Jawab & Troubleshooting (FAQ)

**Q: Mengapa muncul pesan error "Kota tidak ditemukan"?**  
A: Pastikan ejaan nama kota sudah benar (contoh: ketik `Medan`, `Jakarta`, `Surabaya`, `Tokyo`, `Bandung`). Jika mengetik nama daerah kecil/kecamatan, coba gunakan nama kota atau kabupaten utamanya.

**Q: Mengapa tombol lokasi (Geolocation) tidak menampilkan cuaca saya?**  
A: Pastikan Anda telah mengklik **"Allow / Izinkan"** saat browser meminta akses lokasi. Jika ditolak, Anda dapat mengaktifkannya kembali di pengaturan izin situs (ikon gembok di samping kolom URL browser).

**Q: Apakah aplikasi ini dapat dibuka di Smartphone?**  
A: Ya, tata letak antarmuka dirancang dengan pendekatan *Mobile-First* yang otomatis menyesuaikan ukuran layar ponsel, tablet, maupun laptop/PC.

---

## 👨‍💻 Informasi Tugas & Identitas

- **Mata Kuliah**: Pemrograman Web
- **Semester / Blok**: Semester 3 - Blok 1
- **Topik Tugas**: Tugas Rutin 5 (Weather App dengan Fetch API & ES6+)
- **API Provider**: [OpenWeatherMap API](https://openweathermap.org/)
