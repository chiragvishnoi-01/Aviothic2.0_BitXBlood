import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  city: { type: String, required: true },
  targetDonors: { type: Number, default: 50 },
  registeredDonors: { type: Number, default: 0 },
  status: { type: String, enum: ["upcoming", "active", "completed", "cancelled"], default: "upcoming" },
  bloodGroupsNeeded: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Campaign", campaignSchema);
