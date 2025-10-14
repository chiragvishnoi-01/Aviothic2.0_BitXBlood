import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  donationHistory: [{ date: Date }],
  badges: [{ type: String }]
});

export default mongoose.model("Donor", donorSchema);
