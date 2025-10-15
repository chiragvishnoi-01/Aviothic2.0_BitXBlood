import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaUsers, FaCalendarAlt } from "react-icons/fa";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import DonorCard from "../components/DonorCard";
import CampaignCard from "../components/CampaignCard";
import AnimatedBloodDonation from "../components/AnimatedBloodDonation";
import donorsData from "../data/donors.json";

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Recent Donors */}
      <section className="container mx-auto px-6 py-20 relative overflow-hidden">
        {/* Animated background decoration with multiple orbiting blobs */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 -z-10"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating blood drop particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`donor-particle-${i}`}
            className="absolute w-6 h-8 bg-gradient-to-b from-red-300 to-red-500 opacity-20"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i % 3) * 30}%`,
              clipPath: 'path("M3,0 C3,0 0,2 0,4 C0,6 2,8 3,8 C4,8 6,6 6,4 C6,2 3,0 3,0Z")',
              scale: 0.8 + (i % 3) * 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Orbiting heart particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-2xl"
            style={{
              left: '50%',
              top: '30%',
            }}
            animate={{
              x: [0, Math.cos(i * 60 * Math.PI / 180) * 200, Math.cos((i * 60 + 360) * Math.PI / 180) * 200, 0],
              y: [0, Math.sin(i * 60 * Math.PI / 180) * 200, Math.sin((i * 60 + 360) * Math.PI / 180) * 200, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          >
            ❤️
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-12">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="bg-gradient-to-br from-red-600 to-rose-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <FaUsers className="text-2xl relative z-10" />
                </motion.div>
              </motion.div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-800">
                  Recent <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">Donors</span>
                </h2>
                <p className="text-gray-500 text-base mt-1">Heroes who made a difference today</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/dashboard"
                className="text-red-600 hover:text-red-700 font-bold transition flex items-center gap-2 group bg-red-50 hover:bg-red-100 px-6 py-3 rounded-xl"
              >
                View All Donors
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {donorsData.slice(0, 6).map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.3
                }}
              >
                <DonorCard donor={donor} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Campaign Section */}
      <section className="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-20 relative overflow-hidden">
        {/* Animated background decorations with complex motion */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-200/20 to-rose-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -40, 0],
            y: [0, -25, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Floating calendar icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`calendar-${i}`}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 8 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            📅
          </motion.div>
        ))}
        
        {/* Sparkling stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <motion.div
                  className="bg-gradient-to-br from-red-600 to-rose-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                  <FaCalendarAlt className="text-xl relative z-10" />
                </motion.div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Active <span className="gradient-text">Campaigns</span>
                  </h2>
                  <p className="text-gray-500 text-sm">Join our life-saving events</p>
                </div>
              </div>
              <Link
                to="/campaigns"
                className="text-red-600 hover:text-red-700 font-semibold transition flex items-center gap-2 group"
              >
                Explore All
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "City Blood Drive 2025",
                  description: "Join our local drive to save lives and support hospitals in need. Make an impact today!",
                  date: new Date('2025-11-15'),
                  location: "Central City Hospital",
                },
                {
                  title: "University Blood Camp",
                  description: "Students unite to donate and raise awareness about the importance of blood donation.",
                  date: new Date('2025-11-20'),
                  location: "Sunrise University Campus",
                },
                {
                  title: "Red Cross Awareness Week",
                  description: "Spread awareness and donate for emergency needs. Every donation counts.",
                  date: new Date('2025-11-25'),
                  location: "Community Hall",
                },
              ].map((campaign, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CampaignCard campaign={campaign} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 relative overflow-hidden">
        {/* Floating SOS particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sos-particle-${i}`}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.sin(i) * 30, 0],
              rotate: [0, 360],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🚨
          </motion.div>
        ))}
        
        <motion.div
          className="relative bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 text-white rounded-3xl p-12 text-center shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Multiple animated background decorations */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              x: [0, -20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 1,
            }}
          />
          
          {/* Orbiting plus symbols */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`plus-${i}`}
              className="absolute text-4xl text-white/20 font-bold"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 150],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 150],
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              +
            </motion.div>
          ))}
          
          <div className="relative z-10">
            <motion.div
              className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <motion.span
                animate={{
                  rotate: [0, 20, -20, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="inline-block"
              >
                🚨
              </motion.span>
              {" "}Emergency Alert
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Need Blood Urgently?
            </motion.h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Submit an SOS request and our network of thousands of donors will respond instantly to help save a life.
            </p>
            <Link
              to="/sos"
              className="inline-block bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-100/50 to-transparent transform -skew-x-12"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
              <span className="relative z-10">🚨 Send SOS Request Now</span>
            </Link>
            
            <div className="mt-8 flex justify-center gap-8 text-sm">
              {[
                { value: "24/7", label: "Availability" },
                { value: "<5min", label: "Response Time" },
                { value: "100%", label: "Free Service" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <motion.div
                    className="text-3xl font-black"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Animated Blood Donation Showcase - Replaces Static GIF */}
      <section className="container mx-auto px-6 py-20 relative overflow-hidden">
        {/* Animated Background */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute w-2 h-2 bg-red-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-4"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            style={{
              background: 'linear-gradient(90deg, #dc2626, #f43f5e, #ec4899, #dc2626)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How Blood Donation Works
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Watch our beautiful animated illustration showing the life-saving process
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedBloodDonation size="large" />
        </motion.div>

        {/* Info Cards Below Animation */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            {
              icon: "💉",
              title: "Safe Process",
              description: "Sterile equipment and professional staff ensure your safety"
            },
            {
              icon: "⏱️",
              title: "Quick & Easy",
              description: "Donation takes only 10-15 minutes of your time"
            },
            {
              icon: "❤️",
              title: "Saves Lives",
              description: "One donation can save up to 3 lives"
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-red-100 hover:border-red-300 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                {card.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
