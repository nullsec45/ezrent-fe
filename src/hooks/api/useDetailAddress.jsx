import useSWR from 'swr';

export default function useDetailAddress(addressId) {
  const res = useSWR(`/addresses/${addressId}`);
  return res;
}
