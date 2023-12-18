'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function OrderHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get('status') || 'all';

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const goToStatusPage = (status) =>
    router.push(`${pathname}?${createQueryString('status', status)}`);

  const goToAllStatusPage = () => router.push('/store/dashboard/orders');

  const menus = [
    {
      text: 'Semua',
      status: 'all',
      onClick: goToAllStatusPage,
    },
    {
      text: 'Menunggu',
      status: 'pending',
      onClick: () => goToStatusPage('pending'),
    },
    {
      text: 'Diproses',
      status: 'processing',
      onClick: () => goToStatusPage('processing'),
    },
    {
      text: 'Dikirim',
      status: 'shipped',
      onClick: () => goToStatusPage('shipped'),
    },
    {
      text: 'Sampai Tujuan',
      status: 'delivered',
      onClick: () => goToStatusPage('delivered'),
    },
    {
      text: 'Dikembalikan',
      status: 'returned',
      onClick: () => goToStatusPage('returned'),
    },
    {
      text: 'Dibatalkan',
      status: 'cancelled',
      onClick: () => goToStatusPage('cancelled'),
    },
  ];

  return (
    <div className="flex flex-nowrap overflow-x-scroll lg:overflow-auto gap-4 mb-6 pb-3">
      {menus.map((menu, index) => {
        const variant = menu.status === activeStatus ? 'default' : 'outline';

        return (
          <Button
            key={index}
            variant={variant}
            className="min-w-[7rem] w-full max-w-[9rem] text-sm"
            onClick={menu.onClick}
          >
            {menu.text}
          </Button>
        );
      })}
    </div>
  );
}
