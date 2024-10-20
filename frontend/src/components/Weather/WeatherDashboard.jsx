// frontend/src/components/Weather/WeatherDashboard.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WeatherService } from "../../services/WeatherService";
import { useAlerts } from "../../hooks/useAlerts";
import WeatherCard from "./WeatherCard";
import SummaryChart from "./SummaryChart";
import AlertsPanel from "./AlertPanel";
import { setSummaryData } from "../../store/weatherSlice";

const CITIES = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const dispatch = useDispatch();
  const { currentWeather, loading, error } = useSelector(
    (state) => state.weather
  );
  const {
    alerts,
    loading: alertsLoading,
    acknowledgeAlert,
  } = useAlerts(selectedCity);

  useEffect(() => {
    const stopPolling = WeatherService.startPolling(selectedCity);

    const fetchSummaryData = async () => {
      const data = await WeatherService.fetchSummaryData(selectedCity);
      dispatch(setSummaryData(data));
    };

    fetchSummaryData();
    const summaryInterval = setInterval(fetchSummaryData, 15 * 60 * 1000); // Every 15 minutes

    return () => {
      stopPolling();
      clearInterval(summaryInterval);
    };
  }, [selectedCity, dispatch]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">
          Weather Monitoring Dashboard
        </h1>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-48 p-2 border rounded-md"
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="p-6 bg-white rounded-lg shadow-lg animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        ) : (
          currentWeather && <WeatherCard weather={currentWeather} />
        )}

        <AlertsPanel
          alerts={alerts}
          loading={alertsLoading}
          onAcknowledge={acknowledgeAlert}
        />
      </div>

      <div className="mt-8">
        <SummaryChart />
      </div>
    </div>
  );
};

export default WeatherDashboard;
