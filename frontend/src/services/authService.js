// src/services/authService.js
import axios from 'axios';

export const login = async (token) => {
  return axios.post('/api/auth/google-login', { token });
};

export const logout = async () => {
  return axios.post('/api/auth/logout');
};
