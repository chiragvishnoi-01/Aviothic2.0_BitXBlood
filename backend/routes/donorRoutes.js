import express from "express";
import { donors } from "../mockData.js";

const router = express.Router();

// GET /api/donors → list all donors
router.get("/", (req, res) => {
  try {
    res.json(donors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/donors → add a donor
router.post("/", (req, res) => {
  try {
    const { name, email, bloodGroup, city } = req.body;
    if (!name || !email || !bloodGroup || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new donor object
    const newDonor = {
      _id: (donors.length + 1).toString(),
      name,
      email,
      bloodGroup,
      city,
      donationHistory: [],
      badges: ["First Timer"]
    };

    // Add to our mock data
    donors.push(newDonor);
    
    res.status(201).json(newDonor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;