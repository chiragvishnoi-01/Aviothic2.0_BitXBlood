import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-20">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center relative z-10">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left mt-8 md:mt-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ❤️ Save Lives, Donate Blood
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
              Every Drop
            </span>
            <br />
            <span className="text-gray-800">Counts.</span>
          </h1>
          
          <p className="mb-8 text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg">
            Join thousands of heroes making a difference. Connect with donors,
            save lives, and be part of something extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              to="/sos"
              className="group relative bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🚨 Request Blood Now
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
            
            <Link
              to="/campaigns"
              className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-lg"
            >
              View Campaigns
            </Link>
          </div>
          
          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-4 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { value: "10K+", label: "Donors" },
              { value: "5K+", label: "Lives Saved" },
              { value: "50+", label: "Campaigns" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-black text-red-600">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image/Animation */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            
            {/* Blood Drop Animation */}
            <div className="relative w-full max-w-md h-96 flex items-center justify-center">
              <motion.div
                className="relative"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Main Blood Drop */}
                <div className="relative">
                  <svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer glow */}
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <linearGradient id="bloodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#dc2626', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#991b1b', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    
                    {/* Blood drop shape */}
                    <path
                      d="M100 20 C100 20, 40 80, 40 140 C40 180, 65 220, 100 220 C135 220, 160 180, 160 140 C160 80, 100 20, 100 20Z"
                      fill="url(#bloodGradient)"
                      filter="url(#glow)"
                      className="drop-shadow-2xl"
                    />
                    
                    {/* Heart icon in center */}
                    <g transform="translate(100, 120)">
                      <motion.path
                        d="M0,-10 C-10,-20, -20,-15, -20,0 C-20,15, 0,25, 0,25 C0,25, 20,15, 20,0 C20,-15, 10,-20, 0,-10Z"
                        fill="white"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </g>
                  </svg>
                  
                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-red-400 rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
