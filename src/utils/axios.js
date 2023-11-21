import axios from 'axios';

let accessToken = null;

if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('accessToken');
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
