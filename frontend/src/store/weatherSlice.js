import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWeather: null,
  summaryData: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.currentWeather = action.payload;
      state.error = null;
    },
    setSummaryData: (state, action) => {
      state.summaryData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setWeatherData, setSummaryData, setLoading, setError } =
  weatherSlice.actions;
export default weatherSlice.reducer;
