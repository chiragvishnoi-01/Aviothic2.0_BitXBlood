import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext.jsx";
import { FaUser, FaEnvelope, FaPhone, FaCity, FaTint, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "",
    bloodGroup: user?.bloodGroup || ""
  });
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // If user is not logged in, redirect to login page
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(`/auth/profile/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      // Update user data in context and localStorage
      const updatedUser = {
        ...user,
        ...response.data.user
      };
      login(updatedUser);
      
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const bloodGroupColors = {
    "A+": "from-red-500 to-rose-500",
    "A-": "from-red-600 to-rose-600",
    "B+": "from-pink-500 to-rose-500",
    "B-": "from-pink-600 to-rose-600",
    "O+": "from-orange-500 to-red-500",
    "O-": "from-orange-600 to-red-600",
    "AB+": "from-purple-500 to-pink-500",
    "AB-": "from-purple-600 to-pink-600",
  };

  const gradientClass = bloodGroupColors[user.bloodGroup] || "from-red-500 to-rose-500";

  const handleRegisterAsDonor = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(`/auth/register-donor/${user.id}`, {
        bloodGroup: formData.bloodGroup,
        city: formData.city,
        phone: formData.phone
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      // Update user data in context and localStorage
      const updatedUser = {
        ...user,
        ...response.data.user
      };
      login(updatedUser);
      
      setSuccess("Successfully registered as donor!");
      setShowDonorForm(false);
    } catch (err) {
      console.error("Donor registration error:", err);
      setError(err.response?.data?.message || "Failed to register as donor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
              Your Profile
            </span>
          </h1>
          <p className="text-gray-600 text-lg">Manage your account information</p>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-green-700">{success}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <div className="text-center">
                <div className="mx-auto mb-6">
                  <div className={`bg-gradient-to-br ${gradientClass} text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-2xl`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>
                
                <div className="flex justify-center mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${user.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                    {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </span>
                </div>
                
                {user.bloodGroup && (
                  <div className="mb-6">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r ${gradientClass}`}>
                      <FaTint className="mr-2" />
                      {user.bloodGroup}
                    </div>
                  </div>
                )}
                
                {user.isDonor && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                    <p className="text-green-800 font-semibold flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Registered Donor
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Account Information</h3>
                <div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-bold transition-colors"
                      >
                        <FaTimes /> Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          <>
                            <FaSave /> Save
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                      {isEditing ? (
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                          <p className="text-gray-800 font-medium">{user.name}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                      {isEditing ? (
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                            placeholder="your@email.com"
                            disabled
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                          <p className="text-gray-800 font-medium">{user.email}</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                      {isEditing ? (
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                            placeholder="+1 555 123 4567"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                          <p className="text-gray-800 font-medium">{user.phone || "Not provided"}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">City</label>
                      {isEditing ? (
                        <div className="relative">
                          <FaCity className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                            placeholder="Your city"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                          <p className="text-gray-800 font-medium">{user.city || "Not provided"}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {user.bloodGroup && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Blood Group</label>
                      <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                        <div className="flex items-center">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-white font-bold bg-gradient-to-r ${gradientClass}`}>
                            <FaTint className="mr-2" />
                            {user.bloodGroup}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {user.isDonor ? (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Donor Status</label>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                        <p className="text-green-800 font-semibold flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Registered Blood Donor
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Become a Donor</label>
                      {!showDonorForm ? (
                        <button
                          onClick={() => setShowDonorForm(true)}
                          className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
                        >
                          Register as Blood Donor
                        </button>
                      ) : (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-4">
                          <h4 className="font-bold text-red-800">Register as Donor</h4>
                          <div>
                            <label className="block text-gray-700 font-semibold mb-2">Blood Group *</label>
                            <select
                              name="bloodGroup"
                              value={formData.bloodGroup}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                            >
                              <option value="">Select Blood Group</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-gray-700 font-semibold mb-2">City *</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                              placeholder="Your city"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                              placeholder="Your phone number"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleRegisterAsDonor}
                              disabled={loading || !formData.bloodGroup || !formData.city}
                              className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50"
                            >
                              {loading ? 'Registering...' : 'Register as Donor'}
                            </button>
                            <button
                              onClick={() => setShowDonorForm(false)}
                              className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving Changes...
                        </span>
                      ) : (
                        <>
                          <FaSave /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;