import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await axios(url);
  return res.data.result;
};

export default function usePostalCode(cityId, districtId) {
  const res = useSWR(
    cityId && districtId
      ? `https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${cityId}&d_kecamatan_id=${districtId}`
      : null,
    fetcher
  );

  return res;
}
