export const kelvinToCelsius = (kelvin) => {
  return Math.round((kelvin - 273.15) * 100) / 100;
};

export const celsiusToFahrenheit = (celsius) => {
  return Math.round(((celsius * 9) / 5 + 32) * 100) / 100;
};

export const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

export const calculateStats = (data) => {
  if (!data || data.length === 0) return null;

  const temps = data.map((item) => item.temp);
  return {
    avg: Math.round((temps.reduce((a, b) => a + b) / temps.length) * 100) / 100,
    max: Math.max(...temps),
    min: Math.min(...temps),
  };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
