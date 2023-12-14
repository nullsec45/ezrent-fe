'use client';

import { Skeleton } from '@/components/ui/skeleton';
import useMyStore from '@/hooks/api/useMyStore';
import { AiOutlineShop } from 'react-icons/ai';
import { LuInbox } from 'react-icons/lu';
import { IoMdClipboard } from 'react-icons/io';
import { BsBoxSeam } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { TbCubePlus } from 'react-icons/tb';
import { usePathname } from 'next/navigation';
import { FileClock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Layout({ children }) {
  const { data: store, isLoading } = useMyStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menus = [
    {
      icon: <AiOutlineShop className="w-6 h-6" />,
      text: 'Profile Toko',
      href: '/store/dashboard',
    },
    {
      icon: <TbCubePlus className="w-6 h-6" />,
      text: 'Tambah Produk',
      href: '/store/dashboard/products/add',
    },
    {
      icon: <LuInbox className="w-6 h-6" />,
      text: 'Produk',
      href: '/store/dashboard/products',
    },
    {
      icon: <FileClock className="w-6 h-6" />,
      text: 'Menunggu Pembayaran',
      href: '/store/dashboard/transactions',
    },
    {
      icon: <BsBoxSeam className="w-6 h-6" />,
      text: 'Order',
      href: '/store/dashboard/orders',
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="container px-4 lg:px-10 py-4 min-h-[700px]">
      <div>
        <Breadcrumbs
          items={[
            {
              name: 'Produk',
              link: '/products',
            },
            {
              name: 'Dashboard Toko',
              link: '#',
            },
          ]}
        />

        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="relative z-10 lg:z-0">
            <button onClick={toggleMenu} className="lg:hidden">
              <HiMiniBars3BottomLeft className="w-7 h-7" />
            </button>
            <aside
              className={twMerge(
                'hidden lg:block bg-white absolute lg:static min-w-[300px] h-fit shadow-lg border border-gray-300 p-4 rounded-xl',
                isMenuOpen && 'block'
              )}
            >
              <div className="border-b border-gray-300 pb-4">
                {isLoading ? (
                  <Skeleton className="w-full h-10 rounded-md bg-gray-300" />
                ) : (
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={store.profilePicture}
                        alt={store.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{store.name}</p>
                      <p className="text-green-500 font-medium text-xs">
                        Sedang Buka
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                {menus.map((menu, index) => (
                  <div key={index}>
                    <Link
                      href={menu.href}
                      className={twMerge(
                        'flex gap-3 items-center px-4 py-3 mt-2 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:translate-x-2',
                        menu.href === pathname && 'bg-gray-200 translate-x-2'
                      )}
                    >
                      <div>{menu.icon}</div>
                      <span className="font-medium text-sm">{menu.text}</span>
                    </Link>
                    {index === 2 && (
                      <div className="border-b border-gray-300 my-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <main className="bg-white md:shadow-lg flex-1 md:border md:border-gray-300 p-1 md:py-6 md:px-7 rounded-xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
