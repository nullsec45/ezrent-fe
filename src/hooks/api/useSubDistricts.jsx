import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await axios(url);
  return res.data.result;
};

export default function useSubDistricts(districtId) {
  const res = useSWR(
    districtId
      ? `https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=${districtId}`
      : null,
    fetcher
  );

  return res;
}
