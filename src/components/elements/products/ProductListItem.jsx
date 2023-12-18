import ProductCard from '@/components/elements/card/ProductCard';
import useProducts from '@/hooks/api/useProducts';
import ProductListSkeleton from '@/components/elements/skeleton/ProductListSkeleton';
import ErrorFetchApiFallback from '@/components/elements/errors/ErrorFetchApiFallback';
import NotFoundProductsFallback from '@/components/elements/errors/NotFoundProductsFallback';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { api } from '@/utils/axios';

export default function ProductListItem() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();

  const fetcherParams = async (url, query) => {
    let urlAPI = url;
    if (query) {
      urlAPI = `${urlAPI}/filter?${query}`;
    }

    const response = await api.get(urlAPI);

    return response.data?.data;
  };

  const {
    data: products,
    isLoading,
    error,
  } = useSWR(['/products', queryParams], ([url, query]) =>
    fetcherParams(url, query)
  );

  if (isLoading) return <ProductListSkeleton />;

  if (error) return <ErrorFetchApiFallback />;

  if (!products.length) return <NotFoundProductsFallback />;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 py-5 lg:px-3 flex-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
