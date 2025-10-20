# ✅ BloodLink Deployment Checklist

Follow this checklist to deploy your BloodLink application to production with MongoDB Atlas.

## 📋 Pre-Deployment Checklist

### 🔧 Environment Setup
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster deployed
- [ ] Database user created with read/write permissions
- [ ] Network access configured (IP whitelisting)
- [ ] MongoDB connection string obtained and saved securely

### 📁 Local Configuration
- [ ] Backend [.env](file://c:\Users\chira\OneDrive\Desktop\Avihotic2.0_BitXBlood\backend\.env) file updated with MongoDB connection string (for testing)
- [ ] Frontend [.env](file://c:\Users\chira\OneDrive\Desktop\Avihotic2.0_BitXBlood\frontend\.env) file configured
- [ ] All dependencies installed (`npm install` in both frontend and backend)
- [ ] Application tested locally and working correctly

## ☁️ Deployment Steps

### 🗄️ STEP 1: MongoDB Atlas Finalization
- [ ] Verify MongoDB cluster is running
- [ ] Confirm database user credentials
- [ ] Test connection string with MongoDB Compass (optional)

### 🔙 STEP 2: Backend Deployment (Render)
- [ ] Log in to [Render Dashboard](https://dashboard.render.com/)
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure service:
  - Name: `bloodlink-backend`
  - Region: Singapore
  - Root Directory: `backend`
  - Runtime: Node
  - Build Command: `npm install`
  - Start Command: `npm start`
- [ ] Add Environment Variables:
  - [ ] `NODE_ENV` = `production`
  - [ ] `MONGODB_URI` = Your MongoDB connection string
  - [ ] `JWT_SECRET` = Strong secret key
  - [ ] `PORT` = `5000`
- [ ] Deploy service
- [ ] Wait for successful deployment
- [ ] Note the generated Render URL (e.g., `https://bloodlink-backend-xxxx.onrender.com`)

### 🎨 STEP 3: Frontend Deployment (Vercel)
- [ ] Log in to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Create new project
- [ ] Import GitHub repository
- [ ] Configure project:
  - Framework Preset: Vite
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- [ ] Add Environment Variables:
  - [ ] `VITE_API_URL` = Your Render backend URL + `/api` (e.g., `https://bloodlink-backend-xxxx.onrender.com/api`)
- [ ] Deploy project
- [ ] Wait for successful deployment
- [ ] Note the generated Vercel URL (e.g., `https://bloodlink-xxxx.vercel.app`)

### 🔗 STEP 4: Connect Frontend & Backend
- [ ] Go back to Render backend service
- [ ] Add Environment Variable:
  - [ ] `FRONTEND_URL` = Your Vercel URL (e.g., `https://bloodlink-xxxx.vercel.app`)
- [ ] Redeploy backend service

## 🧪 Post-Deployment Testing

### Backend Verification
- [ ] Visit health endpoint: `https://your-backend-url.onrender.com/health`
- [ ] Should return: `{"status":"OK","message":"BloodLink Backend is running!"}`

### Frontend Verification
- [ ] Visit your application: `https://your-frontend-url.vercel.app`
- [ ] Test user registration
- [ ] Test user login
- [ ] Navigate all pages (Dashboard, Campaigns, Leaderboard, etc.)
- [ ] Submit a test SOS request
- [ ] Verify data is saved to MongoDB

### Integration Testing
- [ ] Register a new user
- [ ] Login with registered user
- [ ] Update profile information
- [ ] Submit SOS request
- [ ] View leaderboard
- [ ] Browse campaigns

## 🛡️ Security Verification

- [ ] Confirm [.env](file://c:\Users\chira\OneDrive\Desktop\Avihotic2.0_BitXBlood\backend\.env) files are NOT committed to repository
- [ ] Verify all sensitive data is in environment variables
- [ ] Check that JWT tokens are properly implemented
- [ ] Confirm MongoDB Atlas IP whitelist is appropriately configured

## 📈 Monitoring & Maintenance

- [ ] Set up monitoring for Render service
- [ ] Configure MongoDB Atlas alerts
- [ ] Plan for regular backups
- [ ] Schedule security updates

## 🆘 Troubleshooting

If you encounter issues:

1. **Check Render logs** for backend errors
2. **Check Vercel logs** for frontend errors
3. **Verify MongoDB Atlas** connection and credentials
4. **Confirm environment variables** are correctly set
5. **Test API endpoints** directly with tools like Postman

## 🎉 Success!

When all checklist items are completed and verified, your BloodLink application will be successfully deployed and ready for users!

---

**Deployment Date**: ___________  
**Render Backend URL**: ___________  
**Vercel Frontend URL**: ___________  
**MongoDB Atlas Cluster**: ___________

# Deployment Checklist

## Backend (Render)

1. **Environment Variables Setup**:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Strong secret key for JWT tokens
   - `NODE_ENV`: Set to "production"
   - `PORT`: Set to 5000
   - `ALLOWED_ORIGINS`: Comma-separated list of frontend URLs (e.g., "https://your-app.vercel.app,https://your-domain.com")

2. **Render Configuration**:
   - Name: blood-donation-backend
   - Region: Singapore
   - Root Directory: backend
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free

## Frontend (Vercel)

1. **Environment Variables Setup**:
   - `VITE_API_URL`: Your Render backend URL with /api suffix (e.g., "https://your-backend.onrender.com/api")

2. **Vercel Configuration**:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install

## Database (MongoDB Atlas)

1. **Connection String**:
   - Ensure your MongoDB Atlas cluster is accessible from Render
   - Add Render's IP addresses to your MongoDB Atlas IP whitelist:
     - 0.0.0.0/0 (for development - restrict in production)
   - Get your connection string from MongoDB Atlas dashboard

## Testing After Deployment

1. **Backend Health Check**:
   - Visit your Render backend URL + /health (e.g., https://your-backend.onrender.com/health)
   - Should return: {"status":"OK","message":"BloodLink Backend is running!"}

2. **Frontend Testing**:
   - Visit your Vercel deployment URL
   - Try to access the signup and login pages
   - Attempt to register a new user
   - Try to log in with the newly created user

## Common Issues and Solutions

1. **CORS Errors**:
   - Ensure ALLOWED_ORIGINS environment variable is set correctly on Render
   - Check that your frontend URL is included in the allowed origins

2. **API Connection Issues**:
   - Verify VITE_API_URL is set correctly in Vercel environment variables
   - Ensure the backend URL is accessible publicly

3. **Database Connection Issues**:
   - Check MONGODB_URI in Render environment variables
   - Verify MongoDB Atlas IP whitelist includes Render's IP addresses

## Need Help?

If you're still experiencing issues:
1. Check the Render logs for backend errors
2. Check the browser console for frontend errors
3. Verify all environment variables are set correctly
