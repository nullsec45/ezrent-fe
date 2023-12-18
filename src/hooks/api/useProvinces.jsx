import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await axios(url);
  return res.data.result;
};

export default function useProvinces() {
  const res = useSWR(
    'https://alamat.thecloudalert.com/api/provinsi/get/',
    fetcher
  );

  return res;
}
