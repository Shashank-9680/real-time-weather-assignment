export const formatTemperature = (temp, unit = "C") => {
  return `${temp.toFixed(1)}°${unit}`;
};

export const getWeatherIcon = (condition) => {
  const conditions = {
    Clear: "sun",
    Clouds: "cloud",
    Rain: "cloud-rain",
    Snow: "cloud-snow",
    Thunderstorm: "cloud-lightning",
    Drizzle: "cloud-drizzle",
    Mist: "cloud-fog",
  };
  return conditions[condition] || "cloud";
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getAlertSeverity = (type) => {
  const severities = {
    TEMPERATURE_HIGH: "error",
    TEMPERATURE_LOW: "warning",
    WEATHER_CONDITION: "info",
  };
  return severities[type] || "info";
};
