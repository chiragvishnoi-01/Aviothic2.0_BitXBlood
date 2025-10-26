# BloodLink Backend API

This is the backend API for the BloodLink blood donation platform, built with Node.js, Express, and MongoDB.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Blood Banks
- `GET /api/banks` - Get all blood banks
- `GET /api/banks/:id` - Get specific blood bank
- `POST /api/banks` - Create new blood bank (admin only)
- `PUT /api/banks/:id` - Update blood bank (admin only)
- `DELETE /api/banks/:id` - Delete blood bank (admin only)

### Donors
- `GET /api/donors` - Get all donors
- `GET /api/donors/:id` - Get specific donor
- `POST /api/donors` - Register as donor
- `PUT /api/donors/:id` - Update donor information

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get specific campaign
- `POST /api/campaigns` - Create new campaign (admin only)
- `PUT /api/campaigns/:id` - Update campaign (admin only)
- `DELETE /api/campaigns/:id` - Delete campaign (admin only)

### SOS Requests
- `POST /api/sos` - Create SOS blood request
- `GET /api/sos` - Get all SOS requests
- `PUT /api/sos/:id/respond` - Respond to SOS request

### Leaderboard
- `GET /api/leaderboard` - Get donor leaderboard

## Environment Variables

The backend requires the following environment variables:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `EMAIL_USER` - Email service username
- `EMAIL_PASS` - Email service password

## Authentication

Most API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API uses standard HTTP status codes:
- 200 - Success
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Internal Server Error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```