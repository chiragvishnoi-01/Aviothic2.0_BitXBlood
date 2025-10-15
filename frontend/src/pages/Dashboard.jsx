import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import DonorCard from "../components/DonorCard";
import { FaSearch, FaFilter } from "react-icons/fa";

const Dashboard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("/donors");
        setDonors(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load donors.");
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup =
      filterBloodGroup === "" || donor.bloodGroup === filterBloodGroup;
    return matchesSearch && matchesBloodGroup;
  });

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-rose-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
        <p className="text-red-600 text-xl font-semibold animate-pulse">Loading donors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex justify-center items-center bg-gradient-to-br from-red-50 to-rose-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-600 text-xl font-semibold mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-black mb-4">
            <span className="gradient-text">Donor</span> Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Find and connect with life-saving heroes</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all appearance-none cursor-pointer"
              >
                <option value="">All Blood Groups</option>
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
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center text-gray-600">
            Showing <span className="font-bold text-red-600">{filteredDonors.length}</span> donor(s)
          </div>
        </motion.div>

        {/* Donors Grid */}
        {filteredDonors.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl">No donors found matching your criteria.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDonors.map((donor, index) => (
              <motion.div
                key={donor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DonorCard donor={donor} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
