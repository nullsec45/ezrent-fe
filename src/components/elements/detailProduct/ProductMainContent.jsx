'use client';

import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';
import { IoBagCheckOutline } from 'react-icons/io5';
import { PiMapPinFill } from 'react-icons/pi';
import { BsBoxSeam, BsChatText } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import { differenceInDays, format, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/helperFunction';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import useDetailProduct from '@/hooks/api/useDetailProduct';
import DetailProductInfoCard from '@/components/elements/card/DetailProductInfoCard';
import ErrorFetchApiFallback from '@/components/elements/errors/ErrorFetchApiFallback';
import { useBoundStore } from '@/components/store/useBoundStore';
import { useRouter } from 'next/navigation';
import ProductMainContentSkeleton from '@/components/elements/skeleton/ProductMainContentSkeleton';
import PropTypes from 'prop-types';

export default function ProductMainContent({ productId }) {
  const { data: product, isLoading, error } = useDetailProduct(productId);
  const setOrderProduct = useBoundStore((state) => state.setOrderProduct);
  const router = useRouter();

  const today = startOfDay(new Date());
  const [date, setDate] = useState({
    from: today,
    to: today,
  });

  const [quantity, setQuantity] = useState(1);
  const [day, setDay] = useState(1);

  const isStockEmpty = () => product.availableStock < 1;

  const updateDayCounter = (range) => {
    if (range?.from && range?.to) {
      const dayFrom = new Date(range?.from);
      const dayTo = new Date(range?.to);

      const INCLUDE_TODAY_SELECTED = 1;

      const rentalDurationInDay =
        Math.abs(differenceInDays(dayFrom, dayTo)) + INCLUDE_TODAY_SELECTED;

      return setDay(rentalDurationInDay);
    }

    setDay(0);
  };

  const handleDateSelect = (range) => {
    const rangeSelected = {
      from: range?.from,
      to: range?.to,
    };
    if (!range?.to) rangeSelected.to = rangeSelected.from;

    setDate(rangeSelected);
    updateDayCounter(rangeSelected);
  };

  const handleIncrementItem = () => {
    if (quantity >= product.availableStock) return;
    setQuantity(quantity + 1);
  };
  const handleDecrementItem = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handleOnRent = () => {
    setOrderProduct({
      productId,
      quantity,
      rentPeriod: {
        from: date?.from,
        to: date?.to,
      },
    });

    router.push('/checkout?step=address');
  };

  if (isLoading) return <ProductMainContentSkeleton />;

  if (error) return <ErrorFetchApiFallback />;

  return (
    <div className="my-12 flex flex-col lg:flex-row h-full max-h-fit items-center gap-7">
      <div className="w-full lg:max-w-lg h-[27rem]">
        <Image
          src={product.productPictures[0]?.url}
          alt={product.name}
          width={100}
          height={100}
          quality={100}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
          {product.name}
        </h1>

        <div className="flex items-center gap-2 text-base md:text-lg">
          <h2 className="font-semibold">Rp{formatPrice(product.price)}</h2>
          <span className="text-gray-500"> / Hari</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{product.name[0]}</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-sm">{product.store.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <PiMapPinFill size={27} />
          <p className="font-semibold text-sm">
            {product.store?.storeAddress?.fullAddress ??
              'Jl. HR Soedimas No.77,Kec. Tempes,Pekanbaru, Riau'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 my-2 gap-5 w-full">
          <DetailProductInfoCard
            icon={<IoBagCheckOutline size={23} />}
            title="Tersewa"
            value="10x"
          />
          <DetailProductInfoCard
            icon={<BsBoxSeam size={23} />}
            title="Stok Tersedia"
            value={`${product.availableStock} Unit`}
          />
          <DetailProductInfoCard
            icon={<CiStar size={23} />}
            title="Rating"
            value="4.7"
          />
          <DetailProductInfoCard
            icon={<BsChatText size={23} />}
            title="Komentar"
            value={product.reviews.length}
          />
        </div>

        {/* order */}
        <div className="p-3 border border-gray-500 rounded-lg ">
          <h3 className="font-semibold text-base">Order</h3>

          <div className="flex items-center lg:items-start flex-wrap gap-5 mt-4 text-gray-500">
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Item</h4>
              <div className="flex items-center border border-gray-400 rounded-md h-auto">
                <Button
                  onClick={handleDecrementItem}
                  variant="ghost"
                  className="rounded-r-none text-black"
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <div className="px-6 border-x h-10">
                  <p className="mt-2.5 text-black text-sm">{quantity}</p>
                </div>
                <Button
                  onClick={handleIncrementItem}
                  variant="ghost"
                  className="rounded-l-none text-black"
                  disabled={quantity >= +product.availableStock}
                >
                  +
                </Button>
              </div>
            </div>

            <div>
              <h1 className="text-sm text-gray-500 mb-1">
                Pilih Tanggal Penyewaan
              </h1>
              <div className={cn('grid gap-2')}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        'max-w-[15.5rem] w-full border border-gray-500 justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y')} -{' '}
                            {format(date.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      max={product.maximumRental}
                      onSelect={handleDateSelect}
                      numberOfMonths={2}
                      fromDate={today}
                      required
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <h1 className="text-sm text-gray-500 mb-1">Durasi Sewa</h1>
              <div className="flex items-center bg-gray-200 border border-gray-200 rounded-md h-auto">
                <div className="px-3 h-10">
                  <p className="mt-2.5 text-black text-sm">{day} Hari</p>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 mt-2">
                Maksimal sewa barang ini :{' '}
                <span className="font-bold text-black">
                  {product.maximumRental} Hari
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* order */}

        {/*  */}
        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          <Button
            className="w-full py-7"
            variant="outline"
            disabled={isStockEmpty()}
          >
            Tambah ke Keranjang
          </Button>
          <Button
            className="w-full py-7"
            onClick={handleOnRent}
            disabled={isStockEmpty()}
          >
            {isStockEmpty() ? 'Stok Habis' : 'Sewa Sekarang'}
          </Button>
        </div>
      </div>
    </div>
  );
}

ProductMainContent.propTypes = {
  productId: PropTypes.number.isRequired,
};
