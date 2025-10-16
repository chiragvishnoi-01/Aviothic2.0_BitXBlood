import express from "express";

const router = express.Router();

// In-memory campaigns storage (for demo purposes)
let campaigns = [
  {
    _id: "1",
    title: "Mumbai Blood Donation Mahotsav 2025",
    description: "Join our mega blood donation drive to support hospitals across Mumbai. Make an impact and save lives today!",
    date: new Date('2025-11-15'),
    location: "Lilavati Hospital & Research Centre",
    organizer: "Indian Red Cross Society",
    email: "redcross.mumbai@example.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    targetDonors: 150,
    registeredDonors: 68,
    status: "upcoming",
    bloodGroupsNeeded: ["O+", "O-", "A+", "B+"],
    createdAt: new Date()
  },
  {
    _id: "2",
    title: "IIT Delhi Blood Donation Camp",
    description: "Students and faculty unite to donate blood and raise awareness about the importance of blood donation in our community.",
    date: new Date('2025-11-20'),
    location: "IIT Delhi Campus, Main Auditorium",
    organizer: "IIT Delhi Student Council",
    email: "students@iitd.ac.in",
    phone: "+91 97654 32109",
    city: "Delhi",
    targetDonors: 100,
    registeredDonors: 42,
    status: "upcoming",
    bloodGroupsNeeded: ["All"],
    createdAt: new Date()
  },
  {
    _id: "3",
    title: "Diwali Blood Donation Seva",
    description: "Celebrate the festival of lights by giving the gift of life. Spread awareness and donate for emergency medical needs.",
    date: new Date('2025-11-25'),
    location: "Bangalore Community Hall, Indiranagar",
    organizer: "Karnataka Red Cross",
    email: "seva@redcross-karnataka.org",
    phone: "+91 96543 21098",
    city: "Bangalore",
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
