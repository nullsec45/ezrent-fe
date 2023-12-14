import useSWR from 'swr';

export default function useCart() {
  const res = useSWR('/product-carts');
  return res;
}
