import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const processOrder = async (url) => {
  await api.post(url);
};

export default function useOrderProcessedMutation(orderId) {
  const res = useSWRMutation(`/orders/${orderId}/process-order`, processOrder);

  return res;
}
