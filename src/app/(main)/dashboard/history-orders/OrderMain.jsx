'use client';

import OrderCard from '@/components/elements/card/OrderCard';
import useOrders from '@/hooks/api/useOrders';
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
  const { data: orders, isLoading } = useOrders();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get('status') || 'all';

  if (isLoading) return null;

  if (orders.length === 0)
    return (
      <div className="h-52 w-full grid place-content-center">
        Belum Ada Order
      </div>
    );

  return (
    <div className="space-y-5">
      {orders
        .filter((order) => {
          if (activeStatus === 'all') return true;

          return order.status.toLowerCase() === activeStatus.toLowerCase();
        })
        .map((order) => (
          <OrderCard key={order.id} order={order} isUserDashboard />
        ))}
    </div>
  );
}
