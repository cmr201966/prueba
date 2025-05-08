import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Aquí defines la URL del servidor Flask
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default api;
