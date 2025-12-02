export function getWeatherCondition (code: number): string {
    if (code === 0) return "Clear";

    if (code === 1) return "Mainly Clear";
    if (code === 2) return "Partly Cloudy";
    if (code === 3) return "Cloudy";

    if (code === 45 || code === 48) return "Foggy";

    if (code === 51) return "Light Drizzle";
    if (code === 53) return "Moderate Drizzle";
    if (code === 55) return "Dense Drizzle";

    if (code === 61) return "Light Rain";
    if (code === 63) return "Moderate Rain";
    if (code === 65) return "Heavy Rain";

    if (code === 71) return "Light Snow";
    if (code === 73) return "Moderate Snow";
    if (code === 75) return "Heavy Snow";

    if (code === 77) return "Snow Grains";

    if (code === 80) return "Light Showers";
    if (code === 81) return "Moderate Showers";
    if (code === 82) return "Violent Showers";

    if (code === 85 || code === 86) return "Snow Showers";

    if (code === 95) return "Thunderstorm";
    if (code === 96 || code === 99) return "Thunderstorm with Hail";

    // fallback
    return "Clear";
}
