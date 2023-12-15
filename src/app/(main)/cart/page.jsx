'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  calculateSubtotalInCart,
  formatPrice,
  groupCartsByStore,
} from '@/utils/helperFunction';
import DirectRentPageSkeleton from '@/components/elements/skeleton/DirectRentPageSkeleton';
import useCart from '@/hooks/api/useCart';
import CartItem from './CartItem';
import { useCartOrdersStore } from '@/components/store/useCartOrdersStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import useMyProfile from '@/hooks/api/useMyProfile';

export default function Page() {
  const { data: carts, isLoading } = useCart();
  const setOrderList = useCartOrdersStore((state) => state.setOrderList);
  const router = useRouter();
  const { data: profile } = useMyProfile();
  const pathname = usePathname();
  const isProfileFilled = Boolean(profile);

  if (isLoading) return <DirectRentPageSkeleton />;

  const subTotalInCart = calculateSubtotalInCart(carts);

  const groupedCarts = groupCartsByStore(carts);

  const handleOnCartOrders = () => {
    const mappedCartOrders = groupedCarts.map((order) => ({
      userAddressId: '',
      shipping: '',
      storeId: order.items[0].product.storeId,
      products: order.items.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        rentFrom: item.rentFrom,
        rentTo: item.rentTo,
      })),
      transaction: {
        paymentMethod: '',
      },
    }));

    setOrderList(mappedCartOrders);

    router.push('/checkout?step=address&cartOrders=true');
  };

  return (
    <main className="container px-4 lg:px-10 py-4 min-h-[90vh]">
      <Breadcrumbs
        items={[
          {
            name: 'Produk',
            link: '/products',
          },
          {
            name: 'Keranjang',
            link: '#',
          },
        ]}
      />
      <div className="space-y-10 mb-7">
        <h1 className="text-2xl font-semibold">Keranjang</h1>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-10 lg:flex-row ">
        <section className="flex-1">
          {!groupedCarts.length && (
            <div className="w-full text-center flex flex-col items-center justify-center min-h-[400px]">
              <MdOutlineRemoveShoppingCart className="w-24 h-24 text-gray-300" />
              <p className="text-gray-400">Keranjang Anda Masing Kosong</p>
              <Button className="w-fit mt-6">
                <Link href="/products">Lihat Barang</Link>
              </Button>
            </div>
          )}
          <div className="space-y-4">
            {groupedCarts.map((groupCart) => (
              <div
                key={groupCart.store}
                className="border border-gray-300 p-3 rounded-lg"
              >
                <div className="flex items-center gap-2 font-bold mb-4">
                  <Image
                    src={groupCart.items[0].product.store.profilePicture}
                    alt={groupCart.store}
                    width={25}
                    height={25}
                    className="rounded-full overflow-hidden object-cover"
                  />
                  <h2>{groupCart.store}</h2>
                </div>

                <div className="space-y-2 divide-y">
                  {groupCart.items.map((cart) => (
                    <CartItem cart={cart} key={cart.id} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Order Summary */}
        <section className="lg:max-w-[400px]">
          <div className="border-2 border-gray-200 px-4 py-14 rounded-xl w-full lg:px-6">
            <h2 className="text-xl font-bold mb-10">Ringkasan Order</h2>

            <div className="space-y-4 mb-12">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>Rp{formatPrice(subTotalInCart)}</span>
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
                <span>Rp{formatPrice(subTotalInCart)}</span>
              </div>
            </div>

            {!isProfileFilled && (
              <div className="p-3 rounded-md bg-red-50 text-red-500 text-[11px] md:text-sm flex justify-end items-start md:items-center gap-2">
                <span>
                  <BsFillInfoCircleFill />
                </span>
                <p>
                  Silahkan lengkapi profile Anda untuk bisa menyewa barang{' '}
                  <Link
                    href={`/dashboard?callback=${pathname}`}
                    className="font-bold underline"
                  >
                    Lengkapi profile disini
                  </Link>
                </p>
              </div>
            )}

            <div className="mt-4">
              <Button
                className="w-full py-6"
                disabled={carts.length === 0 || !isProfileFilled}
                onClick={handleOnCartOrders}
              >
                Checkout
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
