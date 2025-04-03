
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Authentication endpoints
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Item endpoints
export const getItems = () => API.get('/items');
export const getItem = (id) => API.get(`/items/${id}`);
export const createItem = (data, token) =>
  API.post('/items', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateItem = (id, data, token) =>
  API.put(`/items/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteItem = (id, token) =>
  API.delete(`/items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
