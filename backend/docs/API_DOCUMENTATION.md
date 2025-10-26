# BloodLink API Documentation

This document provides detailed information about the BloodLink API endpoints, request/response formats, and authentication requirements.

## 🔐 Authentication

Most API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Obtaining a Token

To obtain a JWT token, use the authentication endpoints:

1. Register a new user: `POST /api/auth/register`
2. Login with existing credentials: `POST /api/auth/login`

## 📡 Base URL

All API endpoints are relative to the base URL:
```
http://localhost:5000/api
```

In production, this will be:
```
https://your-deployment-url/api
```

## 📚 API Endpoints

### Authentication Routes

#### Register a New User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string", // Optional: 'user', 'donor', 'admin'
  "bloodGroup": "string", // Optional: 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
  "phone": "string", // Optional
  "city": "string", // Optional
  "isDonor": "boolean" // Optional
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "isDonor": "boolean"
  }
}
```

#### User Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "isDonor": "boolean",
    "bloodGroup": "string",
    "city": "string",
    "phone": "string"
  }
}
```

#### Get User Profile
```
GET /auth/profile/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "bloodGroup": "string",
  "phone": "string",
  "city": "string",
  "isDonor": "boolean",
  "medicalRecords": [
    {
      "date": "date",
      "weight": "number",
      "bloodPressure": "string",
      "hemoglobin": "number",
      "lastDonationDate": "date",
      "eligibleForDonation": "boolean",
      "medicalNotes": "string",
      "checkupBy": "string"
    }
  ],
  "donationHistory": [
    {
      "date": "date",
      "location": "string",
      "bloodGroup": "string",
      "quantity": "number",
      "certificateId": "string"
    }
  ],
  "badges": ["string"],
  "isVerified": "boolean",
  "createdAt": "date",
  "updatedAt": "date"
}
```

#### Update User Profile
```
PUT /auth/profile/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string", // Optional
  "bloodGroup": "string", // Optional
  "phone": "string", // Optional
  "city": "string" // Optional
}
```

**Response:**
```json
{
  "message": "Profile updated",
  "user": {
    // Updated user object
  }
}
```

#### Register as Donor
```
PUT /auth/register-donor/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "bloodGroup": "string",
  "city": "string",
  "phone": "string" // Optional
}
```

**Response:**
```json
{
  "message": "Successfully registered as donor",
  "user": {
    // Updated user object with isDonor: true
  }
}
```

### Donor Routes

#### Get All Public Donors
```
GET /donors-public
```

**Response:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "bloodGroup": "string",
    "city": "string",
    "isDonor": "boolean"
  }
]
```

#### Get All Donors (Admin Only)
```
GET /donors
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    // Complete donor objects without passwords
  }
]
```

### SOS Routes

#### Create SOS Request
```
POST /sos
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "patientName": "string",
  "bloodGroup": "string",
  "quantity": "number",
  "hospital": "string",
  "contactPerson": "string",
  "contactPhone": "string",
  "city": "string",
  "urgent": "boolean",
  "message": "string"
}
```

**Response:**
```json
{
  "message": "SOS request created successfully",
  "sosRequest": {
    "_id": "string",
    "patientName": "string",
    "bloodGroup": "string",
    "quantity": "number",
    "hospital": "string",
    "contactPerson": "string",
    "contactPhone": "string",
    "city": "string",
    "urgent": "boolean",
    "message": "string",
    "status": "string",
    "requestedBy": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### Get All SOS Requests
```
GET /sos
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "string",
    "patientName": "string",
    "bloodGroup": "string",
    "quantity": "number",
    "hospital": "string",
    "contactPerson": "string",
    "contactPhone": "string",
    "city": "string",
    "urgent": "boolean",
    "message": "string",
    "status": "string",
    "requestedBy": {
      "_id": "string",
      "name": "string"
    },
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

#### Respond to SOS Request
```
PUT /sos/:id/respond
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "message": "string"
}
```

**Response:**
```json
{
  "message": "Response recorded successfully",
  "sosRequest": {
    // Updated SOS request object
  }
}
```

### Blood Bank Routes

#### Get All Blood Banks
```
GET /banks
```

**Response:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "address": "string",
    "city": "string",
    "contactPerson": "string",
    "phone": "string",
    "email": "string",
    "bloodInventory": {
      "A+": "number",
      "A-": "number",
      "B+": "number",
      "B-": "number",
      "O+": "number",
      "O-": "number",
      "AB+": "number",
      "AB-": "number"
    },
    "lastUpdated": "date"
  }
]
```

#### Get Specific Blood Bank
```
GET /banks/:id
```

**Response:**
```json
{
  "_id": "string",
  "name": "string",
  "address": "string",
  "city": "string",
  "contactPerson": "string",
  "phone": "string",
  "email": "string",
  "bloodInventory": {
    "A+": "number",
    "A-": "number",
    "B+": "number",
    "B-": "number",
    "O+": "number",
    "O-": "number",
    "AB+": "number",
    "AB-": "number"
  },
  "lastUpdated": "date"
}
```

#### Create New Blood Bank (Admin Only)
```
POST /banks
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "address": "string",
  "city": "string",
  "contactPerson": "string",
  "phone": "string",
  "email": "string",
  "bloodInventory": {
    "A+": "number",
    "A-": "number",
    "B+": "number",
    "B-": "number",
    "O+": "number",
    "O-": "number",
    "AB+": "number",
    "AB-": "number"
  }
}
```

**Response:**
```json
{
  "message": "Blood bank created successfully",
  "bank": {
    // Created blood bank object
  }
}
```

#### Update Blood Bank (Admin Only)
```
PUT /banks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string", // Optional
  "address": "string", // Optional
  "city": "string", // Optional
  "contactPerson": "string", // Optional
  "phone": "string", // Optional
  "email": "string", // Optional
  "bloodInventory": {
    "A+": "number", // Optional
    "A-": "number", // Optional
    // ... other blood groups
  }
}
```

**Response:**
```json
{
  "message": "Blood bank updated successfully",
  "bank": {
    // Updated blood bank object
  }
}
```

#### Delete Blood Bank (Admin Only)
```
DELETE /banks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Blood bank deleted successfully"
}
```

### Campaign Routes

#### Get All Campaigns
```
GET /campaigns
```

**Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "date": "date",
    "location": "string",
    "organizer": "string",
    "contact": "string",
    "targetDonors": "number",
    "registeredDonors": "number",
    "status": "string"
  }
]
```

#### Get Specific Campaign
```
GET /campaigns/:id
```

**Response:**
```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "date": "date",
  "location": "string",
  "organizer": "string",
  "contact": "string",
  "targetDonors": "number",
  "registeredDonors": "number",
  "status": "string"
}
```

#### Create New Campaign (Admin Only)
```
POST /campaigns
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "date": "date",
  "location": "string",
  "organizer": "string",
  "contact": "string",
  "targetDonors": "number"
}
```

**Response:**
```json
{
  "message": "Campaign created successfully",
  "campaign": {
    // Created campaign object
  }
}
```

#### Update Campaign (Admin Only)
```
PUT /campaigns/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string", // Optional
  "description": "string", // Optional
  "date": "date", // Optional
  "location": "string", // Optional
  "organizer": "string", // Optional
  "contact": "string", // Optional
  "targetDonors": "number" // Optional
}
```

**Response:**
```json
{
  "message": "Campaign updated successfully",
  "campaign": {
    // Updated campaign object
  }
}
```

#### Delete Campaign (Admin Only)
```
DELETE /campaigns/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Campaign deleted successfully"
}
```

### Leaderboard Routes

#### Get Donor Leaderboard
```
GET /leaderboard
```

**Response:**
```json
[
  {
    "donor": {
      "_id": "string",
      "name": "string"
    },
    "totalDonations": "number",
    "points": "number",
    "badges": ["string"]
  }
]
```

## 📨 Error Responses

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 🔌 WebSocket Events (if applicable)

If the application uses WebSockets for real-time features, document the events here.

## 📈 Rate Limiting

API endpoints may be rate-limited to prevent abuse. Typical limits:
- 100 requests per hour for authenticated users
- 10 requests per hour for unauthenticated users

## 🔄 Versioning

The API follows semantic versioning. Currently at version 1.0.0.

## 📞 Support

For API-related issues, please:
1. Check this documentation
2. Review existing GitHub issues
3. Create a new issue with detailed information