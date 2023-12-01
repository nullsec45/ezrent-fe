'use client';

import { FileClock, FileText, History, LogOut, User2 } from 'lucide-react';
import ButtonLogout from '@/components/elements/button/ButtonLogout';
import { Button } from '@/components/ui/button';
import { PiMapPinFill } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export default function SmallMenu() {
  const path = usePathname().split('/')[2];
  return (
    <div className="rounded-xl max-w-xs w-full border-[1.4px] h-fit shadow p-3">
      <ul className="flex flex-col gap-1 ">
        <li>
          <Link
            href="/dashboard/profile"
            className={twMerge(
              'py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg',
              path === 'profile' ? 'bg-gray-200 translate-x-2' : ''
            )}
          >
            <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
              <User2 />
              Profil Saya
            </Button>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/address"
            className={twMerge(
              'py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg',
              path === 'address' ? 'bg-gray-200 translate-x-2' : ''
            )}
          >
            <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
              <PiMapPinFill size={25} />
              Daftar Alamat
            </Button>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
          >
            <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
              <FileText />
              Kelengkapan Data
            </Button>
          </Link>
        </li>
      </ul>
      <hr className="w-full h-[1.5px] bg-gray-400 my-3" />
      <ul className="flex flex-col gap-1 ">
        <li>
          <Link
            href="/"
            className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
          >
            <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
              <FileClock />
              Menunggu Pembayaran
            </Button>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
          >
            <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
              <History />
              Daftar Transaksi
            </Button>
          </Link>
        </li>
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
