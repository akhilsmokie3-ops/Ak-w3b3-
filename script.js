// Default Timezones
const defaultTimezones = [
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'India', timezone: 'Asia/Kolkata' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'São Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Moscow', timezone: 'Europe/Moscow' }
];

// Common timezone list for suggestions
const commonTimezones = [
    'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Nairobi',
    'America/Anchorage', 'America/Chicago', 'America/Denver', 'America/Mexico_City',
    'America/New_York', 'America/Los_Angeles', 'America/Toronto', 'America/Vancouver',
    'America/Sao_Paulo', 'America/Buenos_Aires',
    'Asia/Bangkok', 'Asia/Dubai', 'Asia/Hong_Kong', 'Asia/Jakarta', 'Asia/Kolkata',
    'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Tokyo',
    'Australia/Melbourne', 'Australia/Sydney', 'Australia/Perth',
    'Europe/Amsterdam', 'Europe/Berlin', 'Europe/Istanbul', 'Europe/London',
    'Europe/Madrid', 'Europe/Moscow', 'Europe/Paris', 'Europe/Rome', 'Europe/Vienna',
    'Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Honolulu'
];

// State Management
let state = {
    timezones: defaultTimezones,
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    is24Hour: localStorage.getItem('is24Hour') === 'true',
    soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
    lastHourNotified: -1
};

// DOM Elements
const clocksGrid = document.getElementById('clocksGrid');
const themeToggle = document.getElementById('themeToggle');
const formatToggle = document.getElementById('formatToggle');
const soundToggle = document.getElementById('soundToggle');
const resetBtn = document.getElementById('resetBtn');
const timezoneInput = document.getElementById('timezoneInput');
const addBtn = document.getElementById('addBtn');
const timezoneList = document.getElementById('timezoneList');
const toast = document.getElementById('toast');
const localTime = document.getElementById('localTime');
const utcTime = document.getElementById('utcTime');
const lastUpdate = document.getElementById('lastUpdate');
const localTz = document.getElementById('localTz');
const localTimezone = document.getElementById('localTimezone');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupEventListeners();
    updateClocks();
    setInterval(updateClocks, 1000);
    detectLocalTimezone();
});

// Initialize Theme
function initializeTheme() {
    if (state.isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
    }

    updateFormatButton();
    updateSoundButton();
}

// Setup Event Listeners
function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
    formatToggle.addEventListener('click', toggleFormat);
    soundToggle.addEventListener('click', toggleSound);
    resetBtn.addEventListener('click', resetSettings);
    addBtn.addEventListener('click', addCustomTimezone);
    timezoneInput.addEventListener('input', handleTimezoneInput);
    timezoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addCustomTimezone();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 't') toggleTheme();
        if (e.key.toLowerCase() === 'f') toggleFormat();
        if (e.key.toLowerCase() === 's') toggleSound();
        if (e.key.toLowerCase() === 'r') resetSettings();
    });
}

// Theme Toggle
function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = state.isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', state.isDarkMode);
    showToast(`Switched to ${state.isDarkMode ? 'Dark' : 'Light'} Mode`);
}

// Format Toggle
function toggleFormat() {
    state.is24Hour = !state.is24Hour;
    updateFormatButton();
    localStorage.setItem('is24Hour', state.is24Hour);
    showToast(`Switched to ${state.is24Hour ? '24' : '12'}-hour format`);
    updateClocks();
}

function updateFormatButton() {
    formatToggle.textContent = state.is24Hour ? '24h' : '12h';
}

// Sound Toggle
function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    updateSoundButton();
    localStorage.setItem('soundEnabled', state.soundEnabled);
    showToast(`Sound notifications ${state.soundEnabled ? 'enabled' : 'disabled'}`);
}

function updateSoundButton() {
    soundToggle.textContent = state.soundEnabled ? '🔔' : '🔕';
}

// Reset Settings
function resetSettings() {
    if (confirm('Reset all settings to default?')) {
        state.timezones = [...defaultTimezones];
        state.isDarkMode = false;
        state.is24Hour = false;
        state.soundEnabled = true;
        
        localStorage.clear();
        location.reload();
    }
}

// Handle Timezone Input
function handleTimezoneInput() {
    const value = timezoneInput.value.toLowerCase().trim();
    
    if (value.length === 0) {
        timezoneList.classList.remove('show');
        return;
    }

    const filtered = commonTimezones.filter(tz => tz.toLowerCase().includes(value));
    
    if (filtered.length > 0) {
        timezoneList.innerHTML = filtered.map(tz => `
            <div class="timezone-suggestion" data-timezone="${tz}">${tz}</div>
        `).join('');
        timezoneList.classList.add('show');

        document.querySelectorAll('.timezone-suggestion').forEach(el => {
            el.addEventListener('click', () => {
                timezoneInput.value = el.getAttribute('data-timezone');
                timezoneList.classList.remove('show');
            });
        });
    } else {
        timezoneList.classList.remove('show');
    }
}

// Add Custom Timezone
function addCustomTimezone() {
    const timezone = timezoneInput.value.trim();
    
    if (!timezone) {
        showToast('Please enter a timezone');
        return;
    }

    if (!isValidTimezone(timezone)) {
        showToast('Invalid timezone format');
        return;
    }

    if (state.timezones.some(t => t.timezone === timezone)) {
        showToast('Timezone already added');
        return;
    }

    const cityName = timezone.split('/').pop().replace(/_/g, ' ');
    state.timezones.push({ name: cityName, timezone });
    
    timezoneInput.value = '';
    timezoneList.classList.remove('show');
    localStorage.setItem('customTimezones', JSON.stringify(state.timezones));
    updateClocks();
    showToast(`Added ${cityName}`);
}

// Validate Timezone
function isValidTimezone(tz) {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: tz });
        return true;
    } catch (ex) {
        return false;
    }
}

// Update All Clocks
function updateClocks() {
    const now = new Date();
    const clocksHTML = state.timezones.map(tz => createClockHTML(now, tz)).join('');
    clocksGrid.innerHTML = clocksHTML;

    // Add remove event listeners
    document.querySelectorAll('.clock-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const timezone = e.target.closest('.clock-card').dataset.timezone;
            removeTimezone(timezone);
        });
    });

    // Update local and UTC times
    updateTimeDisplays(now);

    // Check for hour change notification
    checkHourNotification(now);
}

// Create Clock HTML
function createClockHTML(now, { name, timezone }) {
    const timeString = getFormattedTime(now, timezone);
    const offset = getTimezoneOffset(timezone);
    
    return `
        <div class="clock-card" data-timezone="${timezone}">
            <button class="clock-remove" title="Remove">✕</button>
            <div class="clock-location">${name}</div>
            <div class="clock-time">${timeString}</div>
            <div class="clock-timezone">${timezone}</div>
            <div class="clock-offset">${offset}</div>
        </div>
    `;
}

// Get Formatted Time
function getFormattedTime(date, timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: state.is24Hour ? '2-digit' : 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: !state.is24Hour
    });

    const parts = formatter.formatToParts(date);
    const time = formatter.format(date);
    
    return time;
}

// Get Timezone Offset
function getTimezoneOffset(timezone) {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    
    const diffMs = tzDate - utcDate;
    const diffHours = diffMs / 3600000;
    const hours = Math.floor(Math.abs(diffHours));
    const minutes = Math.abs(diffMs % 3600000) / 60000;
    
    const sign = diffHours >= 0 ? '+' : '-';
    const minuteStr = minutes > 0 ? `:${String(minutes).padStart(2, '0')}` : '';
    
    return `UTC ${sign}${hours}${minuteStr}`;
}

// Update Time Displays
function updateTimeDisplays(now) {
    const localFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: state.is24Hour ? '2-digit' : 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: !state.is24Hour
    });

    const utcFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    localTime.textContent = localFormatter.format(now);
    utcTime.textContent = utcFormatter.format(now);
    lastUpdate.textContent = new Date().toLocaleTimeString();
}

// Detect Local Timezone
function detectLocalTimezone() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    localTz.textContent = tz;
    localTimezone.textContent = tz;
}

// Remove Timezone
function removeTimezone(timezone) {
    state.timezones = state.timezones.filter(t => t.timezone !== timezone);
    localStorage.setItem('customTimezones', JSON.stringify(state.timezones));
    updateClocks();
    showToast('Timezone removed');
}

// Check Hour Notification
function checkHourNotification(now) {
    const hour = now.getHours();
    
    if (state.soundEnabled && hour !== state.lastHourNotified) {
        state.lastHourNotified = hour;
        playNotificationSound();
    }
}

// Play Notification Sound
function playNotificationSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Show Toast Notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Load saved timezones on startup
window.addEventListener('load', () => {
    const saved = localStorage.getItem('customTimezones');
    if (saved) {
        try {
            state.timezones = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading saved timezones:', e);
        }
    }
    updateClocks();
});
