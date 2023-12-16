import useSWR from 'swr';

const fetcherParams = async (url, query) => {
  let urlAPI = url;
  if (query) {
    urlAPI = `${urlAPI}/filter?${query}`;
  }

  const response = await api.get(urlAPI);

  return response.data?.data;
};

export default function useProducts(queryParams) {
  const res = useSWR(['/products', queryParams], ([url, query]) =>
    fetcherParams(url, query)
  );

  return res;
}
