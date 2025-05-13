import axios from 'axios';

const strapiUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const strapi = axios.create({
  baseURL: strapiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
strapi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('strapi_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default strapi; 