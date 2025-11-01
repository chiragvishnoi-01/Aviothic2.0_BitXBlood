import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/leaderboard → top donors by total donations
router.get("/", async (req, res) => {
  try {
    // Find all donors and calculate their total donations
    const donors = await User.find({ isDonor: true }).select('name bloodGroup city badges donationHistory');
    
    // Calculate total donated units for each donor
    const leaderboard = donors.map(donor => {
      const totalDonations = donor.donationHistory ? donor.donationHistory.length : 0;
      return {
        id: donor._id,
        name: donor.name,
        bloodGroup: donor.bloodGroup,
        city: donor.city,
        badges: donor.badges || [],
        totalDonations
      };
    });

    // Sort descending by totalDonations
    leaderboard.sort((a, b) => b.totalDonations - a.totalDonations);

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;