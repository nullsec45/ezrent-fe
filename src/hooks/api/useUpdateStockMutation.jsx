import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const updateStock = async (url, { arg }) => {
  await api.patch(url, {
    stock: arg.stock,
  });
};

export default function useUpdateStockMutation(productId) {
  const res = useSWRMutation(
    `/products/${productId}/update-stock`,
    updateStock
  );

  return res;
}
