import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import DonorCard from "../components/DonorCard";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";

const Dashboard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/auth/donors-public");
        setDonors(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load donors. Please try again later.");
        setDonors([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDonors();
    
    // Retry logic - if there's an error, retry after 5 seconds
    let retryTimer;
    if (error && retryCount < 3) {
      retryTimer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
      }, 5000);
    }
    
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [error, retryCount]);

  const handleRetry = () => {
    setRetryCount(0);
    setError("");
    setLoading(true);
  };

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup =
      filterBloodGroup === "" || donor.bloodGroup === filterBloodGroup;
    return matchesSearch && matchesBloodGroup;
  });

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-rose-50 relative overflow-hidden">
        {/* DNA-like animated strands */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-red-300 to-rose-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              height: '60%',
            }}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        
        {/* Animated blood drop loader - Smooth version */}
        <div className="relative mb-8">
          {/* 3D Rotating Drop */}
          <motion.div
            className="relative w-24 h-32 flex items-center justify-center"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Blood drop using CSS */}
            <motion.div
              className="relative w-16 h-20"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-red-500" style={{ borderBottomColor: '#ef4444' }} />
            </motion.div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-40"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.div>
          
          {/* Orbiting cells - Smooth animation */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute w-3 h-3 bg-red-400 rounded-full shadow-lg"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-6px',
                marginTop: '-6px',
              }}
              animate={{
                x: [0, Math.cos((i * 90) * Math.PI / 180) * 60],
                y: [0, Math.sin((i * 90) * Math.PI / 180) * 60],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        <motion.p
          className="text-red-600 text-xl font-semibold"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          Loading donors...
        </motion.p>
        
        {/* Heartbeat pulse line */}
        <div className="w-80 h-16 mt-6 relative overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 320 64">
            <motion.path
              d="M0,32 L50,32 L60,20 L70,44 L80,8 L90,56 L100,32 L320,32"
              stroke="#dc2626"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>
        </div>
        
        {retryCount > 0 && (
          <p className="text-gray-500 mt-4">
            Retry attempt {retryCount}/3...
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex justify-center items-center bg-gradient-to-br from-red-50 to-rose-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-600 text-xl font-semibold mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FaRedo />
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
          {retryCount >= 3 && (
            <p className="text-gray-500 text-sm mt-4">
              Still having issues? Please check your internet connection or try again later.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">Donor</span> Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Find and connect with life-saving heroes</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center text-gray-600">
            Showing <span className="font-bold text-red-600">{filteredDonors.length}</span> donor(s)
          </div>
        </motion.div>

        {/* Donors Grid */}
        {filteredDonors.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl">No donors found matching your criteria.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDonors.map((donor, index) => (
              <motion.div
                key={donor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DonorCard donor={donor} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;