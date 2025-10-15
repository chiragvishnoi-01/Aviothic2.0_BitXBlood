import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "../api/axiosConfig";
import CampaignCard from "../components/CampaignCard";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("/campaigns");
        setCampaigns(Array.isArray(res.data) ? res.data : []);
        setError(null);
      } catch (err) {
        console.error("Error loading campaigns:", err);
        setError("Failed to load campaigns. Please try again later.");
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-rose-50 relative overflow-hidden">
        {/* Animated background particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Animated 3D Spinner */}
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-20 h-20 border-4 border-red-200 border-t-red-600 border-r-rose-600 rounded-full"></div>
          <motion.div
            className="absolute inset-2 border-4 border-rose-200 border-b-rose-600 border-l-pink-600 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            <span className="text-3xl">📅</span>
          </motion.div>
        </motion.div>
        
        <motion.p
          className="text-red-600 text-xl font-semibold mt-6"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          Loading campaigns...
        </motion.p>
        
        {/* Pulsing dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-red-600 rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-rose-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-4 rounded-2xl shadow-lg">
              <FaCalendarAlt className="text-5xl" />
            </div>
          </div>
          <h1 className="text-5xl font-black mb-4">
            Active <span className="gradient-text">Campaigns</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Join our life-saving events and make a difference in your community
          </p>
          <Link
            to="/create-campaign"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <FaPlus />
            Create New Campaign
          </Link>
        </motion.div>

        {/* Campaigns Grid */}
        {campaigns.length === 0 ? (
          <motion.div
            className="text-center py-20 bg-white rounded-2xl shadow-xl max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">📅</div>
            <p className="text-gray-500 text-xl mb-4">No campaigns available at the moment.</p>
            <p className="text-gray-400">Check back soon for upcoming events!</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((c, i) => (
              <motion.div
                key={c._id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <CampaignCard
                  campaign={{
                    ...c,
                    title: c.title || "Blood Donation Campaign",
                    description: c.description || "Join us in saving lives through blood donation.",
                    date: c.date || Date.now(),
                  }}
                />
                <div className="mt-3 ml-2 space-y-1">
                  {c.organizer && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span>👤</span>
                      Organized by: <span className="font-semibold text-red-600">{c.organizer}</span>
                    </p>
                  )}
                  {c.city && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span>📍</span>
                      {c.city}
                    </p>
                  )}
                  {c.targetDonors && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span>🎯</span>
                      Target: <span className="font-semibold">{c.targetDonors}</span> donors
                      {c.registeredDonors !== undefined && (
                        <span className="text-green-600">({c.registeredDonors} registered)</span>
                      )}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
