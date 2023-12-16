import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useProductsSearch from '@/hooks/api/useProductsSearch';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDebounce } from 'use-debounce';

export default function FieldInputGroup() {
  const [search, setSearch] = useState('');
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [debouncedSearch] = useDebounce(search, 400);
  const { data: products, isLoading } = useProductsSearch(debouncedSearch);
  const isProductNotFound = products?.length === 0;
  const searchInputRef = useRef(null);
  const searchValueRef = useRef(null);

  useEffect(() => {
    const bodyOnClick = (e) => {
      if (
        searchValueRef.current.contains(e.target) ||
        searchInputRef.current.contains(e.target)
      )
        return;

      setIsSearchFocus(false);
    };

    document.body.addEventListener('click', bodyOnClick);

    return () => {
      document.body.removeEventListener('click', bodyOnClick);
    };
  }, []);

  const handleOnSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex w-full items-center relative">
      <Input
        type="search"
        placeholder="Search"
        value={search}
        onChange={handleOnSearch}
        onFocus={() => setIsSearchFocus(true)}
        ref={searchInputRef}
        className="rounded-r-none border border-input focus:border-black bg-background ring-offset-background  focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-ring focus-visible:-ring-offset-0"
      />
      <Button type="submit" className="rounded-l-none">
        <Search />
      </Button>

      {isLoading ? (
        <div
          className={twMerge(
            'bg-white border border-gray-300 rounded-xl p-3 w-full absolute top-12 shadow-lg space-y-3',
            !isSearchFocus && 'hidden'
          )}
        >
          <Skeleton className="w-full h-5 rounded-sm" />
          <Skeleton className="w-full h-5 rounded-sm" />
          <Skeleton className="w-full h-5 rounded-sm" />
        </div>
      ) : (
        <div
          className={twMerge(
            'bg-white border border-gray-300 rounded-xl px-3 w-full absolute top-12 divide-y divide-gray-200 shadow-lg min-h-[70px]',
            !isSearchFocus && 'hidden'
          )}
          ref={searchValueRef}
        >
          {isProductNotFound && (
            <div className="text-gray-400 h-16 py-2 text-sm">
              Product{' '}
              <span className="text-gray-700">
                &apos;{debouncedSearch}&apos;
              </span>{' '}
              tidak ditemukan
            </div>
          )}

          {products?.map((product) => (
            <SearchItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchItem({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex gap-4 items-center py-2"
    >
      <Image
        src={product.productPictures[0].url}
        alt={product.name}
        width={20}
        height={20}
        className="object-contain rounded-sm"
      />
      <p className="font-medium text-sm">{product.name}</p>
    </Link>
  );
}
