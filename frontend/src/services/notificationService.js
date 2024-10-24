// src/services/notificationService.js
import axios from 'axios';

export const sendNotification = async (email, message) => {
  return axios.post('/api/notifications/send', { email, message });
};
