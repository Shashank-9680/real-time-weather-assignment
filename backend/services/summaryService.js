import Summary from "../models/Summary.js";
import Weather from "../models/Weather.js";

export const updateDailySummary = async (city) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayWeather = await Weather.find({
    city,
    timestamp: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  });

  if (todayWeather.length === 0) return;

  const temperatures = todayWeather.map((w) => w.temp);
  const weatherConditions = todayWeather.map((w) => w.main);

  // Calculate weather condition counts
  const weatherCounts = weatherConditions.reduce((acc, condition) => {
    acc.set(condition, (acc.get(condition) || 0) + 1);
    return acc;
  }, new Map());

  // Find dominant weather condition
  let dominantWeather = [...weatherCounts.entries()].reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  const summary = {
    city,
    date: today,
    avgTemp: temperatures.reduce((a, b) => a + b) / temperatures.length,
    maxTemp: Math.max(...temperatures),
    minTemp: Math.min(...temperatures),
    dominantWeather,
    weatherCounts,
  };

  await Summary.findOneAndUpdate({ city, date: today }, summary, {
    upsert: true,
    new: true,
  });
};
