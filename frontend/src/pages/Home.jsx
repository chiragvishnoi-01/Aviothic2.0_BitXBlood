import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaUsers, FaCalendarAlt } from "react-icons/fa";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import DonorCard from "../components/DonorCard";
import CampaignCard from "../components/CampaignCard";
import donorsData from "../data/donors.json";

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Recent Donors */}
      <section className="container mx-auto px-6 py-20 relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        
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
              <div className="bg-gradient-to-br from-red-600 to-rose-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                <FaUsers className="text-2xl" />
              </div>
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
        {/* Static background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-200/20 to-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-red-600 to-rose-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <FaCalendarAlt className="text-xl" />
                </div>
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
      <section className="container mx-auto px-6 py-16">
        <motion.div
          className="relative bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 text-white rounded-3xl p-12 text-center shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
              🚨 Emergency Alert
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Need Blood Urgently?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Submit an SOS request and our network of thousands of donors will respond instantly to help save a life.
            </p>
            <Link
              to="/sos"
              className="inline-block bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              🚨 Send SOS Request Now
            </Link>
            
            <div className="mt-8 flex justify-center gap-8 text-sm">
              <div>
                <div className="text-3xl font-black">24/7</div>
                <div className="text-white/80">Availability</div>
              </div>
              <div>
                <div className="text-3xl font-black">&lt;5min</div>
                <div className="text-white/80">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-black">100%</div>
                <div className="text-white/80">Free Service</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Home;
