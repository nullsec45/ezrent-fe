'use client';

import { FileClock, FileText, History, LogOut, User2 } from 'lucide-react';
import ButtonLogout from '@/components/elements/button/ButtonLogout';
import { Button } from '@/components/ui/button';
import { PiMapPinFill } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export default function SmallMenu() {
  const pathname = usePathname();

  const menus = [
    {
      icon: <User2 />,
      text: 'Profile Saya',
      href: '/dashboard',
    },
    {
      icon: <PiMapPinFill size={25} />,
      text: 'Daftar Alamat',
      href: '/dashboard/address',
    },
    {
      icon: <FileText />,
      text: 'Kelengkapan Data',
      href: '/dashboard/data-completeness',
    },
    {
      icon: <FileClock />,
      text: 'Menunggu Pembayaran',
      href: '/dashboard/history-transactions',
    },
    {
      icon: <History />,
      text: 'Riwayat Order',
      href: '/dashboard/history-orders',
    },
  ];

  return (
    <div className="rounded-xl max-w-xs w-full border-[1.4px] hidden lg:block h-fit shadow p-3">
      <ul className="flex flex-col gap-1">
        {menus.map((menu, index) => (
          <li key={index}>
            <Link
              href={menu.href}
              className={twMerge(
                'py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg',
                menu.href === pathname && 'bg-gray-200 translate-x-2'
              )}
            >
              <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
                {menu.icon}
                {menu.text}
              </Button>
            </Link>
            {index === 2 && (
              <hr className="w-full h-[1.5px] bg-gray-400 my-3" />
            )}
          </li>
        ))}
      </ul>

      <hr className="w-full h-[1.5px] bg-gray-400 my-3" />

      <ButtonLogout
        text={'Logout'}
        classNameWrapper={
          'hover:bg-transparent bg-transparent text-red-500  flex gap-2 items-center'
        }
        classNameBtn={
          'py-1 w-full bg-transparent hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg'
        }
        LogoutIcon={LogOut}
      />
    </div>
  );
}
