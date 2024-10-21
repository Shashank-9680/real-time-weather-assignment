import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const weatherApi = {
  getCurrentWeather: (city) => api.get(`/weather/current/${city}`),
  getWeatherHistory: (city, params) =>
    api.get(`/weather/history/${city}`, { params }),
  getDailySummary: (city, params) => api.get(`/summaries/${city}`, { params }),
  getAlerts: (city, params) => api.get(`/alerts/${city}`, { params }),
  acknowledgeAlert: (id) => api.put(`/alerts/${id}/acknowledge`),
};
