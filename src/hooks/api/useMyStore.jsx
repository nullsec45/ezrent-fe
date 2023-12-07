import useSWR from 'swr';

export default function useMyStore() {
  const res = useSWR('/users/my-store');

  return res;
}
