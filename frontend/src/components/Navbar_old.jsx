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
    <motion.nav
      className="relative bg-gradient-to-r from-white via-red-50/30 to-white backdrop-blur-2xl text-gray-800 px-6 py-5 shadow-2xl sticky top-0 z-50 border-b border-red-100/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
    >
      {/* Animated Gradient Bar on Top */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-pink-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Animated Background Blobs with Shimmer Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-red-300 via-rose-300 to-pink-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1.1, 1],
            x: [0, 40, -20, 0],
            y: [0, 25, -15, 0],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 0.9, 1],
            x: [-100, 50, -80, -100],
            y: [-50, 30, -40, -50],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-56 h-56 bg-gradient-to-br from-rose-300 via-red-300 to-pink-300 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1.4, 1],
            x: [0, -35, 15, 0],
            y: [0, -25, 10, 0],
            rotate: [360, 270, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="container mx-auto flex justify-between items-center relative z-10">
        {/* Logo with Enhanced Animations */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Multi-layer Glow Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl blur-xl opacity-60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl blur-lg opacity-40"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            
            <div className="relative bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 p-3.5 rounded-2xl shadow-2xl transform transition-all group-hover:shadow-red-300/50">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaHeartbeat className="text-3xl text-white drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>
          <div className="flex flex-col">
            <motion.span
              className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              style={{ 
                backgroundSize: '200% auto',
                animation: 'gradient 3s linear infinite'
              }}
            >
              Raktchain
            </motion.span>
            <motion.span 
              className="text-xs text-gray-600 font-semibold -mt-1 tracking-wide"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              💝 Connecting Lives
            </motion.span>
          </div>
        </Link>

        {/* Desktop Menu with Advanced Animations */}
        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className={`relative px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden group ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white shadow-xl shadow-red-300/50"
                    : "text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50"
                }`}
              >
                {!isActive(link.path) && (
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                )}
                {isActive(link.path) && (
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            </motion.li>
          ))}
          
          {user?.role === 'admin' && (
            <motion.li 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -3, scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/admin"
                className="relative px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white hover:from-amber-500 hover:to-orange-500 transition-all shadow-xl shadow-amber-300/50 overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1
                  }}
                />
                <span className="relative z-10 flex items-center gap-1.5">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    ⚙️
                  </motion.span>
                  Admin
                </span>
              </Link>
            </motion.li>
          )}
          
          <motion.li
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.92 }}
          >
            <Link
              to="/sos"
              className="relative px-7 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white shadow-2xl shadow-red-400/60 hover:shadow-red-500/80 transition-all overflow-hidden group"
              style={{ backgroundSize: '200% auto' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  🚨
                </motion.span>
                SOS Emergency
              </span>
              {/* Multiple Shine effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
              {/* Animated Pulse rings */}
              <motion.div 
                className="absolute inset-0 rounded-xl bg-red-400"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.3, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div 
                className="absolute inset-0 rounded-xl bg-rose-400"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.3, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5
                }}
              />
            </Link>
          </motion.li>
          
          {user ? (
            <li className="ml-4 flex items-center gap-3">
              <motion.div
                className="flex items-center gap-2.5 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-xl border-2 border-gray-200 shadow-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, borderColor: "#dc2626" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-9 h-9 bg-gradient-to-br from-red-500 via-rose-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </motion.div>
                <span className="font-bold text-gray-800 text-sm">{user.name}</span>
              </motion.div>
              <motion.button
                onClick={handleLogout}
                className="relative bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-xl overflow-hidden group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-rose-600/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <FaSignOutAlt className="relative z-10" /> 
                <span className="relative z-10">Logout</span>
              </motion.button>
            </li>
          ) : (
            <li className="ml-4 flex items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="relative text-gray-700 hover:text-red-600 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 border-2 border-transparent hover:border-red-200 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-red-100/0 via-red-100/50 to-red-100/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative z-10">Login</span>
                </Link>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="relative bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white px-7 py-3 rounded-xl font-black text-sm hover:from-red-700 hover:to-pink-700 transition-all shadow-xl shadow-red-300/50 overflow-hidden group"
                  style={{ backgroundSize: '200% auto' }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <span>✨</span> Sign Up Free
                  </span>
                </Link>
              </motion.div>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-gray-800 hover:text-red-600 focus:outline-none transition-colors relative z-20"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden mt-4 pb-4 space-y-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl font-bold transition-all ${
                isActive(link.path)
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg"
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
              className="block px-4 py-3 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg"
            >
              ⚙️ Admin Panel
            </Link>
          )}
          
          <Link
            to="/sos"
            onClick={() => setIsOpen(false)}
            className="block bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-xl font-bold hover:from-red-700 hover:to-rose-700 transition shadow-xl text-center"
          >
            🚨 SOS Request
          </Link>
          
          {user ? (
            <>
              <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl text-center font-bold text-gray-800 flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {user.name}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-4 py-3 rounded-xl font-bold transition-all text-center border border-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-xl font-bold hover:from-red-700 hover:to-rose-700 transition shadow-lg text-center"
              >
                Sign Up Free
              </Link>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
