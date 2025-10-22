import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
  try {
    // Check if MONGODB_URI is provided
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI.substring(0, 50) + '...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Full error:', error);
    
    // In development, we can continue with mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  MongoDB connection failed. Continuing with mock data for development.');
      // We'll implement mock data in the routes
    } else {
      // In production, we should exit
      process.exit(1);
    }
  }
};