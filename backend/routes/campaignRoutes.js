import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

// GET /api/campaigns → list all campaigns
router.get("/", async (req, res) => {
  try {
    const { status, city } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    if (city) {
      query.city = new RegExp(city, 'i'); // Case insensitive search
    }

    const campaigns = await Campaign.find(query).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/campaigns/:id → get single campaign
router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/campaigns → create new campaign
router.post("/", async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date, 
      location, 
      organizer, 
      email, 
      phone, 
      city, 
      targetDonors, 
      bloodGroupsNeeded 
    } = req.body;

    if (!title || !description || !date || !location || !organizer || !email || !city) {
      return res.status(400).json({ 
        message: "Please provide all required fields: title, description, date, location, organizer, email, city" 
      });
    }

    const newCampaign = new Campaign({
      title,
      description,
      date: new Date(date),
      location,
      organizer,
      email,
      phone: phone || "",
      city,
      targetDonors: targetDonors || 50,
      registeredDonors: 0,
      status: "upcoming",
      bloodGroupsNeeded: bloodGroupsNeeded || ["All"]
    });

    const savedCampaign = await newCampaign.save();
    res.status(201).json({ 
      message: "Campaign created successfully!", 
      campaign: savedCampaign 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/campaigns/:id → update campaign
router.put("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json({ 
      message: "Campaign updated successfully", 
      campaign 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/campaigns/:id → delete campaign
router.delete("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;