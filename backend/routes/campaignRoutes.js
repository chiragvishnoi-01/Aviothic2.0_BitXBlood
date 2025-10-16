import express from "express";

const router = express.Router();

// In-memory campaigns storage (for demo purposes)
let campaigns = [
  {
    _id: "1",
    title: "New York City Blood Drive 2025",
    description: "Join our mega blood donation drive to support hospitals across New York. Make an impact and save lives today!",
    date: new Date('2025-11-15'),
    location: "City Hospital & Research Centre",
    organizer: "American Red Cross",
    email: "redcross.ny@example.com",
    phone: "+1 555 123 4567",
    city: "New York",
    targetDonors: 150,
    registeredDonors: 68,
    status: "upcoming",
    bloodGroupsNeeded: ["O+", "O-", "A+", "B+"],
    createdAt: new Date()
  },
  {
    _id: "2",
    title: "UCLA Blood Donation Camp",
    description: "Students and faculty unite to donate blood and raise awareness about the importance of blood donation in our community.",
    date: new Date('2025-11-20'),
    location: "UCLA Campus, Main Auditorium",
    organizer: "UCLA Student Council",
    email: "students@ucla.edu",
    phone: "+1 555 234 5678",
    city: "Los Angeles",
    targetDonors: 100,
    registeredDonors: 42,
    status: "upcoming",
    bloodGroupsNeeded: ["All"],
    createdAt: new Date()
  },
  {
    _id: "3",
    title: "Community Blood Drive",
    description: "Join us for our community blood donation event. Help save lives and make a difference in our community.",
    date: new Date('2025-11-25'),
    location: "Community Hall, Downtown Chicago",
    organizer: "Chicago Red Cross",
    email: "info@redcross-chicago.org",
    phone: "+1 555 345 6789",
    city: "Chicago",
    targetDonors: 200,
    registeredDonors: 125,
    status: "active",
    bloodGroupsNeeded: ["O-", "AB+", "AB-"],
    createdAt: new Date()
  }
];

// GET /api/campaigns → list all campaigns
router.get("/", (req, res) => {
  try {
    const { status, city } = req.query;
    let filteredCampaigns = campaigns;

    if (status) {
      filteredCampaigns = filteredCampaigns.filter(c => c.status === status);
    }
    if (city) {
      filteredCampaigns = filteredCampaigns.filter(c => c.city.toLowerCase().includes(city.toLowerCase()));
    }

    res.json(filteredCampaigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/campaigns/:id → get single campaign
router.get("/:id", (req, res) => {
  try {
    const campaign = campaigns.find(c => c._id === req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/campaigns → create new campaign
router.post("/", (req, res) => {
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

    const newCampaign = {
      _id: (campaigns.length + 1).toString(),
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
      bloodGroupsNeeded: bloodGroupsNeeded || ["All"],
      createdAt: new Date()
    };

    campaigns.push(newCampaign);
    res.status(201).json({ 
      message: "Campaign created successfully!", 
      campaign: newCampaign 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/campaigns/:id → update campaign
router.put("/:id", (req, res) => {
  try {
    const campaignIndex = campaigns.findIndex(c => c._id === req.params.id);
    if (campaignIndex === -1) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    campaigns[campaignIndex] = {
      ...campaigns[campaignIndex],
      ...req.body,
      _id: req.params.id // Preserve the ID
    };

    res.json({ 
      message: "Campaign updated successfully", 
      campaign: campaigns[campaignIndex] 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/campaigns/:id → delete campaign
router.delete("/:id", (req, res) => {
  try {
    const campaignIndex = campaigns.findIndex(c => c._id === req.params.id);
    if (campaignIndex === -1) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    campaigns.splice(campaignIndex, 1);
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
