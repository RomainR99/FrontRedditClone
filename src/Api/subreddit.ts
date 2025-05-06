import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Change ça si ton backend Strapi est en ligne

export const getSubreddits = async () => {
  const response = await axios.get(`${API_URL}/subreddits`);
  return response.data;
};
