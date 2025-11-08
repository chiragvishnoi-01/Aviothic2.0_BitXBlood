import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeartbeat, FaHandHoldingHeart, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: FaInstagram, href: "https://www.instagram.com/chiragvishnoi01/", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: FaTwitter, href: "https://x.com/Raktchain?t=uxGclJKtqa8tP6PM8XIm1g&s=09", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: FaGithub, href: "https://github.com/chiragvishnoi-01", label: "GitHub", color: "hover:bg-gray-700" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/chiragvishnoi01/", label: "LinkedIn", color: "hover:bg-blue-700" },
  ];

  const stats = [
    { icon: FaHeartbeat, value: "10,000+", label: "Donors", color: "from-red-500 to-rose-600" },
    { icon: FaHandHoldingHeart, value: "5,000+", label: "Lives Saved", color: "from-pink-500 to-rose-600" },
    { icon: FaHeart, value: "50+", label: "Campaigns", color: "from-red-600 to-pink-600" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500 to-rose-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500 to-red-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Stats Section - Above Footer */}
      <div className="relative border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-red-500/50 transition-all duration-300 overflow-hidden">
                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  
                  <div className="relative flex items-center gap-4">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-xl`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="text-3xl text-white" />
                    </motion.div>
                    <div>
                      <motion.div
                        className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: index * 0.2 + 0.3 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-400 font-semibold">{stat.label}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl blur-lg opacity-70"></div>
                <div className="relative bg-gradient-to-br from-red-600 to-rose-600 p-3 rounded-2xl">
                  <FaHeart className="text-white text-2xl" />
                </div>
              </motion.div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-red-500 via-rose-400 to-pink-500 bg-clip-text text-transparent">Raktchain</h3>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-xs">
              Connecting donors with those in need. Every drop counts in saving lives. Together, we make a difference! 💉❤️
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-11 h-11 bg-white/5 backdrop-blur-sm border border-white/10 ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 hover:border-white/30 group`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-black text-lg mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent flex items-center gap-2">
              ⚡ Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/campaigns", label: "Campaigns" },
                { to: "/leaderboard", label: "Leaderboard" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link to={link.to} className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-black text-lg mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent flex items-center gap-2">
              🛟 Support
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/sos", label: "Emergency Request", emoji: "🚨" },
                { href: "#", label: "FAQs", emoji: "❓" },
                { href: "#", label: "Contact Us", emoji: "📧" },
                { href: "#", label: "Privacy Policy", emoji: "🔒" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {link.to ? (
                    <Link to={link.to} className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group">
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity">{link.emoji}</span>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group">
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity">{link.emoji}</span>
                      {link.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-black text-lg mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent flex items-center gap-2">
              📞 Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <motion.li 
                className="flex items-start gap-3 text-gray-400 group hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="w-9 h-9 bg-red-600/20 group-hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300">
                  <FaEnvelope className="text-red-400 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold text-xs text-gray-500">Email</div>
                  <div>raktchain@gmail.com</div>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 text-gray-400 group hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="w-9 h-9 bg-red-600/20 group-hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300">
                  <FaPhone className="text-red-400 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold text-xs text-gray-500">Phone</div>
                  <div>+91 7393019961</div>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3 text-gray-400 group hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="w-9 h-9 bg-red-600/20 group-hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300">
                  <FaMapMarkerAlt className="text-red-400 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold text-xs text-gray-500">Location</div>
                  <div>Worldwide Service</div>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <p className="text-center md:text-left">
              © {currentYear} <span className="font-bold text-red-400">Raktchain</span>. All Rights Reserved. 
            </p>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <FaHeart className="inline text-red-500" />
            </motion.div>
          </div>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-red-400 transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-rose-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;