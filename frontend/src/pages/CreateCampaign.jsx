import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCity,
  FaUsers,
  FaTint,
  FaFileAlt
} from "react-icons/fa";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
    email: "",
    phone: "",
    city: "",
    targetDonors: 50,
    bloodGroupsNeeded: []
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "All"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBloodGroupToggle = (group) => {
    if (group === "All") {
      setFormData({ 
        ...formData, 
        bloodGroupsNeeded: formData.bloodGroupsNeeded.includes("All") ? [] : ["All"] 
      });
    } else {
      const updated = formData.bloodGroupsNeeded.includes(group)
        ? formData.bloodGroupsNeeded.filter(g => g !== group && g !== "All")
        : [...formData.bloodGroupsNeeded.filter(g => g !== "All"), group];
      setFormData({ ...formData, bloodGroupsNeeded: updated });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await axios.post("/campaigns", {
        ...formData,
        bloodGroupsNeeded: formData.bloodGroupsNeeded.length > 0 
          ? formData.bloodGroupsNeeded 
          : ["All"]
      });
      
      setMessage(res.data.message || "Campaign created successfully! 🎉");
      setIsError(false);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        organizer: "",
        email: "",
        phone: "",
        city: "",
        targetDonors: 50,
        bloodGroupsNeeded: []
      });

      // Redirect to campaigns page after 2 seconds
      setTimeout(() => {
        navigate("/campaigns");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Error creating campaign. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-4 rounded-2xl shadow-lg">
              <FaCalendarAlt className="text-5xl" />
            </div>
          </div>
          <h1 className="text-5xl font-black mb-4">
            Create New <span className="gradient-text">Campaign</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Organize a blood donation event and save lives in your community
          </p>
        </motion.div>

        {/* Success/Error Message */}
        {message && (
          <motion.div
            className={`mb-6 p-4 rounded-xl font-semibold text-center shadow-lg ${
              isError
                ? "bg-red-100 text-red-700 border-2 border-red-300"
                : "bg-green-100 text-green-700 border-2 border-green-300"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {message}
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-red-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Campaign Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaFileAlt className="text-red-500" />
                Campaign Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., City Blood Drive 2025"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaFileAlt className="text-red-500" />
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your campaign and its goals..."
                required
                rows="4"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-red-500" />
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Central City Hospital"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaUser className="text-red-500" />
                Organizer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="Your name or organization"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-red-500" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@example.com"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaPhone className="text-red-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaCity className="text-red-500" />
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., New York"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* Target Donors */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaUsers className="text-red-500" />
                Target Number of Donors
              </label>
              <input
                type="number"
                name="targetDonors"
                value={formData.targetDonors}
                onChange={handleChange}
                min="1"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
              />
            </div>

            {/* Blood Groups Needed */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaTint className="text-red-500" />
                Blood Groups Needed
              </label>
              <div className="flex flex-wrap gap-3">
                {bloodGroups.map(group => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => handleBloodGroupToggle(group)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      formData.bloodGroupsNeeded.includes(group)
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Select specific blood groups or choose "All" for all types
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full mt-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 hover:shadow-2xl transform hover:scale-[1.02]"
            }`}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Creating Campaign...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FaCalendarAlt />
                Create Campaign
              </span>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateCampaign;
