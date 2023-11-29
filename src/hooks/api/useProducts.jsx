import useSWR from 'swr';

export default function useProducts() {
  const res = useSWR('/products');
  return res;
}
