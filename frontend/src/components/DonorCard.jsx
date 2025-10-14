import React from "react";
import { FaPhone, FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { motion } from "framer-motion";

const DonorCard = ({ donor }) => {
  const bloodGroupColors = {
    "A+": "from-red-500 to-rose-500",
    "A-": "from-red-600 to-rose-600",
    "B+": "from-pink-500 to-rose-500",
    "B-": "from-pink-600 to-rose-600",
    "O+": "from-orange-500 to-red-500",
    "O-": "from-orange-600 to-red-600",
    "AB+": "from-purple-500 to-pink-500",
    "AB-": "from-purple-600 to-pink-600",
  };

  const gradientClass = bloodGroupColors[donor.bloodGroup] || "from-red-500 to-rose-500";

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-red-50 group card-hover"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Blood Group Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className={`bg-gradient-to-br ${gradientClass} text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
          <div className="text-center">
            <FaTint className="text-xl mx-auto mb-1" />
            <div className="text-sm font-bold">{donor.bloodGroup}</div>
          </div>
        </div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Available"></div>
      </div>

      {/* Donor Info */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
        {donor.name}
      </h3>
      
      <div className="space-y-2 text-gray-600">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span className="text-sm">{donor.city}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="text-red-500" />
          <span className="text-sm font-medium">{donor.phone}</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="mt-4 w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
        Contact Donor
      </button>
    </motion.div>
  );
};

export default DonorCard;
