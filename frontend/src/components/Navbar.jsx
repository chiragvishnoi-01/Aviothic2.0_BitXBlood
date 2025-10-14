import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHeartbeat, FaUser, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
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
    <nav className="relative bg-gradient-to-r from-red-600 via-red-700 to-rose-600 text-white px-6 py-5 shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-2xl hover:scale-105 transition-all duration-300 group"
        >
          <motion.div
            className="bg-white/20 backdrop-blur-sm p-2 rounded-2xl border border-white/30"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <FaHeartbeat className="text-3xl text-white group-hover:text-red-100" />
          </motion.div>
          <div className="flex flex-col">
            <span className="bg-white text-red-600 px-4 py-1.5 rounded-xl shadow-lg font-black text-xl tracking-tight">BloodLink</span>
            <span className="text-xs text-white/70 mt-0.5 ml-1">Save Lives Together</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-2 items-center">
          {navLinks.map((link) => (
            <motion.li
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-white text-red-600 shadow-lg"
                    : "hover:bg-white/20 hover:text-white backdrop-blur-sm"
                }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
          
          {user?.role === 'admin' && (
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin"
                className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-300 hover:to-orange-300 transition-all shadow-lg"
              >
                ⚙️ Admin
              </Link>
            </motion.li>
          )}
          
          <motion.li whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/sos"
              className="ml-2 bg-white text-red-600 px-7 py-3 rounded-xl font-black hover:bg-red-50 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                🚨 SOS
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </motion.li>
          
          {user ? (
            <li className="ml-4 flex items-center gap-3">
              <motion.span
                className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-xl font-bold border border-white/30"
                whileHover={{ scale: 1.05 }}
              >
                👤 {user.name}
              </motion.span>
              <motion.button
                onClick={handleLogout}
                className="bg-red-900/80 hover:bg-red-950 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 border border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt /> Logout
              </motion.button>
            </li>
          ) : (
            <li className="ml-4 flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-2.5 rounded-xl font-bold transition-all border border-white/30"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="bg-white text-red-600 px-6 py-2.5 rounded-xl font-black hover:bg-red-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </motion.div>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl focus:outline-none hover:text-red-100 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                isActive(link.path)
                  ? "bg-white text-red-600 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg font-medium bg-yellow-400 text-gray-900"
            >
              ⚙️ Admin Panel
            </Link>
          )}
          
          <Link
            to="/sos"
            onClick={() => setIsOpen(false)}
            className="block bg-white text-red-600 px-4 py-3 rounded-lg font-bold hover:bg-red-50 transition shadow-lg text-center"
          >
            🚨 SOS Request
          </Link>
          
          {user ? (
            <>
              <div className="px-4 py-3 bg-white/20 rounded-lg text-center font-medium">
                👤 {user.name}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-800 hover:bg-red-900 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg font-medium transition-all text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block bg-white text-red-600 px-4 py-3 rounded-lg font-bold hover:bg-red-50 transition shadow-lg text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
