import React, { useState } from "react";

const SOSForm = () => {
  const [formData, setFormData] = useState({ name: "", bloodGroup: "", hospital: "", contact: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("SOS request sent successfully!");
    setFormData({ name: "", bloodGroup: "", hospital: "", contact: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Request Blood (SOS)</h2>
      {["name", "bloodGroup", "hospital", "contact"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-red-500"
          required
        />
      ))}
      <button className="bg-red-600 text-white px-4 py-2 w-full rounded hover:bg-red-700 transition">
        Submit Request
      </button>
    </form>
  );
};

export default SOSForm;
