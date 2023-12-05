import axios from 'axios';

const fetcher = async (url) => {
  const res = await axios(url);
  return res.data.result;
};

export default function useSubDistricts(districtId) {
  const res = useSWR(
    `https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=${districtId}`,
    fetcher
  );

  return res;
}
