import useSWR from 'swr';

export default function useAddresses() {
  const res = useSWR('/addresses');

  return res;
}
