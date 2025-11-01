# Development Guide

This guide will help you set up and contribute to the Raktchain project.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or Atlas account)
- Git

## 🚀 Initial Setup

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bloodlink.git
   cd bloodlink
   ```

3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/bloodlink.git
   ```

4. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

## ⚙️ Environment Configuration

### Backend Setup

1. Create a `.env` file in the [backend](backend) directory:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens
   - `EMAIL_USER` and `EMAIL_PASS`: Credentials for email service

### Frontend Setup

1. Create a `.env` file in the [frontend](frontend) directory:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   - `VITE_API_URL`: URL to your backend API

## ▶️ Running the Application

### Development Mode

Start the backend server:
```bash
cd backend
npm run dev
```

In a separate terminal, start the frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Build

Build the frontend for production:
```bash
cd frontend
npm run build
```

Serve the production build:
```bash
npm run preview
```

## 🧪 Testing

### Backend Tests

Run backend tests:
```bash
cd backend
npm test
```

### Frontend Tests

Run frontend tests:
```bash
cd frontend
npm test
```

## 📁 Project Structure

### Backend Directory Structure

```
backend/
├── config/           # Configuration files
├── models/           # Mongoose models
├── routes/           # API route handlers
├── utils/            # Utility functions
├── middleware/       # Custom middleware
├── controllers/      # Route controllers
├── services/         # Business logic
├── server.js         # Main server file
└── package.json      # Dependencies
```

### Frontend Directory Structure

```
frontend/
├── src/
│   ├── api/          # API service files
│   ├── components/    # Reusable components
│   ├── context/       # React context providers
│   ├── data/         # Static data
│   ├── pages/        # Page components
│   ├── hooks/        # Custom hooks
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main app component
│   └── main.jsx      # Entry point
├── public/           # Static assets
├── package.json      # Dependencies
└── vite.config.js    # Vite configuration
```

## 🔄 Development Workflow

1. Sync with upstream:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request on GitHub

## 📝 Code Style Guidelines

### JavaScript/React Style Guide

- Use functional components with hooks
- Follow Airbnb JavaScript Style Guide
- Use PropTypes for component props
- Write clean, readable code with meaningful variable names
- Comment complex logic
- Follow accessibility best practices

### Backend (Node.js/Express) Style Guide

- Follow RESTful API design principles
- Use consistent error handling
- Validate all inputs
- Write secure code following OWASP guidelines
- Document APIs appropriately

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - :art: `:art:` when improving the format/structure of the code
  - :racehorse: `:racehorse:` when improving performance
  - :non-potable_water: `:non-potable_water:` when plugging memory leaks
  - :memo: `:memo:` when writing docs
  - :bug: `:bug:` when fixing a bug
  - :fire: `:fire:` when removing code or files
  - :green_heart: `:green_heart:` when fixing the CI build
  - :white_check_mark: `:white_check_mark:` when adding tests
  - :lock: `:lock:` when dealing with security
  - :arrow_up: `:arrow_up:` when upgrading dependencies
  - :arrow_down: `:arrow_down:` when downgrading dependencies
  - :shirt: `:shirt:` when removing linter warnings

## 🐛 Debugging Tips

### Backend Debugging

1. Enable debug logging by setting `DEBUG=*` in your environment
2. Use console.log statements strategically
3. Check MongoDB connection logs
4. Monitor network requests with tools like Postman

### Frontend Debugging

1. Use browser developer tools
2. Check the Network tab for API requests
3. Use React DevTools for component inspection
4. Enable Redux DevTools if using state management

## 📦 Dependency Management

### Adding New Dependencies

For production dependencies:
```bash
npm install package-name
```

For development dependencies:
```bash
npm install --save-dev package-name
```

### Updating Dependencies

Check for outdated packages:
```bash
npm outdated
```

Update packages:
```bash
npm update
```

## 🛡️ Security Best Practices

1. Never commit sensitive information (API keys, passwords) to the repository
2. Use environment variables for configuration
3. Validate and sanitize all user inputs
4. Implement proper authentication and authorization
5. Keep dependencies up to date
6. Use HTTPS in production
7. Implement rate limiting for API endpoints

## 🎨 UI/UX Guidelines

1. Maintain consistent design language
2. Ensure responsive design for all screen sizes
3. Follow accessibility guidelines (WCAG)
4. Use consistent color schemes and typography
5. Implement proper loading states and error handling
6. Optimize images and assets for performance

## 🚀 Performance Optimization

### Frontend Optimization

1. Code splitting for lazy loading
2. Image optimization
3. Bundle analysis with tools like webpack-bundle-analyzer
4. Minimize re-renders with React.memo and useMemo
5. Use efficient data fetching strategies

### Backend Optimization

1. Database indexing for frequently queried fields
2. Query optimization
3. Caching strategies
4. Connection pooling
5. Efficient API response formats

## 🧹 Maintenance

### Regular Tasks

1. Update dependencies regularly
2. Review and close stale issues
3. Monitor application performance
4. Review security vulnerabilities
5. Update documentation

### Database Maintenance

1. Regular backups
2. Index optimization
3. Data cleanup scripts
4. Performance monitoring

## ❓ Getting Help

If you need help:

1. Check the existing documentation
2. Review open and closed issues
3. Join our community discussions
4. Contact maintainers directly

## 🤝 Community

We encourage a welcoming and inclusive community. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.