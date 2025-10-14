// Mock data for the blood donation app

export const donors = [
  {
    _id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    bloodGroup: "O+",
    city: "New York",
    donationHistory: [{ date: new Date("2023-01-15") }],
    badges: ["Hero Donor"]
  },
  {
    _id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    bloodGroup: "A-",
    city: "Los Angeles",
    donationHistory: [{ date: new Date("2023-02-20") }],
    badges: ["Regular Donor"]
  },
  {
    _id: "3",
    name: "Michael Brown",
    email: "mike.brown@example.com",
    bloodGroup: "B+",
    city: "Chicago",
    donationHistory: [{ date: new Date("2023-03-10") }],
    badges: ["First Timer"]
  },
  {
    _id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    bloodGroup: "AB+",
    city: "Houston",
    donationHistory: [{ date: new Date("2023-04-05") }],
    badges: ["Hero Donor"]
  },
  {
    _id: "5",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    bloodGroup: "O-",
    city: "Phoenix",
    donationHistory: [{ date: new Date("2023-05-12") }],
    badges: ["Regular Donor"]
  },
  {
    _id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    bloodGroup: "A+",
    city: "Philadelphia",
    donationHistory: [{ date: new Date("2023-06-18") }],
    badges: ["First Timer"]
  }
];

export const bloodBanks = [
  {
    _id: "1",
    name: "City Blood Center",
    email: "info@cityblood.org",
    city: "New York",
    bloodStock: {
      A_pos: 15,
      A_neg: 8,
      B_pos: 12,
      B_neg: 5,
      AB_pos: 7,
      AB_neg: 3,
      O_pos: 20,
      O_neg: 6
    },
    campaigns: [
      { 
        title: "Summer Donation Drive", 
        description: "Help us meet increased summer demand", 
        date: new Date("2023-07-15") 
      }
    ]
  },
  {
    _id: "2",
    name: "Regional Blood Bank",
    email: "contact@regionalblood.org",
    city: "Los Angeles",
    bloodStock: {
      A_pos: 18,
      A_neg: 6,
      B_pos: 14,
      B_neg: 4,
      AB_pos: 9,
      AB_neg: 2,
      O_pos: 25,
      O_neg: 7
    },
    campaigns: [
      { 
        title: "Back to School Campaign", 
        description: "Donate before the busy school year", 
        date: new Date("2023-08-20") 
      }
    ]
  }
];

export const requests = [];