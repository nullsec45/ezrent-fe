import { toast } from '@/components/ui/use-toast';
import { api } from '@/utils/axios';
import { deleteCookie, setCookie } from 'cookies-next';

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
    if (response?.data.statusCode === 200) {
      setCookie('accessToken', response?.data.data.accessToken);
      return response;
    }
  } catch (error) {
    if (error?.response?.status === 401) {
      toast({
        variant: 'destructive',
        title: 'Invalid Credentials',
        description: 'Email atau Password yang anda masukkan salah',
      });
    }

    console.log(error?.message);
  }
};

export const logout = async () => {
  try {
    return deleteCookie('accessToken');
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

export const createAddress = async (data) => {
  try {
    const response = await api.post('/addresses', data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error?.message);
  }
};
