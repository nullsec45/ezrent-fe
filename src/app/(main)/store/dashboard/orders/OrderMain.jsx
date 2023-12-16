'use client';

import OrderCard from '@/components/elements/card/OrderCard';
import useMyStore from '@/hooks/api/useMyStore';
import { sortFromNewestCallback } from '@/utils/helperFunction';
import { useSearchParams } from 'next/navigation';

export const statusOrderNameMap = {
  PENDING: 'Menunggu',
  PROCESSING: 'Diproses',
  SHIPPED: 'Dikirim',
  DELIVERED: 'Sampai Tujuan',
  RETURNED: 'Dikembalikan',
  CANCELLED: 'Dibatalkan',
};

export const statusOrderStyleMap = {
  PENDING: 'bg-gray-400',
  PROCESSING: 'bg-orange-500',
  SHIPPED: 'bg-orange-500',
  DELIVERED: 'bg-emerald-500',
  RETURNED: 'bg-sky-600',
  CANCELLED: 'bg-red-600',
};

export default function OrderMain() {
  const { data: store, isLoading } = useMyStore();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get('status') || 'all';

  if (isLoading) return null;

  if (store?.orders.length === 0)
    return (
      <div className="h-52 w-full grid place-content-center">
        Belum Ada Order di Toko Anda
      </div>
    );

  return (
    <div className="space-y-5">
      {store.orders
        .filter((order) => {
          if (activeStatus === 'all') return true;

          return order.status.toLowerCase() === activeStatus.toLowerCase();
        })
        .sort(sortFromNewestCallback)
        .map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
    </div>
  );
}
