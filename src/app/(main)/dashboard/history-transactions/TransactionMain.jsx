'use client';

import TransactionCard from '@/components/elements/card/TransactionCard';
import useOrders from '@/hooks/api/useOrders';
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

export const statusTransactionTextColorMap = {
  UNPAID: 'text-orange-500',
  AWATING_CONFIRMATION: 'text-gray-400',
  APPROVED: 'text-emerald-500',
  REJECTED: 'text-red-600',
};

export default function TransactionMain() {
  const { data: orders, isLoading } = useOrders();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get('status') || 'all';

  if (isLoading) return null;

  if (orders.length === 0)
    return (
      <div className="h-52 w-full grid place-content-center">
        Belum Ada Transaksi
      </div>
    );

  return (
    <div className="space-y-5">
      {orders
        .filter((order) => order.status !== 'CANCELLED')
        .filter((order) => {
          if (activeStatus === 'all') return true;
          return (
            order.transaction.status.toLowerCase() ===
            activeStatus.toLowerCase()
          );
        })
        .map((order) => (
          <TransactionCard
            key={order.id}
            order={order}
            store={order.store}
            isUserDashboard
          />
        ))}
    </div>
  );
}
