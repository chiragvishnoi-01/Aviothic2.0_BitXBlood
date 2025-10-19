# BloodLink - Blood Donation Platform

A comprehensive blood donation platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
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

Create `.env` files in both `backend` and `frontend` directories. Refer to the `.env.example` files for the required variables.

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

## 🛡️ Security

This project follows security best practices:
- All sensitive data is stored in environment variables
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is properly configured

## 📁 Project Structure

```
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── vite.config.js
├── render.yaml
└── README.md
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.