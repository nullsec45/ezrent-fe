import axios from 'axios';
import { getCookie } from 'cookies-next';

let accessToken = null;

if (typeof window !== 'undefined') {
  accessToken = getCookie('accessToken')
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
