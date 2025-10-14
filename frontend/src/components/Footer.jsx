import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaHeart, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaHeart className="text-red-500 text-2xl" />
              <h3 className="text-2xl font-bold">BloodLink</h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Connecting donors with those in need. Every drop counts in saving lives.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-red-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</Link></li>
              <li><Link to="/campaigns" className="text-gray-400 hover:text-white transition">Campaigns</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-white transition">Leaderboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-red-400">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sos" className="text-gray-400 hover:text-white transition">Emergency Request</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-red-400">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <FaEnvelope className="text-red-500" />
                <span>support@bloodlink.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FaPhone className="text-red-500" />
                <span>+1 (800) DONATE-BLOOD</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 BloodLink. All Rights Reserved. Made with <FaHeart className="inline text-red-500 mx-1" /> for humanity.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
