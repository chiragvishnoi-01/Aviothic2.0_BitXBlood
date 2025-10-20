import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

// Log environment variables for debugging
console.log('Environment Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'Not found');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not found');
console.log('PORT:', process.env.PORT || 5000);

// Import routes AFTER environment variables are loaded
import donorRoutes from "./routes/donorRoutes.js";
import sosRoutes from "./routes/sosRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import authRoutes, { authenticateToken } from "./routes/authRoutes.js";

// Connect to Database
connectDB();

const app = express();

// Simple CORS for testing
app.use(cors());

app.use(express.json());

// Test Route
app.get('/test', (req, res) => {
  res.status(200).json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString()
  });
});

// Health Check Route - Added for deployment verification
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'BloodLink Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'BloodLink API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      donors: '/api/donors',
      sos: '/api/sos',
      banks: '/api/banks',
      leaderboard: '/api/leaderboard',
      campaigns: '/api/campaigns',
    }
  });
});

// Fallback route for Render
app.get('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API route not found',
    path: req.path 
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/campaigns", campaignRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// Export the app for serverless deployment
export default app;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});