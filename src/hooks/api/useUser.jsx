import useSWR from 'swr';

export default function useUser() {
  const res = useSWR('/auth/verify-token');
  return res;
}
