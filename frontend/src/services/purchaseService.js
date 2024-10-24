// src/services/purchaseService.js
import axios from 'axios';

export const createPurchase = async (data) => {
  return axios.post('/api/purchases/create', data);
};

export const getPurchases = async () => {
  return axios.get('/api/purchases');
};
