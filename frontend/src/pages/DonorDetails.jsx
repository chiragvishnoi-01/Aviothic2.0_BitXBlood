import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import { FaPhone, FaMapMarkerAlt, FaTint, FaEnvelope, FaArrowLeft, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const DonorDetails = () => {
  const { donorId } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/auth/donors-public/${donorId}`);
        setDonor(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load donor details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (donorId) {
      fetchDonorDetails();
    }
  }, [donorId]);

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

  const gradientClass = donor ? bloodGroupColors[donor.bloodGroup] || "from-gray-500 to-gray-700" : "from-gray-500 to-gray-700";

  const handleContactViaEmail = () => {
    if (donor && donor.email) {
      window.location.href = `mailto:${donor.email}`;
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // In a real app, this would send the feedback to the server
    alert(`Feedback submitted for ${donor.name}:\nRating: ${rating} stars\nComment: ${feedback}`);
    setFeedback("");
    setRating(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-600 font-semibold">Loading donor details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-600 text-xl font-semibold mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Back to Donors
          </button>
        </div>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Donor Not Found</h2>
          <p className="text-gray-600 mb-6">The donor you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Back to Donors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-600 font-bold mb-6 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Donors
        </motion.button>

        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-600 to-rose-600 p-8 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-red-700/20 to-rose-700/20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Donor Photo */}
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                  <img 
                    src={donor.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"} 
                    alt={donor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <div className={`bg-gradient-to-br ${gradientClass} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {donor.bloodGroup}
                  </div>
                </div>
              </motion.div>

              {/* Donor Info */}
              <div className="text-center md:text-left">
                <motion.h1
                  className="text-4xl font-black mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {donor.name}
                </motion.h1>
                <motion.div
                  className="flex flex-wrap justify-center md:justify-start gap-4 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <FaTint />
                    <span>{donor.bloodGroup}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <FaMapMarkerAlt />
                    <span>{donor.city || 'Location not specified'}</span>
                  </div>
                  {donor.totalDonations && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span>{donor.totalDonations} donations</span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Donor Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Donor Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <FaEnvelope className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{donor.email || 'Email not provided'}</div>
                    </div>
                  </div>
                  
                  {donor.phone && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <FaPhone className="text-red-600 text-xl" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">{donor.phone}</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <FaMapMarkerAlt className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">{donor.city || 'Location not specified'}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <FaTint className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Blood Group</div>
                      <div className="font-medium">{donor.bloodGroup}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Feedback Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave Feedback</h2>
                
                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  {/* Rating */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="text-2xl focus:outline-none"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          {star <= (hoverRating || rating) ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaRegStar className="text-yellow-400" />
                          )}
                        </button>
                      ))}
                      <span className="ml-2 text-gray-600">
                        {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Feedback Text */}
                  <div>
                    <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      id="feedback"
                      rows="4"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all"
                      placeholder="Share your experience with this donor..."
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    Submit Feedback
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Contact Button */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={handleContactViaEmail}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 mx-auto"
              >
                <FaEnvelope className="text-xl" />
                Contact {donor.name} via Email
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorDetails;