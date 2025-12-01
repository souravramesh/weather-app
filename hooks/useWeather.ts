import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

const WEATHER_STORAGE_KEY = 'weather_data';

export interface WeatherData {
    current: {
        temp: number;
        location: string;
        condition: string;
        weathercode: number;
        high: number;
        low: number;
        feelsLike: number;
    };
    stats: {
        windSpeed: string;
        rainChance: string;
        pressure: string;
        uvIndex: string;
    };
    hourly: Array<{
        time: string;
        temp: number;
        icon: string; // simple string for now, e.g., 'sun', 'cloud'
    }>;
    daily: Array<{
        day: string;
        date: string;
        high: number;
        low: number;
        condition: string;
        rainChance: number;
    }>;
    chartData: Array<{ x: number; y: number }>; // For the line chart
}

const MOCK_DATA: WeatherData = {
    current: {
        temp: 3,
        location: 'Kharkiv, Ukraine',
        condition: 'Sunny',
        weathercode: 0,
        high: 3,
        low: -1,
        feelsLike: -2,
    },
    stats: {
        windSpeed: '12km/h',
        rainChance: '24%',
        pressure: '720 hpa',
        uvIndex: '2,3',
    },
    hourly: [
        { time: 'Now', temp: 10, icon: 'sun' },
        { time: '10AM', temp: 8, icon: 'cloud-sun' },
        { time: '11AM', temp: 5, icon: 'cloud' },
        { time: '12PM', temp: 12, icon: 'sun' },
        { time: '1PM', temp: 9, icon: 'sun' },
        { time: '2PM', temp: 12, icon: 'cloud' },
    ],
    daily: [
        { day: 'Today', date: 'Jan 18', high: 3, low: -2, condition: 'Cloudy and Sunny', rainChance: 10 },
        { day: 'Thursday', date: 'Jan 19', high: 3, low: -2, condition: 'Cloudy', rainChance: 20 },
        { day: 'Thursday', date: 'Jan 20', high: 3, low: -2, condition: 'Cloudy', rainChance: 5 },
        { day: 'Thursday', date: 'Jan 21', high: 3, low: -2, condition: 'Cloudy and Sunny', rainChance: 0 },
        { day: 'Thursday', date: 'Jan 22', high: 3, low: -2, condition: 'Cloudy', rainChance: 60 },
        { day: 'Thursday', date: 'Jan 23', high: 3, low: -2, condition: 'Cloudy and Sunny', rainChance: 10 },
        { day: 'Thursday', date: 'Jan 23', high: 3, low: -2, condition: 'Cloudy and Sunny', rainChance: 10 },
    ],
    chartData: [
        { x: 0, y: -10 },
        { x: 1, y: 0 },
        { x: 2, y: 5 },
        { x: 3, y: 2 },
        { x: 4, y: 8 },
        { x: 5, y: 5 },
        { x: 6, y: 0 },
    ]
};

const fetchWeather = async (): Promise<WeatherData> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, we would fetch from API here
    // For now, return mock data
    return MOCK_DATA;
};

export const useWeather = () => {
    return useQuery({
        queryKey: ['weather'],
        queryFn: async () => {
            // Try to get from storage first for instant load (if we were persisting real data)
            // But for this mock, we'll just simulate the flow:
            // 1. Check storage (optional for mock, but good practice)
            // 2. Fetch new data
            // 3. Save to storage

            const stored = await AsyncStorage.getItem(WEATHER_STORAGE_KEY);
            if (stored) {
                // In real app, we might return stored data immediately and revalidate in background
                // React Query handles stale-while-revalidate well.
            }

            const data = await fetchWeather();
            await AsyncStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(data));
            return data;
        }
    });
};
