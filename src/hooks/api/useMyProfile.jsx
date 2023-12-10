import useSWR from 'swr';

export default function useMyProfile() {
  const res = useSWR('/profiles/me');
  return res;
}
