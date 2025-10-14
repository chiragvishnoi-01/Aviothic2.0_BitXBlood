import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaHeartbeat, FaUser, FaSignOutAlt } from "react-icons/fa";

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
    <nav className="bg-gradient-to-r from-red-600 via-red-700 to-rose-600 text-white px-6 py-4 shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-2xl hover:text-red-100 transition-all duration-300 group"
        >
          <FaHeartbeat className="text-3xl group-hover:scale-110 transition-transform" />
          <span className="bg-white text-red-600 px-3 py-1 rounded-lg shadow-md">BloodLink</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-1 items-center">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-white text-red-600 shadow-lg"
                    : "hover:bg-white/10 hover:text-white"
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
                className="px-5 py-2 rounded-lg font-medium bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all"
              >
                ⚙️ Admin
              </Link>
            </li>
          )}
          
          <li>
            <Link
              to="/sos"
              className="ml-4 bg-white text-red-600 px-6 py-2.5 rounded-lg font-bold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl animate-glow"
            >
              🚨 SOS
            </Link>
          </li>
          
          {user ? (
            <li className="ml-4 flex items-center gap-3">
              <span className="bg-white/20 px-4 py-2 rounded-lg font-medium">
                👤 {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-800 hover:bg-red-900 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <li className="ml-4 flex items-center gap-2">
              <Link
                to="/login"
                className="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-lg font-medium transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-red-600 px-5 py-2 rounded-lg font-bold hover:bg-red-50 transition-all shadow-lg"
              >
                Sign Up
              </Link>
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
