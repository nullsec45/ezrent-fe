import useSWR from 'swr';

export default function useCategories() {
  const res = useSWR('/categories');
  return res;
}
