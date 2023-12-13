import {
  statusTransactionNameMap,
  statusTransactionStyleMap,
} from '@/app/(main)/store/dashboard/transactions/TransactionMain';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { formatISODateToLocalDateTime } from '@/utils/helperFunction';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export default function TransactionDetailModal({ order, store }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-xs">
          Lihat Rincian
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[99999]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            Rincian Pembayaran
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start pt-4 text-black space-y-2 overflow-y-auto max-h-[700px]">
            <p className="text-sm">
              <span className="font-medium">Status Pembayaran: </span>
              <span
                className={twMerge(
                  'ml-2 rounded-md font-normal text-[10px] px-3 py-1 text-white',
                  statusTransactionStyleMap[order.transaction.status]
                )}
              >
                {statusTransactionNameMap[order.transaction.status]}
              </span>
            </p>

            <p className="text-sm">
              <span className="font-medium">Metode Pembayaran: </span>
              <span className="font-bold">
                <span>{order.transaction.paymentMethod} </span>
                {order.transaction.paymentMethod === 'TRANSFER' && (
                  <span>{store.bank.toUpperCase()}</span>
                )}
              </span>
            </p>

            <p className="text-sm">
              <span className="font-medium">No. Rekening: </span>
              <span className="font-bold">
                <span>{store.accountNumber}</span>
              </span>
            </p>

            <p className="text-sm">
              <span className="font-medium">Atas Nama: </span>
              <span className="font-bold">
                <span>{store.accountHolder}</span>
              </span>
            </p>

            <p className="text-sm pt-3">
              <span className="font-medium">Bukti Pembayaran: </span>
              {order.transaction.paymentProof && (
                <span className="font-bold">
                  ({formatISODateToLocalDateTime(order.transaction.updatedAt)})
                </span>
              )}
            </p>
            {order.transaction.paymentProof ? (
              <div className="w-full bg-gray-200 text-gray-400 rounded-xl grid place-content-center">
                <Image
                  src={order.transaction.paymentProof}
                  alt={'Bukti Pembayaran'}
                  width={300}
                  height={500}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-72 bg-gray-200 text-gray-400 rounded-xl grid place-content-center">
                Belum ada bukti pembayaran
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
