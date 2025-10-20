import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/donors → list all donors
router.get("/", async (req, res) => {
  try {
    const donors = await User.find({ isDonor: true }).select('-password');
    res.json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/donors → add a donor
router.post("/", async (req, res) => {
  try {
    const { name, email, bloodGroup, city } = req.body;
    if (!name || !email || !bloodGroup || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Update existing user to be a donor
      existingUser.isDonor = true;
      existingUser.bloodGroup = bloodGroup;
      existingUser.city = city;
      await existingUser.save();
      return res.status(200).json(existingUser);
    }

    // Create a new donor user
    const newDonor = new User({
      name,
      email,
      bloodGroup,
      city,
      isDonor: true,
      role: 'donor',
      password: 'default_password' // This should be updated by the user later
    });

    // Save to database
    await newDonor.save();
    
    res.status(201).json(newDonor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;