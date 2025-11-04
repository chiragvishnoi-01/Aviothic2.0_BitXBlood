import mongoose from "mongoose";

const awarenessPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  mediaUrl: { type: String }, // URL for image or video
  mediaType: { type: String, enum: ["image", "video"] }, // Type of media
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  authorName: { type: String, required: true }, // Store author name for easier querying
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track who liked the post
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("AwarenessPost", awarenessPostSchema);