import useSWR from 'swr';

export default function useProductsSearch(keyword) {
  const res = useSWR(keyword ? `/products/filter?keyword=${keyword}` : null);
  return res;
}
