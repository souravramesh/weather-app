# ☀️ Weather App

A beautiful, modern weather application built with React Native and Expo, featuring smooth animations, real-time weather data, and an intuitive user interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Expo](https://img.shields.io/badge/expo-~54.0.25-000020.svg)
![React Native](https://img.shields.io/badge/react--native-0.81.5-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-~5.9.2-3178c6.svg)

## 📖 Description

This weather application provides real-time weather information with a stunning, animated user interface. Built with React Native and Expo, it features location-based weather forecasts, hourly and daily predictions, and interactive visualizations. The app uses the Open-Meteo API for accurate weather data and implements modern mobile development patterns including React Query for data fetching and Reanimated for smooth animations.

## ✨ Key Features

- **📍 Location Services**: Automatic location detection with manual search capability
- **🌡️ Real-time Weather Data**: Current temperature, feels-like temperature, wind speed, humidity, and pressure
- **📊 Interactive Charts**: Visualize daily temperature trends with D3-powered charts
- **⏰ Hourly Forecasts**: 24-hour and 48-hour weather predictions
- **📅 10-Day Forecast**: Extended weather outlook with high/low temperatures
- **🌅 Sunrise/Sunset Times**: Daily sun times with visual indicators
- **🌧️ Precipitation Probability**: Hourly rain chance visualization
- **🎨 Animated Hero Section**: Dynamic background with smooth scroll animations
- **🔍 Location Search**: Search and select weather for any location worldwide
- **📱 Responsive Design**: Optimized for various screen sizes

## 🛠️ Tech Stack

### Core Technologies
- **React Native** (0.81.5) - Mobile app framework
- **Expo** (~54.0.25) - Development platform
- **TypeScript** (~5.9.2) - Type-safe JavaScript

### State Management & Data Fetching
- **@tanstack/react-query** (^5.90.11) - Server state management

### UI & Animations
- **react-native-reanimated** (~4.1.1) - High-performance animations
- **react-native-svg** (^15.12.1) - SVG rendering

### Data Visualization
- **d3-scale** (^4.0.2) - Data scaling utilities
- **d3-shape** (^3.2.0) - Chart shape generation

### Navigation & Routing
- **expo-router** (~6.0.15) - File-based routing
- **@react-navigation/native** (^7.1.8) - Navigation framework

### Location Services
- **expo-location** (^19.0.7) - Geolocation API

### Fonts & Icons
- **@expo-google-fonts/inter** (^0.4.2) - Custom typography
- **@expo/vector-icons** (^15.0.3) - Icon library

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

### Environment Variables

This app uses the public Open-Meteo API which doesn't require API keys. No environment variables are needed for basic functionality.

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
```

## 📁 Folder Structure

```
weather-app/
├── app/                      # Main application screens
│   └── index.tsx            # Primary weather screen
├── components/              # Reusable components
│   ├── common/             # Generic UI components
│   │   ├── FlexView.tsx    # Flexible container component
│   │   ├── StyledText.tsx  # Typography component
│   │   └── Divider.tsx     # Divider component
│   └── weather/            # Weather-specific components
│       ├── HeroSection.tsx        # Animated header with current weather
│       ├── Header.tsx             # Navigation header
│       ├── HourlyForecast.tsx     # Hourly weather cards
│       ├── DayForecastCard.tsx    # Daily temperature chart
│       ├── TenDayForecast.tsx     # 10-day forecast list
│       ├── ChanceOfRainCard.tsx   # Precipitation visualization
│       ├── StatTiles.tsx          # Weather statistics grid
│       ├── SunTimes.tsx           # Sunrise/sunset cards
│       ├── SegmentedTabs.tsx      # Tab navigation
│       └── LocationSearch.tsx     # Location search modal
├── hooks/                   # Custom React hooks
│   ├── useWeather.ts       # Weather data fetching hook
│   └── useLocation.ts      # Location services hook
├── types/                   # TypeScript type definitions
│   ├── weather.ts          # Weather data types
│   └── svg.d.ts            # SVG module declarations
├── utils/                   # Utility functions
│   └── weatherCodes.ts     # Weather code mappings
├── constants/              # App constants
│   └── Colors.ts           # Color palette
├── assets/                 # Static assets
│   ├── icons/             # SVG icons
│   └── images/            # Images and graphics
└── package.json           # Project dependencies
```

## 🌐 API Used

### Open-Meteo Weather API

**Base URL**: `https://api.open-meteo.com/v1/forecast`

**Endpoint**: `/forecast`

**Parameters**:
- `latitude` - Location latitude
- `longitude` - Location longitude
- `current` - Current weather parameters (temperature, wind speed, weather code, feels-like, pressure)
- `hourly` - Hourly forecast parameters (temperature, precipitation probability, humidity, weather code)
- `daily` - Daily forecast parameters (weather code, max/min temperature, sunrise, sunset)
- `timezone` - Automatic timezone detection

**Example Request**:
```
https://api.open-meteo.com/v1/forecast?latitude=49.9935&longitude=36.2304&current=temperature_2m,weather_code,wind_speed_10m,apparent_temperature,surface_pressure&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto
```

**Data Caching**: Weather data is cached for 5 minutes using React Query to minimize API calls and improve performance.

### Open-Meteo Geocoding API

**Base URL**: `https://geocoding-api.open-meteo.com/v1/search`

**Purpose**: Location search and coordinate lookup

**Parameters**:
- `name` - Location name to search
- `count` - Number of results to return

## 🎨 Additional Notes

### Design System

- **Color Palette**: Custom gradient-based color scheme with purple primary colors
- **Typography**: Inter font family for clean, modern text rendering
- **Spacing**: Consistent 16px padding and gap system
- **Border Radius**: 24px for cards, creating a soft, modern aesthetic

### Animations

The app features extensive animations powered by React Native Reanimated:

- **Scroll-based Hero Animation**: Hero section transforms as user scrolls
- **Dynamic Header**: Header changes appearance based on scroll position
- **Smooth Transitions**: Tab switching and component mounting animations
- **Chart Animations**: D3-powered temperature chart with gradient fills

### Performance Optimizations

- **React Query**: Intelligent data caching and background refetching
- **Optimized Re-renders**: Shared values and worklets for 60fps animations

### Weather Code Mapping

The app includes a comprehensive weather code utility that maps Open-Meteo weather codes to:
- Human-readable descriptions (e.g., "Clear sky", "Partly cloudy", "Thunderstorm")
- Appropriate weather icons
- Visual indicators


## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a personal project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Built with ❤️ using React Native and Expo**
