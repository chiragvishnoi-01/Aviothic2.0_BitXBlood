import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

// Load environment variables from .env file
dotenv.config();

// Log environment variables for debugging
console.log('Environment Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'Not found');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not found');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');

const createAdminUser = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Get admin credentials from command line arguments
    const args = process.argv.slice(2);
    let adminName, adminEmail, adminPassword;
    
    if (args.length >= 3) {
      adminName = args[0];
      adminEmail = args[1];
      adminPassword = args[2];
    } else {
      console.log("Usage: node createAdmin.js <name> <email> <password>");
      console.log("Error: Admin name, email, and password must be provided as arguments");
      process.exit(1);
    }
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`Admin user with email ${adminEmail} already exists`);
      process.exit(0);
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
    
    // Create admin user
    const adminUser = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isDonor: false
    });
    
    await adminUser.save();
    
    console.log("✅ Admin user created successfully!");
    console.log("Email:", adminEmail);
    console.log("Role: admin");
    // Don't log the password for security reasons
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  }
};

createAdminUser();