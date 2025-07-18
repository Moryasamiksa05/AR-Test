import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ar-test-mj76.onrender.com/api', 
});

export default API;
