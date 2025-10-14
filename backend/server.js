import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import donorRoutes from "./routes/donorRoutes.js";
import sosRoutes from "./routes/sosRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/campaigns", campaignRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));