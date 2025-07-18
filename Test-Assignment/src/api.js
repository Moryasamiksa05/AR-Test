import axios from 'axios';

const API = axios.create({
  baseURL: 'https://assignment-8hzp.onrender.com/api', 
});

export default API;
