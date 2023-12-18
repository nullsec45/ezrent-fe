'use client';

import ProductItemDashboardCard from '@/components/elements/card/ProductItemDashboardCard';
import Search from '@/components/elements/search/Search';
import useMyStore from '@/hooks/api/useMyStore';
import { useEffect, useState } from 'react';

export default function Page() {
  const { data: store, isLoading } = useMyStore();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    const products = store.products.filter((product) => {
      const productName = product.name.toLowerCase();
      return productName.includes(value.toLowerCase());
    });

    setSearchedProducts(products);
  };

  useEffect(() => {
    if (!isLoading) setSearchedProducts(store.products);
  }, [isLoading, store]);

  if (isLoading) return null;

  return (
    <div>
      <h1 className="font-bold text-xl mb-6">Daftar Produk</h1>

      <div className="mb-6">
        <div className="max-w-[15rem]">
          <Search
            value={searchValue}
            placeholder="Nama Produk"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div>
        <ul className="hidden md:flex md:gap-3 bg-gray-300 p-3 rounded-lg font-semibold mb-3">
          <li className="basis-3/12">Produk</li>
          <li className="basis-2/12">Info</li>
          <li className="basis-3/12">Harga/Hari</li>
          <li className="basis-3/12">Stok</li>
          <li className="basis-1/12">Aksi</li>
        </ul>

        <div>
          <ul className="space-y-5">
            {searchedProducts.map((product) => (
              <ProductItemDashboardCard product={product} key={product.id} />
            ))}
          </ul>
        </div>

        {!searchedProducts.length && (
          <div className="h-40 grid place-content-center text-gray-500 font-medium">
            <span>Produk Tidak ditemukan</span>
          </div>
        )}
      </div>
    </div>
  );
}
