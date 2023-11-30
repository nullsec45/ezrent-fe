import useSWR from 'swr';

export default function useDetailProduct(productId) {
  const res = useSWR(`/products/${productId}`);
  return res;
}
