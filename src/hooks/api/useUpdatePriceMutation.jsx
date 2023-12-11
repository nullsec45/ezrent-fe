import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const updatePrice = async (url, { arg }) => {
  await api.patch(url, {
    price: arg.price,
  });
};

export default function useUpdatePriceMutation(productId) {
  const res = useSWRMutation(
    `/products/${productId}/update-price`,
    updatePrice
  );

  return res;
}
