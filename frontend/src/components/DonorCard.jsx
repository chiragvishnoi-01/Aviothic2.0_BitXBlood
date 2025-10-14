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
      className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border-2 border-transparent hover:border-red-200 group overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-rose-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating Particles */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10">
      {/* Blood Group Badge */}
      <div className="flex justify-between items-start mb-5">
        <motion.div
          className={`bg-gradient-to-br ${gradientClass} text-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden`}
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
          <div className="text-center relative z-10">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaTint className="text-2xl mx-auto mb-1" />
            </motion.div>
            <div className="text-base font-black">{donor.bloodGroup}</div>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col items-end gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-700">Available</span>
          </div>
        </motion.div>
      </div>

      {/* Donor Info */}
      <motion.h3
        className="text-2xl font-black text-gray-800 mb-4 group-hover:text-red-600 transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {donor.name}
      </motion.h3>
      
      <div className="space-y-3 text-gray-600 mb-5">
        <motion.div
          className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-red-50 transition-colors group/item"
          whileHover={{ x: 5 }}
        >
          <div className="bg-red-100 p-2 rounded-lg group-hover/item:bg-red-200 transition-colors">
            <FaMapMarkerAlt className="text-red-600" />
          </div>
          <span className="text-sm font-medium">{donor.city}</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-red-50 transition-colors group/item"
          whileHover={{ x: 5 }}
        >
          <div className="bg-red-100 p-2 rounded-lg group-hover/item:bg-red-200 transition-colors">
            <FaPhone className="text-red-600" />
          </div>
          <span className="text-sm font-bold">{donor.phone}</span>
        </motion.div>
      </div>

      {/* Action Button */}
      <motion.button
        className="mt-4 w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPhone className="text-sm" />
        Contact Donor
      </motion.button>
      </div>
    </motion.div>
  );
};

export default DonorCard;
