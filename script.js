/**
 * Weather App - script.js
 * Spesifikasi Tugas Rutin 5: Weather App (Pemrograman Web)
 * 
 * Standar Teknis: ES6+ (const/let, arrow functions, template literals, destructuring, async/await, fetch)
 */

// ==========================================
// 1. KONFIGURASI API & STATE APLIKASI
// ==========================================
const CONFIG = {
    // Masukkan OpenWeatherMap API Key Anda di sini
    API_KEY: 'b190a0605344cc4f3af08d0dd473dd25', // API key default / user
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    GEO_URL: 'https://api.openweathermap.org/geo/1.0',
    ICON_BASE_URL: 'https://openweathermap.org/img/wn',
    STORAGE_KEY_HISTORY: 'weather_app_search_history',
    STORAGE_KEY_UNIT: 'weather_app_unit',
    DEFAULT_CITY: 'Medan'
};

// State Global Aplikasi
const appState = {
    currentUnit: 'metric', // 'metric' (°C) atau 'imperial' (°F)
    searchHistory: [],
    currentWeatherData: null,
    forecastData: []
};

// ==========================================
// 2. ELEMEN DOM (DOM REFERENCES)
// ==========================================
const DOM = {
    // Form & Input
    searchForm: document.getElementById('search-form'),
    cityInput: document.getElementById('city-input'),
    searchBtn: document.getElementById('search-btn'),
    clearInputBtn: document.getElementById('clear-input-btn'),
    currentLocationBtn: document.getElementById('current-location-btn'),

    // Unit Toggles
    unitCelsiusBtn: document.getElementById('unit-celsius-btn'),
    unitFahrenheitBtn: document.getElementById('unit-fahrenheit-btn'),

    // Search History
    searchHistoryContainer: document.getElementById('search-history-container'),
    historyChips: document.getElementById('history-chips'),
    clearHistoryBtn: document.getElementById('clear-history-btn'),

    // Feedback & Status
    errorBanner: document.getElementById('error-banner'),
    errorTitle: document.getElementById('error-title'),
    errorDesc: document.getElementById('error-desc'),
    closeErrorBtn: document.getElementById('close-error-btn'),
    loadingIndicator: document.getElementById('loading-indicator'),

    // Current Weather Display
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

    // Forecast
    forecastCardsContainer: document.getElementById('forecast-cards-container'),
    
    // Background
    appBackground: document.getElementById('app-background')
};

// ==========================================
// 3. INISIALISASI DASAR (FASE 1)
// ==========================================
const initApp = () => {
    console.log(' Weather App Initialized (Fase 1: Persiapan & Konfigurasi Dasar)');
    
    // Setup event listeners dasar untuk input
    DOM.cityInput?.addEventListener('input', (e) => {
        if (e.target.value.trim().length > 0) {
            DOM.clearInputBtn?.classList.remove('hidden');
        } else {
            DOM.clearInputBtn?.classList.add('hidden');
        }
    });

    DOM.clearInputBtn?.addEventListener('click', () => {
        DOM.cityInput.value = '';
        DOM.clearInputBtn.classList.add('hidden');
        DOM.cityInput.focus();
    });

    DOM.closeErrorBtn?.addEventListener('click', () => {
        DOM.errorBanner?.classList.add('hidden');
    });
};

// Jalankan ketika seluruh DOM siap
document.addEventListener('DOMContentLoaded', initApp);
