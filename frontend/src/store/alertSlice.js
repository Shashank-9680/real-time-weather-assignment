import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
  loading: false,
  error: null,
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlerts: (state, action) => {
      state.alerts = action.payload;
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert._id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAlerts, removeAlert, setLoading, setError } =
  alertSlice.actions;
export default alertSlice.reducer;
