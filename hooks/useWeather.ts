import { WeatherCurrent, WeatherDaily, WeatherData, WeatherHourly } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';

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

export const useWeather = (lat: number, lon: number) => {
    return useQuery({
        queryKey: ['weather', lat, lon],
        queryFn: () => fetchWeather(lat, lon),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
