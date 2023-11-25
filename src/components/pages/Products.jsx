'use client';

import ProductCard from '@/components/elements/card/ProductCard';
import SelectMenu from '@/components/elements/input/SelectMenu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LuSettings2 } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import FilterMenu from '@/components/FilterMenu';

export default function Products() {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const openFilterMenu = () => setIsFilterMenuOpen(true);
  const closeFilterMenu = () => setIsFilterMenuOpen(false);

  const products = [
    {
      id: 'c63b7789-3859-4d88-84b2-b8cc39dc5d37',
      categoryId: 'c58d789f-c681-4b36-9710-411bfbb6f7b3',
      storeId: 'c41c7358-4c1b-4f01-8b99-9883b6c9a394',
      name: 'XBOX ONE',
      description: 'description XBOX one',
      price: 150000,
      maximumRental: 10,
      stock: 100,
      availableStock: 98,
      createdAt: '2023-11-23T05:02:05.617Z',
      updatedAt: '2023-11-23T05:06:25.483Z',
      productPictures: [
        {
          id: 'bddfe5c8-3f1a-40ac-8733-60b4f079e322',
          url: '<url_picture_xboxone>',
          productId: 'c63b7789-3859-4d88-84b2-b8cc39dc5d37',
        },
      ],
      store: {
        id: 'c41c7358-4c1b-4f01-8b99-9883b6c9a394',
        name: 'rizki toko',
        storeAddress: null,
      },
    },
  ];

  return (
    <main className="container p-2 mx-auto flex relative">
      {/* Filter Sidebar */}
      <aside
        className={twMerge(
          'fixed top-0 w-full h-screen lg:sticky lg:top-0 lg:block lg:w-72 max-h-screen overflow-y-scroll bg-white z-10 flex-shrink-0',
          `${isFilterMenuOpen || 'hidden'}`
        )}
      >
        <FilterMenu closeFilterMenu={closeFilterMenu} />
      </aside>
      {/* Main Section */}
      <div className="flex-1">
        {/* Section Header */}
        <div className="flex justify-between lg:items-center gap-3 lg:px-3">
          <div>
            <div className="lg:hidden">
              <Button
                variant="outline"
                className="w-40 flex justify-between border-gray-300"
                onClick={openFilterMenu}
              >
                <span>Filter</span>
                <LuSettings2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-gray-500 text-sm font-medium mt-5 lg:mt-0">
              Produk Ditemukan: <span className="text-black">10</span>
            </div>
          </div>
          <SelectMenu
            placeholder="Sort By"
            items={['Opsi 1', 'Opsi 2', 'Opsi 3', 'Opsi 4']}
          />
        </div>

        {/* Product list */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 py-5 lg:px-3 flex-1">
          {products.map((product) => (
            <>
              <ProductCard key={product.id} product={product} />
              <ProductCard key={product.id} product={product} />
              <ProductCard key={product.id} product={product} />
              <ProductCard key={product.id} product={product} />
              <ProductCard key={product.id} product={product} />
              <ProductCard key={product.id} product={product} />
              <ProductCard key={product.id} product={product} />
              <ProductCard key={product.id} product={product} />
              <ProductCard key={product.id} product={product} />
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
