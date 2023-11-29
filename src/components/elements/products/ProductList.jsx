import { Button } from '@/components/ui/button';
import { LuSettings2 } from 'react-icons/lu';
import SelectMenu from '@/components/elements/input/SelectMenu';
import ProductListItem from '@/components/elements/products/ProductListItem';
import useProducts from '@/hooks/api/useProducts';

export default function ProductList({ openFilterMenu }) {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="flex-1">
      {/* Section Header */}
      <div className="flex justify-between lg:items-center gap-3 lg:px-3">
        <div>
          <div className="lg:hidden">
            <Button
              variant="outline"
              className="w-full max-w-[10rem] flex justify-between border-gray-300"
              onClick={openFilterMenu}
            >
              <span>Filter</span>
              <LuSettings2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-gray-500 text-sm font-medium mt-5 lg:mt-0">
            <span>Produk Ditemukan: </span>
            <span className="text-black">{products?.length || 0}</span>
          </div>
        </div>
        <SelectMenu
          placeholder="Sort By"
          items={['Opsi 1', 'Opsi 2', 'Opsi 3', 'Opsi 4']}
        />
      </div>

      {/* Product list item */}
      <ProductListItem />
    </div>
  );
}
