import useSWR from 'swr';

export default function useDetailStore(storeId) {
  const res = useSWR(storeId ? `/stores/${storeId}` : null);

  return res;
}
