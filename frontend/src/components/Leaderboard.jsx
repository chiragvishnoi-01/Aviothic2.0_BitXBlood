import React from "react";

const Leaderboard = () => {
  const donors = [
    { name: "Rahul Mehta", donations: 12 },
    { name: "Sneha Sharma", donations: 10 },
    { name: "Amit Verma", donations: 8 },
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
