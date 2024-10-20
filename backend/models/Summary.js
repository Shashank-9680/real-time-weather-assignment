import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  avgTemp: {
    type: Number,
    required: true,
  },
  maxTemp: {
    type: Number,
    required: true,
  },
  minTemp: {
    type: Number,
    required: true,
  },
  dominantWeather: {
    type: String,
    required: true,
  },
  weatherCounts: {
    type: Map,
    of: Number,
  },
});

summarySchema.index({ city: 1, date: 1 }, { unique: true });

export default mongoose.model("Summary", summarySchema);
