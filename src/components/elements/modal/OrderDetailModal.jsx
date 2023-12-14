import {
  statusOrderNameMap,
  statusOrderStyleMap,
} from '@/app/(main)/dashboard/history-orders/OrderMain';
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
import Link from 'next/link';
import { FaMapLocationDot, FaWhatsapp } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { SimpleDetailCard } from '../card/SimpleDetailCart';

export default function OrderDetailModal({ order, isUserDashboard }) {
  const store = order?.store;
  const { products, userAddress, transaction } = order;

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
            Rincian Order Sewa Barang
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-2 text-start pt-4 text-black overflow-y-auto max-h-[620px]">
            <div className="border border-gray-200 rounded-md p-2">
              <h2 className="font-bold mb-2">Status</h2>
              <div className="space-y-1">
                <SimpleDetailCard title="ID Order" value={order.id} />
                <SimpleDetailCard
                  title="Tanggal Order"
                  value={formatISODateToLocalDateTime(order.createdAt)}
                />

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
                  <span className="font-medium">Status Order: </span>
                  <span
                    className={twMerge(
                      'ml-2 rounded-md font-normal text-[10px] px-3 py-1 text-white',
                      statusOrderStyleMap[order.status]
                    )}
                  >
                    {statusOrderNameMap[order.status]}
                  </span>
                </p>
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

            <div className="border border-gray-200 rounded-md p-2">
              <h2 className="font-bold mb-2">Info Pengiriman</h2>

              <div className="space-y-1">
                <SimpleDetailCard
                  title="Metode Pengiriman"
                  value={order.shipping}
                />
                <div className="text-sm flex gap-2">
                  <span className="font-medium">Alamat: </span>
                  <div className="font-bold inline-block">
                    <p>{userAddress.recipientName}</p>
                    <p>{userAddress.phoneNumber}</p>
                    <p>
                      {`${userAddress.fullAddress}, ${userAddress.subDistrict}, ${userAddress.district}, ${userAddress.city}, ${userAddress.province}, ${userAddress.postalCode}`}
                    </p>
                  </div>
                </div>

                {!isUserDashboard && (
                  <Link
                    target="_blank"
                    href={`https://wa.me/${
                      userAddress.phoneNumber
                    }/?text=${encodeURIComponent(
                      `Hallo, Order Sewa anda dengan ID Order: ${order.id} akan segera dikirim ke alamat anda`
                    )}`}
                    className="inline-flex items-center gap-1"
                  >
                    <FaWhatsapp color="green" size={20} />
                    <p className="text-green-700 text-xs font-medium hidden sm:block">
                      Hubungi Pelanggan
                    </p>
                  </Link>
                )}
              </div>
            </div>

            {isUserDashboard && (
              <div className="border border-gray-200 rounded-md p-2">
                <h2 className="font-bold mb-2">Info Toko</h2>
                <div className="space-y-1">
                  <SimpleDetailCard title="Nama Toko" value={store.name} />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Nomor Tel.: </span>
                      <span className="font-bold">{store.phoneNumber}</span>
                      <Link
                        target="_blank"
                        href={`https://wa.me/${
                          store.phoneNumber
                        }/?text=${encodeURIComponent(
                          `Hallo min\nSaya mau menanyakan order saya dengan ID Order: ${order.id}`
                        )}`}
                        className="inline-flex ml-5 items-center gap-1"
                      >
                        <FaWhatsapp color="green" size={20} />
                        <p className="text-green-700 text-xs font-medium hidden sm:block">
                          Hubungi Toko
                        </p>
                      </Link>
                    </p>
                  </div>
                  <div className="text-sm flex gap-2">
                    <span className="font-medium min-w-max">Alamat Toko: </span>
                    <div className="font-bold inline-block">
                      <p>
                        {`${store.storeAddress.fullAddress}, ${store.storeAddress.subDistrict}, ${store.storeAddress.district}, ${store.storeAddress.city}, ${store.storeAddress.province}, ${store.storeAddress.postalCode}`}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      target="_blank"
                      href={`https://www.google.com/maps?q=${store.storeAddress?.latitude},${store.storeAddress?.longitude}`}
                      className="font-bold bg-black text-white px-2 py-1 rounded-md w-fit text-xs"
                    >
                      <span className="font-medium">Lihat Lokasi Toko</span>{' '}
                      <FaMapLocationDot className="inline-block ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {isUserDashboard && (
              <div className="border border-gray-200 rounded-md p-2">
                <h2 className="font-bold mb-2">Info Transaksi Pembayaran</h2>
                <div className="space-y-1">
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
