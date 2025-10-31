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

// Connect to Database
connectDB();

const app = express();

// Configure CORS properly for development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Log all incoming requests for debugging
    console.log('=== CORS DEBUG INFO ===');
    console.log('Request Origin:', origin);
    console.log('Request Method:', process.env.REQUEST_METHOD || 'Not set');
    console.log('Request Headers:', process.env.REQUEST_HEADERS || 'Not set');
    
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin) {
      console.log('No origin provided - allowing request');
      return callback(null, true);
    }
    
    // List of allowed origins (configured via environment variable or defaults)
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',') 
      : [
          'http://localhost:5173',
          'http://localhost:5001',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:3000',
          'https://aviothic2-0-bit-x-blood.vercel.app',
          'https://aviothic2-0-bitxblood-frontend.vercel.app',
          'https://aviothic2-0-bit-x-blood-854tbk5jj-chiragvishnoi-01s-projects.vercel.app'
        ];
    
    // Clean up origins (remove whitespace)
    const cleanAllowedOrigins = allowedOrigins.map(orig => orig.trim());
    
    // Log the origin and allowed origins for debugging
    console.log('CORS Check - Request Origin:', origin);
    console.log('CORS Check - Allowed Origins:', cleanAllowedOrigins);
    console.log('CORS Check - Origin Index:', cleanAllowedOrigins.indexOf(origin));
    
    // Check if origin is in allowed list
    const isAllowedOrigin = cleanAllowedOrigins.includes(origin);
    
    // Also allow if it's a subdomain of an allowed origin
    let isSubdomain = false;
    for (const allowedOrigin of cleanAllowedOrigins) {
      if (allowedOrigin.startsWith('https://') && origin.startsWith('https://')) {
        const allowedDomain = allowedOrigin.replace('https://', '');
        const requestDomain = origin.replace('https://', '');
        
        // Check if request domain ends with allowed domain (subdomain check)
        if (requestDomain.endsWith(allowedDomain)) {
          isSubdomain = true;
          break;
        }
      }
    }
    
    // Allow if origin is in allowed list or is a subdomain of an allowed origin
    if (isAllowedOrigin || isSubdomain) {
      console.log('CORS Check - Origin ALLOWED');
      callback(null, true);
    } else {
      console.log('CORS Check - Origin BLOCKED');
      console.log('Full allowed origins list:', cleanAllowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
    
    console.log('=== END CORS DEBUG ===');
  },
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

// Apply CORS middleware BEFORE other middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly - THIS MUST BE BEFORE OTHER ROUTES
app.options('*', cors(corsOptions));

app.use(express.json());

// CORS Test Route
app.get('/cors-test', cors(corsOptions), (req, res) => {
  res.status(200).json({ 
    message: 'CORS test successful!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// CORS Test Route for POST
app.post('/cors-test', cors(corsOptions), (req, res) => {
  res.status(200).json({ 
    message: 'CORS POST test successful!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Test Route
app.get('/test', (req, res) => {
  res.status(200).json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString()
  });
});

// Health Check Route - Added for deployment verification
app.get('/health', async (req, res) => {
  try {
    res.status(200).json({ 
      status: 'OK', 
      message: 'BloodLink Backend is running!',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        MONGODB_URI: process.env.MONGODB_URI ? 'Loaded' : 'Not found',
        JWT_SECRET: process.env.JWT_SECRET ? 'Loaded' : 'Not found',
        PORT: process.env.PORT || 5001
      }
    });
  } catch (error) {
    res.status(200).json({ 
      status: 'OK', 
      message: 'BloodLink Backend is running!',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        MONGODB_URI: process.env.MONGODB_URI ? 'Loaded' : 'Not found',
        JWT_SECRET: process.env.JWT_SECRET ? 'Loaded' : 'Not found',
        PORT: process.env.PORT || 5001
      }
    });
  }
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

// Import routes AFTER environment variables are loaded
// We'll conditionally load routes based on database connection
import donorRoutes from "./routes/donorRoutes.js";
import sosRoutes from "./routes/sosRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import authRoutes, { authenticateToken } from "./routes/authRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

// API Routes - MOVE THESE BEFORE THE FALLBACK ROUTE
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/chatbot", chatbotRoutes);

// 404 Handler - This should be the last route
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