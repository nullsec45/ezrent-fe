import { RadioGroup } from '@/components/ui/radio-group';
import ShippingCard from '@/components/elements/card/ShippingCard';
import { Button } from '@/components/ui/button';
import { useBoundStore } from './store/useBoundStore';
import {
  getEstimationDate,
  mapOrderObjectToBeSendToAPI,
} from '@/utils/helperFunction';
import PaymentMethodCard from '@/components/elements/card/PaymentMethodCard';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';
import { makeOrder } from '@/utils/api';
import { useTransactionStore } from './store/useTransactionStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartOrdersStore } from './store/useCartOrdersStore';
import useEmptyCartItemMutation from '@/hooks/api/useEmptyCartItemMutation';

export default function ShippingSection({ nextPage, prevPage }) {
  const order = useBoundStore((state) => state.order);
  const setOrderShipping = useBoundStore((state) => state.setOrderShipping);
  const setOrderPaymentMethod = useBoundStore(
    (state) => state.setOrderPaymentMethod
  );
  const setCurrentTransaction = useTransactionStore(
    (state) => state.setCurrentTransaction
  );

  // Untuk alur Cart Orders
  const searchParams = useSearchParams();
  const isCartOrders = searchParams.get('cartOrders') === 'true' ? true : false;
  const setPaymentMethodCartOrders = useCartOrdersStore(
    (state) => state.setPaymentMethodCartOrders
  );
  const setShippingMethodCartOrders = useCartOrdersStore(
    (state) => state.setShippingMethodCartOrders
  );
  const cartOrders = useCartOrdersStore((state) => state.cartOrders);
  const { trigger: triggerEmptyCart } = useEmptyCartItemMutation();
  const router = useRouter();

  const selectedShipping = isCartOrders
    ? cartOrders[0]?.shipping
    : order?.shipping;

  const selectedPaymentMethod = isCartOrders
    ? cartOrders[0]?.transaction.paymentMethod
    : order?.transaction.paymentMethod;

  const onButtonNextStep = async () => {
    if (!selectedShipping || !selectedPaymentMethod) {
      return toast({
        variant: 'destructive',
        title: 'Anda belum melengkapi metodenya',
        description: 'Pilih Metode Pengiriman & Pembayaran sebelum melanjutkan',
      });
    }

    try {
      // Jika Order dari Cart
      if (isCartOrders) {
        for (const order of cartOrders) {
          await makeOrder(order);
        }

        toast({
          title: 'Order Sewa Berhasil Dibuat',
          description:
            'Segera selesaikan pembayaran dengan Mengirim Bukti Pembayaran melalui Menu Menunggu Pembayaran di Dashboard Anda',
          action: <CheckCircle />,
        });

        localStorage.removeItem('cart-orders');
        await triggerEmptyCart();
        router.push('/dashboard/history-transactions?status=unpaid');
      } else {
        // Jika Order secara langsung (Direct-Rent)

        const mappedOrderObject = mapOrderObjectToBeSendToAPI(order);
        const response = await makeOrder(mappedOrderObject);

        if (response?.status === 201) {
          const transactionId = response?.data?.data?.transaction?.id;
          setCurrentTransaction(transactionId);
          toast({
            title: 'Order Sewa Berhasil Dibuat',
            description:
              'Segera Selesaikan Pembayaran dengan Mengirim Bukti Pembayaran',
            action: <CheckCircle />,
          });

          nextPage();
        }
      }
    } catch (error) {
      toast({
        title: 'Gagal membuat order',
        description: error?.message,
        action: <CheckCircle />,
      });
    }
  };

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-xl font-semibold mb-8">Metode Pengiriman</h1>

        <div>
          <RadioGroup
            className="space-y-4"
            defaultValue={selectedShipping.toLowerCase()}
          >
            <ShippingCard
              id="pickup"
              value="pickup"
              title="PICKUP"
              description="Ambil barang di toko"
              estimationLabel="Ambil barang anda pada"
              estimationDate={getEstimationDate(1)}
              onSelected={() => {
                isCartOrders
                  ? setShippingMethodCartOrders('PICKUP')
                  : setOrderShipping('PICKUP');
              }}
            />
            <ShippingCard
              id="gosend"
              value="gosend"
              title="GOSEND"
              estimationLabel="Estimasi barang sampai"
              description="Barang dikirim melalui layanan Gosend"
              estimationDate={getEstimationDate(2)}
              onSelected={() => {
                isCartOrders
                  ? setShippingMethodCartOrders('GOSEND')
                  : setOrderShipping('GOSEND');
              }}
            />
          </RadioGroup>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold mb-8">Metode Pembayaran</h1>

        <div>
          <RadioGroup
            className="space-y-4"
            defaultValue={selectedPaymentMethod.toLowerCase()}
          >
            <PaymentMethodCard
              id="transfer"
              value="transfer"
              title="Transfer BANK"
              description="Bayar dengan cara Transfer ke Nomor Rekening yang tertera di halaman selanjutnya"
              onSelected={() => {
                isCartOrders
                  ? setPaymentMethodCartOrders('TRANSFER')
                  : setOrderPaymentMethod('TRANSFER');
              }}
            />
            {/* <PaymentMethodCard
              id="cod"
              value="cod"
              title="COD"
              description="Bayar secara langsung ketika anda PICKUP barang di toko nya, atau ketika barang telah sampai dikirim melalui GOSEND"
              onSelected={() => {
                isCartOrders
                  ? setPaymentMethodCartOrders('COD')
                  : setOrderPaymentMethod('COD');
              }}
            /> */}
          </RadioGroup>
        </div>
      </div>

      <div className="mt-16">
        <p className="text-gray-500 text-xs text-justify md:w-1/2 ml-auto leading-snug">
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
