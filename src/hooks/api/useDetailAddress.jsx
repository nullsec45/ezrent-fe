import useSWR from 'swr';

export default function useDetailAddress(addressId) {
  const res = useSWR(addressId ? `/addresses/${addressId}` : null);

  return res;
}
