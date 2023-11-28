'use client';

import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs({ mainTitle }) {
  const path = usePathname();
  const firstPath = path.split('/')?.[1];
  const secondPath = path.split('/')?.[2];

  return (
    <div className="w-full my-5 text-left">
      <nav aria-label="breadcrumb" className="block w-full">
        <ul className="flex w-full gap-4 lg:space-x-5 flex-wrap items-center capitalize text-sm py-4 px-4">
          <li className="flex cursor-pointer space-x-3 items-center  text-gray-500">
            <a href="#">
              <span>Beranda</span>
            </a>
            <ChevronRight size={20} />
          </li>
          <li className="flex cursor-pointer space-x-3 items-center  text-gray-500">
            <a href="#">
              <span>{firstPath}</span>
            </a>
            <ChevronRight size={20} />
          </li>
          {secondPath && (
            <li className="flex cursor-pointer space-x-3 items-center  text-gray-500">
              <a href="#">
                <span>{secondPath}</span>
              </a>
              <ChevronRight size={20} />
            </li>
          )}
          <li className="flex cursor-pointer space-x-3 items-center  text-black font-semibold">
            <a href="#">
              <span>{mainTitle ? mainTitle : 'iPhone 15 Promag'}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
