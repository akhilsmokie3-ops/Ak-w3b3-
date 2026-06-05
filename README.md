# Digital Clock - Multi Timezone Display

A modern, responsive web application that displays the current time in multiple time zones with real-time updates. Built with HTML5, CSS3, and vanilla JavaScript.

## Features

✨ **Key Features:**
- 🕐 Real-time clock updates every second
- 🌍 Display time in 12 major time zones simultaneously
- 🎨 Modern, clean UI with gradient backgrounds
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⏰ 12-hour and 24-hour format toggle
- 🔔 Optional audio notification on the hour
- 🎯 Smooth animations and transitions
- 💾 Settings persist in local storage
- ⌨️ Keyboard shortcuts for quick access

## Time Zones Included

- New York (EST/EDT)
- London (GMT/BST)
- Paris (CET/CEST)
- Dubai (GST)
- Tokyo (JST)
- Sydney (AEDT/AEST)
- Hong Kong (HKT)
- Singapore (SGT)
- India (IST)
- Los Angeles (PST/PDT)
- São Paulo (BRT)
- Moscow (MSK)

## Installation

1. Clone the repository
```bash
git clone https://github.com/akhilsmokie3-ops/Ak-w3b3-.git
cd Ak-w3b3-
```

2. Open `index.html` in your browser or use a local server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js with http-server
npx http-server

# Using Live Server in VS Code
# Install "Live Server" extension and right-click index.html → "Open with Live Server"
```

3. Navigate to `http://localhost:8000`

## File Structure

```
Ak-w3b3-/
├── index.html          # Main HTML file
├── styles.css          # Styling with responsive design
├── script.js           # JavaScript logic and time calculations
├── README.md           # This file
```

## Usage

- **Toggle Theme**: Click the theme button or press `T`
- **Toggle Format**: Click the format button or press `F`
- **Sound Toggle**: Click the sound icon or press `S`
- **Add Custom Timezone**: Use the input field to add more timezones
- **Real-time Update**: Clock updates every second automatically
- **Remove Timezone**: Hover over a clock card and click the ✕ button

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `T` | Toggle Dark/Light Mode |
| `F` | Toggle 12/24 Hour Format |
| `S` | Toggle Sound Notifications |
| `R` | Reset to Default Settings |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Customization

### Adding New Time Zones

Edit the `defaultTimezones` array in `script.js`:

```javascript
const defaultTimezones = [
  { name: 'Your City', timezone: 'Continent/City' }
];
```

### Changing Colors

Modify the CSS variables in `styles.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
}
```

### Common Timezone References

Here's a list of valid IANA timezone identifiers:

**Americas:**
- America/New_York, America/Chicago, America/Denver, America/Los_Angeles
- America/Toronto, America/Vancouver, America/Mexico_City
- America/Sao_Paulo, America/Buenos_Aires

**Europe:**
- Europe/London, Europe/Paris, Europe/Berlin, Europe/Madrid
- Europe/Rome, Europe/Vienna, Europe/Amsterdam, Europe/Istanbul, Europe/Moscow

**Asia:**
- Asia/Tokyo, Asia/Seoul, Asia/Shanghai, Asia/Hong_Kong, Asia/Bangkok
- Asia/Singapore, Asia/Dubai, Asia/Kolkata, Asia/Jakarta

**Australia/Pacific:**
- Australia/Sydney, Australia/Melbourne, Australia/Perth
- Pacific/Auckland, Pacific/Fiji, Pacific/Honolulu

## Features in Detail

### 🌓 Dark/Light Mode
Switch between dark and light themes with a single click. Your preference is saved automatically.

### 📊 Time Format
Toggle between 12-hour and 24-hour time formats. The setting persists across sessions.

### 🔔 Sound Notifications
Receive audio alerts on every hour (when enabled). Uses Web Audio API for cross-browser compatibility.

### 💾 Local Storage
All your preferences (theme, format, custom timezones) are saved locally and restored on next visit.

### ⌨️ Keyboard Navigation
Fully accessible with keyboard shortcuts for power users.

## Performance

- Minimal dependencies (zero external libraries)
- Lightweight and fast loading (~15KB total)
- Optimized for all devices
- Efficient DOM updates with single-pass rendering
- No external API calls required

## Technical Details

### Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Modern features (gradients, backdrop-filter, animations)
- **Vanilla JavaScript**: No frameworks or dependencies
- **Intl API**: Native timezone handling
- **Web Audio API**: Sound notifications

### Browser APIs Used
- `Intl.DateTimeFormat` - Timezone formatting
- `localStorage` - Persistent preferences
- `AudioContext` - Sound generation
- `requestAnimationFrame` - Smooth updates (via `setInterval`)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request with:
- New features
- Bug fixes
- Performance improvements
- Documentation enhancements

## Author

Created by **akhilsmokie3-ops**

## Support

If you encounter any issues or have suggestions:
1. Check the browser console for error messages
2. Ensure your browser supports ES6 and the Intl API
3. Try clearing local storage if you experience glitches
4. Open an issue on GitHub with details about your problem

---

**Enjoy tracking time across the globe! ⏱️🌍**
