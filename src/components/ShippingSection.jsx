import React, { useState } from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import ShippingCard from '@/components/elements/card/ShippingCard';
import { Button } from '@/components/ui/button';
import { useBoundStore } from './store/useBoundStore';

export default function ShippingSection({ nextPage, prevPage }) {
  const setOrderShipping = useBoundStore((state) => state.setOrderShipping);
  const [shipping, setShipping] = useState('');

  const onButtonNextStep = () => {
    setOrderShipping(shipping);
    nextPage();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-8">Metode Pengiriman</h1>

      <div>
        <RadioGroup className="space-y-4">
          <ShippingCard
            id="shipping-1"
            value="shipping-1"
            title="PICKUP"
            description="Ambil barang di toko"
            onSelected={() => setShipping('PICKUP')}
          />
          <ShippingCard
            id="shipping-2"
            value="shipping-2"
            title="GOSEND"
            description="Barang dikirim melalui layanan Gosend"
            onSelected={() => setShipping('GOSEND')}
          />
        </RadioGroup>
      </div>

      <div className="mt-16">
        <p className="text-gray-500 text-xs text-justify w-1/2 ml-auto leading-snug">
          Ini adalah halaman terakhir anda sebelum menuju pembayaran, pastikan
          alamat dan metode pengiriman sudah benar. Ketika anda memilih
          <span className="font-bold text-black">
            {' '}
            &quot;Bayar&quot;, Order anda akan dibuat
          </span>{' '}
          dan anda akan diminta segera membayar dan mengirimkan Bukti Pembayaran
        </p>
        <div className="flex gap-6 justify-center md:justify-end mt-7">
          <Button
            variant="outline"
            className="py-7 md:px-10 w-full md:w-auto"
            onClick={prevPage}
          >
            Kembali
          </Button>
          <Button
            className="py-7 md:px-14 w-full md:w-auto"
            onClick={onButtonNextStep}
          >
            Bayar
          </Button>
        </div>
      </div>
    </div>
  );
}
