# 🩸 Blood Donation App

> A modern, full-stack blood donation platform that connects donors with those in need and enables community-driven blood donation campaigns.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.20-646CFF.svg)](https://vitejs.dev/)



---

## ✨ Features

### 🩺 For Donors
- **Donor Registration**: Register and create your donor profile
- **SOS Emergency Response**: Receive instant notifications for urgent blood requests
- **Donation History**: Track your contribution and earn badges
- **Leaderboard**: Compete with other heroes and get recognized

### 🏥 For Blood Banks & Organizers
- **Campaign Creation**: Organize blood donation drives and events
- **Blood Stock Management**: Track available blood inventory
- **Donor Database**: Search and filter donors by blood group and location

### 🚨 For Patients/Requesters
- **Emergency SOS**: Send urgent blood requests with one click
- **Real-time Matching**: Automatically notify matching donors in your area
- **Campaign Discovery**: Find nearby blood donation events

### 🎨 User Experience
- **Modern UI**: Beautiful gradient-based design with smooth animations
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Fast**: Built with Vite for lightning-fast performance
- **Intuitive**: Easy navigation and user-friendly forms

---

## 📂 Project Structure

```
blood-donation-app/
├── backend/                      # Node.js + Express backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── models/
│   │   ├── Donor.js             # Donor schema
│   │   ├── BloodBank.js         # Blood bank schema
│   │   ├── Request.js           # SOS request schema
│   │   └── Campaign.js          # Campaign schema
│   ├── routes/
│   │   ├── donorRoutes.js       # Donor API endpoints
│   │   ├── bankRoutes.js        # Blood bank endpoints
│   │   ├── sosRoutes.js         # SOS request endpoints
│   │   ├── leaderboardRoutes.js # Leaderboard endpoints
│   │   └── campaignRoutes.js    # Campaign CRUD endpoints
│   ├── utils/
│   │   └── sendEmail.js         # Email notification service
│   ├── mockData.js              # Sample data for demo
│   ├── server.js                # Express server entry point
│   ├── .env.example             # Environment template
│   └── package.json
│
├── frontend/                     # React + Vite frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js   # Axios instance with baseURL
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── Hero.jsx         # Hero section
│   │   │   ├── DonorCard.jsx    # Donor display card
│   │   │   ├── CampaignCard.jsx # Campaign card
│   │   │   └── SOSForm.jsx      # SOS request form
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Dashboard.jsx    # Donor dashboard
│   │   │   ├── Campaigns.jsx    # View all campaigns
│   │   │   ├── CreateCampaign.jsx # Create new campaign
│   │   │   ├── SOS.jsx          # Emergency request page
│   │   │   └── LeaderboardPage.jsx # Top donors
│   │   ├── data/
│   │   │   └── donors.json      # Sample donor data
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Tailwind CSS
│   ├── index.html
│   ├── vite.config.mjs          # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── .env.example             # Environment template
│   └── package.json
│
├── .gitignore
├── README.md                     # This file
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
└── FEATURES_GUIDE.md            # Detailed feature documentation
```


## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/blood-donation-app.git
cd blood-donation-app
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env file with your configurations
npm start
```

3. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env file with backend URL
npm run dev
```

4. **Open your browser**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blood-donation
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
``` 

---

## 🛠️ Technologies Used

### Frontend
- **React 18.2** - UI library
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (optional)
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📡 API Endpoints

### Donors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donors` | Get all donors |
| GET | `/api/donors/:id` | Get single donor |
| POST | `/api/donors` | Register new donor |

### Campaigns
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/campaigns` | Get all campaigns |
| GET | `/api/campaigns/:id` | Get single campaign |
| POST | `/api/campaigns` | Create new campaign |
| PUT | `/api/campaigns/:id` | Update campaign |
| DELETE | `/api/campaigns/:id` | Delete campaign |

### Blood Banks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/banks` | Get all blood banks |
| GET | `/api/banks/:id` | Get single bank |
| POST | `/api/banks` | Add new bank |
| POST | `/api/banks/:id/campaigns` | Add campaign to bank |

### Emergency Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sos` | Send SOS request |

### Leaderboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leaderboard` | Get top donors |

---

## 🌐 Deployment

This app is ready to deploy! Check out our comprehensive [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions.

### Quick Deploy Options:

**Frontend:**
- ✅ Vercel (Recommended)
- ✅ Netlify
- ✅ GitHub Pages

**Backend:**
- ✅ Railway (Recommended)
- ✅ Render
- ✅ Heroku

**Database:**
- ✅ MongoDB Atlas (Free tier available)
- ✅ Railway PostgreSQL

---

## 📸 Screenshots

### Home Page
![Home Page]<img width="1919" height="1012" alt="Screenshot 2025-10-15 183940" src="https://github.com/user-attachments/assets/82964460-2696-4c9f-976d-209f395b36a4" />


### Campaign Creation
![Create Campaign]<img width="1916" height="1013" alt="Screenshot 2025-10-15 184237" src="https://github.com/user-attachments/assets/fbf4df0c-8a69-40a8-8a61-cc781fb61a25" />



### Dashboard
![Dashboard]<img width="1919" height="1021" alt="Screenshot 2025-10-15 184135" src="https://github.com/user-attachments/assets/9e932fa9-7bb6-48f8-9f88-863d9bbafd28" />


---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] Email/SMS notifications for donors
- [ ] Real-time chat between donors and requesters
- [ ] Campaign registration and attendance tracking
- [ ] Blood donation history and certificates
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Payment integration for donations
- [ ] Analytics dashboard for admins
- [ ] Social media integration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Chirag Vishnoi**
- GitHub: [@chiragvishnoi-01](https://github.com/chiragvishnoi-01)
- Project Link: [Blood Donation App](https://github.com/chiragvishnoi-01/blood-donation-app)

---

## 🙏 Acknowledgments

- Thanks to all open-source contributors
- Inspired by the need to save lives through technology
- Built with ❤️ for the community

---

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the [FEATURES_GUIDE.md](./FEATURES_GUIDE.md) for detailed documentation
- Read the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for deployment help

---

**⭐ If you like this project, please give it a star on GitHub! ⭐**

---

**Made with 🩸 and ❤️ to save lives**
