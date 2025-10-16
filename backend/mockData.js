// Mock data for the blood donation app

export const donors = [
  {
    _id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    bloodGroup: "O+",
    city: "New York",
    donationHistory: [
      { date: new Date("2023-01-15"), location: "City Hospital", quantity: 450 }
    ],
    badges: ["Hero Donor"]
  },
  {
    _id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    bloodGroup: "A-",
    city: "Los Angeles",
    donationHistory: [
      { date: new Date("2023-02-20"), location: "General Hospital", quantity: 450 }
    ],
    badges: ["Regular Donor"]
  },
  {
    _id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    bloodGroup: "B+",
    city: "Chicago",
    donationHistory: [
      { date: new Date("2023-03-10"), location: "Memorial Hospital", quantity: 450 }
    ],
    badges: ["First Timer"]
  },
  {
    _id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    bloodGroup: "AB+",
    city: "Houston",
    donationHistory: [
      { date: new Date("2023-04-05"), location: "Community Hospital", quantity: 450 }
    ],
    badges: ["Hero Donor"]
  }
];

export const bloodBanks = [
  {
    _id: "1",
    name: "City Hospital Blood Bank",
    email: "bloodbank@cityhospital.com",
    city: "New York",
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
        title: "Summer Blood Donation Drive", 
        description: "Help us maintain adequate blood supply this summer", 
        date: new Date("2023-07-15") 
      }
    ]
  },
  {
    _id: "2",
    name: "General Hospital Blood Bank",
    email: "bloodbank@generalhospital.com",
    city: "Los Angeles",
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
        title: "Community Blood Drive", 
        description: "Join us for our community blood donation event", 
        date: new Date("2023-08-15") 
      }
    ]
  }
];

export const requests = [];