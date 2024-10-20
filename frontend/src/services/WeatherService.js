import { weatherApi } from "./api";
import { store } from "../store";
import { setWeatherData, setLoading, setError } from "../store/weatherSlice";
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

  async fetchSummaryData(city) {
    try {
      const response = await weatherApi.getDailySummary(city);
      return response.data;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      return [];
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
    this.fetchAlerts(city);

    const weatherInterval = setInterval(() => {
      this.fetchCurrentWeather(city);
    }, 5 * 60 * 1000); // Every 5 minutes

    const alertsInterval = setInterval(() => {
      this.fetchAlerts(city);
    }, 60 * 1000); // Every minute

    return () => {
      clearInterval(weatherInterval);
      clearInterval(alertsInterval);
    };
  },
};
