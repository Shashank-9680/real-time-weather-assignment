import Alert from "../models/Alert.js";

const ALERT_THRESHOLDS = {
  TEMPERATURE_HIGH: 35,
  TEMPERATURE_LOW: 10,
};

export const checkAndTriggerAlerts = async (weatherData) => {
  const { city, temp } = weatherData;

  if (temp > ALERT_THRESHOLDS.TEMPERATURE_HIGH) {
    await createAlert({
      city,
      type: "TEMPERATURE_HIGH",
      threshold: ALERT_THRESHOLDS.TEMPERATURE_HIGH,
      value: temp,
      message: `High temperature alert: ${temp}°C in ${city}`,
    });
  }

  if (temp < ALERT_THRESHOLDS.TEMPERATURE_LOW) {
    await createAlert({
      city,
      type: "TEMPERATURE_LOW",
      threshold: ALERT_THRESHOLDS.TEMPERATURE_LOW,
      value: temp,
      message: `Low temperature alert: ${temp}°C in ${city}`,
    });
  }
};

const createAlert = async (alertData) => {
  // Check for existing unacknowledged alerts in the last hour
  const existingAlert = await Alert.findOne({
    city: alertData.city,
    type: alertData.type,
    acknowledged: false,
    timestamp: { $gte: new Date(Date.now() - 60 * 60 * 1000) },
  });

  if (!existingAlert) {
    return Alert.create(alertData);
  }
};
