import { api } from '@/utils/axios';

export const register = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error?.message);
  }
};
export const login = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error?.message);
  }
};
export const addProduct = async (data) => {
  try {
    const response = await api.post('/products', data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error?.message);
  }
};
export const addStore = async (data) => {
  try {
    const response = await api.post('/stores', data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error?.message);
  }
};
