import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const addCartItem = async (url, { arg }) => {
  await api.post(url, arg);
};

export default function useAddItemToCartMutation() {
  const res = useSWRMutation(`/product-carts`, addCartItem);
  return res;
}
