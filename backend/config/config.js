import dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/weather-monitor",
  },
  weather: {
    apiKey: process.env.OPENWEATHER_API_KEY,
    baseUrl: "https://api.openweathermap.org/data/2.5",
    cities: ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"],
    updateInterval: 5 * 60 * 1000,
    alertThresholds: {
      highTemp: 35,
      lowTemp: 10,
      consecutiveReadings: 2,
    },
    historyLimit: 7,
  },
  cache: {
    ttl: 5 * 60,
    checkPeriod: 60,
  },
};
