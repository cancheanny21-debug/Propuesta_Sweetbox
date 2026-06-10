import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Middleware para adjuntar el JWT token en cada petición si existe
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sweetbox_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
