import express from "express";
import { getDailySummary } from "../controllers/summaryController.js";

const router = express.Router();

router.get("/:city", getDailySummary);

export default router;
