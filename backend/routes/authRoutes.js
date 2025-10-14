import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Simple authentication (in production, use bcrypt and JWT)
// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, bloodGroup, phone, city, isDonor } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // In production, hash this with bcrypt
      role: role || 'user',
      bloodGroup,
      phone,
      city,
      isDonor: isDonor || false
    });

    await user.save();

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDonor: user.isDonor
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password (in production, use bcrypt.compare)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
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
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Get user profile
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
});

// Update user profile
router.put("/profile/:id", async (req, res) => {
  try {
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

// Add medical record (Admin/Doctor only in production)
router.post("/medical-record/:id", async (req, res) => {
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
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Get all donors with medical records
router.get("/donors", async (req, res) => {
  try {
    const donors = await User.find({ isDonor: true }).select('-password');
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error: error.message });
  }
});

export default router;
