import { useState, useEffect } from "react";
import { weatherApi } from "../services/api";

export const useWeather = (city) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await weatherApi.getCurrentWeather(city);
        setCurrentWeather(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [city]);

  return { currentWeather, loading, error };
};
