import { catchAsync } from "../middleware/errorHandler.js";
import { validateCity, validateDateRange } from "../utils/validators.js";
import logger from "../utils/logger.js";
import { fetchWeatherData } from "../services/weatherService.js";
import Weather from "../models/Weather.js";
import { calculateStats } from "../utils/weatherUtils.js";
import { config } from "../config/config.js";

export const getCurrentWeather = catchAsync(async (req, res) => {
  const { city } = req.params;

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

  const dateQuery = {};
  if (start) dateQuery.timestamp = { $gte: new Date(start) };
  if (end)
    dateQuery.timestamp = { ...dateQuery.timestamp, $lte: new Date(end) };

  const weather = await Weather.find({ city, ...dateQuery })
    .sort({ timestamp: -1 })
    .limit(config.weather.historyLimit);
  console.log("xyz", weather);
  const stats = calculateStats(weather);

  console.log("comibine", { weather, stats });
  res.json({ weather, stats });
});
