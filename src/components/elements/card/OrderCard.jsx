import {
  statusOrderNameMap,
  statusOrderStyleMap,
} from '@/app/(main)/store/dashboard/orders/OrderMain';
import OrderSteps from '@/components/elements/steps/OrderSteps';
import OrderCancelledIcon from '@/components/icons/OrderCancelledIcon';
import { twMerge } from 'tailwind-merge';
import ProductCheckoutCard from './ProductCheckoutCard';
import {
  calculateTotalPriceOrder,
  formatISODateToLocalDate,
  formatPrice,
} from '@/utils/helperFunction';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  statusTransactionNameMap,
  statusTransactionTextColorMap,
} from '@/app/(main)/dashboard/history-transactions/TransactionMain';
import PendingIcon from '@/components/icons/PendingIcon';
import OrderProcessingIcon from '@/components/icons/OrderProcessingIcon';
import OrderShippingIcon from '@/components/icons/OrderShippingIcon';
import OrderDevileredIcon from '@/components/icons/OrderDevileredIcon';
import OrderReturnedIcon from '@/components/icons/OrderReturnedIcon';
import useCancelOrderMutation from '@/hooks/api/useCancelOrderMutation';
import useOrderProcessedMutation from '@/hooks/api/useOrderProcessedMutation';
import useOrderShippedMutation from '@/hooks/api/useOrderShippedMutation';
import useOrderDeliveredMutation from '@/hooks/api/useOrderDeliveredMutation';
import useOrderReturnedMutation from '@/hooks/api/useOrderReturnedMutation';
import { useSWRConfig } from 'swr';
import { toast } from '@/components/ui/use-toast';

export default function OrderCard({ order, isUserDashboard }) {
  const { trigger: triggerCancelOrder } = useCancelOrderMutation(order.id);
  const { trigger: triggerProcessOrder } = useOrderProcessedMutation(order.id);
  const { trigger: triggerShippedOrder } = useOrderShippedMutation(order.id);
  const { trigger: triggerDeliveredOrder } = useOrderDeliveredMutation(
    order.id
  );
  const { trigger: triggerReturnOrder } = useOrderReturnedMutation(order.id);
  const { mutate } = useSWRConfig();

  const { products, transaction } = order;
  const totalPrice = calculateTotalPriceOrder(products);
  const isOrderPaymentUnpaid =
    order.status === 'PENDING' && transaction.status === 'UNPAID';
  const isOrderPaymentStillAwaiting =
    order.status === 'PENDING' && transaction.status === 'AWATING_CONFIRMATION';
  const isOrderPaymentApproved =
    order.status === 'PENDING' && transaction.status === 'APPROVED';
  const isOrderPaymentRejected =
    order.status === 'PENDING' && transaction.status === 'REJECTED';

  const handleCancelOrder = async () => {
    await triggerCancelOrder();
    mutate('/orders');
    toast({
      title: 'Order Berhasil Dibatalkan',
      description: 'Pergi ke Menu DIBATALKAN untuk melihat detail',
    });
  };

  const handleProcessOrder = async () => {
    await triggerProcessOrder();
    mutate('/users/my-store');
    toast({
      title: 'Status Order Berhasil Diubah ke DIPROSES',
      description: 'Pergi ke Menu DIPROSES untuk melihat detail',
    });
  };

  const handleShippedOrder = async () => {
    await triggerShippedOrder();
    mutate('/users/my-store');
    toast({
      title: 'Status Order Berhasil Diubah ke DIKIRIM',
      description: 'Pergi ke Menu DIKIRIM untuk melihat detail',
    });
  };

  const handleDeliveredOrder = async () => {
    await triggerDeliveredOrder();
    mutate('/orders');
    toast({
      title: 'Order Telah ditandai SAMPAI TUJUAN',
      description: 'Pergi ke Menu SAMPAI TUJUAN untuk melihat detail',
    });
  };

  const handleReturnOrder = async () => {
    await triggerReturnOrder();
    mutate('/users/my-store');
    toast({
      title: 'Status Order Berhasil Diubah ke DIKEMBALIKAN',
      description: 'Pergi ke Menu DIKEMBALIKAN untuk melihat detail',
    });
  };

  return (
    <div className="border border-gray-300 p-4 rounded-xl space-y-6">
      <div className="flex gap-3">
        <p className="font-bold">EZRent Order</p>
        <span
          className={twMerge(
            'rounded-md font-normal text-xs px-3 py-1 text-white',
            statusOrderStyleMap[order.status]
          )}
        >
          {statusOrderNameMap[order.status]}
        </span>
      </div>

      {/* STEP */}
      {/* Dekstop */}
      {order.status !== 'CANCELLED' && (
        <OrderSteps activeStep={order.status.toLowerCase()} />
      )}

      {/* Mobile */}
      {order.status !== 'CANCELLED' && (
        <div className="lg:hidden">
          <OrderStatusSmallScreen status={order.status} />
        </div>
      )}

      {order.status === 'CANCELLED' && (
        <div className="flex flex-row justify-center gap-1 items-center min-w-[7rem] p-3">
          <div className="scale-[0.65] lg:scale-100">
            <OrderCancelledIcon />
          </div>
          <span className="text-sm text-red-400 font-semibold">
            Pesanan Dibatalkan
          </span>
        </div>
      )}
      {/* STEP */}

      <div>
        {products.map((product) => (
          <ProductCheckoutCard
            key={product.productId}
            productId={product.productId}
            quantity={product.quantity}
            rentPeriod={{
              from: product.rentFrom,
              to: product.rentTo,
            }}
            price={product.price}
            subTotal={product.subTotal}
          />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:justify-between">
        <div className="text-sm">
          <p className="font-bold">
            <span className="font-medium">ID Order: </span>
            {order.id}{' '}
          </p>
          <p className="font-bold">
            <span className="font-medium">Total: </span> Rp
            {formatPrice(totalPrice)}{' '}
          </p>
          <p className="font-bold">
            <span className="font-medium">Tanggal Checkout: </span>{' '}
            {formatISODateToLocalDate(order.createdAt)}{' '}
          </p>
          <p className="font-bold">
            <span className="font-medium">Status Pembayaran: </span>{' '}
            <span className={statusTransactionTextColorMap[transaction.status]}>
              {statusTransactionNameMap[transaction.status]}
            </span>
          </p>
        </div>

        {isUserDashboard ? (
          <div className="text-end lg:max-w-xs">
            {order.status === 'SHIPPED' && (
              <Button onClick={handleDeliveredOrder}>Sudah Sampai</Button>
            )}

            {isOrderPaymentUnpaid && (
              <Button variant="outline" onClick={handleCancelOrder}>
                Batalkan
              </Button>
            )}
          </div>
        ) : (
          <div className="text-end lg:max-w-xs">
            {isOrderPaymentStillAwaiting && (
              <p className="text-[10px] lg:text-xs mb-3 text-gray-600">
                Anda belum menerima Bukti Pembayaran order ini, Terima
                Pembayaran terlebih dahulu di{' '}
                <Link
                  href="/store/dashboard/transactions"
                  className="text-black font-semibold"
                >
                  Menu Transaksi
                </Link>{' '}
                sebelum mengubah status order menjadi{' '}
                <span className="font-bold">DIPROSES</span>
              </p>
            )}

            {isOrderPaymentStillAwaiting && <Button disabled>Diproses</Button>}
            {isOrderPaymentApproved && (
              <Button onClick={handleProcessOrder}>Diproses</Button>
            )}
            {order.status === 'PROCESSING' && (
              <Button onClick={handleShippedOrder}>Dikirim</Button>
            )}
            {order.status === 'DELIVERED' && (
              <Button onClick={handleReturnOrder}>Dikembalikan</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderStatusMobile({ icon, text }) {
  return (
    <div className="flex flex-row lg:flex-col justify-center gap-1 items-center min-w-[7rem] p-3">
      <div className="scale-[0.65] lg:scale-100">{icon}</div>
      <span className="text-sm text-black font-semibold">{text}</span>
    </div>
  );
}

function OrderStatusSmallScreen({ status }) {
  if (status === 'PENDING') {
    return (
      <OrderStatusMobile
        icon={<PendingIcon color="#000" />}
        text={statusOrderNameMap[status]}
      />
    );
  }

  if (status === 'PROCESSING') {
    return (
      <OrderStatusMobile
        icon={<OrderProcessingIcon color="#000" />}
        text={statusOrderNameMap[status]}
      />
    );
  }

  if (status === 'SHIPPED') {
    return (
      <OrderStatusMobile
        icon={<OrderShippingIcon color="#000" />}
        text={statusOrderNameMap[status]}
      />
    );
  }

  if (status === 'DELIVERED') {
    return (
      <OrderStatusMobile
        icon={<OrderDevileredIcon color="#000" />}
        text={statusOrderNameMap[status]}
      />
    );
  }

  if (status === 'RETURNED') {
    return (
      <OrderStatusMobile
        icon={<OrderReturnedIcon color="#000" />}
        text={statusOrderNameMap[status]}
      />
    );
  }
}
