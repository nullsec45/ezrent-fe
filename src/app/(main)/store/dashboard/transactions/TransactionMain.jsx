'use client';

import TransactionCard from '@/components/elements/card/TransactionCard';
import useMyStore from '@/hooks/api/useMyStore';
import { sortFromNewestCallback } from '@/utils/helperFunction';
import { useSearchParams } from 'next/navigation';

export const statusTransactionNameMap = {
  UNPAID: 'Belum Dibayar',
  AWATING_CONFIRMATION: 'Menunggu',
  APPROVED: 'Disetujui',
  REJECTED: 'Ditolak',
};

export const statusTransactionStyleMap = {
  UNPAID: 'bg-orange-500',
  AWATING_CONFIRMATION: 'bg-gray-400',
  APPROVED: 'bg-emerald-500',
  REJECTED: 'bg-red-600',
};

export default function TransactionMain() {
  const { data: store, isLoading } = useMyStore();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get('status') || 'all';

  if (isLoading) return null;

  if (store?.orders.length === 0)
    return (
      <div className="h-52 w-full bg-red-400 grid place-content-center">
        Belum Ada Transaksi di Toko Anda
      </div>
    );

  return (
    <div className="space-y-5">
      {store.orders
        .filter((order) => order.status !== 'CANCELLED')
        .filter((order) => {
          if (activeStatus === 'all') return true;
          return (
            order.transaction.status.toLowerCase() ===
            activeStatus.toLowerCase()
          );
        })
        .sort(sortFromNewestCallback)
        .map((order) => (
          <TransactionCard key={order.id} order={order} store={store} />
        ))}
    </div>
  );
}
