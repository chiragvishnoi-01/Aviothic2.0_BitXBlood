import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

// Load environment variables from .env file
dotenv.config();

const changeAdminPassword = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Get email and new password from command line arguments
    const args = process.argv.slice(2);
    let email, newPassword;
    
    if (args.length >= 2) {
      email = args[0];
      newPassword = args[1];
    } else {
      // Default values for interactive use
      email = "admin@example.com";
      newPassword = "admin123";
      
      console.log("Usage: node changeAdminPassword.js <email> <newPassword>");
      console.log("Using default values:");
    }
    
    console.log(`Changing password for user: ${email}`);
    
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log(`User with email ${email} not found`);
      process.exit(1);
    }
    
    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Update user password
    user.password = hashedPassword;
    await user.save();
    
    console.log("✅ Password changed successfully!");
    console.log(`Email: ${email}`);
    console.log(`New Password: ${newPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error changing password:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  }
};

changeAdminPassword();