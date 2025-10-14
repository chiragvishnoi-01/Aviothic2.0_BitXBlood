import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  requesterName: { type: String, required: true },
  email: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Request", requestSchema);