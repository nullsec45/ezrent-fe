import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import ShippingCard from '@/components/elements/card/ShippingCard';
import { Button } from '@/components/ui/button';

export default function ShippingSection({ nextPage, prevPage }) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-8">Metode Pengiriman</h1>

      <div>
        <RadioGroup defaultValue="shipping-1" className="space-y-4">
          <ShippingCard
            id="shipping-1"
            value="shipping-1"
            title="PICKUP"
            description="Ambil barang di toko"
          />
          <ShippingCard
            id="shipping-2"
            value="shipping-2"
            title="GOSEND"
            description="Barang dikirim melalui layanan Gosend"
          />
        </RadioGroup>
      </div>

      <div className="flex gap-6 justify-center md:justify-end mt-16">
        <Button
          variant="outline"
          className="py-7 md:px-10 w-full md:w-auto"
          onClick={prevPage}
        >
          Kembali
        </Button>
        <Button className="py-7 md:px-10 w-full md:w-auto" onClick={nextPage}>
          Pembayaran
        </Button>
      </div>
    </div>
  );
}
