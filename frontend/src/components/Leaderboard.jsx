import React from "react";

const Leaderboard = () => {
  const donors = [
    { name: "Rajesh Kumar", donations: 6, city: "Mumbai" },
    { name: "Priya Sharma", donations: 5, city: "Delhi" },
    { name: "Amit Patel", donations: 4, city: "Bangalore" },
    { name: "Sneha Reddy", donations: 4, city: "Hyderabad" },
  ];

  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-6">🏆 Top Donors</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {donors.map((d, i) => (
          <div key={i} className="flex justify-between py-2 border-b">
            <p>{d.name}</p>
            <p className="text-red-600 font-bold">{d.donations} Donations</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
