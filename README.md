# BloodLink - Blood Donation Platform

A comprehensive blood donation platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Deployment Instructions

### 🔐 Security First - Environment Variables

**Important**: Never commit sensitive information like database credentials or API keys to your repository. All sensitive data should be stored in environment variables.

#### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```bash
# MongoDB Connection URI (required)
# For local development: mongodb://localhost:27017/blood-donation
# For production (MongoDB Atlas): mongodb+srv://username:password@cluster.mongodb.net/blood-donation
MONGODB_URI=your_mongodb_connection_string

# JWT Secret Key (required)
# Generate a strong secret key for production
JWT_SECRET=your_strong_jwt_secret_key

# Port (optional, defaults to 5000)
PORT=5000

# Frontend URL (optional, for CORS)
# FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 📦 Setting Up MongoDB Atlas (Production Database)

For production deployment, you need to use MongoDB Atlas instead of localhost:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster:
   - Select "Shared" tier (free)
   - Choose a cloud provider and region closest to your users
   - Leave other settings as default
4. Once the cluster is created, click "Connect"
5. Select "Connect your application"
6. Copy the connection string and replace `<username>`, `<password>`, and `<cluster>` with your actual credentials
7. Replace the MONGODB_URI in your backend environment variables with this connection string

### 🚀 Deployment to Render (Backend)

1. Fork this repository to your GitHub account
2. Sign up at [Render](https://render.com/)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set the following build settings:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Add all required environment variables (MONGODB_URI, JWT_SECRET)
6. Deploy!

### 🌐 Deployment to Vercel (Frontend)

1. Sign up at [Vercel](https://vercel.com/)
2. Create a new project
3. Import your GitHub repository
4. Set the following build settings:
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Environment Variables: Add VITE_API_URL pointing to your Render backend

### 🛡️ Security Best Practices

1. **Never expose sensitive data**:
   - Keep `.env` files in `.gitignore`
   - Use environment variables for all sensitive information
   - Rotate secrets regularly

2. **Database Security**:
   - Use MongoDB Atlas for production
   - Enable database authentication
   - Restrict database access to specific IP addresses

3. **API Security**:
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all user inputs
   - Use strong JWT secrets

4. **Frontend Security**:
   - Never expose API keys or secrets in frontend code
   - Implement proper error handling
   - Use Content Security Policy (CSP)

### 📁 Project Structure

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

### 🧪 Testing the Deployment

1. After deployment, test the API endpoints:
   - `GET /health` - Should return status OK
   - `POST /api/auth/register` - Test user registration
   - `POST /api/auth/login` - Test user login

2. Verify frontend connectivity:
   - Ensure all API calls are working
   - Check that authentication flows work correctly

### 🆘 Troubleshooting

1. **Environment Variables Not Loading**:
   - Double-check that your `.env` files are properly formatted
   - Ensure there are no spaces around the `=` sign
   - Restart your development server after changes

2. **CORS Issues**:
   - Verify that `FRONTEND_URL` is correctly set in backend environment variables
   - Check that CORS middleware is properly configured

3. **Database Connection Issues**:
   - Verify MongoDB connection string format
   - Check that MongoDB Atlas IP whitelist includes Render's IP addresses
   - Ensure database credentials are correct

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.