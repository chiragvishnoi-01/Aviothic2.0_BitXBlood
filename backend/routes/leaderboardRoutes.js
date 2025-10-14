import express from "express";
import { donors } from "../mockData.js";

const router = express.Router();

// GET /api/leaderboard → top donors by total donations
router.get("/", (req, res) => {
  try {
    // Calculate total donated units for each donor
    const leaderboard = donors.map(d => {
      const totalDonations = d.donationHistory.length;
      return {
        id: d._id,
        name: d.name,
        bloodGroup: d.bloodGroup,
        city: d.city,
        badges: d.badges,
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