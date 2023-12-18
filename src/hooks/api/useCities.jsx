import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await axios(url);
  return res.data.result;
};

export default function useCities(provinceId) {
  const res = useSWR(
    provinceId
      ? `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`
      : null,
    fetcher
  );

  return res;
}
