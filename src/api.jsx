import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api', // Remplace si Strapi est en ligne
});

export default api;
