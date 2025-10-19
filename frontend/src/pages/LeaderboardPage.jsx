import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaAward, FaTint, FaRedo } from "react-icons/fa";

const Leaderboard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/leaderboard");
        // Ensure data is array and has proper structure
        const validDonors = Array.isArray(res.data) ? res.data : [];
        setDonors(validDonors);
        setError(null);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard. Please try again later.");
        setDonors([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
    
    // Retry logic - if there's an error, retry after 5 seconds
    let retryTimer;
    if (error && retryCount < 3) {
      retryTimer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // This will trigger a re-render and the effect will run again
      }, 5000);
    }
    
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [error, retryCount]);

  const handleRetry = () => {
    setRetryCount(0);
    setError(null);
    setLoading(true);
  };

  const getMedal = (index) => {
    const medals = [
      { icon: FaTrophy, color: "text-yellow-500", bg: "bg-yellow-50", border: "border-yellow-200" },
      { icon: FaMedal, color: "text-gray-400", bg: "bg-gray-50", border: "border-gray-200" },
      { icon: FaAward, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
    ];
    return medals[index] || { icon: FaTint, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" };
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-rose-50 relative overflow-hidden">
        {/* Floating trophy particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🏆', '🥇', '🥈', '🥉', '⭐'][i % 5]}
          </motion.div>
        ))}
        
        {/* 3D Trophy Spinner */}
        <motion.div className="relative mb-8">
          <motion.div
            animate={{
              rotateY: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="text-8xl">🏆</div>
          </motion.div>
          
          {/* Orbiting stars */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * 120 * Math.PI / 180) * 60],
                y: [0, Math.sin(i * 120 * Math.PI / 180) * 60],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              ⭐
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p
          className="text-red-600 text-xl font-semibold"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          Loading leaderboard...
        </motion.p>
        
        {/* Animated progress bar */}
        <div className="w-64 h-2 bg-red-100 rounded-full mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-rose-600 to-pink-600"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
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
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-rose-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-2xl shadow-lg">
              <FaTrophy className="text-5xl" />
            </div>
          </div>
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">Top Donors</span> Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">Celebrating our heroes who save lives</p>
        </motion.div>

        {donors.length > 0 ? (
          <div className="space-y-4">
            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {donors.slice(0, 3).map((donor, index) => {
                const medal = getMedal(index);
                const MedalIcon = medal.icon;
                // Safe access to donor properties
                const donorName = donor?.name || 'Anonymous';
                const donorCity = donor?.city || 'Unknown';
                const donationCount = donor?.donationHistory?.length || 0;
                
                return (
                  <motion.div
                    key={donor._id}
                    className={`bg-white rounded-2xl shadow-2xl p-6 border-2 ${medal.border} ${index === 0 ? 'md:order-2 md:scale-110' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-center">
                      <div className={`${medal.bg} ${medal.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${medal.border}`}>
                        <MedalIcon className="text-4xl" />
                      </div>
                      <div className="text-6xl font-black mb-2">
                        <span className={medal.color}>#{index + 1}</span>
                      </div>
                      <h3 className="font-bold text-xl text-gray-800 mb-1">{donorName}</h3>
                      <p className="text-sm text-gray-500 mb-3">{donorCity}</p>
                      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-full font-bold inline-flex items-center gap-2">
                        <FaTint />
                        {donationCount} Donations
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Rest of the list */}
            {donors.length > 3 && (
              <motion.div
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-4">
                  <h3 className="font-bold text-lg">Other Top Contributors</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {donors.slice(3).map((donor, index) => {
                    const actualIndex = index + 3;
                    const medal = getMedal(actualIndex);
                    const MedalIcon = medal.icon;
                    // Safe access to donor properties
                    const donorName = donor?.name || 'Anonymous';
                    const donorCity = donor?.city || 'Unknown';
                    const donorBloodGroup = donor?.bloodGroup || 'N/A';
                    const donationCount = donor?.donationHistory?.length || 0;
                    
                    return (
                      <motion.li
                        key={donor._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (actualIndex - 3) * 0.05 }}
                        className="py-5 px-6 hover:bg-red-50 transition-all duration-300 group"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <div className={`${medal.bg} ${medal.color} w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${medal.border} group-hover:scale-110 transition-transform`}>
                              {actualIndex + 1}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">
                                {donorName}
                              </h3>
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                <span>📍 {donorCity}</span>
                                <span className="text-gray-300">•</span>
                                <span>🩸 {donorBloodGroup}</span>
                              </p>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 shadow-lg">
                            <FaTint />
                            {donationCount}
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            className="text-center py-20 bg-white rounded-2xl shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">💪</div>
            <p className="text-gray-500 text-xl mb-4">
              No donors ranked yet. Be the first hero to donate!
            </p>
            <a
              href="/sos"
              className="inline-block bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Donating
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;