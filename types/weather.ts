export interface WeatherCurrent {
    temp: number;
    windSpeed: number;
    weatherCode: number;
    feelsLike: number;
    pressure: number;
}

export interface WeatherHourly {
    time: string;
    temp: number;
    precipProb: number;
    humidity: number;
    weatherCode: number;
}

export interface WeatherDaily {
    date: string;
    max: number;
    min: number;
    sunrise: string;
    sunset: string;
    sunriseRaw: string;
    sunsetRaw: string;
    weatherCode: number;
}

export interface WeatherData {
    current: WeatherCurrent;
    hourly: WeatherHourly[];
    daily: WeatherDaily[];
}