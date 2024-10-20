import express from "express";
import { getAlerts, acknowledgeAlert } from "../controllers/alertController.js";

const router = express.Router();

router.get("/:city", getAlerts);
router.put("/:id/acknowledge", acknowledgeAlert);

export default router;
