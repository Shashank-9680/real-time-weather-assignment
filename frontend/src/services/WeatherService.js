import { weatherApi } from "./api";
import { store } from "../store";
import {
  setWeatherData,
  setSummaryData,
  setLoading,
  setError,
} from "../store/weatherSlice";
import { setAlerts } from "../store/alertSlice";

export const WeatherService = {
  async fetchCurrentWeather(city) {
    try {
      store.dispatch(setLoading(true));
      const response = await weatherApi.getCurrentWeather(city);
      store.dispatch(setWeatherData(response.data));
    } catch (error) {
      store.dispatch(setError(error.message));
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  async fetchSummaryAndHistoricalData(city) {
    try {
      store.dispatch(setLoading(true));

      // Calculate date range for historical data (e.g., last 7 days)
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const [summaryResponse, historyResponse] = await Promise.all([
        weatherApi.getDailySummary(city),
        weatherApi.getWeatherHistory(city, {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        }),
      ]);

      const summaryData = summaryResponse.data;
      const historyData = historyResponse.data.weather;
      console.log("history", historyData);

      // Combine summary and historical data without filtering
      const combinedData = summaryData.map((summary) => ({
        ...summary,
        historicalData: historyData, // Attach all history data
      }));
      console.log("combined", combinedData);
      store.dispatch(setSummaryData(combinedData));
    } catch (error) {
      console.error("Error fetching summary and historical data:", error);
      store.dispatch(setError("Failed to fetch weather data"));
    } finally {
      store.dispatch(setLoading(false));
    }
  },

  async fetchAlerts(city) {
    try {
      const response = await weatherApi.getAlerts(city, {
        acknowledged: false,
      });
      store.dispatch(setAlerts(response.data));
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  },

  startPolling(city) {
    this.fetchCurrentWeather(city);
    this.fetchSummaryAndHistoricalData(city);
    this.fetchAlerts(city);

    const weatherInterval = setInterval(() => {
      this.fetchCurrentWeather(city);
    }, 5 * 60 * 1000); // Every 5 minutes

    const summaryHistoryInterval = setInterval(() => {
      this.fetchSummaryAndHistoricalData(city);
    }, 15 * 60 * 1000); // Every 15 minutes

    const alertsInterval = setInterval(() => {
      this.fetchAlerts(city);
    }, 60 * 1000); // Every minute

    return () => {
      clearInterval(weatherInterval);
      clearInterval(summaryHistoryInterval);
      clearInterval(alertsInterval);
    };
  },
};
