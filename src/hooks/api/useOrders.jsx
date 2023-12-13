import useSWR from 'swr';

export default function useOrders() {
  const res = useSWR('/orders');
  return res;
}
