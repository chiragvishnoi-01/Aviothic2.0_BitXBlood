import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    // Validate JWT_SECRET is provided
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const { name, email, password, role, bloodGroup, phone, city, isDonor } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      bloodGroup,
      phone,
      city,
      isDonor: isDonor || false
    });

    // Save user
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDonor: user.isDonor
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation error", errors: messages });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    res.status(500).json({ message: "Registration failed. Please try again.", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Validate JWT_SECRET is provided
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, password: password ? '[REDACTED]' : 'MISSING' });
    
    // Find user by email
    console.log('Searching for user with email:', email);
    let user = await User.findOne({ email });
    
    console.log('User lookup result:', user ? 'User found' : 'User not found');
    
    if (!user) {
      // Try to find user by lowercase email as fallback
      console.log('Fallback search for user with lowercase email:', email.toLowerCase());
      const fallbackUser = await User.findOne({ email: email.toLowerCase() });
      console.log('Fallback user lookup result:', fallbackUser ? 'User found' : 'User not found');
      
      if (!fallbackUser) {
        // Try to find all users to see what's in the database
        console.log('Performing diagnostic search for all users...');
        const allUsers = await User.find({}, 'email name');
        console.log('All users in database:', allUsers.map(u => ({ email: u.email, name: u.name })));
        
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Use fallback user if found
      user = fallbackUser;
    }

    // Check password
    console.log('Checking password for user:', user.email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDonor: user.isDonor,
        bloodGroup: user.bloodGroup,
        city: user.city,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Login failed. Please try again.", error: error.message });
  }
});

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  // Validate JWT_SECRET is provided
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables");
    return res.status(500).json({ message: "Server configuration error" });
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admin rights required." });
  }
  next();
};

// Get user profile (protected route)
router.get("/profile/:id", authenticateToken, async (req, res) => {
  try {
    // Users can only access their own profile or admins can access any profile
    if (req.user.userId !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
});

// Update user profile (protected route)
router.put("/profile/:id", authenticateToken, async (req, res) => {
  try {
    // Users can only update their own profile or admins can update any profile
    if (req.user.userId !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    // Don't allow password updates through this route
    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-password');
    
    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

// Add medical record (Admin/Doctor only)
router.post("/medical-record/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { weight, bloodPressure, hemoglobin, lastDonationDate, eligibleForDonation, medicalNotes, checkupBy } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.medicalRecords.push({
      weight,
      bloodPressure,
      hemoglobin,
      lastDonationDate,
      eligibleForDonation,
      medicalNotes,
      checkupBy
    });

    await user.save();
    res.json({ message: "Medical record added", medicalRecords: user.medicalRecords });
  } catch (error) {
    res.status(500).json({ message: "Failed to add record", error: error.message });
  }
});

// Get all users (Admin only)
router.get("/all", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Get all donors with medical records (Admin only)
router.get("/donors", authenticateToken, isAdmin, async (req, res) => {
  try {
    const donors = await User.find({ isDonor: true }).select('-password');
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
});

// Get all donors - public endpoint for regular users and donors
router.get("/donors-public", async (req, res) => {
  try {
    const donors = await User.find({ isDonor: true }).select('-password');
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
});

// Register as donor
router.put("/register-donor/:id", authenticateToken, async (req, res) => {
  try {
    // Users can only update their own donor status
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { bloodGroup, city, phone } = req.body;
    
    // Validate required fields for donors
    if (!bloodGroup || !city) {
      return res.status(400).json({ message: "Blood group and city are required to become a donor" });
    }

    // Prepare update object
    const updateData = { 
      isDonor: true,
      bloodGroup,
      city
    };
    
    // Only update phone if provided
    if (phone) {
      updateData.phone = phone;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-password');
    
    res.json({ message: "Successfully registered as donor", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to register as donor", error: error.message });
  }
});

// Change user password (Admin only or user changing their own password)
router.put("/change-password/:id", authenticateToken, async (req, res) => {
  try {
    const { newPassword } = req.body;
    
    // Users can change their own password or admins can change any user's password
    if (req.user.userId !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }
    
    // Validate password
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Update user password
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "Password changed successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error: error.message });
  }
});

export default router;