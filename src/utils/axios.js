import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
