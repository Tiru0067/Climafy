# Climafy 🌤️

A responsive weather dashboard that shows real-time weather data for any location worldwide.

**Live Demo:** https://climafy-weather.netlify.app

---

## What This Project Does

Climafy is a weather web app that automatically detects your location and displays current conditions along with forecasts. It supports unit customization and adapts to both light and dark themes.

- Auto-detects location via GPS or falls back to IP-based detection
- Displays current weather — temperature, humidity, wind speed, pressure
- Hourly weather breakdown for the current day
- 7-day weekly forecast
- Yesterday's temperature comparison
- Precipitation chart and temperature graph (powered by Recharts)
- Unit toggles — Celsius/Fahrenheit, km/h/mph, mm/inches, 12h/24h
- City search to check weather anywhere
- Light and dark theme support
- Fully responsive design

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| Recharts | Temperature and precipitation charts |
| Open-Meteo API | Free weather data (no API key needed) |
| Nominatim (OpenStreetMap) | Reverse geocoding |
| ipwho.is | IP-based location fallback |
| date-fns + Luxon | Date formatting and timezone handling |
| React Icons | Weather and UI icons |
| CSS Modules | Component scoped styling |

---

## Project Structure

```
climafy/
├── src/
│   ├── components/
│   │   ├── WeatherDashboard/    # Main layout
│   │   ├── CurrentWeather/      # Current conditions + hourly
│   │   ├── Forecast/            # 7-day forecast
│   │   ├── TemperatureChart/    # Temperature graph
│   │   ├── PrecipitationChart/  # Precipitation graph
│   │   ├── Precipitation/       # Precipitation details
│   │   ├── ComparisonByDay/     # Yesterday vs today
│   │   └── Header/              # Search + settings menu
│   ├── context/
│   │   ├── DataContext.jsx      # Weather data and location state
│   │   └── ThemeContext.jsx     # Light/dark theme state
│   ├── hooks/
│   │   └── useWindowSize.jsx    # Responsive layout hook
│   └── assets/
│       └── weatherIcons/        # Custom SVG weather icons
```

---

## Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/Tiru0067/Climafy.git
cd Climafy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

No API key needed — Open-Meteo is completely free and open.

---

## Key Design Decisions

### No API Key Required
Open-Meteo is a free, open weather API with no authentication needed. This makes the project easy to run locally without any setup beyond `npm install`.

### Dual Location Detection
The app first tries GPS via the browser's Geolocation API. If the user denies permission, it falls back to IP-based location using ipwho.is — so it always shows relevant weather.

### Context-Based Architecture
All weather data and settings are managed through React Context (DataContext and ThemeContext), keeping components clean and focused on rendering.

---

## Author

**Thirumalarao Parasavedi**
