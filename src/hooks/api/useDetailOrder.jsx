import useSWR from 'swr';

export default function useDetailOrder(orderId) {
  const res = useSWR(`/orders/${orderId}`);
  return res;
}
