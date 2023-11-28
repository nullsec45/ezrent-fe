import { api } from './axios';

const STATUS_OK = 200;

const fetcher = async (url) => {
  const response = await api.get(url);

  if (response.status === STATUS_OK) {
    return response.data?.data;
  }
};

export { fetcher };
