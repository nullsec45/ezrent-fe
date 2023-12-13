import { api } from '@/utils/axios';
import useSWRMutation from 'swr/mutation';

const deliveredOrder = async (url) => {
  await api.post(url);
};

export default function useOrderDeliveredMutation(orderId) {
  const res = useSWRMutation(
    `/orders/${orderId}/delivered-order`,
    deliveredOrder
  );

  return res;
}
