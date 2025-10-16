// Mock data for the blood donation app

export const donors = [
  {
    _id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    bloodGroup: "O+",
    city: "Mumbai",
    donationHistory: [
      { date: new Date("2023-01-15"), location: "Lilavati Hospital", quantity: 450 },
      { date: new Date("2023-05-20"), location: "Lilavati Hospital", quantity: 450 },
      { date: new Date("2023-09-10"), location: "Tata Memorial Hospital", quantity: 450 },
      { date: new Date("2024-01-05"), location: "Lilavati Hospital", quantity: 450 },
      { date: new Date("2024-06-12"), location: "Kokilaben Hospital", quantity: 450 },
      { date: new Date("2024-10-08"), location: "Lilavati Hospital", quantity: 450 }
    ],
    badges: ["Hero Donor", "Life Saver"]
  },
  {
    _id: "2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    bloodGroup: "A-",
    city: "Delhi",
    donationHistory: [
      { date: new Date("2023-02-20"), location: "AIIMS Delhi", quantity: 450 },
      { date: new Date("2023-06-15"), location: "Safdarjung Hospital", quantity: 450 },
      { date: new Date("2023-10-22"), location: "AIIMS Delhi", quantity: 450 },
      { date: new Date("2024-03-18"), location: "Max Hospital", quantity: 450 },
      { date: new Date("2024-08-25"), location: "AIIMS Delhi", quantity: 450 }
    ],
    badges: ["Regular Donor", "Life Saver"]
  },
  {
    _id: "3",
    name: "Amit Patel",
    email: "amit.patel@example.com",
    bloodGroup: "B+",
    city: "Bangalore",
    donationHistory: [
      { date: new Date("2023-03-10"), location: "Narayana Health", quantity: 450 },
      { date: new Date("2023-07-14"), location: "Manipal Hospital", quantity: 450 },
      { date: new Date("2023-11-20"), location: "Narayana Health", quantity: 450 },
      { date: new Date("2024-04-08"), location: "Fortis Hospital", quantity: 450 }
    ],
    badges: ["Regular Donor"]
  },
  {
    _id: "4",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    bloodGroup: "AB+",
    city: "Hyderabad",
    donationHistory: [
      { date: new Date("2023-04-05"), location: "Apollo Hospital", quantity: 450 },
      { date: new Date("2023-08-12"), location: "NIMS Hospital", quantity: 450 },
      { date: new Date("2024-02-28"), location: "Apollo Hospital", quantity: 450 },
      { date: new Date("2024-07-15"), location: "Care Hospital", quantity: 450 }
    ],
    badges: ["Hero Donor"]
  },
  {
    _id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    bloodGroup: "O-",
    city: "Pune",
    donationHistory: [
      { date: new Date("2023-05-12"), location: "Ruby Hall Clinic", quantity: 450 },
      { date: new Date("2023-09-25"), location: "Jehangir Hospital", quantity: 450 },
      { date: new Date("2024-05-10"), location: "Ruby Hall Clinic", quantity: 450 }
    ],
    badges: ["Regular Donor"]
  },
  {
    _id: "6",
    name: "Anjali Gupta",
    email: "anjali.gupta@example.com",
    bloodGroup: "A+",
    city: "Chennai",
    donationHistory: [
      { date: new Date("2023-06-18"), location: "Apollo Hospital Chennai", quantity: 450 },
      { date: new Date("2024-01-22"), location: "MIOT Hospital", quantity: 450 }
    ],
    badges: ["First Timer"]
  },
  {
    _id: "7",
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    bloodGroup: "B-",
    city: "Kolkata",
    donationHistory: [
      { date: new Date("2023-07-22"), location: "AMRI Hospital", quantity: 450 },
      { date: new Date("2024-03-05"), location: "Apollo Gleneagles", quantity: 450 }
    ],
    badges: ["Hero Donor"]
  },
  {
    _id: "8",
    name: "Kavya Iyer",
    email: "kavya.iyer@example.com",
    bloodGroup: "AB-",
    city: "Ahmedabad",
    donationHistory: [
      { date: new Date("2023-08-14"), location: "Sterling Hospital", quantity: 450 }
    ],
    badges: ["First Timer"]
  }
];

export const bloodBanks = [
  {
    _id: "1",
    name: "Lilavati Hospital Blood Bank",
    email: "bloodbank@lilavati.com",
    city: "Mumbai",
    bloodStock: {
      A_pos: 25,
      A_neg: 12,
      B_pos: 18,
      B_neg: 8,
      AB_pos: 10,
      AB_neg: 5,
      O_pos: 30,
      O_neg: 9
    },
    campaigns: [
      { 
        title: "Monsoon Blood Donation Drive", 
        description: "Help us maintain adequate blood supply during monsoon season", 
        date: new Date("2023-07-15") 
      }
    ]
  },
  {
    _id: "2",
    name: "AIIMS Delhi Blood Bank",
    email: "bloodbank@aiims.edu",
    city: "Delhi",
    bloodStock: {
      A_pos: 28,
      A_neg: 10,
      B_pos: 22,
      B_neg: 7,
      AB_pos: 12,
      AB_neg: 4,
      O_pos: 35,
      O_neg: 11
    },
    campaigns: [
      { 
        title: "Independence Day Blood Donation Camp", 
        description: "Donate blood and serve the nation this Independence Day", 
        date: new Date("2023-08-15") 
      }
    ]
  },
  {
    _id: "3",
    name: "Apollo Hospital Blood Centre",
    email: "bloodcentre@apollohospitals.com",
    city: "Chennai",
    bloodStock: {
      A_pos: 20,
      A_neg: 9,
      B_pos: 16,
      B_neg: 6,
      AB_pos: 8,
      AB_neg: 3,
      O_pos: 27,
      O_neg: 8
    },
    campaigns: [
      { 
        title: "Pongal Blood Donation Festival", 
        description: "Celebrate Pongal by giving the gift of life", 
        date: new Date("2024-01-15") 
      }
    ]
  },
  {
    _id: "4",
    name: "Narayana Health Blood Bank",
    email: "bloodbank@narayanahealth.org",
    city: "Bangalore",
    bloodStock: {
      A_pos: 23,
      A_neg: 11,
      B_pos: 19,
      B_neg: 7,
      AB_pos: 9,
      AB_neg: 4,
      O_pos: 32,
      O_neg: 10
    },
    campaigns: [
      { 
        title: "Tech Startup Blood Donation Drive", 
        description: "IT professionals come together to save lives", 
        date: new Date("2023-09-10") 
      }
    ]
  }
];

export const requests = [];