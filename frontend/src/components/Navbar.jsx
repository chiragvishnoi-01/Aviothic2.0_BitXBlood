import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHeartbeat, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/campaigns", label: "Campaigns" },
    { path: "/leaderboard", label: "Leaderboard" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="relative bg-white/95 backdrop-blur-md text-gray-800 px-6 py-4 shadow-lg sticky top-0 z-[9999] border-b border-red-100">
      {/* Simple gradient top bar - no animation */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-pink-500"></div>
      
      <div className="container mx-auto flex justify-between items-center relative z-10">
        {/* Simplified Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative bg-gradient-to-br from-red-600 to-rose-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <FaHeartbeat className="text-2xl text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              BloodLink
            </span>
            <span className="text-xs text-gray-600 font-semibold -mt-1">
              💝 Connecting Lives
            </span>
          </div>
        </Link>

        {/* Desktop Menu - Simplified animations */}
        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          
          {user?.role === 'admin' && (
            <li>
              <Link
                to="/admin"
                className="px-5 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 transition-all duration-200 shadow-md"
              >
                ⚙️ Admin
              </Link>
            </li>
          )}
          
          <li>
            <Link
              to="/sos"
              className="px-6 py-2.5 rounded-lg font-bold text-sm bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <span>🚨</span> SOS Emergency
            </Link>
          </li>
          
          {user ? (
            <li className="ml-4 flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold text-gray-800 text-sm hidden md:inline">{user.name}</span>
              </Link>
            </li>
          ) : (
            <li className="ml-4 flex items-center gap-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-red-600 px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 hover:bg-red-50 border border-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:from-red-700 hover:to-rose-700 transition-all duration-200 shadow-md"
              >
                ✨ Sign Up Free
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-800 hover:text-red-600 focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden mt-4 pb-4 space-y-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-bold transition-all ${
                isActive(link.path)
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md"
            >
              ⚙️ Admin Panel
            </Link>
          )}
          
          <Link
            to="/sos"
            onClick={() => setIsOpen(false)}
            className="block bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-lg font-bold hover:from-red-700 hover:to-rose-700 transition shadow-md text-center"
          >
            🚨 SOS Request
          </Link>
          
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold text-gray-800 flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {user.name}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-4 py-3 rounded-lg font-bold transition-all text-center border border-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-lg font-bold hover:from-red-700 hover:to-rose-700 transition shadow-md text-center"
              >
                Sign Up Free
              </Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
