import express from "express";
import { requests, donors } from "../mockData.js";

const router = express.Router();

// POST /api/sos → create SOS request
router.post("/", (req, res) => {
  try {
    const { requesterName, email, bloodGroup, city, phone } = req.body;

    if (!requesterName || !email || !bloodGroup || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new request
    const newRequest = {
      _id: (requests.length + 1).toString(),
      requesterName,
      email,
      bloodGroup,
      city,
      phone,
      status: "pending",
      createdAt: new Date()
    };

    // Add to our mock data
    requests.push(newRequest);

    // Find matching donors
    const matchingDonors = donors.filter(donor => 
      donor.bloodGroup === bloodGroup && donor.city === city
    );

    // In a real app, we would send emails here
    console.log(`SOS request created. Found ${matchingDonors.length} matching donors.`);

    res.status(201).json({ 
      message: `SOS request created & alert sent to ${matchingDonors.length} donors`,
      request: newRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;