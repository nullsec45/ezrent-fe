'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import FilterMenu from '@/components/FilterMenu';
import ProductList from '../elements/products/ProductList';

export default function Products() {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const openFilterMenu = () => setIsFilterMenuOpen(true);
  const closeFilterMenu = () => setIsFilterMenuOpen(false);

  return (
    <main className="container px-2 py-10 mx-auto flex relative">
      {/* Filter Sidebar */}
      <aside
        className={twMerge(
          'fixed lg:sticky top-0 lg:top-0 left-0 lg:left-auto w-full h-screen lg:block lg:w-72 max-h-screen overflow-y-scroll bg-white z-50 lg:z-10 flex-shrink-0',
          `${isFilterMenuOpen || 'hidden'}`
        )}
      >
        <FilterMenu closeFilterMenu={closeFilterMenu} />
      </aside>

      <ProductList openFilterMenu={openFilterMenu} />
    </main>
  );
}
