import useSWR from 'swr';

export default function useMyAddress() {
  const res = useSWR('/addresses');
  return res;
}
