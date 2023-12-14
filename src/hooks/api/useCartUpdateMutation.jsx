import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const updateCartItem = async (url, { arg }) => {
  await api.patch(url, arg);
};

export default function useCartUpdateMutation(cartItemId) {
  const res = useSWRMutation(`/product-carts/${cartItemId}`, updateCartItem);
  return res;
}
