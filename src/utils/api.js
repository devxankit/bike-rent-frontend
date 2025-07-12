import axios from 'axios';

// API configuration for both development and production
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Helper function to get the full API URL
export const getApiUrl = (endpoint) => {
  // In development, use relative paths (proxy handles it)
  if (process.env.NODE_ENV === 'development') {
    return endpoint;
  }
  
  // In production, use the full URL
  return `${API_BASE_URL}${endpoint}`;
};

// Enhanced logging utility
const logApiCall = (type, config, response = null, error = null) => {
  const timestamp = new Date().toISOString();
  const method = config.method?.toUpperCase();
  const url = config.url;
  const status = response?.status || error?.response?.status;
  
  console.group(`🌐 [${timestamp}] API ${type}`);
  console.log(`📡 Method: ${method}`);
  console.log(`🔗 URL: ${url}`);
  console.log(`📊 Status: ${status}`);
  
  if (config.headers) {
    console.log(`📋 Headers:`, config.headers);
  }
  
  if (config.data) {
    console.log(`📤 Request Data:`, config.data);
  }
  
  if (response?.data) {
    console.log(`📥 Response Data:`, response.data);
  }
  
  if (error) {
    console.error(`❌ Error:`, error.message);
    console.error(`🔍 Error Details:`, error);
  }
  
  console.groupEnd();
};

// Axios instance with default configuration
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and logging
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log the request
    logApiCall('REQUEST', config);
    
    return config;
  },
  (error) => {
    console.error('🚫 Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    // Log successful response
    logApiCall('RESPONSE', response.config, response);
    return response;
  },
  (error) => {
    // Log error response
    logApiCall('ERROR', error.config, null, error);
    
    if (error.response?.status === 401) {
      console.warn('🔐 Unauthorized - Clearing token and redirecting to login');
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Enhanced error logging
    if (error.response) {
      console.error('📡 Server Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      console.error('🌐 Network Error:', {
        message: 'No response received from server',
        request: error.request
      });
    } else {
      console.error('❌ Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api; 