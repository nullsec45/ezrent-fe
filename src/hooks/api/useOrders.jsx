import { sortDataFromNewest } from '@/utils/helperFunction';
import useSWR from 'swr';

export default function useOrders() {
  const res = useSWR('/orders', {
    onSuccess: (data) => sortDataFromNewest(data),
  });
  return res;
}
