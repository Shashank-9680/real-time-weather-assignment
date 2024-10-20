import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["TEMPERATURE_HIGH", "TEMPERATURE_LOW", "WEATHER_CONDITION"],
    required: true,
  },
  threshold: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  acknowledged: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Alert", alertSchema);
