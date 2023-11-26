import { Button } from '@/components/ui/button';
import ProductCheckoutCard from '@/components/elements/card/ProductCheckoutCard';
import { Badge } from '@/components/ui/badge';
import { SingleImageDropzone } from '@/components/elements/input/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

export default function PaymentSection({ prevPage, nextPage }) {
  const [file, setFile] = useState();
  const { edgestore } = useEdgeStore();

  return (
    <main className="grid lg:grid-cols-2 gap-5">
      <div className="border border-gray-200 rounded-md p-4 h-fit">
        <h1 className="text-xl font-semibold mb-8">Total</h1>

        <div className="space-y-4">
          <ProductCheckoutCard
            name="Playstation 5"
            price="300.000"
            pcs={4}
            rent={5}
            subTotal="4.000.000"
          />
          <ProductCheckoutCard
            name="Playstation 5"
            price="300.000"
            pcs={4}
            rent={5}
            subTotal="4.000.000"
          />
          <ProductCheckoutCard
            name="Playstation 5"
            price="300.000"
            pcs={4}
            rent={5}
            subTotal="4.000.000"
          />
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-gray-600 text-sm">Atas Nama</h2>
            <p>Dimas Fauzan</p>
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Alamat</h2>
            <p>Jl. Handayani No. 43 Labuhbaru Barat, Payung Sekaki</p>
          </div>
          <div className="flex justify-between">
            <h2 className="font-medium">Total</h2>
            <div className="font-bold">
              <span>Rp</span>
              <span>12.000.000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-md p-4 h-fit">
        <h1 className="text-xl font-semibold mb-8">Pembayaran</h1>

        <div>
          <h2 className="mb-1 font-medium">Mandiri</h2>

          <div className="mb-5">
            <p>a.n Irfan Saputra Naution</p>
            <p>
              <span>No. Rek: </span>
              <span className="font-bold">21040113612478</span>
            </p>
          </div>

          <SingleImageDropzone
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
            height={320}
            className="w-full h-96"
          />
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
            Sewa
          </Button>
        </div>
      </div>
    </main>
  );
}
