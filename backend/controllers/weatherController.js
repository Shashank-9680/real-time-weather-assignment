import { catchAsync } from "../middleware/errorHandler.js";
import { validateCity, validateDateRange } from "../utils/validators.js";
import logger from "../utils/logger.js";
import { fetchWeatherData } from "../services/weatherService.js";

// Get current weather for a specific city
export const getCurrentWeather = catchAsync(async (req, res) => {
  const { city } = req.params;

  // Validate city
  validateCity(city);

  const weather = await fetchWeatherData(city);

  logger.info(`Retrieved weather data for ${city}`, { weather });

  res.json(weather);
});

// Get historical weather data for a specific city
export const getWeatherHistory = catchAsync(async (req, res) => {
  const { city } = req.params;
  const { start, end } = req.query;

  // Validate city and date range
  validateCity(city);
  validateDateRange(start, end);

  const weather = await Weather.find({ city, ...dateQuery })
    .sort({ timestamp: -1 })
    .limit(config.weather.historyLimit);

  const stats = calculateStats(weather);

  res.json({ weather, stats });
});
