// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://masterChefRecipesBackEnd.onrender.com'
        // : 'https://masterchefrecipes.onrender.com/'
  });
  

export default api;


