import useSWR from 'swr';

export default function useDetailProduct(productId) {
  const res = useSWR(productId ? `/products/${productId}` : null);
  return res;
}
