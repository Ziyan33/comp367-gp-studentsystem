// frontend/src/utils/axiosConfig.js

import axios from 'axios';
import { getToken } from './auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/graphql', // Adjust this URL based on your backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to request headers
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
