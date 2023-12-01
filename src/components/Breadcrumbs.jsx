'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function Breadcrumbs({ items }) {
  return (
    <div className="w-full my-5 text-left">
      <nav aria-label="breadcrumb" className="block w-full">
        <ul className="flex w-full lg:space-x-5 flex-wrap items-center capitalize text-sm py-4 px-4">
          <li className="flex cursor-pointer space-x-3 items-center  text-gray-500">
            <Link href="/">
              <span>Beranda</span>
            </Link>
            <ChevronRight size={20} />
          </li>
          {items?.map((item, index) => (
            <li
              key={index}
              className={twMerge(
                'flex cursor-pointer space-x-3 items-center',
                index === items?.length - 1
                  ? 'text-black font-medium'
                  : 'text-gray-500'
              )}
            >
              <Link href={item.link}>
                <span>{item.name}</span>
              </Link>

              {/* jangan tampilkan icon chevron ketika sudah di array terakhir */}
              {index !== items?.length - 1 && <ChevronRight size={20} />}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
