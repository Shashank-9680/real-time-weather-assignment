// Example updated weatherController.js
import { catchAsync } from "../middleware/errorHandler.js";
import { config } from "../config/config.js";
import { validateCity, validateDateRange } from "../utils/validators.js";
import { kelvinToCelsius, calculateStats } from "../utils/helpers.js";
import logger from "../utils/logger.js";
import { fetchWeatherData } from "../services/weatherService.js";

// Wrap controller with catchAsync to handle errors
export const getCurrentWeather = catchAsync(async (req, res) => {
  const { city } = req.params;

  // Validate city
  validateCity(city);

  const weather = await fetchWeatherData(city);

  logger.info(`Retrieved weather data for ${city}`, { weather });

  res.json(weather);
});

export const getWeatherHistory = catchAsync(async (req, res) => {
  const { city } = req.params;
  const { start, end } = req.query;

  validateCity(city);
  validateDateRange(start, end);

  const weather = await Weather.find({ city, ...dateQuery })
    .sort({ timestamp: -1 })
    .limit(config.weather.historyLimit);

  const stats = calculateStats(weather);

  res.json({ weather, stats });
});
