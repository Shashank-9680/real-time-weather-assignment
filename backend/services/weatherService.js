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

// Set to track the number of requests made in the current minute
let requestCount = 0;
const MAX_REQUESTS_PER_MINUTE = 60;

// Function to handle rate-limited fetching of weather data
export const fetchWeatherData = async (city) => {
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    console.log("Max API request limit reached for this minute.");
    return null; // Return null instead of throwing an error
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=61873733290ee3082a1f68a67066db56`
    );

    // Increment request count
    requestCount++;

    // Reset request count every minute
    setTimeout(() => {
      requestCount = Math.max(requestCount - 1, 0); // Prevent going negative
    }, 60000);

    // Process weather data
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
    console.error(`Error fetching weather data for ${city}:`, error.message);
    return null; // Return null in case of error
  }
};

// Function to monitor weather at set intervals
export const startWeatherMonitoring = () => {
  setInterval(async () => {
    for (const city of CITIES) {
      await fetchWeatherData(city);
    }
  }, 1000); // Check every second, but will respect the API limit
};

// Utility function to convert Kelvin to Celsius
export const kelvinToCelsius = (kelvin) => {
  return Math.round((kelvin - 273.15) * 100) / 100;
};
