import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHeartbeat, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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
    // Removed awareness link
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
              Raktchain
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
          
          <li>
            <Link
              to="/sos"
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-bold text-sm hover:from-red-700 hover:to-rose-700 transition-all shadow-md"
            >
              🚨 SOS
            </Link>
          </li>
          
          {/* Show admin panel link only for admin users */}
          {user && user.role === 'admin' && (
            <li>
              <Link
                to="/admin"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-bold text-sm hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
              >
                ⚙️ Admin
              </Link>
            </li>
          )}
          
          {/* Show login/signup buttons when user is not authenticated */}
          {!user ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="px-5 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg font-bold text-sm hover:from-gray-800 hover:to-black transition-all shadow-md"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-bold text-sm hover:from-red-700 hover:to-rose-700 transition-all shadow-md"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            /* Show profile and logout buttons when user is authenticated */
            <li className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg font-bold text-sm text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:inline">{user.name}</span>
              </button>
              {/* Dropdown for logout */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-[10000]">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu - Simplified animations */}
        <motion.div 
          className={`md:hidden fixed inset-0 bg-white z-10 flex flex-col pt-20 px-6 pb-6 overflow-y-auto ${
            isOpen ? "block" : "hidden"
          }`}
          initial={false}
          animate={{ 
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 20
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-bold ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-red-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              to="/sos"
              onClick={() => setIsOpen(false)}
              className="block bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-lg font-bold hover:from-red-700 hover:to-rose-700 transition shadow-md text-center"
            >
              🚨 SOS Request
            </Link>
            
            {/* Show admin panel link only for admin users */}
            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-orange-600 transition shadow-md text-center"
              >
                ⚙️ Admin Panel
              </Link>
            )}
            
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
              <div className="space-y-4 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg font-bold hover:from-gray-800 hover:to-black transition shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-bold hover:from-red-700 hover:to-rose-700 transition shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;