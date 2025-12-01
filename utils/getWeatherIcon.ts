export function getWeatherIcon (code: number) {
    if (code === 0) return require("../assets/images/weather/sunny.png");

    if (code === 1 || code === 2) return require("../assets/images/weather/partly_cloudy.png");
    if (code === 3) return require("../assets/images/weather/cloudy.png");

    if (code === 45 || code === 48) return require("../assets/images/weather/fog.png");

    if (code === 51 || code === 53 || code === 55) return require("../assets/images/weather/drizzle.png");

    if (code === 61 || code === 63 || code === 65) return require("../assets/images/weather/rain.png");

    if (code === 71 || code === 73 || code === 75) return require("../assets/images/weather/snowflake.png");

    if (code === 80 || code === 81 || code === 82) return require("../assets/images/weather/drizzle.png");

    if (code === 95) return require("../assets/images/weather/thunder.png");

    if (code === 96 || code === 99) return require("../assets/images/weather/thunder.png");

    // fallback icon
    return require("../assets/images/weather/sunny.png");
}