import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const CampaignCard = ({ campaign }) => {
  return (
    <motion.div
      className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-red-200 group"
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
    >
      {/* Animated Header Gradient */}
      <motion.div
        className="h-3 bg-gradient-to-r from-red-600 via-rose-500 to-pink-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-rose-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating Icon */}
      <motion.div
        className="absolute top-6 right-6 bg-gradient-to-br from-red-600 to-rose-600 p-3 rounded-2xl shadow-lg"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaCalendarAlt className="text-white text-xl" />
      </motion.div>
      
      <div className="p-8 relative z-10">
        {/* Title */}
        <motion.h3
          className="text-2xl font-black text-gray-800 mb-4 group-hover:text-red-600 transition-colors pr-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {campaign.title}
        </motion.h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3 text-base leading-relaxed">
          {campaign.description}
        </p>
        
        {/* Details with enhanced design */}
        <div className="space-y-3 mb-6">
          <motion.div
            className="flex items-center gap-3 bg-red-50 p-3 rounded-xl group-hover:bg-red-100 transition-colors"
            whileHover={{ x: 5 }}
          >
            <div className="bg-red-600 p-2 rounded-lg">
              <FaCalendarAlt className="text-white text-sm" />
            </div>
            <span className="text-sm font-bold text-gray-700">
              {new Date(campaign.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </motion.div>
          
          {campaign.location && (
            <motion.div
              className="flex items-center gap-3 bg-rose-50 p-3 rounded-xl group-hover:bg-rose-100 transition-colors"
              whileHover={{ x: 5 }}
            >
              <div className="bg-rose-600 p-2 rounded-lg">
                <FaMapMarkerAlt className="text-white text-sm" />
              </div>
              <span className="text-sm font-bold text-gray-700 line-clamp-1">{campaign.location}</span>
            </motion.div>
          )}
        </div>
        
        {/* Action Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 group/button relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover/button:translate-x-full transition-transform duration-700"></div>
          <span className="relative z-10 flex items-center gap-2">
            Join Campaign
            <FaArrowRight className="group-hover/button:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
