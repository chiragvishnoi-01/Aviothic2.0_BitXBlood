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
    
    // Check if user exists with timeout
    const existingUser = await User.findOne({ email }).maxTimeMS(5000);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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

    // Save user with timeout
    await user.save({ maxTimeMS: 10000 });

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
    if (error.name === 'MongoServerSelectionError' || error.name === 'MongoNetworkError') {
      return res.status(500).json({ message: "Database connection timeout. Please try again.", error: error.message });
    }
    res.status(500).json({ message: "Registration failed", error: error.message });
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

    // Find user with timeout
    const user = await User.findOne({ email }).maxTimeMS(5000);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
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
        city: user.city
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error.name === 'MongoServerSelectionError' || error.name === 'MongoNetworkError') {
      return res.status(500).json({ message: "Database connection timeout. Please try again.", error: error.message });
    }
    res.status(500).json({ message: "Login failed", error: error.message });
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

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
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

export default router;