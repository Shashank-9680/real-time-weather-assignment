import express from "express";
import {
  getCurrentWeather,
  getWeatherHistory,
} from "../controllers/weatherController.js";

const router = express.Router();

router.get("/current/:city", getCurrentWeather);
router.get("/history/:city", getWeatherHistory);

export default router;
