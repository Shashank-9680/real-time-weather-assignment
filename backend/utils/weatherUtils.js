export const calculateStats = (weatherData) => {
  if (!weatherData || weatherData.length === 0) {
    return {
      averageTemp: 0,
      maxTemp: 0,
      minTemp: 0,

      totalEntries: 0,
    };
  }

  let totalTemp = 0;

  let maxTemp = -Infinity;
  let minTemp = Infinity;

  for (const data of weatherData) {
    const { temp, feels_like, humidity } = data;
    totalTemp += temp;
    maxTemp = Math.max(maxTemp, temp);
    minTemp = Math.min(minTemp, temp);
  }

  const totalEntries = weatherData.length;
  const averageTemp =
    totalEntries > 0 ? (totalTemp / totalEntries).toFixed(2) : 0;

  return {
    averageTemp,
    maxTemp,
    minTemp,
    totalEntries,
  };
};
