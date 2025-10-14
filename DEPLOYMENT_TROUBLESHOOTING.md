# 🔧 Quick Deployment Troubleshooting

## ❌ Common Issues & Solutions

### 🔴 Backend Not Running on Render

#### Check 1: Verify Environment Variables
```
Go to Render Dashboard → Your Service → Environment
```

**Required Variables:**
- ✅ `NODE_ENV` = `production`
- ✅ `PORT` = `5000`
- ✅ `MONGODB_URI` = `mongodb+srv://...`

#### Check 2: View Logs
```
Render Dashboard → Your Service → Logs
```

**Look for:**
- ❌ `Error: connect ECONNREFUSED` → MongoDB connection issue
- ❌ `MongooseError` → Check MONGODB_URI
- ❌ `Module not found` → Missing dependency
- ✅ `🚀 Server running on port 5000` → SUCCESS!

#### Check 3: Test Health Endpoint
```
Visit: https://YOUR-APP.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "BloodLink Backend is running!",
  "timestamp": "2025-10-14T..."
}
```

---

### 🔴 Frontend Not Connecting to Backend

#### Issue: "Network Error" or "Failed to fetch"

**Solution 1: Check Environment Variable**
```
Vercel Dashboard → Your Project → Settings → Environment Variables
```

Verify:
```
VITE_API_URL = https://YOUR-BACKEND.onrender.com/api
```

⚠️ **Important:** Must end with `/api`!

**Solution 2: Redeploy Frontend**
```
Vercel Dashboard → Deployments → Redeploy
```
Click the three dots (...) → Redeploy

**Solution 3: Check Browser Console**
```
F12 → Console → Look for errors
```

Common Errors:
- `CORS policy` → Backend CORS not configured
- `net::ERR_NAME_NOT_RESOLVED` → Wrong API URL
- `404` → Endpoint doesn't exist

---

### 🔴 MongoDB Connection Failed

#### Error: "MongooseServerSelectionError"

**Cause 1: Wrong Connection String**

Fix:
1. Go to MongoDB Atlas → Database → Connect
2. Get fresh connection string
3. Replace `<password>` with actual password
4. Add `/bloodlink` before `?retryWrites`

**Correct Format:**
```
mongodb+srv://username:PASSWORD@cluster0.xxxxx.mongodb.net/bloodlink?retryWrites=true&w=majority
```

**Cause 2: IP Not Whitelisted**

Fix:
1. MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere"
4. Add: `0.0.0.0/0`
5. Save

**Cause 3: Wrong Credentials**

Fix:
1. MongoDB Atlas → Database Access
2. Delete old user
3. Create new user with password
4. Update `MONGODB_URI` in Render

---

### 🔴 Render Service "Suspended" or "Sleeping"

#### Issue: Free tier spins down after inactivity

**Expected Behavior:**
- Service sleeps after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- This is NORMAL for free tier

**Solutions:**

1. **Wait patiently** - First request will be slow
2. **Use a ping service:**
   - uptimerobot.com (free)
   - Ping your backend every 10 minutes

3. **Upgrade to paid tier** ($7/month)
   - Always-on instance
   - No cold starts

---

### 🔴 Vercel Build Failed

#### Check Build Logs
```
Vercel → Deployments → Click failed deployment → View Build Logs
```

**Common Errors:**

**Error 1: Module not found**
```
Error: Cannot find module 'framer-motion'
```

Fix:
```bash
cd frontend
npm install framer-motion
git add package.json package-lock.json
git commit -m "Add missing dependencies"
git push
```

**Error 2: Vite build failed**
```
Error: Could not resolve './components/Features'
```

Fix: Check file exists and import path is correct

**Error 3: Out of memory**
```
FATAL ERROR: Reached heap limit
```

Fix: Rarely happens, try redeploy

---

### 🔴 CORS Errors

#### Error: "blocked by CORS policy"

**Browser Console Shows:**
```
Access to XMLHttpRequest at 'https://backend.onrender.com/api/...' 
from origin 'https://frontend.vercel.app' has been blocked by CORS policy
```

**Fix: Update Backend CORS**

Already fixed in server.js! But verify:
1. Render → Environment → `FRONTEND_URL` = your Vercel URL
2. Save and redeploy

---

### 🔴 Environment Variables Not Working

#### Issue: Changes not reflecting

**Solution:**

1. **After changing env vars on Render:**
   - Service will auto-redeploy
   - Wait 2-3 minutes
   - Check logs for "Build succeeded"

2. **After changing env vars on Vercel:**
   - Must manually redeploy!
   - Go to Deployments
   - Click "..." → Redeploy

3. **Local testing:**
   ```bash
   # Create .env file in backend/
   PORT=5000
   MONGODB_URI=your_connection_string
   NODE_ENV=development
   ```

---

## ✅ Quick Verification Steps

### 1. Backend Health Check
```bash
curl https://YOUR-BACKEND.onrender.com/health
```

Expected:
```json
{"status":"OK","message":"BloodLink Backend is running!"}
```

### 2. Backend API Check
```bash
curl https://YOUR-BACKEND.onrender.com/api/donors
```

Expected: JSON array of donors

### 3. Frontend API Connection
Open browser console (F12) on your Vercel site:
```javascript
fetch('https://YOUR-BACKEND.onrender.com/api/donors')
  .then(r => r.json())
  .then(console.log)
```

Expected: Array of donors printed

---

## 🎯 Most Common Issue: VITE_API_URL

### ❌ Wrong:
```
VITE_API_URL=https://bloodlink-backend.onrender.com
VITE_API_URL=https://bloodlink-backend.onrender.com/
```

### ✅ Correct:
```
VITE_API_URL=https://bloodlink-backend.onrender.com/api
```

**Why?** The backend routes are at `/api/...` path!

---

## 📱 Testing Checklist

After deployment, test these:

**Frontend:**
- [ ] Homepage loads
- [ ] All images/assets load
- [ ] Navigation works
- [ ] No console errors

**Backend:**
- [ ] Health endpoint returns OK
- [ ] Logs show "Server running"
- [ ] MongoDB connected (no errors)

**Integration:**
- [ ] Signup creates user
- [ ] Login works
- [ ] Dashboard shows donors
- [ ] SOS request can be submitted
- [ ] Campaigns display
- [ ] Leaderboard loads

---

## 🆘 Still Not Working?

### Check These:

1. **GitHub repo is up to date?**
   ```bash
   git status
   git push
   ```

2. **Services are running?**
   - Render: Green checkmark
   - Vercel: Active deployment

3. **Correct URLs?**
   - Backend URL ends with `.onrender.com`
   - Frontend URL ends with `.vercel.app`

4. **Logs clean?**
   - No red errors in Render logs
   - No build errors in Vercel logs

5. **Environment variables correct?**
   - No typos
   - No extra spaces
   - Correct values

---

## 💡 Pro Tips

1. **Always check logs first** - 90% of issues show in logs
2. **Test endpoints individually** - Use curl or Postman
3. **Clear browser cache** - Ctrl + Shift + R
4. **Wait for cold starts** - First request on free tier is slow
5. **One change at a time** - Easier to debug

---

## 📞 Need More Help?

1. **Check Documentation:**
   - See `DEPLOYMENT_GUIDE_VERCEL_RENDER.md`
   
2. **Review Logs:**
   - Render: Service → Logs
   - Vercel: Deployment → Function Logs

3. **Test Locally:**
   ```bash
   # Backend
   cd backend
   npm install
   npm start
   
   # Frontend
   cd frontend
   npm install
   npm run dev
   ```

---

**Remember:** Free tier services can be slow on first request. Be patient! 🙏
