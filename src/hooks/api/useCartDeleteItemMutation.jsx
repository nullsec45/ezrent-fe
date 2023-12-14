import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const deleteCartItem = async (url) => {
  await api.delete(url);
};

export default function useCartDeleteItemMutation(cartItemId) {
  const res = useSWRMutation(`/product-carts/${cartItemId}`, deleteCartItem);
  return res;
}
