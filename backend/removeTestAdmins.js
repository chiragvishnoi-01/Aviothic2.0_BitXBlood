import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

// Load environment variables from .env file
dotenv.config();

const removeTestAdmins = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // List of test admin emails to remove
    const testAdminEmails = [
      "testadmin@gmail.com",
      "deployed-admin@gmail.com",
      "test@example.com"
    ];
    
    console.log("Removing test admin users...");
    
    // Remove each test admin user
    for (const email of testAdminEmails) {
      const result = await User.deleteOne({ email: email, role: "admin" });
      
      if (result.deletedCount > 0) {
        console.log(`✅ Removed test admin user: ${email}`);
      } else {
        console.log(`ℹ️  Test admin user not found or not an admin: ${email}`);
      }
    }
    
    console.log("Finished removing test admin users.");
    
    // List remaining admin users
    const remainingAdmins = await User.find({ role: "admin" }).select("name email");
    console.log("\nRemaining admin users:");
    remainingAdmins.forEach(admin => {
      console.log(`- ${admin.name} (${admin.email})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error removing test admin users:", error.message);
    process.exit(1);
  }
};

removeTestAdmins();