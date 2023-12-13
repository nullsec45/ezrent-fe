import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const cancelOrder = async (url) => {
  await api.post(url);
};

export default function useCancelOrderMutation(orderId) {
  const res = useSWRMutation(`/orders/${orderId}/cancel-order`, cancelOrder);

  return res;
}
