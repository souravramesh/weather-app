import { WeatherCurrent, WeatherDaily, WeatherData, WeatherHourly } from '@/types/weather';
import { getWeatherData, isCacheValid, saveWeatherData } from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,apparent_temperature,surface_pressure&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    const current: WeatherCurrent = {
        temp: Math.round(data.current.temperature_2m),
        windSpeed: Math.round(data.current.wind_speed_10m),
        weatherCode: data.current.weather_code,
        feelsLike: Math.round(data.current.apparent_temperature),
        pressure: Math.round(data.current.surface_pressure),
    };

    const hourly: WeatherHourly[] = data.hourly.time.slice(0, 48).map((time: string, index: number) => ({
        time: new Date(time).toLocaleTimeString([], { hour: 'numeric', hour12: true }),
        temp: Math.round(data.hourly.temperature_2m[index]),
        precipProb: data.hourly.precipitation_probability[index],
        humidity: data.hourly.relative_humidity_2m[index],
        weatherCode: data.hourly.weather_code[index],
    }));

    const daily: WeatherDaily[] = data.daily.time.map((time: string, index: number) => ({
        date: new Date(time).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
        max: Math.round(data.daily.temperature_2m_max[index]),
        min: Math.round(data.daily.temperature_2m_min[index]),
        sunrise: new Date(data.daily.sunrise[index]).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
        sunset: new Date(data.daily.sunset[index]).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
        sunriseRaw: data.daily.sunrise[index],
        sunsetRaw: data.daily.sunset[index],
        weatherCode: data.daily.weather_code[index],
    }));

    return { current, hourly, daily };
};

export interface UseWeatherResult {
    data: WeatherData | undefined;
    isLoading: boolean;
    error: Error | null;
    isFromCache: boolean;
    cacheTimestamp: number | null;
    refetch: () => void;
}

export const useWeather = (lat: number, lon: number): UseWeatherResult => {
    const [initialData, setInitialData] = useState<WeatherData | undefined>(undefined);
    const [isFromCache, setIsFromCache] = useState(false);
    const [cacheTimestamp, setCacheTimestamp] = useState<number | null>(null);

    // Load cached data on mount or when location changes
    useEffect(() => {
        const loadCachedData = async () => {
            const cached = await getWeatherData(lat, lon);
            console.log(cached, 'cached');

            if (cached) {
                setInitialData(cached.data);
                setIsFromCache(true);
                setCacheTimestamp(cached.timestamp);
            } else {
                setInitialData(undefined);
                setIsFromCache(false);
                setCacheTimestamp(null);
            }
        };

        loadCachedData();
    }, [lat, lon]);

    const query = useQuery({
        queryKey: ['weather', lat, lon],
        queryFn: async () => {
            const data = await fetchWeather(lat, lon);
            // Save to cache after successful fetch
            await saveWeatherData(lat, lon, data);
            setIsFromCache(false);
            setCacheTimestamp(Date.now());
            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Only fetch if we don't have valid cached data
        enabled: true,
        refetchOnMount: (query) => {
            // Don't refetch if we have valid cached data
            if (initialData && cacheTimestamp && isCacheValid(cacheTimestamp)) {
                return false;
            }
            return true;
        },
        // Use placeholderData instead of initialData to avoid cache conflicts
        placeholderData: initialData,
        retry: (failureCount, error) => {
            // Don't retry if we have cached data
            if (initialData) {
                return false;
            }
            return failureCount < 2;
        },
    });

    return {
        data: query.data,
        isLoading: query.isLoading && !initialData,
        error: query.error,
        isFromCache: isFromCache && !query.isFetching,
        cacheTimestamp,
        refetch: () => {
            setIsFromCache(false);
            query.refetch();
        },
    };
};