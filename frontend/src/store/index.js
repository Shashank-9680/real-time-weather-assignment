import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import alertReducer from "./alertSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    alerts: alertReducer,
  },
});
