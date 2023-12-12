import { Button } from '@/components/ui/button';
import ProductCheckoutCard from '@/components/elements/card/ProductCheckoutCard';
import { SingleImageDropzone } from '@/components/elements/input/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { useBoundStore } from '@/components/store/useBoundStore';
import useDetailAddress from '@/hooks/api/useDetailAddress';
import { calculateTotalPriceOrder, formatPrice } from '@/utils/helperFunction';
import PaymentSectionSkeleton from '@/components/elements/skeleton/PaymentSectionSkeleton';
import useDetailStore from '@/hooks/api/useDetailStore';
import { Badge } from '@/components/ui/badge';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';
import { sendPaymentProof } from '@/utils/api';
import { useTransactionStore } from '@/components/store/useTransactionStore';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function PaymentSection() {
  const order = useBoundStore((state) => state.order);
  const currentTransaction = useTransactionStore(
    (state) => state.currentTransaction
  );
  const { data: address, isLoadingAddress } = useDetailAddress(
    order.userAddressId
  );
  const { data: store, isLoadingStore } = useDetailStore(order.storeId);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState();
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const totalPrice = calculateTotalPriceOrder(order.products);

  if (isLoadingAddress || isLoadingStore || !store || !address)
    return <PaymentSectionSkeleton />;

  const handleUploadTransactionProof = async () => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setUploadProgress(progress);
          },
        });

        const response = await sendPaymentProof(currentTransaction, {
          paymentProof: res?.url,
          transactionAmount: totalPrice,
        });

        if (response.status === 200) {
          toast({
            title: 'Bukti Pembayaran Berhasil di Upload',
            description:
              'Pergi ke Menu Daftar Transaksi di Dashboard untuk Melihat Progress Order Sewa Anda',
          });

          localStorage.removeItem('product-rent');
          localStorage.removeItem('current-transaction');
          router.push('/dashboard/transaction-list');
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error?.message,
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Tolong pilih gambar terlebih dahulu',
      });
    }
  };

  return (
    <main className="grid lg:grid-cols-2 gap-5">
      <div className="border border-gray-200 rounded-md p-4 h-fit">
        <h1 className="text-xl font-semibold mb-8">Total</h1>

        <div className="space-y-4">
          {order.products.map((product) => (
            <ProductCheckoutCard
              key={product.id}
              productId={product.id}
              quantity={product.quantity}
              rentPeriod={product.rentPeriod}
              price={product.price}
              subTotal={product.subTotal}
            />
          ))}
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-gray-600 text-sm">Atas Nama</h2>
            <p>{address?.recipientName}</p>
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Alamat</h2>
            <p>{address?.fullAddress}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="font-medium">Total</h2>
            <div className="font-bold">
              <span>Rp</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-md p-4 h-fit">
        <h1 className="text-xl font-semibold mb-8">Pembayaran</h1>
        <h2>
          Metode Pembayaran:{' '}
          <span className="font-bold">
            {' '}
            {order?.transaction?.paymentMethod}
          </span>
        </h2>

        <div>
          {order?.transaction?.paymentMethod === 'TRANSFER' && (
            <>
              <p>
                <span>Bank:</span>
                <span className="font-bold"> {store.bank.toUpperCase()}</span>
              </p>
              <p>
                a.n <span className="font-bold">{store.accountHolder}</span>
              </p>
              <p className="mb-3">
                <span>No. Rek: </span>
                <span className="font-bold">{store.accountNumber}</span>
              </p>
            </>
          )}

          <div className="mt-3 mb-5">
            <Badge className="py-1 rounded-md bg-green-200 text-green-800">
              Order Sewa Anda Berhasil
            </Badge>

            <div className="mt-1 bg-gray-100 text-sm py-4 px-3.5 rounded-lg">
              <BsFillInfoCircleFill className="w-5 h-5 inline-block mb-3 text-gray-400" />

              {/* Informasi cara pembayaran ketika TRANSFER */}
              {order?.transaction?.paymentMethod === 'TRANSFER' && (
                <p>
                  Silahkan segera{' '}
                  <span className="font-bold">menyelesaikan pembayaran</span>{' '}
                  dengan{' '}
                  <span className="font-bold">transfer ke nomor rekening</span>{' '}
                  yang tertera diatas, selanjutnya{' '}
                  <span className="font-bold">
                    upload bukti transfer pembayaran
                  </span>{' '}
                  Anda dibawah ini
                </p>
              )}

              {/* Informasi cara pembayaran ketika COD */}
              {order?.transaction?.paymentMethod === 'COD' && (
                <>
                  <p>
                    Silahkan{' '}
                    <span className="font-bold">selesaikan pembayaran</span>{' '}
                    dengan{' '}
                    <span className="font-bold">
                      membayar langsung ke pemilik toko jika anda memilih PICKUP
                      sebagai metode pengiriman{' '}
                    </span>
                    atau{' '}
                    <span className="font-bold">
                      membayar ke kurir ojek jika anda anda memilih GOSEND
                      sebagai metode pengiriman,{' '}
                    </span>
                    selanjutnya{' '}
                    <span className="font-bold">upload bukti pembayaran</span>{' '}
                    Anda dibawah ini.
                  </p>
                  <p className="mt-3">
                    Contoh bukti pembayaran saat COD:{' '}
                    <span className="font-bold">
                      foto selfie dengan pemilik toko atau kurir ojek saat
                      penyerahan uang
                    </span>{' '}
                  </p>
                </>
              )}
            </div>
            <div className="mt-1 bg-gray-100 text-sm py-4 px-3.5 rounded-lg">
              Jika Anda tidak sengaja{' '}
              <span className="font-bold">menutup halaman ini</span>, Anda bisa
              mengakses nya lagi di{' '}
              <span className="font-bold">
                {' '}
                menu Daftar Transaksi di Dashboard Anda
              </span>
            </div>
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

        <div
          class={twMerge(
            'w-full bg-gray-200 rounded-full opacity-0',
            uploadProgress > 0 && 'opacity-100'
          )}
        >
          <div
            class={twMerge(
              'bg-black text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[0%]',
              uploadProgress > 0 && `w-[${uploadProgress}%]`
            )}
          >
            {uploadProgress}%
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs text-gray-600">
            Setelah Anda{' '}
            <span className="font-bold">upload bukti pembayaran,</span> silahkan
            tunggu{' '}
            <span className="font-bold">
              bukti pembayaran Anda dikonfirmasi
            </span>{' '}
            oleh pemilik toko, jika telah terkonfimasi{' '}
            <span className="font-bold">barang anda akan diproses</span>
            sesuai metode pengiriman yang Anda pilih
          </p>
        </div>

        <div className="flex gap-6 justify-center md:justify-end mt-7">
          <Button
            className="py-7 md:px-10 w-full md:w-auto"
            onClick={handleUploadTransactionProof}
          >
            Upload Bukti Pembayaran
          </Button>
        </div>
      </div>
    </main>
  );
}
