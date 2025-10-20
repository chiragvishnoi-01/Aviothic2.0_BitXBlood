import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

// Load environment variables
dotenv.config();

console.log('Testing user registration...');

const testRegistration = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Test user data
    const testUser = {
      name: "Test User",
      email: "test@example.com",
      password: "test123",
      role: "user"
    };
    
    console.log('Checking if user already exists...');
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('User already exists, deleting...');
      await User.deleteOne({ email: testUser.email });
    }
    
    console.log('Hashing password...');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(testUser.password, saltRounds);
    
    console.log('Creating new user...');
    const user = new User({
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword,
      role: testUser.role
    });
    
    await user.save();
    console.log('✅ User created successfully!');
    console.log('User ID:', user._id);
    console.log('Email:', user.email);
    
    // Close connection
    process.exit(0);
  } catch (error) {
    console.error('❌ Registration Error:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
};

testRegistration();