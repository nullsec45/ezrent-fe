import LocationFilter from '@/components/elements/filter/LocationFilter';
import { IoChevronBackOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import PriceFilter from '@/components/elements/filter/PriceFilter';
import RatingFilter from '@/components/elements/filter/RatingFilter';
import PaymentMethodFilter from '@/components/elements/filter/PaymentMethodFilter';
import CategoryFilter from '@/components/elements/filter/CategoryFilter';
import { useEffect, useState } from 'react';
import useInputNumber from '@/hooks/custom/useInputNumber';
import useCategories from '@/hooks/api/useCategories';
import { usePathname, useRouter } from 'next/navigation';

export default function FilterMenu({ closeFilterMenu }) {
  const [location, setLocation] = useState('');
  const [minPrice, handleMinPrice] = useInputNumber();
  const [maxPrice, handleMaxPrice] = useInputNumber();
  const { data: categories, isLoading } = useCategories();
  const [searchedCategories, setSearchedCategories] = useState([]);
  const [category, setCategory] = useState('');

  const router = useRouter();
  const pathname = usePathname();

  const applyProductFilters = () => {
    const locationFilter = location;
    const minPriceFilter = minPrice == 0 ? '' : minPrice;
    const maxPriceFilter = maxPrice == 0 ? '' : maxPrice;
    const categoryFilter = category;

    router.push(
      `${pathname}?category=${categoryFilter}&city=${locationFilter}&minPrice=${minPriceFilter}&maxPrice=${maxPriceFilter}`
    );
  };

  useEffect(() => {
    if (isLoading) return;
    setSearchedCategories(categories);
  }, [categories, isLoading]);

  return (
    <div className="py-5 px-5">
      <Button
        variant="ghost"
        className="px-0 hover:bg-transparent lg:hidden"
        onClick={closeFilterMenu}
      >
        <IoChevronBackOutline className="mr-4 w-6 h-6" />
        <span className="text-2xl">Filters</span>
      </Button>
      <LocationFilter location={location} setLocation={setLocation} />
      <PriceFilter
        minPrice={minPrice}
        handleMinPrice={handleMinPrice}
        maxPrice={maxPrice}
        handleMaxPrice={handleMaxPrice}
      />
      {/* <RatingFilter /> */}
      <CategoryFilter
        categories={categories}
        isLoading={isLoading}
        searchedCategories={searchedCategories}
        setSearchedCategories={setSearchedCategories}
        category={category}
        setCategory={setCategory}
      />
      {/* <PaymentMethodFilter /> */}

      <div className="grid grid-cols-2 grid-flow-row gap-5 mt-8">
        <Button
          variant="outline"
          className="py-5"
          onClick={() => router.push('/products')}
        >
          Reset
        </Button>
        <Button className="py-5" onClick={applyProductFilters}>
          Terapkan
        </Button>
      </div>
    </div>
  );
}
