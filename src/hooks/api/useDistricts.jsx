import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await axios(url);
  return res.data.result;
};

export default function useDistricts(cityId) {
  const res = useSWR(
    cityId
      ? `https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${cityId}`
      : null,
    fetcher
  );

  return res;
}
