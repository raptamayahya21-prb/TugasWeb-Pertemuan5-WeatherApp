/**
 * Weather App - script.js
 * Spesifikasi Tugas Rutin 5: Weather App (Pemrograman Web)
 * 
 * Standar Teknis: ES6+ (const/let, arrow functions, template literals, destructuring, async/await, fetch, array methods)
 */

// ==========================================
// 1. KONFIGURASI API & STATE APLIKASI
// ==========================================
const CONFIG = {
    API_KEY: 'b190a0605344cc4f3af08d0dd473dd25', // OpenWeatherMap API Key
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    GEO_URL: 'https://api.openweathermap.org/geo/1.0',
    ICON_BASE_URL: 'https://openweathermap.org/img/wn',
    STORAGE_KEY_HISTORY: 'weather_app_search_history',
    STORAGE_KEY_UNIT: 'weather_app_unit',
    DEFAULT_CITY: 'Medan'
};

// State Global Aplikasi
const appState = {
    currentUnit: 'metric', // 'metric' (°C, m/s) atau 'imperial' (°F, mph)
    currentCity: '',
    currentCoords: null, // { lat, lon }
    currentWeatherData: null,
    forecastData: [],
    searchHistory: []
};

// ==========================================
// 2. REFERENSI ELEMEN DOM (DOM REFERENCES)
// ==========================================
const DOM = {
    // Form & Input Pencarian
    searchForm: document.getElementById('search-form'),
    cityInput: document.getElementById('city-input'),
    searchBtn: document.getElementById('search-btn'),
    clearInputBtn: document.getElementById('clear-input-btn'),
    currentLocationBtn: document.getElementById('current-location-btn'),

    // Toggle Satuan Suhu
    unitCelsiusBtn: document.getElementById('unit-celsius-btn'),
    unitFahrenheitBtn: document.getElementById('unit-fahrenheit-btn'),

    // Riwayat Pencarian
    searchHistoryContainer: document.getElementById('search-history-container'),
    historyChips: document.getElementById('history-chips'),
    clearHistoryBtn: document.getElementById('clear-history-btn'),

    // Feedback, Loading & Error States
    errorBanner: document.getElementById('error-banner'),
    errorTitle: document.getElementById('error-title'),
    errorDesc: document.getElementById('error-desc'),
    closeErrorBtn: document.getElementById('close-error-btn'),
    loadingIndicator: document.getElementById('loading-indicator'),

    // Weather Display Content
    weatherContent: document.getElementById('weather-content'),
    cityName: document.getElementById('city-name'),
    dateTime: document.getElementById('date-time'),
    weatherMainBadge: document.getElementById('weather-main-badge'),
    currentTemp: document.getElementById('current-temp'),
    tempUnit: document.getElementById('temp-unit'),
    weatherIconImg: document.getElementById('current-weather-icon'),
    weatherFallbackIcon: document.getElementById('current-weather-fallback-icon'),
    weatherDesc: document.getElementById('weather-description'),
    feelsLikeVal: document.getElementById('feels-like-val'),
    humidityVal: document.getElementById('humidity-val'),
    windSpeedVal: document.getElementById('wind-speed-val'),
    pressureVal: document.getElementById('pressure-val'),

    // Forecast Container
    forecastCardsContainer: document.getElementById('forecast-cards-container'),
    
    // Background Elements
    appBackground: document.getElementById('app-background')
};

// ==========================================
// 3. UI STATE MANAGERS (LOADING & ERROR)
// ==========================================
const showLoading = () => {
    DOM.loadingIndicator?.classList.remove('hidden');
    DOM.weatherContent?.classList.add('hidden');
    hideError();
};

const hideLoading = () => {
    DOM.loadingIndicator?.classList.add('hidden');
    DOM.weatherContent?.classList.remove('hidden');
};

const showError = (title = 'Terjadi Kesalahan', message = 'Gagal memuat data cuaca.') => {
    if (DOM.errorTitle) DOM.errorTitle.textContent = title;
    if (DOM.errorDesc) DOM.errorDesc.textContent = message;
    DOM.errorBanner?.classList.remove('hidden');
};

const hideError = () => {
    DOM.errorBanner?.classList.add('hidden');
};

// ==========================================
// 4. FORMATTER & HELPER FUNCTIONS (ES6+)
// ==========================================
const formatDate = (timestamp, timezoneOffset = 0) => {
    // Hitung waktu lokal berdasarkan offset timezone dari API
    const localDate = new Date((timestamp + timezoneOffset) * 1000);
    const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        timeZone: 'UTC'
    };
    return localDate.toLocaleDateString('id-ID', options);
};

const formatDayName = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('id-ID', { weekday: 'short' });
};

const formatShortDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

// Update Dynamic Theme Background sesuai kondisi cuaca
const updateWeatherTheme = (condition = '') => {
    const mainCondition = condition.toLowerCase();
    const bodyClasses = document.body.classList;
    
    // Reset semua class theme
    bodyClasses.remove(
        'theme-clear', 
        'theme-clouds', 
        'theme-rain', 
        'theme-drizzle', 
        'theme-thunderstorm', 
        'theme-snow', 
        'theme-mist'
    );

    if (mainCondition.includes('clear')) {
        bodyClasses.add('theme-clear');
    } else if (mainCondition.includes('cloud')) {
        bodyClasses.add('theme-clouds');
    } else if (mainCondition.includes('rain')) {
        bodyClasses.add('theme-rain');
    } else if (mainCondition.includes('drizzle')) {
        bodyClasses.add('theme-drizzle');
    } else if (mainCondition.includes('thunderstorm')) {
        bodyClasses.add('theme-thunderstorm');
    } else if (mainCondition.includes('snow')) {
        bodyClasses.add('theme-snow');
    } else if (['mist', 'smoke', 'haze', 'dust', 'fog', 'sand', 'ash', 'squall', 'tornado'].some(c => mainCondition.includes(c))) {
        bodyClasses.add('theme-mist');
    }
};

// Mapping Font Awesome Icon sebagai fallback
const getWeatherIconClass = (iconCode = '') => {
    const iconMap = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud-meatball',
        '04n': 'fa-cloud-meatball',
        '09d': 'fa-cloud-showers-heavy',
        '09n': 'fa-cloud-showers-heavy',
        '10d': 'fa-cloud-sun-rain',
        '10n': 'fa-cloud-moon-rain',
        '11d': 'fa-bolt-lightning',
        '11n': 'fa-bolt-lightning',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog'
    };
    return iconMap[iconCode] || 'fa-cloud-sun';
};

// ==========================================
// 5. FETCH API MODULE (ASYNC / AWAIT)
// ==========================================

// Mengambil data cuaca saat ini berdasarkan nama kota
const fetchCurrentWeather = async (city, unit = appState.currentUnit) => {
    const url = `${CONFIG.BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&lang=id&appid=${CONFIG.API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Kota "${city}" tidak ditemukan. Pastikan ejaan sudah benar.`);
        } else if (response.status === 401) {
            throw new Error('API Key OpenWeatherMap tidak valid atau belum aktif.');
        } else {
            throw new Error(`Terjadi kesalahan server (Kode: ${response.status}).`);
        }
    }
    return await response.json();
};

// Mengambil data ramalan cuaca 5 hari berdasarkan koordinat (lat, lon) atau nama kota
const fetch5DayForecast = async (lat, lon, unit = appState.currentUnit) => {
    const url = `${CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&lang=id&appid=${CONFIG.API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Gagal mengambil data ramalan cuaca 5 hari.');
    }
    return await response.json();
};

// Mengambil cuaca saat ini berdasarkan Geolocation koordinat (lat, lon)
const fetchCurrentWeatherByCoords = async (lat, lon, unit = appState.currentUnit) => {
    const url = `${CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&lang=id&appid=${CONFIG.API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Gagal mengambil data cuaca dari lokasi Anda.');
    }
    return await response.json();
};

// ==========================================
// 6. DATA TRANSFORMATION (ARRAY METHODS)
// ==========================================

/**
 * Memproses 40 entri data forecast 3-jam menjadi 5 hari unik
 * Menggunakan ES6+ Array Methods: filter() dan map()
 */
const process5DayForecastData = (forecastList) => {
    if (!Array.isArray(forecastList)) return [];

    // Ambil tanggal hari ini dalam format YYYY-MM-DD
    const todayStr = new Date().toISOString().split('T')[0];

    // Kelompokkan data berdasarkan tanggal (YYYY-MM-DD)
    const dailyGroups = {};
    forecastList.forEach((item) => {
        const dateKey = item.dt_txt.split(' ')[0];
        if (!dailyGroups[dateKey]) {
            dailyGroups[dateKey] = [];
        }
        dailyGroups[dateKey].push(item);
    });

    // Mengambil tanggal hari ke depan (tidak termasuk hari ini jika sudah lewat tengah hari)
    const distinctDates = Object.keys(dailyGroups).filter(dateKey => dateKey !== todayStr).slice(0, 5);
    
    // Jika data tidak mencukupi 5 hari, fallback ambil seluruh 5 tanggal teratas
    const targetDates = distinctDates.length >= 5 ? distinctDates : Object.keys(dailyGroups).slice(0, 5);

    // Transformasi data per hari menggunakan map()
    return targetDates.map((dateKey) => {
        const dayEntries = dailyGroups[dateKey];
        
        // Cari entry di sekitar siang hari (12:00:00) sebagai representasi cuaca hari tersebut
        const midDayEntry = dayEntries.find(entry => entry.dt_txt.includes('12:00:00')) || dayEntries[Math.floor(dayEntries.length / 2)];
        
        // Hitung suhu maksimal dan minimal sepanjang hari tersebut menggunakan reduce()
        const temps = dayEntries.map(e => e.main.temp);
        const maxTemp = Math.round(Math.max(...temps));
        const minTemp = Math.round(Math.min(...temps));

        const { weather } = midDayEntry;
        const [weatherDetail] = weather;

        return {
            dateStr: dateKey,
            dayName: formatDayName(dateKey),
            formattedDate: formatShortDate(dateKey),
            tempMax: maxTemp,
            tempMin: minTemp,
            mainCondition: weatherDetail.main,
            description: weatherDetail.description,
            iconCode: weatherDetail.icon
        };
    });
};

// ==========================================
// 7. DOM RENDERING (TEMPLATE LITERALS)
// ==========================================

// Render data cuaca saat ini ke kartu utama
const renderCurrentWeather = (data) => {
    // Destrukturisasi objek data respons API
    const { 
        name, 
        sys: { country }, 
        main: { temp, feels_like, humidity, pressure }, 
        weather, 
        wind: { speed }, 
        dt, 
        timezone 
    } = data;

    const [weatherInfo] = weather;
    const { main: mainCondition, description, icon: iconCode } = weatherInfo;

    // Satuan yang sesuai
    const unitSymbol = appState.currentUnit === 'metric' ? '°C' : '°F';
    const windSpeedUnit = appState.currentUnit === 'metric' ? 'm/s' : 'mph';

    // Update Text Content
    if (DOM.cityName) DOM.cityName.textContent = `${name}, ${country}`;
    if (DOM.dateTime) DOM.dateTime.textContent = formatDate(dt, timezone);
    if (DOM.weatherMainBadge) DOM.weatherMainBadge.textContent = mainCondition;
    if (DOM.currentTemp) DOM.currentTemp.textContent = Math.round(temp);
    if (DOM.tempUnit) DOM.tempUnit.textContent = unitSymbol;
    if (DOM.weatherDesc) DOM.weatherDesc.textContent = description;
    
    // Grid Details
    if (DOM.feelsLikeVal) DOM.feelsLikeVal.textContent = `${Math.round(feels_like)}${unitSymbol}`;
    if (DOM.humidityVal) DOM.humidityVal.textContent = `${humidity}%`;
    if (DOM.windSpeedVal) DOM.windSpeedVal.textContent = `${speed} ${windSpeedUnit}`;
    if (DOM.pressureVal) DOM.pressureVal.textContent = `${pressure} hPa`;

    // Render Ikon Cuaca
    if (DOM.weatherIconImg && DOM.weatherFallbackIcon) {
        DOM.weatherIconImg.src = `${CONFIG.ICON_BASE_URL}/${iconCode}@2x.png`;
        DOM.weatherIconImg.alt = description;
        DOM.weatherIconImg.style.display = 'block';
        DOM.weatherFallbackIcon.style.display = 'none';

        DOM.weatherIconImg.onerror = () => {
            DOM.weatherIconImg.style.display = 'none';
            DOM.weatherFallbackIcon.className = `fa-solid ${getWeatherIconClass(iconCode)} weather-icon-fallback`;
            DOM.weatherFallbackIcon.style.display = 'block';
        };
    }

    // Update Tema Latar Belakang
    updateWeatherTheme(mainCondition);
};

// Render kartu ramalan cuaca 5 hari menggunakan Template Literals & map()
const render5DayForecast = (processedForecastList) => {
    if (!DOM.forecastCardsContainer) return;

    if (!processedForecastList || processedForecastList.length === 0) {
        DOM.forecastCardsContainer.innerHTML = `
            <div class="forecast-placeholder">
                <p>Data ramalan cuaca tidak tersedia.</p>
            </div>
        `;
        return;
    }

    const unitSymbol = appState.currentUnit === 'metric' ? '°' : '°';

    // Generate HTML card menggunakan map() dan join()
    const cardsHTML = processedForecastList.map(item => `
        <div class="forecast-card" title="${item.description}">
            <span class="forecast-day">${item.dayName}</span>
            <span class="forecast-date">${item.formattedDate}</span>
            <div class="forecast-icon-wrapper">
                <img 
                    src="${CONFIG.ICON_BASE_URL}/${item.iconCode}.png" 
                    alt="${item.description}" 
                    class="forecast-icon"
                    loading="lazy"
                    onerror="this.style.display='none'"
                >
            </div>
            <div class="forecast-temp-range">
                <span class="forecast-temp-max">${item.tempMax}${unitSymbol}</span>
                <span class="forecast-temp-min">${item.tempMin}${unitSymbol}</span>
            </div>
            <span class="forecast-desc">${item.description}</span>
        </div>
    `).join('');

    DOM.forecastCardsContainer.innerHTML = cardsHTML;
};

// ==========================================
// 8. MASTER WEATHER CONTROLLER
// ==========================================

// Fungsi koordinator utama untuk fetch & render cuaca berdasarkan nama kota
const getWeatherData = async (cityName) => {
    const queryCity = cityName ? cityName.trim() : '';
    if (!queryCity) {
        showError('Pencarian Kosong', 'Silakan ketik nama kota yang ingin dicari.');
        return;
    }

    showLoading();

    try {
        // 1. Ambil data cuaca saat ini
        const currentWeather = await fetchCurrentWeather(queryCity, appState.currentUnit);
        appState.currentWeatherData = currentWeather;
        appState.currentCity = currentWeather.name;
        appState.currentCoords = {
            lat: currentWeather.coord.lat,
            lon: currentWeather.coord.lon
        };

        // 2. Ambil data ramalan cuaca 5 hari berdasarkan koordinat kota
        const forecastRaw = await fetch5DayForecast(
            currentWeather.coord.lat, 
            currentWeather.coord.lon, 
            appState.currentUnit
        );
        const processedForecast = process5DayForecastData(forecastRaw.list);
        appState.forecastData = processedForecast;

        // 3. Render ke DOM
        renderCurrentWeather(currentWeather);
        render5DayForecast(processedForecast);

        // 4. Update UI & simpan riwayat pencarian (akan dihubungkan ke LocalStorage di Fase 4)
        saveToSearchHistory(currentWeather.name);

        hideLoading();
    } catch (error) {
        console.error('Error saat mengambil cuaca:', error);
        hideLoading();
        showError('Gagal Memuat Cuaca', error.message || 'Terjadi gangguan jaringan atau server.');
    }
};

// Fungsi koordinator utama untuk fetch & render cuaca berdasarkan koordinat (Geolocation)
const getWeatherByCoords = async (latitude, longitude) => {
    showLoading();

    try {
        const currentWeather = await fetchCurrentWeatherByCoords(latitude, longitude, appState.currentUnit);
        appState.currentWeatherData = currentWeather;
        appState.currentCity = currentWeather.name;
        appState.currentCoords = { lat: latitude, lon: longitude };

        const forecastRaw = await fetch5DayForecast(latitude, longitude, appState.currentUnit);
        const processedForecast = process5DayForecastData(forecastRaw.list);
        appState.forecastData = processedForecast;

        renderCurrentWeather(currentWeather);
        render5DayForecast(processedForecast);
        saveToSearchHistory(currentWeather.name);

        hideLoading();
    } catch (error) {
        console.error('Error cuaca koordinat:', error);
        hideLoading();
        showError('Gagal Mendeteksi Lokasi', error.message || 'Tidak dapat mengambil cuaca untuk koordinat saat ini.');
    }
};

// ==========================================
// 9. RIWAYAT PENCARIAN (SEARCH HISTORY)
// ==========================================
const loadSearchHistory = () => {
    try {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEY_HISTORY);
        if (saved) {
            appState.searchHistory = JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Gagal membaca localStorage:', e);
        appState.searchHistory = [];
    }
    renderSearchHistory();
};

const saveToSearchHistory = (cityName) => {
    if (!cityName) return;
    
    // Filter agar tidak ada duplikasi nama kota
    const filtered = appState.searchHistory.filter(
        c => c.toLowerCase() !== cityName.toLowerCase()
    );

    // Tambahkan kota terbaru di awal (maksimal 6 riwayat)
    appState.searchHistory = [cityName, ...filtered].slice(0, 6);

    try {
        localStorage.setItem(CONFIG.STORAGE_KEY_HISTORY, JSON.stringify(appState.searchHistory));
    } catch (e) {
        console.warn('Gagal menyimpan ke localStorage:', e);
    }

    renderSearchHistory();
};

const removeSingleHistory = (cityToRemove) => {
    appState.searchHistory = appState.searchHistory.filter(
        c => c.toLowerCase() !== cityToRemove.toLowerCase()
    );
    try {
        localStorage.setItem(CONFIG.STORAGE_KEY_HISTORY, JSON.stringify(appState.searchHistory));
    } catch (e) {
        console.warn(e);
    }
    renderSearchHistory();
};

const clearAllSearchHistory = () => {
    appState.searchHistory = [];
    try {
        localStorage.removeItem(CONFIG.STORAGE_KEY_HISTORY);
    } catch (e) {
        console.warn(e);
    }
    renderSearchHistory();
};

const renderSearchHistory = () => {
    if (!DOM.searchHistoryContainer || !DOM.historyChips) return;

    if (appState.searchHistory.length === 0) {
        DOM.searchHistoryContainer.classList.add('hidden');
        DOM.historyChips.innerHTML = '';
        return;
    }

    DOM.searchHistoryContainer.classList.remove('hidden');
    DOM.historyChips.innerHTML = appState.searchHistory.map(city => `
        <span class="history-chip" data-city="${city}">
            <i class="fa-solid fa-location-dot"></i>
            <span>${city}</span>
            <i class="fa-solid fa-xmark history-chip-remove" data-remove="${city}" title="Hapus ${city}"></i>
        </span>
    `).join('');
};

// ==========================================
// 10. TOGGLE SATUAN SUHU (°C / °F)
// ==========================================
const setTemperatureUnit = (unit) => {
    if (appState.currentUnit === unit) return;

    appState.currentUnit = unit;
    try {
        localStorage.setItem(CONFIG.STORAGE_KEY_UNIT, unit);
    } catch (e) {
        console.warn(e);
    }

    // Update class active pada tombol toggle
    if (unit === 'metric') {
        DOM.unitCelsiusBtn?.classList.add('active');
        DOM.unitFahrenheitBtn?.classList.remove('active');
    } else {
        DOM.unitCelsiusBtn?.classList.remove('active');
        DOM.unitFahrenheitBtn?.classList.add('active');
    }

    // Refresh cuaca dengan satuan baru jika ada kota yang sedang ditampilkan
    if (appState.currentCity) {
        getWeatherData(appState.currentCity);
    }
};

const loadSavedUnit = () => {
    try {
        const savedUnit = localStorage.getItem(CONFIG.STORAGE_KEY_UNIT);
        if (savedUnit && (savedUnit === 'metric' || savedUnit === 'imperial')) {
            appState.currentUnit = savedUnit;
        }
    } catch (e) {
        console.warn(e);
    }

    if (appState.currentUnit === 'metric') {
        DOM.unitCelsiusBtn?.classList.add('active');
        DOM.unitFahrenheitBtn?.classList.remove('active');
    } else {
        DOM.unitCelsiusBtn?.classList.remove('active');
        DOM.unitFahrenheitBtn?.classList.add('active');
    }
};

// ==========================================
// 11. GEOLOCATION HANDLER
// ==========================================
const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
        showError('Geolocation Tidak Didukung', 'Browser Anda tidak mendukung deteksi lokasi otomatis.');
        return;
    }

    showLoading();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        },
        (error) => {
            console.warn('Geolocation Error:', error);
            hideLoading();
            let msg = 'Izin akses lokasi ditolak.';
            if (error.code === error.POSITION_UNAVAILABLE) msg = 'Informasi lokasi tidak tersedia.';
            if (error.code === error.TIMEOUT) msg = 'Waktu permintaan lokasi habis.';
            showError('Gagal Mengakses Lokasi', `${msg} Menampilkan kota default (${CONFIG.DEFAULT_CITY}).`);
            getWeatherData(CONFIG.DEFAULT_CITY);
        },
        { timeout: 10000, enableHighAccuracy: true }
    );
};

// ==========================================
// 12. EVENT LISTENERS SETUP
// ==========================================
const setupEventListeners = () => {
    // 1. Submit Form Pencarian
    DOM.searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = DOM.cityInput?.value.trim();
        if (city) {
            getWeatherData(city);
            DOM.cityInput?.blur();
        } else {
            showError('Input Kosong', 'Ketikkan nama kota terlebih dahulu.');
        }
    });

    // 2. Input change untuk menampilkan/menyembunyikan tombol Clear
    DOM.cityInput?.addEventListener('input', (e) => {
        if (e.target.value.trim().length > 0) {
            DOM.clearInputBtn?.classList.remove('hidden');
        } else {
            DOM.clearInputBtn?.classList.add('hidden');
        }
    });

    // 3. Tombol Clear Input
    DOM.clearInputBtn?.addEventListener('click', () => {
        if (DOM.cityInput) {
            DOM.cityInput.value = '';
            DOM.clearInputBtn?.classList.add('hidden');
            DOM.cityInput.focus();
        }
    });

    // 4. Tombol Geolocation
    DOM.currentLocationBtn?.addEventListener('click', handleCurrentLocation);

    // 5. Tombol Close Error Banner
    DOM.closeErrorBtn?.addEventListener('click', hideError);

    // 6. Unit Toggles (°C / °F)
    DOM.unitCelsiusBtn?.addEventListener('click', () => setTemperatureUnit('metric'));
    DOM.unitFahrenheitBtn?.addEventListener('click', () => setTemperatureUnit('imperial'));

    // 7. Klik pada Chip Riwayat Pencarian & Hapus Satu per Satu (Event Delegation)
    DOM.historyChips?.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('[data-remove]');
        if (removeBtn) {
            e.stopPropagation();
            const cityToRemove = removeBtn.getAttribute('data-remove');
            removeSingleHistory(cityToRemove);
            return;
        }

        const chip = e.target.closest('[data-city]');
        if (chip) {
            const selectedCity = chip.getAttribute('data-city');
            if (DOM.cityInput) DOM.cityInput.value = selectedCity;
            getWeatherData(selectedCity);
        }
    });

    // 8. Hapus Semua Riwayat Pencarian
    DOM.clearHistoryBtn?.addEventListener('click', clearAllSearchHistory);

    // 9. Deteksi Status Jaringan (Online / Offline)
    window.addEventListener('offline', () => {
        showError('Koneksi Terputus', 'Perangkat Anda sedang offline. Silakan periksa sambungan internet Anda.');
    });

    window.addEventListener('online', () => {
        hideError();
    });
};

// ==========================================
// 13. INISIALISASI UTAMA APLIKASI
// ==========================================
const initApp = () => {
    console.log(' AuraWeather App Ready (ES6+ Architecture Loaded)');
    
    // Inisialisasi konfigurasi tersimpan
    loadSavedUnit();
    loadSearchHistory();
    setupEventListeners();

    // Muat data cuaca awal (Default City: Medan)
    getWeatherData(CONFIG.DEFAULT_CITY);
};

// Jalankan ketika seluruh DOM siap
document.addEventListener('DOMContentLoaded', initApp);
