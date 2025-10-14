import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['user', 'donor', 'admin'], 
      default: 'user' 
    },
    bloodGroup: { 
      type: String, 
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    phone: { 
      type: String 
    },
    city: { 
      type: String 
    },
    isDonor: { 
      type: Boolean, 
      default: false 
    },
    medicalRecords: [{
      date: { type: Date, default: Date.now },
      weight: Number,
      bloodPressure: String,
      hemoglobin: Number,
      lastDonationDate: Date,
      eligibleForDonation: { type: Boolean, default: true },
      medicalNotes: String,
      checkupBy: String
    }],
    donationHistory: [{
      date: { type: Date, default: Date.now },
      location: String,
      bloodGroup: String,
      quantity: { type: Number, default: 450 }, // in ml
      certificateId: String
    }],
    badges: [{ 
      type: String 
    }],
    isVerified: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
