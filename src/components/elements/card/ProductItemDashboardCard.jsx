import Image from 'next/image';
import ProductDescriptionModal from '@/components/elements/modal/ProductDescriptionModal';
import { TbShoppingBag } from 'react-icons/tb';
import { BsBoxSeam } from 'react-icons/bs';
import { PiChatTeardropTextLight } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import Counter from '@/components/elements/input/Counter';
import { FaPen } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useInputNumber from '@/hooks/custom/useInputNumber';
import useCounter from '@/hooks/custom/useCounter';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useUpdatePriceMutation from '@/hooks/api/useUpdatePriceMutation';
import useUpdateStockMutation from '@/hooks/api/useUpdateStockMutation';

export default function ProductItemDashboardCard({ product }) {
  const [
    stockCounter,
    inputStockCounterChange,
    incrementStock,
    decrementStock,
  ] = useCounter(product.stock);
  const [price, handlePrice] = useInputNumber(product.price);
  const [debouncedPrice] = useDebounce(price, 1000);
  const [debouncedStock] = useDebounce(stockCounter, 1000);
  const { trigger: triggerPrice } = useUpdatePriceMutation(product.id);
  const { trigger: triggerStock } = useUpdateStockMutation(product.id);

  const infoProduct = [
    {
      icon: <TbShoppingBag />,
      value: product.orders.length,
    },
    {
      icon: <BsBoxSeam />,
      value: product.stock - product.availableStock,
    },
    {
      icon: <PiChatTeardropTextLight />,
      value: product.reviews.length,
    },
  ];

  useEffect(() => {
    triggerPrice({
      price: debouncedPrice,
    });
  }, [debouncedPrice, triggerPrice]);

  useEffect(() => {
    triggerStock({
      stock: debouncedStock,
    });
  }, [debouncedStock, triggerStock]);

  return (
    <li className="flex flex-col md:flex-row md:items-center p-2 gap-3 md:gap-0 border border-gray-300 rounded-lg">
      <div className="basis-3/12 flex gap-2 items-center">
        <div className="relative w-14 h-14">
          <Image
            src={product?.productPictures[0]?.url}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        <div>
          <p className="font-semibold text-sm">{product.name}</p>
          <ProductDescriptionModal description={product.description} />
        </div>
      </div>

      <div className="flex md:flex-col-reverse gap-4 md:gap-2 basis-2/12">
        <div className="flex gap-2">
          {infoProduct.map((info, index) => (
            <div key={index} className="flex items-center gap-1 text-gray-500">
              <span>{info.icon}</span>
              <span>{info.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-1 items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar className="w-[14px] h-[14px] text-yellow-400" key={index} />
          ))}
          <span className="text-xs font-medium">5.0</span>
        </div>
      </div>

      <div className="flex basis-3/12 gap-2 flex-1">
        <div className="basis-1/2">
          <span className="font-medium text-xs mb-1 md:hidden">Harga/Hari</span>
          <div className="flex">
            <div className="px-3 text-xs text-gray-500 bg-gray-200 rounded-l-md grid place-content-center">
              Rp
            </div>
            <Input
              placeholder="Harga"
              value={price}
              className="text-xs rounded-r-md rounded-l-none min-w-[96px] w-full max-w-[160px]"
              onChange={handlePrice}
            />
          </div>
        </div>

        <div className="basis-1/2">
          <span className="font-medium text-xs mb-1 md:hidden">Stok</span>
          <div className="flex scale-95">
            <Counter
              value={stockCounter}
              onIncement={incrementStock}
              onDecrement={decrementStock}
              onInputChange={inputStockCounterChange}
            />
          </div>
        </div>
      </div>

      <div className="basis-1/12">
        <Link href={`/store/dashboard/products/${product.id}/edit`}>
          <Button variant="outline" className="w-full font-medium px-8">
            Edit
            <FaPen className="w-3 h-3 ml-3" />
          </Button>
        </Link>
      </div>
    </li>
  );
}
