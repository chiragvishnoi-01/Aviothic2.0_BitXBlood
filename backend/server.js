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
console.log('PORT:', process.env.PORT || 5001);

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

// Configure CORS properly for development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    
    // List of allowed origins (configured via environment variable or defaults)
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',') 
      : [
          'http://localhost:5173',
          'http://localhost:5001',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:3000',
          'https://aviothic2-0-bit-x-blood.vercel.app',
          'https://aviothic2-0-bitxblood-frontend.vercel.app' // Added the actual Vercel deployment URL
        ];
    
    // Always allow requests from the same origin or if no origin is specified
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

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

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/campaigns", campaignRoutes);

// Fallback route for Render
app.get('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API route not found',
    path: req.path 
  });
});

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
const PORT = process.env.PORT || 5001;

// Export the app for serverless deployment
export default app;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});