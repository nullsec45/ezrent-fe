'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useBoundStore } from '@/components/store/useBoundStore';
import useDetailProduct from '@/hooks/api/useDetailProduct';
import { Badge } from '../ui/badge';
import {
  calculateRentalDurationDay,
  formatPrice,
} from '@/utils/helperFunction';
import DirectRentPageSkeleton from '../elements/skeleton/DirectRentPageSkeleton';

function DirectRent() {
  const order = useBoundStore((state) => state.order);
  const { data: product, isLoading } = useDetailProduct(order?.products[0]?.id);

  if (isLoading || !product) return <DirectRentPageSkeleton />;

  const dayFrom = new Date(order.products[0].rentPeriod.from);
  const dayTo = new Date(order.products[0].rentPeriod.to);
  const rentalDurationInDay = calculateRentalDurationDay(dayFrom, dayTo);

  return (
    <main className="container px-4 lg:px-10 py-16 flex flex-col gap-10 lg:flex-row">
      {/* Product List */}
      <section className="flex-1">
        <div className="space-y-10">
          <h1 className="text-2xl font-semibold">Sewa Langsung</h1>

          <div className="flex gap-5 py-4 px-5 bg-gray-100 rounded-xl">
            <div className="w-20 shrink-0 aspect-square rounded-lg relative">
              <Image
                src={product.productPictures[0]?.url}
                alt={product.name}
                fill
                objectFit="contain"
              />
            </div>

            <div className="w-full flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="lg:flex-grow">
                <p className="text-base">{product.name}</p>
                <p className="font-bold text-sm">
                  Rp{formatPrice(product.price)}{' '}
                  <span className="text-gray-600 font-normal"> / Hari</span>
                </p>
                <div className="space-x-2 mt-3">
                  <Badge className="rounded-md">
                    {order.products[0].quantity} Barang
                  </Badge>
                  <Badge className="rounded-md">
                    {rentalDurationInDay} Hari
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5">
                <div className="text-lg font-medium">
                  Rp{formatPrice(order.products[0].subTotal)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Summary */}
      <section className="lg:min-w-[27rem]">
        <div className="border-2 border-gray-200 px-4 py-14 rounded-xl w-full lg:px-10">
          <h2 className="text-xl font-bold mb-10">Ringkasan Order</h2>

          <div className="space-y-4">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>Rp{formatPrice(order.products[0].subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Diskon</span>
              <span>Rp0</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Pengiriman</span>
              <span>Rp0</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Rp{formatPrice(order.products[0].subTotal)}</span>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/checkout?step=address">
              <Button className="w-full py-6">Checkout</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DirectRent;
