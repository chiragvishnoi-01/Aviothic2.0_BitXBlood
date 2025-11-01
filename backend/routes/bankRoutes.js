import express from "express";
import BloodBank from "../models/BloodBank.js";

const router = express.Router();

// GET /api/banks → list all blood banks
router.get("/", async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find();
    res.json(bloodBanks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/banks/:id → get single blood bank
router.get("/:id", async (req, res) => {
  try {
    const bank = await BloodBank.findById(req.params.id);
    if (!bank) return res.status(404).json({ message: "Blood bank not found" });
    res.json(bank);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/banks → add new blood bank
router.post("/", async (req, res) => {
  try {
    const { name, email, city, bloodStock } = req.body;
    if (!name || !city) {
      return res.status(400).json({ message: "Name and city are required" });
    }

    const newBank = new BloodBank({
      name,
      email,
      city,
      bloodStock: bloodStock || {
        A_pos: 0, A_neg: 0, B_pos: 0, B_neg: 0,
        AB_pos: 0, AB_neg: 0, O_pos: 0, O_neg: 0
      }
    });

    const savedBank = await newBank.save();
    res.status(201).json(savedBank);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/banks/:id/campaigns → add a campaign
router.post("/:id/campaigns", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const bank = await BloodBank.findById(req.params.id);
    if (!bank) return res.status(404).json({ message: "Blood bank not found" });

    bank.campaigns.push({ title, description, date });
    const updatedBank = await bank.save();
    res.status(201).json({ message: "Campaign added", campaigns: updatedBank.campaigns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;