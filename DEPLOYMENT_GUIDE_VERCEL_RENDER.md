# 🚀 Deployment Guide: Vercel + Render

## 📋 Complete Deployment Instructions

This guide will help you deploy the BloodLink application with:
- **Frontend** on **Vercel** 
- **Backend** on **Render**

---

## 🔧 Prerequisites

1. **GitHub Account** (to deploy from repository)
2. **Vercel Account** (sign up at vercel.com)
3. **Render Account** (sign up at render.com)
4. **MongoDB Atlas Account** (for database - mongodb.com/cloud/atlas)

---

## 📊 Architecture

```
Frontend (Vercel) → Backend (Render) → MongoDB Atlas
    ↓                    ↓                    ↓
React/Vite          Express.js            Database
```

---

## 🗄️ STEP 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Log in
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0)
5. Select **Region**: Choose closest to Singapore/Asia
6. Click **"Create"**

### 1.2 Create Database User

1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `bloodlink_admin`
5. **Password**: Generate a strong password (SAVE THIS!)
6. Set privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 1.3 Whitelist IP Addresses

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **"Database"** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add database name: Replace `?retryWrites` with `/bloodlink?retryWrites`

**⚠️ SAVE THIS CONNECTION STRING! You'll need it for Render.**

---

## 🔙 STEP 2: Deploy Backend on Render

### 2.1 Push Code to GitHub

```bash
# If not already done
git init
git add .
git commit -m "Deploy to Render and Vercel"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2.2 Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:

   **Basic Settings:**
   - Name: `bloodlink-backend`
   - Region: `Singapore` (or closest)
   - Branch: `main`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

5. Click **"Advanced"** to add Environment Variables

### 2.3 Add Environment Variables

Click **"Add Environment Variable"** for each:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB connection string from Step 1.4 |
| `FRONTEND_URL` | Leave empty for now (will add after Vercel) |

### 2.4 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like:
   ```
   https://your-app-name.onrender.com
   ```
4. **Test it**: Visit `https://your-app-name.onrender.com/health`
   - Should show: `{"status":"OK","message":"BloodLink Backend is running!"}`

**⚠️ SAVE YOUR RENDER URL! You'll need it for Vercel.**

---

## 🎨 STEP 3: Deploy Frontend on Vercel

### 3.1 Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:

   **Basic Settings:**
   - Framework Preset: **Vite**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3.2 Add Environment Variables

Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your Render URL + `/api` (e.g., `https://your-app-name.onrender.com/api`) |

**⚠️ Important:** 
- Use your actual Render URL from Step 2.4
- Add `/api` at the end!

### 3.3 Deploy Frontend

1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Once deployed, you'll get a URL like:
   ```
   https://your-project-name.vercel.app
   ```

---

## 🔗 STEP 4: Connect Frontend & Backend

### 4.1 Update Render Environment Variables

1. Go back to Render Dashboard
2. Open your backend service
3. Go to **"Environment"** tab
4. Add/Update this variable:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | Your Vercel URL (e.g., `https://your-project-name.vercel.app`) |

5. Click **"Save Changes"**
6. Service will auto-redeploy

### 4.2 Verify Connection

1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Try to:
   - Sign up for an account
   - Login
   - View dashboard
   - Submit SOS request

---

## ✅ Verification Checklist

### Backend (Render)
- [ ] Service is running (green status)
- [ ] `/health` endpoint returns OK
- [ ] MongoDB connection successful (check logs)
- [ ] Environment variables set correctly

### Frontend (Vercel)
- [ ] Build successful
- [ ] Site loads without errors
- [ ] API calls working
- [ ] All pages accessible

### Integration
- [ ] Login/Signup works
- [ ] Data saves to database
- [ ] SOS requests send
- [ ] Campaigns display
- [ ] Leaderboard loads

---

## 🐛 Troubleshooting

### Issue 1: "Network Error" or "Failed to fetch"

**Cause:** CORS or wrong API URL

**Fix:**
1. Check `VITE_API_URL` on Vercel includes `/api`
2. Verify Render backend is running
3. Check Render logs for errors

### Issue 2: "Cannot connect to MongoDB"

**Cause:** Wrong connection string or IP not whitelisted

**Fix:**
1. Verify `MONGODB_URI` in Render environment variables
2. Check MongoDB Atlas → Network Access allows 0.0.0.0/0
3. Verify database user credentials

### Issue 3: Backend shows "Service Unavailable"

**Cause:** Build failed or start command incorrect

**Fix:**
1. Check Render logs (Events tab)
2. Verify `npm install` completed
3. Ensure `npm start` works locally

### Issue 4: Frontend shows blank page

**Cause:** Build error or base path issue

**Fix:**
1. Check Vercel deployment logs
2. Verify `vite.config.mjs` has `base: '/'`
3. Check browser console for errors

### Issue 5: "Free instance will spin down with inactivity"

**Cause:** Render free tier limitation

**Info:**
- First request may take 30-60 seconds (cold start)
- This is normal for free tier
- Consider upgrading to paid tier for production

---

## 📱 Custom Domain (Optional)

### Vercel Custom Domain

1. Go to Vercel Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Render Custom Domain

1. Go to Render Service → Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use strong passwords** for MongoDB
3. **Enable 2FA** on Vercel and Render accounts
4. **Rotate secrets** regularly
5. **Monitor logs** for suspicious activity

---

## 📊 Monitoring & Logs

### Render Logs
1. Go to Service → Logs tab
2. View real-time logs
3. Filter by error/warning

### Vercel Logs
1. Go to Project → Deployments
2. Click on deployment → View Function Logs
3. Check Runtime Logs

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 (Free) | $0/month |
| Render | Free | $0/month |
| Vercel | Hobby (Free) | $0/month |
| **Total** | | **$0/month** |

**Limitations:**
- Render: 750 hours/month, sleeps after inactivity
- Vercel: 100GB bandwidth/month
- MongoDB: 512MB storage

---

## 🚀 Production Upgrade Path

When ready for production:

1. **Render:** Upgrade to Starter ($7/month)
   - Always-on instances
   - More resources
   - Better performance

2. **MongoDB Atlas:** Upgrade to M10 ($9/month)
   - More storage
   - Better performance
   - Automated backups

3. **Vercel:** Upgrade to Pro ($20/month)
   - Unlimited bandwidth
   - Better analytics
   - Team features

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Docs:** https://docs.mongodb.com/

---

## 🎉 Success!

Your BloodLink app is now live! 🩸

- **Frontend:** https://your-project-name.vercel.app
- **Backend:** https://your-app-name.onrender.com
- **Database:** MongoDB Atlas

Share your app and start saving lives! ❤️

---

**Last Updated:** October 2025  
**Version:** 1.0