import axios from "axios";
import Weather from "../models/Weather.js";
import { checkAndTriggerAlerts } from "./alertService.js";
import { updateDailySummary } from "./summaryService.js";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CITIES = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

// Cache to store last API call time for each city
const apiCallCache = new Map();
const MIN_API_CALL_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const fetchWeatherData = async (city) => {
  const lastCallTime = apiCallCache.get(city);
  const now = Date.now();

  if (lastCallTime && now - lastCallTime < MIN_API_CALL_INTERVAL) {
    throw new Error("API call rate limit exceeded");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${OPENWEATHER_API_KEY}`
    );

    apiCallCache.set(city, now);

    const weatherData = {
      city,
      main: response.data.weather[0].main,
      temp: kelvinToCelsius(response.data.main.temp),
      feels_like: kelvinToCelsius(response.data.main.feels_like),
      timestamp: new Date(),
    };

    const weather = await Weather.create(weatherData);

    // Check for alerts
    await checkAndTriggerAlerts(weatherData);

    // Update daily summary
    await updateDailySummary(city);

    return weather;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    throw error;
  }
};

export const startWeatherMonitoring = async () => {
  setInterval(async () => {
    for (const city of CITIES) {
      try {
        await fetchWeatherData(city);
      } catch (error) {
        console.error(`Error monitoring weather for ${city}:`, error);
      }
    }
  }, MIN_API_CALL_INTERVAL);
};

const kelvinToCelsius = (kelvin) => {
  return Math.round((kelvin - 273.15) * 100) / 100;
};
