import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import { FaUsers, FaTint, FaBullhorn, FaHeartbeat, FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaKey } from "react-icons/fa";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('donors');
  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [medicalForm, setMedicalForm] = useState({
    weight: "",
    bloodPressure: "",
    hemoglobin: "",
    eligibleForDonation: true,
    medicalNotes: "",
    checkupBy: ""
  });
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role !== 'admin') {
      navigate("/login");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [usersRes, donorsRes] = await Promise.all([
        axios.get("/auth/all"),
        axios.get("/auth/donors")
      ]);
      setUsers(usersRes.data);
      setDonors(donorsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (user) => {
    setSelectedUser(user);
    setShowPasswordModal(true);
    setPasswordForm({ newPassword: "", confirmPassword: "" });
    setPasswordError("");
    setPasswordSuccess("");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    
    try {
      // Note: This would require a backend endpoint to change passwords
      // For now, we'll show a message that this feature needs backend implementation
      setPasswordError("Password change feature requires backend implementation");
      // setPasswordSuccess("Password changed successfully!");
      // setShowPasswordModal(false);
    } catch (error) {
      setPasswordError("Failed to change password");
    }
  };

  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    totalDonors: donors.length,
    activeDonors: donors.filter(d => d.medicalRecords?.length > 0).length,
    eligibleDonors: donors.filter(d => 
      d.medicalRecords?.length > 0 && 
      d.medicalRecords[d.medicalRecords.length - 1]?.eligibleForDonation
    ).length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-2">
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </h1>
          <p className="text-gray-600">Manage donors, users, and medical records</p>
        </motion.div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Change Password</h3>
              <p className="text-gray-600 mb-4">Changing password for: <span className="font-semibold">{selectedUser?.name}</span></p>
              
              {passwordError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
                  {passwordError}
                </div>
              )}
              
              {passwordSuccess && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">
                  {passwordSuccess}
                </div>
              )}
              
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Users", value: stats.totalUsers, icon: FaUsers, color: "from-blue-500 to-blue-600" },
            { label: "Total Donors", value: stats.totalDonors, icon: FaTint, color: "from-red-500 to-rose-600" },
            { label: "Active Donors", value: stats.activeDonors, icon: FaHeartbeat, color: "from-green-500 to-emerald-600" },
            { label: "Eligible Donors", value: stats.eligibleDonors, icon: FaBullhorn, color: "from-purple-500 to-purple-600" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                  <p className={`text-4xl font-black mt-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                </div>
                <div className={`p-4 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg`}>
                  <stat.icon className="text-3xl text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {['donors', 'users'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-bold capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or blood group..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Donors Table */}
          {activeTab === 'donors' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Donor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Blood Group</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">City</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Donations</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Medical Records</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDonors.map((donor) => {
                    const lastRecord = donor.medicalRecords?.[donor.medicalRecords.length - 1];
                    const isEligible = lastRecord?.eligibleForDonation;
                    
                    return (
                      <tr key={donor._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">{donor.name}</p>
                            <p className="text-sm text-gray-500">{donor.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-600">
                            {donor.bloodGroup || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{donor.city || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-800">{donor.donationHistory?.length || 0}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-800">{donor.medicalRecords?.length || 0}</span>
                        </td>
                        <td className="px-6 py-4">
                          {lastRecord ? (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                              isEligible ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {isEligible ? '✓ Eligible' : '⏳ Not Eligible'}
                            </span>
                          ) : (
                            <span className="text-gray-400">No records</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedDonor(donor);
                                setShowMedicalModal(true);
                              }}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                              title="Add Medical Record"
                            >
                              <FaPlus />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedDonor(donor);
                                // Show medical history modal
                              }}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="View History"
                            >
                              <FaEye />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">User</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">City</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Is Donor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.filter(user =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                          user.role === 'donor' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.city || 'N/A'}</td>
                      <td className="px-6 py-4">
                        {user.isDonor ? (
                          <span className="text-green-600 font-bold">✓ Yes</span>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handlePasswordChange(user)}
                          className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                          title="Change Password"
                        >
                          <FaKey />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Medical Record Modal */}
      {showMedicalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-black mb-6">Add Medical Record</h2>
            <p className="text-gray-600 mb-6">
              Donor: <span className="font-bold">{selectedDonor?.name}</span>
            </p>

            <form onSubmit={handleAddMedicalRecord} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={medicalForm.weight}
                    onChange={(e) => setMedicalForm({...medicalForm, weight: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="70"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Blood Pressure</label>
                  <input
                    type="text"
                    value={medicalForm.bloodPressure}
                    onChange={(e) => setMedicalForm({...medicalForm, bloodPressure: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="120/80"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Hemoglobin (g/dL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={medicalForm.hemoglobin}
                    onChange={(e) => setMedicalForm({...medicalForm, hemoglobin: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="14.5"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Checkup By</label>
                  <input
                    type="text"
                    value={medicalForm.checkupBy}
                    onChange={(e) => setMedicalForm({...medicalForm, checkupBy: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    placeholder="Dr. Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Medical Notes</label>
                <textarea
                  value={medicalForm.medicalNotes}
                  onChange={(e) => setMedicalForm({...medicalForm, medicalNotes: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={medicalForm.eligibleForDonation}
                  onChange={(e) => setMedicalForm({...medicalForm, eligibleForDonation: e.target.checked})}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label className="font-semibold text-gray-700">Eligible for donation</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Add Record
                </button>
                <button
                  type="button"
                  onClick={() => setShowMedicalModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Change Password</h3>
            <p className="text-gray-600 mb-4">Changing password for: <span className="font-semibold">{selectedUser?.name}</span></p>
            
            {passwordError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
                {passwordError}
              </div>
            )}
            
            {passwordSuccess && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">
                {passwordSuccess}
              </div>
            )}
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="Enter new password"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
                >
                  Change Password
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
