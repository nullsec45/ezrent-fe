import {
  statusTransactionNameMap,
  statusTransactionStyleMap,
} from '@/app/(main)/store/dashboard/transactions/TransactionMain';
import TransactionDetailModal from '@/components/elements/modal/TransactionDetailModal';
import { Button } from '@/components/ui/button';
import useApproveTransactionsMutation from '@/hooks/api/useApproveTransactionsMutation';
import useMyStore from '@/hooks/api/useMyStore';
import useRejectTransactionsMutation from '@/hooks/api/useRejectTransactionsMutation';
import {
  formatISODateToLocalDate,
  formatISODateToLocalDateTime,
  formatPrice,
} from '@/utils/helperFunction';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { toast } from '@/components/ui/use-toast';

export default function TransactionCard({ store, order, isUserDashboard }) {
  const { status, paymentMethod, id: transactionId } = order.transaction;

  const { mutate } = useMyStore();

  const { trigger: triggerApprove } =
    useApproveTransactionsMutation(transactionId);
  const { trigger: triggerReject } =
    useRejectTransactionsMutation(transactionId);

  const handleAcceptTransaction = async () => {
    await triggerApprove();
    mutate();
    toast({
      title: 'Pembayaran Berhasil Diterima',
      description: 'Pergi ke Menu DITERIMA untuk melihat detail',
    });
  };

  const handleRejectTransaction = async () => {
    await triggerReject();
    mutate();
    toast({
      title: 'Pembayaran Berhasil Ditolak',
      description: 'Pergi ke Menu DITOLAK untuk melihat detail',
    });
  };

  return (
    <div className="border border-gray-300 rounded-md p-3">
      <div className="sm:space-x-5">
        <span className="font-bold text-base block sm:inline-block">
          EZRent Invoice
        </span>
        <span
          className={twMerge(
            'rounded-md font-normal text-xs px-3 py-1 text-white',
            statusTransactionStyleMap[status]
          )}
        >
          {statusTransactionNameMap[status]}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-end gap-3">
        <div className="flex-1 w-full space-y-1 bg-gray-100 p-2 rounded-md mt-3 text-xs sm:text-sm">
          <p>
            <span className="font-medium">ID Order: </span>
            <span className="font-bold">{order.id}</span>
          </p>

          <p>
            <span className="font-medium">Total: </span>
            <span className="font-bold">
              Rp{formatPrice(order.totalAmount)}
            </span>
          </p>

          <p>
            <span className="font-medium">Tanggal Transaksi: </span>
            <span className="font-bold">
              {formatISODateToLocalDateTime(order.createdAt)}
            </span>
          </p>

          <p>
            <span className="font-medium">Metode Pembayaran: </span>
            <span className="font-bold">
              <span>{paymentMethod} </span>
              {paymentMethod === 'TRANSFER' && (
                <span>{store.bank.toUpperCase()}</span>
              )}
            </span>
          </p>
        </div>

        <div className="basis-2/12 flex flex-col gap-5 items-end">
          <div>
            <Image
              src={`/bank/${store.bank}.svg`}
              alt={store.bank}
              width={100}
              height={100}
            />
          </div>

          {isUserDashboard ? (
            <div className="flex md:flex-col gap-3">
              <TransactionDetailModal order={order} store={store} />

              {status === 'UNPAID' && (
                <div className="flex gap-3">
                  <Button>
                    <Link href={`/checkout/${order.id}`} className="px-4">
                      Bayar
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex md:flex-col gap-3">
              <TransactionDetailModal order={order} store={store} />

              {status === 'AWATING_CONFIRMATION' && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleRejectTransaction}
                    className="bg-red-100 text-red-800 font-semibold hover:bg-red-200"
                  >
                    Tolak
                  </Button>
                  <Button
                    onClick={handleAcceptTransaction}
                    className="bg-emerald-100 text-emerald-800 font-semibold hover:bg-emerald-200"
                  >
                    Terima
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
