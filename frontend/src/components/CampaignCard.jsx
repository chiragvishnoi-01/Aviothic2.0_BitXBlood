import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const CampaignCard = ({ campaign }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-red-50 group card-hover"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with gradient */}
      <div className="h-2 bg-gradient-to-r from-red-600 via-rose-500 to-pink-500"></div>
      
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
          {campaign.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {campaign.description}
        </p>
        
        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaCalendarAlt className="text-red-500" />
            <span>{new Date(campaign.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
          </div>
          
          {campaign.location && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="line-clamp-1">{campaign.location}</span>
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
          Learn More
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
