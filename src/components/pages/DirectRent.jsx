'use client';

import { useState } from 'react';
import Image from 'next/image';
import Counter from '@/components/elements/input/Counter';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function DirectRent() {
  const [productCounter, setProductCounter] = useState(1);

  const incrementCounter = () => setProductCounter(productCounter + 1);

  const decrementCounter = () => {
    if (productCounter > 1) {
      setProductCounter(productCounter - 1);
    }
  };

  const inputCounterChange = (e) => {
    const value = e?.target.value.replace(/[^0-9]/g, '');
    if (value === 0) return;
    setProductCounter(+value);
  };

  return (
    <main className="container px-4 lg:px-10 py-16 flex flex-col gap-10 lg:flex-row">
      {/* Product List */}
      <section className="flex-1">
        <div className="space-y-10">
          <h1 className="text-2xl font-semibold">Sewa Langsung</h1>

          <div className="flex gap-5">
            <div className="w-20 shrink-0 aspect-square rounded-lg relative">
              <Image
                src={'/iphone.png'}
                alt="produk photo"
                fill
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="lg:w-60">
                <p className="font-medium">
                  Apple iPhone 14 Pro Max 128Gb Deep Purple
                </p>
              </div>
              <div className="flex items-center justify-between lg:w-full">
                <Counter
                  value={productCounter}
                  onIncement={incrementCounter}
                  onDecrement={decrementCounter}
                  onInputChange={inputCounterChange}
                />
                <div className="text-lg font-medium">Rp200.000</div>
                <Button variant="ghost" className="group">
                  <RiDeleteBin5Line className="w-4 h-4 group-hover:text-red-600 transition-all duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Summary */}
      <section className="lg:min-w-[30rem]">
        <div className="border-2 border-gray-200 px-4 py-14 rounded-xl w-full lg:px-16">
          <h2 className="text-xl font-bold mb-10">Ringkasan Order</h2>

          <div className="space-y-4">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>Rp200.000</span>
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
              <span>Rp200.000</span>
            </div>
          </div>

          <div className="mt-12">
            <Button className="w-full py-6">
              <Link href="/checkout?step=address">Checkout</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DirectRent;
