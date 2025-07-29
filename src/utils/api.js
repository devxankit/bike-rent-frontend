import axios from 'axios';
import { toast } from 'react-toastify';

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

// Axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.code === 'ECONNABORTED' || error.response?.status === 499) {
      toast.error('Request timed out. Please try again later.', {
        position: 'top-right',
        autoClose: 4000,
      });
    }
    return Promise.reject(error);
  }
);

export default api; 