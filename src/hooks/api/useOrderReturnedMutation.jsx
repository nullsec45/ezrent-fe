import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const returnOrder = async (url) => {
  await api.post(url);
};

export default function useOrderReturnedMutation(orderId) {
  const res = useSWRMutation(`/orders/${orderId}/return-order`, returnOrder);

  return res;
}
