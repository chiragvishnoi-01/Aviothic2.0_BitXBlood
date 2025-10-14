import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaTint, FaCity, FaPhone, FaExclamationTriangle } from "react-icons/fa";

const SOSForm = () => {
  const [formData, setFormData] = useState({
    requesterName: "",
    email: "",
    bloodGroup: "",
    city: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      const res = await axios.post("/sos", formData);
      setMessage(res.data.message || "SOS request sent successfully!");
      setFormData({
        requesterName: "",
        email: "",
        bloodGroup: "",
        city: "",
        phone: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error sending SOS request. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { name: "requesterName", type: "text", placeholder: "Your Full Name", icon: FaUser, required: true },
    { name: "email", type: "email", placeholder: "Your Email Address", icon: FaEnvelope, required: true },
    { name: "bloodGroup", type: "select", placeholder: "Blood Group", icon: FaTint, required: true },
    { name: "city", type: "text", placeholder: "Your City", icon: FaCity, required: true },
    { name: "phone", type: "tel", placeholder: "Phone Number (Optional)", icon: FaPhone, required: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Alert Banner */}
        <motion.div
          className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl p-6 mb-8 shadow-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <FaExclamationTriangle className="text-4xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">🚨 Emergency Blood Request</h2>
              <p className="text-white/90">Submit your request and get instant help from our donor network</p>
            </div>
          </div>
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
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-red-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Details</h3>
            <p className="text-gray-500">Fill in the information below to send an SOS request</p>
          </div>

          {inputFields.map((input, index) => (
            <motion.div
              key={input.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <label
                htmlFor={input.name}
                className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"
              >
                <input.icon className="text-red-500" />
                {input.placeholder}
                {input.required && <span className="text-red-500">*</span>}
              </label>
              
              {input.type === "select" ? (
                <select
                  id={input.name}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                  required={input.required}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              ) : (
                <input
                  id={input.name}
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={formData[input.name]}
                  onChange={handleChange}
                  required={input.required}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
                />
              )}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 hover:shadow-2xl transform hover:scale-[1.02]"
            }`}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Sending SOS...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                🚨 Send Emergency Request
              </span>
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Your request will be sent to all matching donors in your area.
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default SOSForm;
