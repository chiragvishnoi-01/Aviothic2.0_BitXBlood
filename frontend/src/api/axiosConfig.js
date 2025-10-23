import axios from "axios";

// Create axios instance with base configuration
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if available
instance.interceptors.request.use(
  (config) => {
    // Log request details in development
    if (import.meta.env.DEV) {
      console.log(' Axios Request:', {
        method: config.method?.toUpperCase(),
        url: config.baseURL + config.url,
        data: config.data,
        headers: config.headers
      });
    }
    
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
        } else {
          console.warn('User data found but no token available');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.warn('No user data found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
instance.interceptors.response.use(
  (response) => {
    // Log response details in development
    if (import.meta.env.DEV) {
      console.log(' Axios Response:', {
        status: response.status,
        url: response.config?.url,
        data: response.data
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear user data and redirect to login
          console.warn('Unauthorized access - clearing user session');
          localStorage.removeItem('user');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          console.error('Access forbidden:', data.message);
          break;
          
        case 404:
          console.error('Resource not found:', data.message);
          break;
          
        case 500:
          console.error('Server error:', data.message);
          break;
          
        default:
          console.error('API Error:', status, data.message || 'Unknown error');
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error: No response from server');
      console.error('Request details:', {
        url: error.config?.baseURL + error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      });
      console.error('Please check if the backend is running at:', instance.defaults.baseURL);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Add retry logic for failed requests
instance.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  
  // If we haven't retried yet and it's a network error
  if (!originalRequest._retry && 
      (error.code === 'ECONNABORTED' || error.message.includes('timeout') || !error.response)) {
    
    originalRequest._retry = true;
    
    // Wait 1 second before retrying
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Retrying request...');
    return instance(originalRequest);
  }
  
  return Promise.reject(error);
});

// Log the API base URL in development
if (import.meta.env.DEV) {
  console.log('🔗 API Base URL:', instance.defaults.baseURL);
}

export default instance;