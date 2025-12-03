import { WeatherData } from '@/types/weather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
const STORAGE_KEY_PREFIX = 'weather_cache_';

interface CachedWeatherData {
    data: WeatherData;
    timestamp: number;
    location: {
        lat: number;
        lon: number;
    };
}

/**
 * Generate a storage key based on location coordinates
 */
const getStorageKey = (lat: number, lon: number): string => {
    return `${STORAGE_KEY_PREFIX}${lat.toFixed(4)}_${lon.toFixed(4)}`;
};

/**
 * Save weather data to AsyncStorage with timestamp
 */
export const saveWeatherData = async (
    lat: number,
    lon: number,
    data: WeatherData
): Promise<void> => {
    try {
        const cacheData: CachedWeatherData = {
            data,
            timestamp: Date.now(),
            location: { lat, lon },
        };
        const key = getStorageKey(lat, lon);
        await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Error saving weather data to cache:', error);
    }
};

/**
 * Retrieve cached weather data from AsyncStorage
 */
export const getWeatherData = async (
    lat: number,
    lon: number
): Promise<CachedWeatherData | null> => {
    try {
        const key = getStorageKey(lat, lon);
        const cachedData = await AsyncStorage.getItem(key);

        if (!cachedData) {
            return null;
        }

        return JSON.parse(cachedData) as CachedWeatherData;
    } catch (error) {
        console.error('Error retrieving weather data from cache:', error);
        return null;
    }
};

/**
 * Check if cached data is still valid based on timestamp
 */
export const isCacheValid = (timestamp: number): boolean => {
    const now = Date.now();
    return now - timestamp < CACHE_DURATION;
};

/**
 * Clear cached weather data for a specific location
 */
export const clearWeatherData = async (
    lat: number,
    lon: number
): Promise<void> => {
    try {
        const key = getStorageKey(lat, lon);
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error clearing weather data from cache:', error);
    }
};

/**
 * Clear all cached weather data
 */
export const clearAllWeatherData = async (): Promise<void> => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const weatherKeys = keys.filter(key => key.startsWith(STORAGE_KEY_PREFIX));
        await AsyncStorage.multiRemove(weatherKeys);
    } catch (error) {
        console.error('Error clearing all weather data from cache:', error);
    }
};

/**
 * Get cache age in minutes
 */
export const getCacheAge = (timestamp: number): number => {
    const now = Date.now();
    return Math.floor((now - timestamp) / (60 * 1000));
};
