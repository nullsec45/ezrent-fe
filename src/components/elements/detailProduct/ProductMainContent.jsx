'use client';

import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';
import { IoBagCheckOutline } from 'react-icons/io5';
import { PiMapPinFill } from 'react-icons/pi';
import { BsBoxSeam, BsChatText } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import { differenceInDays, format, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  calculateAverageRating,
  calculateRentalDurationDay,
  calculateSingleProductPrice,
  formatPrice,
} from '@/utils/helperFunction';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import useDetailProduct from '@/hooks/api/useDetailProduct';
import DetailProductInfoCard from '@/components/elements/card/DetailProductInfoCard';
import ErrorFetchApiFallback from '@/components/elements/errors/ErrorFetchApiFallback';
import { useBoundStore } from '@/components/store/useBoundStore';
import { usePathname, useRouter } from 'next/navigation';
import ProductMainContentSkeleton from '@/components/elements/skeleton/ProductMainContentSkeleton';
import PropTypes from 'prop-types';
import { FaMapLocationDot, FaWhatsapp } from 'react-icons/fa6';
import Link from 'next/link';
import { useLoadingImageStore } from '@/store/useLoadingImage';
import { toast } from '@/components/ui/use-toast';
import useAddItemToCartMutation from '@/hooks/api/useAddItemToCartMutation';
import useCart from '@/hooks/api/useCart';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { api } from '@/utils/axios';
import useMyProfile from '@/hooks/api/useMyProfile';

export default function ProductMainContent({ productId }) {
  const { data: product, isLoading, error } = useDetailProduct(productId);
  const { loadingImage, removeLoadingImage } = useLoadingImageStore();
  const { data: carts, mutate: mutateCart } = useCart();
  const setOrderProduct = useBoundStore((state) => state.setOrderProduct);
  const router = useRouter();
  const pathname = usePathname();
  const { trigger: triggerAddItemToCart } = useAddItemToCartMutation();
  const { data: profile, error: errorMyProfile } = useMyProfile();
  const isProfileFilled = Boolean(profile);
  const isUserLogin = !Boolean(errorMyProfile);

  const today = startOfDay(new Date());
  const [date, setDate] = useState({
    from: today,
    to: today,
  });

  const [quantity, setQuantity] = useState(1);
  const [day, setDay] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!product) return;
    setTotalPrice(calculateSingleProductPrice(product.price, quantity, day));
  }, [product, day, quantity, setTotalPrice]);

  if (isLoading) return <ProductMainContentSkeleton />;

  if (error) return <ErrorFetchApiFallback />;

  const isStockEmpty = () => product.availableStock < 1;

  const updateDayCounter = (range) => {
    if (range?.from && range?.to) {
      const dayFrom = new Date(range?.from);
      const dayTo = new Date(range?.to);

      const rentalDurationInDay = calculateRentalDurationDay(dayFrom, dayTo);
      setDay(rentalDurationInDay);
      return;
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
      storeId: product.storeId,
      quantity,
      rentPeriod: {
        from: date?.from,
        to: date?.to,
      },
      price: product.price,
      subTotal: totalPrice,
    });

    router.push('/direct-rent');
  };

  const handleOnAddCart = async () => {
    if (!isUserLogin) return router.push(`/auth?callback=${pathname}`);

    const cartItem = carts.find((cart) => cart.productId === productId);

    try {
      // jika product item sudah ada didalam cart, maka hanya update quantity dan rentPeriod saja
      if (cartItem) {
        await api.patch(`/product-carts/${cartItem.id}`, {
          productId: cartItem.productId,
          quantity: cartItem.quantity + quantity,
          rentFrom: date?.from,
          rentTo: date?.to,
        });

        mutateCart();
      } else {
        // jika product item belum ada didalam cart, maka tambahkan baru
        await triggerAddItemToCart({
          productId,
          quantity,
          rentFrom: date?.from,
          rentTo: date?.to,
        });

        mutateCart();
      }

      toast({
        title: 'Berhasil di tambahkan ke Keranjang',
        description: 'Pergi ke Menu Keranjang untuk melihat barang Anda',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Gagal menambahkan barang ke keranjang',
      });
    }
  };

  return (
    <div className="my-12 flex flex-col lg:flex-row h-full max-h-fit items-center gap-7">
      <div className="w-full lg:max-w-lg h-[27rem]">
        <Image
          src={product.productPictures[0]?.url}
          alt={product.name}
          width={500}
          height={500}
          quality={100}
          loading="lazy"
          className={`w-full h-full object-contain ${
            loadingImage ? 'blur-xl' : 'blur-0'
          }`}
          onLoadingComplete={() => removeLoadingImage()}
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <Avatar className="w-7 h-7">
              {product.store.profilePicture ? (
                <>
                  <AvatarImage src={product.store.profilePicture} />
                  <AvatarFallback>{product.store.name}</AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{product.store.name}</AvatarFallback>
                </>
              )}
            </Avatar>
            <p className="font-semibold text-sm capitalize">
              {product.store.name}
            </p>
          </div>

          <Link
            target="_blank"
            href={`https://wa.me/${
              product.store.phoneNumber
            }/?text=${encodeURIComponent(
              `Hallo min\nSaya mau beli ${product.name}`
            )}`}
            className="flex items-center gap-1"
          >
            <FaWhatsapp color="green" size={20} />
            <p className="text-green-700 text-xs font-medium">Hubungi Toko</p>
          </Link>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center gap-2">
            <PiMapPinFill size={27} />
            <div>
              <p className="font-medium text-xs">
                {`${product.store?.storeAddress?.province}, ${product.store?.storeAddress?.city}, ${product.store?.storeAddress?.district}`}
              </p>
              <p className="font-semibold text-sm">
                {product.store?.storeAddress?.fullAddress}
              </p>
            </div>
          </div>

          <Link
            target="_blank"
            href={`https://www.google.com/maps?q=${product.store?.storeAddress?.latitude},${product.store?.storeAddress?.longitude}`}
            className="flex gap-2 items-center"
          >
            <FaMapLocationDot className="w-5 h-5" />
            <span className="text-dark-700 text-xs font-medium">
              Lihat Lokasi
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 my-2 gap-5 w-full">
          <DetailProductInfoCard
            icon={<IoBagCheckOutline size={23} />}
            title="Tersewa"
            value={`${product.orders.length}x`}
          />
          <DetailProductInfoCard
            icon={<BsBoxSeam size={23} />}
            title="Stok Tersedia"
            value={`${product.availableStock} Unit`}
          />
          <DetailProductInfoCard
            icon={<CiStar size={23} />}
            title="Rating"
            value={
              product.reviews.length === 0
                ? 0
                : calculateAverageRating(product.reviews)
            }
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

          <div className="flex gap-5 justify-between mt-7 border-t border-gray-300 py-4">
            <div className="md:flex md:gap-3 md:items-center">
              <p className="font-bold">Total</p>
              <p className="text-[11px] md:text-sm text-gray-600 ">
                ( Rp{formatPrice(product?.price)} x {quantity} Barang x {day}{' '}
                Hari )
              </p>
            </div>
            <p className="font-bold">Rp{formatPrice(totalPrice)}</p>
          </div>
        </div>
        {/* order */}

        {!isProfileFilled && (
          <div className="p-3 rounded-md bg-red-50 text-red-500 text-[11px] md:text-sm flex justify-end items-start md:items-center gap-2">
            <span>
              <BsFillInfoCircleFill />
            </span>
            <p>
              Silahkan lengkapi profile Anda untuk bisa menyewa barang{' '}
              <Link href="/dashboard" className="font-bold underline">
                Lengkapi profile disini
              </Link>
            </p>
          </div>
        )}

        {/*  */}
        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          <Button
            className="w-full py-7"
            variant="outline"
            disabled={isStockEmpty()}
            onClick={handleOnAddCart}
          >
            Tambah ke Keranjang
          </Button>
          <Button
            className="w-full py-7"
            onClick={handleOnRent}
            disabled={isStockEmpty() || !isProfileFilled}
          >
            {isStockEmpty() ? 'Stok Habis' : 'Sewa Sekarang'}
          </Button>
        </div>
      </div>
    </div>
  );
}

ProductMainContent.propTypes = {
  productId: PropTypes.string.isRequired,
};
