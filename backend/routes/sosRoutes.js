import express from "express";
import User from "../models/User.js";
import Request from "../models/Request.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// POST /api/sos → create SOS request
router.post("/", async (req, res) => {
  try {
    const { requesterName, email, bloodGroup, city, phone } = req.body;

    if (!requesterName || !email || !bloodGroup || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save new request to database
    const newRequest = new Request({
      requesterName,
      email,
      bloodGroup,
      city,
      phone,
      status: "pending"
    });

    // Save to database
    const savedRequest = await newRequest.save();

    // Find matching donors from the database
    const matchingDonors = await User.find({ 
      isDonor: true, 
      bloodGroup: bloodGroup, 
      city: { $regex: new RegExp(city, 'i') } // Case insensitive search
    }).select('name email phone');

    // Send emails to matching donors
    const emailPromises = matchingDonors.map(donor => {
      const emailContent = {
        to: donor.email,
        subject: `Urgent Blood Donation Request - ${bloodGroup} needed in ${city}`,
        text: `Hello ${donor.name},

${requesterName} urgently needs ${bloodGroup} blood in ${city}.
If you can help, please contact ${requesterName} at ${email}${phone ? ` or ${phone}` : ''}.

Thank you for being a donor!

Best regards,
BloodLink Team`
      };
      
      return sendEmail(emailContent);
    });

    // Send emails in parallel
    await Promise.all(emailPromises);

    res.status(201).json({ 
      message: `SOS request created & alert sent to ${matchingDonors.length} donors`,
      request: savedRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;