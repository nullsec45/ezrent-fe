import useSWR from 'swr';

export default function useProductReviews(productId) {
  const res = useSWR(`/products/${productId}/reviews`);
  return res;
}
