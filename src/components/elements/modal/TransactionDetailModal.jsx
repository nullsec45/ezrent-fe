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
import {
  calculateRentalDurationDay,
  calculateTotalPriceOrder,
  formatISODateToLocalDateTime,
  formatPrice,
} from '@/utils/helperFunction';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { SimpleDetailCard } from '../card/SimpleDetailCart';

export default function TransactionDetailModal({ order, store }) {
  const { products, transaction } = order;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="text-xs font-bold">
          Lihat Rincian
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[99999]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            Rincian Pembayaran
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start pt-4 text-black space-y-2 overflow-y-auto max-h-[700px]">
            <div className="border border-gray-200 rounded-md p-2">
              <h2 className="font-bold mb-2">Info Transaksi Pembayaran</h2>
              <div className="space-y-1">
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
                    <span>{transaction.paymentMethod} </span>
                    {transaction.paymentMethod === 'TRANSFER' && (
                      <span>{store.bank.toUpperCase()}</span>
                    )}
                  </span>
                </p>
                {transaction.paymentMethod === 'TRANSFER' && (
                  <>
                    <SimpleDetailCard
                      title="No. Rekening"
                      value={store.accountNumber}
                    />
                    <SimpleDetailCard
                      title="Atas Nama"
                      value={store.accountHolder}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="border border-gray-200 rounded-md p-2">
              <h2 className="font-bold mb-2">Detail Produk</h2>
              <div className="space-y-1">
                {products.map((product, index) => (
                  <div key={product.id + index}>
                    <p className="text-xs font-semibold">
                      {product.product.name}
                    </p>
                    <p className="text-[10px] text-gray-600">{`Rp${formatPrice(
                      product.price
                    )} x ${product.quantity}Brg x ${calculateRentalDurationDay(
                      new Date(product.rentFrom),
                      new Date(product.rentTo)
                    )}Hari`}</p>
                  </div>
                ))}

                <div>
                  <p className="text-[11px]">Total Bayar</p>
                  <p className="text-xs font-bold">
                    Rp{formatPrice(calculateTotalPriceOrder(products))}
                  </p>
                </div>
              </div>
            </div>

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
