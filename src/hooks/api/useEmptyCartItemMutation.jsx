import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const emptyCartItem = async (url) => {
  await api.delete(url);
};

export default function useEmptyCartItemMutation() {
  const res = useSWRMutation(`/product-carts/empty-my-cart`, emptyCartItem);
  return res;
}
