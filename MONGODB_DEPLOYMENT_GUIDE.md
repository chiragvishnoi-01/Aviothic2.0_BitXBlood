# 🗄️ MongoDB Atlas Deployment Guide for BloodLink

This guide will walk you through setting up MongoDB Atlas for your BloodLink application, which is required for production deployment.

## 📋 Prerequisites

1. A valid email address
2. Access to your deployment platform (Render/Vercel)
3. This BloodLink project repository

## 🚀 Step-by-Step MongoDB Atlas Setup

### STEP 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Get started free"**
3. Enter your email, first name, last name, and country
4. Create a password
5. Click **"Create account"**
6. Check your email for verification and click the verification link

### STEP 2: Create a New Cluster

1. After logging in, you'll see the MongoDB Atlas dashboard
2. Click **"Build a Database"** or **"Create a cluster"**
3. Select the **"Shared"** tier (free forever)
4. Choose a cloud provider:
   - **AWS**, **Google Cloud**, or **Azure**
   - Select a region closest to your users (Singapore or Asia region recommended)
5. Leave cluster name as default or rename it to `BloodLink`
6. Click **"Create Cluster** (this may take 1-3 minutes)

### STEP 3: Create Database User

1. Once your cluster is created, click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Select **"Password"** as the authentication method
4. Enter the following details:
   - **Username**: `bloodlink_user`
   - **Password**: Click **"Autogenerate Secure Password"** or create your own strong password
   - **User Privileges**: Select **"Read and write to any database"**
5. Click **"Add User"**

⚠️ **IMPORTANT**: Save your username and password in a secure location - you'll need it later!

### STEP 4: Configure Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development/testing:
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Add a description: `Development Access`
   - Click **"Confirm"**
4. For production (optional):
   - You can add specific IP addresses for better security
   - Add your Render server IP addresses if known

### STEP 5: Get Connection String

1. Click **"Database"** in the left sidebar
2. Click the **"Connect"** button next to your cluster
3. Select **"Connect your application"**
4. Copy the connection string provided

The connection string will look like this:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

### STEP 6: Customize Connection String

1. Replace `<username>` with your database username (`bloodlink_user`)
2. Replace `<password>` with your database password
3. Replace `myFirstDatabase` with `bloodlink`
4. Your final connection string should look like:
   ```
   mongodb+srv://bloodlink_user:your_password@cluster0.xxxxx.mongodb.net/bloodlink?retryWrites=true&w=majority
   ```

⚠️ **SAVE THIS CONNECTION STRING** - You'll need it for your Render deployment!

### STEP 7: Test Connection (Optional)

1. Click **"Compass"** on the connection options
2. Copy your connection string with username and password
3. Download and install [MongoDB Compass](https://www.mongodb.com/products/compass) if you haven't already
4. Paste your connection string in Compass
5. Click **"Connect"** to verify access

## 🔧 Integration with Your Application

### For Render Backend Deployment:

1. Go to your Render dashboard
2. Open your BloodLink backend service
3. Go to **"Environment"** tab
4. Add the following environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your complete MongoDB connection string from Step 6

### For Local Development:

1. Open your `backend/.env` file
2. Update the `MONGODB_URI` value with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://bloodlink_user:your_password@cluster0.xxxxx.mongodb.net/bloodlink?retryWrites=true&w=majority
   ```

## 🔒 Security Best Practices

1. **Strong Passwords**: Always use strong, unique passwords for database users
2. **IP Whitelisting**: For production, restrict IP access to only necessary addresses
3. **Regular Rotation**: Change database passwords regularly
4. **Least Privileges**: Only grant necessary permissions to database users
5. **Environment Variables**: Never hardcode connection strings in your source code

## 🆘 Troubleshooting Common Issues

### Issue 1: "Authentication failed"
- **Cause**: Incorrect username or password
- **Solution**: Double-check your credentials in the connection string

### Issue 2: "IP address not whitelisted"
- **Cause**: Your IP is not in the Network Access list
- **Solution**: Add your IP address to the Network Access list in MongoDB Atlas

### Issue 3: "DNS resolution failed"
- **Cause**: Incorrect cluster name or connection string
- **Solution**: Verify your connection string format and cluster name

### Issue 4: "Connection timeout"
- **Cause**: Network issues or firewall restrictions
- **Solution**: Check your network connection and firewall settings

## 📊 Monitoring Your Database

1. In MongoDB Atlas dashboard, click your cluster name
2. View cluster metrics like CPU, memory, and disk usage
3. Check the **"Collections"** tab to view your data
4. Use the **"Performance Advisor"** to optimize queries

## 💰 Pricing Information

- **Free Tier (M0)**: 
  - Shared RAM and vCPU
  - 512 MB storage
  - Suitable for development and small applications
  - No credit card required

- **Shared Tier (M2/M5)**:
  - Dedicated RAM and vCPU
  - More storage options
  - Paid plans starting at $9/month

## 🔄 Next Steps After MongoDB Setup

1. Update your Render environment variables with the MongoDB connection string
2. Redeploy your backend service on Render
3. Update your frontend VITE_API_URL to point to your Render backend
4. Redeploy your frontend on Vercel
5. Test your complete application

## 📞 Support Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Community Forums](https://community.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/) (Free courses)

---

**Last Updated**: October 2025  
**Version**: 1.0