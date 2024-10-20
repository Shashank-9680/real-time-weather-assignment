import React from "react";
import { Cloud, Sun, CloudRain, Snowflake } from "lucide-react";

const WeatherCard = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "clouds":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "snow":
        return <Snowflake className="h-8 w-8 text-blue-300" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{weather.city}</h3>
        {getWeatherIcon(weather.main)}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold">{weather.temp}°C</p>
        <p className="text-gray-600">Feels like: {weather.feels_like}°C</p>
        <p className="text-gray-600">{weather.main}</p>
        <p className="text-sm text-gray-500">
          {new Date(weather.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
export default WeatherCard;
