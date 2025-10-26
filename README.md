# BloodLink - Blood Donation Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/chiragvishnoi-01/Aviothic2.0_BitXBlood)](https://github.com/chiragvishnoi-01/Aviothic2.0_BitXBlood/issues)
[![GitHub stars](https://img.shields.io/github/stars/chiragvishnoi-01/Aviothic2.0_BitXBlood)](https://github.com/chiragvishnoi-01/Aviothic2.0_BitXBlood/stargazers)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/chiragvishnoi-01/Aviothic2.0_BitXBlood)](https://github.com/chiragvishnoi-01/Aviothic2.0_BitXBlood/pulls)
[![Contributors](https://img.shields.io/github/contributors/chiragvishnoi-01/Aviothic2.0_BitXBlood)](https://github.com/chiragvishnoi-01/Aviothic2.0_BitXBlood/graphs/contributors)

A comprehensive blood donation platform built with the MERN stack (MongoDB, Express.js, React, Node.js). BloodLink connects blood donors with blood banks and hospitals, facilitating life-saving blood donations through an efficient and user-friendly platform.

![BloodLink Banner](frontend/src/assets/banner.png) <!-- Add your banner image path here -->

## 🎯 Goal

BloodLink aims to bridge the gap between blood donors and recipients by providing a centralized platform that:
- Connects willing donors with blood banks and hospitals in need
- Facilitates emergency blood requests through our SOS feature
- Maintains a real-time inventory of blood availability across banks
- Encourages regular blood donation through gamification and leaderboards
- Provides educational resources about blood donation

## 📚 Documentation

For detailed information about the project, please refer to the following documentation files:

- [Project Overview](PROJECT_OVERVIEW.md) - Comprehensive overview of the BloodLink platform
- [Development Guide](DEVELOPMENT.md) - Instructions for setting up the development environment
- [API Documentation](backend/docs/API_DOCUMENTATION.md) - Detailed API endpoints and usage
- [Backend README](backend/README.md) - Backend-specific information
- [Deployment Guide](DEPLOYMENT_GUIDE_VERCEL_RENDER.md) - Instructions for deploying the application
- [Security Policy](SECURITY.md) - Security practices and vulnerability reporting
- [Changelog](CHANGELOG.md) - Version history and changes

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bloodlink.git
   cd bloodlink
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Setup

#### Backend Environment Variables
Create a `.env` file in the [backend](backend) directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5000
```

#### Frontend Environment Variables
Create a `.env` file in the [frontend](frontend) directory with the following variables:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with plugins
- **Animations**: Framer Motion
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: Bcrypt
- **Email Service**: Nodemailer
- **CORS Handling**: Cors middleware
- **Environment Management**: Dotenv
- **Deployment**: Render

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions (via render.yaml)
- **Containerization**: Docker-ready configuration

## 📁 Project Structure

```
├── backend/
│   ├── config/                 # Database and app configuration
│   ├── models/                 # Mongoose data models
│   ├── routes/                 # API route definitions
│   ├── utils/                  # Utility functions
│   ├── server.js               # Main server entry point
│   ├── package.json            # Backend dependencies
│   └── .env.example            # Environment variable template
├── frontend/
│   ├── src/
│   │   ├── api/                # API service configuration
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React context providers
│   │   ├── data/               # Static data files
│   │   ├── pages/              # Page components
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
├── render.yaml                 # Render deployment configuration
└── README.md                   # Project documentation
```

## 🔐 Authentication & Authorization

BloodLink implements a robust authentication system:
- **User Registration**: Secure signup with email verification
- **User Login**: JWT-based authentication with 24-hour expiration
- **Role-Based Access**: Three user roles (user, donor, admin)
- **Password Security**: Bcrypt hashing with salting
- **Protected Routes**: Middleware to protect authenticated routes
- **Admin Panel**: Dedicated admin interface for managing the platform

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile/:id` - Get user profile
- `PUT /api/auth/profile/:id` - Update user profile

### Donors
- `GET /api/auth/donors-public` - Get all public donors
- `PUT /api/auth/register-donor/:id` - Register as donor
- `GET /api/auth/donors` - Get all donors (admin only)

### Blood Banks
- `GET /api/banks` - Get all blood banks
- `POST /api/banks` - Create new blood bank (admin only)

### SOS Requests
- `POST /api/sos` - Create SOS blood request
- `GET /api/sos` - Get all SOS requests

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create new campaign (admin only)

### Leaderboard
- `GET /api/leaderboard` - Get donor leaderboard

For detailed API documentation, see [backend/docs/API_DOCUMENTATION.md](backend/docs/API_DOCUMENTATION.md).

## 🎨 Key Features

### User Management
- Role-based access control (user, donor, admin)
- Profile management with medical records
- Password reset functionality
- Email notifications

### Donor Features
- Donor registration with medical history
- Donation tracking and history
- Badge system for achievements
- Eligibility verification

### Emergency Response
- SOS blood request system
- Real-time donor notifications
- Location-based matching

### Community Engagement
- Leaderboard with ranking system
- Blood donation campaigns
- Social sharing capabilities

### Admin Panel
- User management dashboard
- Donor verification system
- Campaign creation and management
- Analytics and reporting

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Deploy to Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy!

### Deploy to Render (Backend)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy using the provided [render.yaml](render.yaml) configuration

For detailed deployment instructions, see [DEPLOYMENT_GUIDE_VERCEL_RENDER.md](DEPLOYMENT_GUIDE_VERCEL_RENDER.md).

## 🤝 Contributing

We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

Please note that this project has a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

We take security seriously. Please see our [SECURITY.md](SECURITY.md) for information about reporting vulnerabilities.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the need to make blood donation more accessible and efficient
- Special thanks to the open source community for the tools and libraries that made this project possible

## 📞 Support

If you need help with BloodLink, please:
1. Check our [documentation](README.md)
2. Review existing [issues](../../issues)
3. Create a new issue if needed

## 📈 Roadmap

See our [issues](../../issues) for planned features and enhancements.

## 📊 Analytics

The platform includes analytics for tracking:
- User registrations
- Blood donation requests
- Successful donations
- Campaign effectiveness