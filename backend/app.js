import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import weatherRoutes from "./routes/weatherRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/summaries", summaryRoutes);

// Error handling
app.use(errorHandler);

export default app;
