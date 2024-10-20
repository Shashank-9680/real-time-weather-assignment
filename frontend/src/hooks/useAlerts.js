import { useState, useEffect } from "react";
import { weatherApi } from "../services/api";

export const useAlerts = (city) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await weatherApi.getAlerts(city, {
        acknowledged: false,
      });
      setAlerts(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const acknowledgeAlert = async (alertId) => {
    try {
      await weatherApi.acknowledgeAlert(alertId);
      setAlerts(alerts.filter((alert) => alert._id !== alertId));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [city]);

  return {
    alerts,
    loading,
    error,
    acknowledgeAlert,
    refreshAlerts: fetchAlerts,
  };
};
