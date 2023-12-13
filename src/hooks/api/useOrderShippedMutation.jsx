import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const shippedOrder = async (url) => {
  await api.post(url);
};

export default function useOrderShippedMutation(orderId) {
  const res = useSWRMutation(`/orders/${orderId}/shipped-order`, shippedOrder);

  return res;
}
