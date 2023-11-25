import LocationFilter from '@/components/elements/filter/LocationFilter';
import { IoChevronBackOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import PriceFilter from '@/components/elements/filter/PriceFilter';
import RatingFilter from '@/components/elements/filter/RatingFilter';
import PaymentMethodFilter from '@/components/elements/filter/PaymentMethodFilter';
import CategoryFilter from '@/components/elements/filter/CategoryFilter';

export default function FilterMenu({ closeFilterMenu }) {
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
      <LocationFilter />
      <PriceFilter />
      <RatingFilter />
      <CategoryFilter />
      <PaymentMethodFilter />

      <div className="grid grid-cols-2 grid-flow-row gap-5 mt-8">
        <Button variant="outline" className="py-5">
          Reset
        </Button>
        <Button className="py-5">Terapkan</Button>
      </div>
    </div>
  );
}
