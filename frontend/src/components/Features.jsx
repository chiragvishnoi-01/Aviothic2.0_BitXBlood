import React from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaBolt, FaGlobeAmericas, FaChartLine, FaMobileAlt, FaShieldAlt } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: FaBolt,
      title: "Lightning Fast",
      description: "Connect with blood donors in real-time. Get immediate responses to urgent requests.",
      gradient: "from-yellow-400 to-orange-500",
      bgGlow: "group-hover:shadow-yellow-500/50",
    },
    {
      icon: FaUserShield,
      title: "100% Verified",
      description: "All donors are verified and authenticated for your safety and peace of mind.",
      gradient: "from-blue-400 to-cyan-500",
      bgGlow: "group-hover:shadow-blue-500/50",
    },
    {
      icon: FaGlobeAmericas,
      title: "Global Network",
      description: "Access a worldwide network of donors and blood banks across multiple countries.",
      gradient: "from-green-400 to-emerald-500",
      bgGlow: "group-hover:shadow-green-500/50",
    },
    {
      icon: FaChartLine,
      title: "Track Impact",
      description: "Monitor your contributions and see how many lives you've helped save.",
      gradient: "from-purple-400 to-pink-500",
      bgGlow: "group-hover:shadow-purple-500/50",
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Ready",
      description: "Access BloodLink anywhere, anytime from any device with responsive design.",
      gradient: "from-red-400 to-rose-500",
      bgGlow: "group-hover:shadow-red-500/50",
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-level security.",
      gradient: "from-indigo-400 to-blue-500",
      bgGlow: "group-hover:shadow-indigo-500/50",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-200 to-rose-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-200 to-red-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-red-100 to-rose-100 border-2 border-red-200 rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <span className="text-red-600 font-black text-sm">✨ WHY CHOOSE US</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
              Features That
            </span>
            <br />
            <span className="text-gray-800">Save Lives</span>
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Powered by cutting-edge technology to connect donors and recipients seamlessly
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Card */}
              <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-100 hover:border-red-200 transition-all duration-500 shadow-xl ${feature.bgGlow} overflow-hidden`}>
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating Icon */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl mx-auto`}>
                    <feature.icon className="text-4xl text-white" />
                  </div>

                  {/* Orbiting Dots */}
                  <motion.div
                    className={`absolute top-0 left-0 w-3 h-3 bg-gradient-to-br ${feature.gradient} rounded-full`}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: "40px 40px",
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative text-center">
                  <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-red-600 group-hover:to-rose-600 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Floating Particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                  style={{
                    top: `${20 + i * 30}%`,
                    left: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.a
            href="#get-started"
            className="inline-block relative px-10 py-5 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white font-black text-lg rounded-2xl shadow-2xl shadow-red-400/50 overflow-hidden group"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Saving Lives Today 🚀</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
