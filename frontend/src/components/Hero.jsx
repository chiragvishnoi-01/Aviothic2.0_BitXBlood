import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-20">
      {/* Static Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-20"></div>
      
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

        {/* 3D Illustration - Better than GIF */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-lg h-[500px]">
            {/* Static Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-400 rounded-full blur-3xl opacity-30"></div>
            
            {/* Simplified 3D Blood Drop Illustration */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Central Drop - Simple version */}
              <div className="relative">
                <svg width="300" height="350" viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* Gradients */}
                    <linearGradient id="bloodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                      <stop offset="50%" style={{stopColor: '#dc2626', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#991b1b', stopOpacity: 1}} />
                    </linearGradient>
                    
                    <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.6}} />
                      <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 0}} />
                    </linearGradient>
                    
                    {/* Shadow */}
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
                      <feOffset dx="0" dy="10" result="offsetblur"/>
                      <feFlood floodColor="#991b1b" floodOpacity="0.3"/>
                      <feComposite in2="offsetblur" operator="in"/>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Main Blood Drop */}
                  <g filter="url(#shadow)">
                    <path
                      d="M150 30 C150 30, 70 110, 70 190 C70 250, 105 310, 150 310 C195 310, 230 250, 230 190 C230 110, 150 30, 150 30Z"
                      fill="url(#bloodGrad)"
                      className="drop-shadow-2xl"
                    />
                    
                    {/* Shine effect */}
                    <ellipse
                      cx="120"
                      cy="100"
                      rx="40"
                      ry="60"
                      fill="url(#shineGrad)"
                      opacity="0.4"
                    />
                  </g>
                  
                  {/* Heart inside */}
                  <g transform="translate(150, 180)">
                    <path
                      d="M0,-20 C-15,-35, -35,-25, -35,0 C-35,25, 0,45, 0,45 C0,45, 35,25, 35,0 C35,-25, 15,-35, 0,-20Z"
                      fill="white"
                    />
                    {/* Plus sign in heart */}
                    <g fill="#dc2626">
                      <rect x="-2" y="-12" width="4" height="24" rx="2"/>
                      <rect x="-12" y="-2" width="24" height="4" rx="2"/>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
