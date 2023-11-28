import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmallMenu from '../elements/menu/SmallMenu';
import { Pen, Pencil, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function Address() {
  return (
    <div className="container">
      <Breadcrumbs mainTitle={'Daftar Alamat'} />
      <div className="flex lg:flex-nowrap flex-wrap gap-4 my-12 lg:px-3">
        <SmallMenu />
        <div className="rounded-xl p-3 w-full border shadow">
          <h1 className="font-semibold text-lg mb-5">Daftar Alamat</h1>
          <div className="w-full p-5 mb-3 bg-gray-100 rounded-md">
            <h1 className="font-semibold text-lg mb-3">Rumah Dora</h1>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm">
                  Jl. Handayani No.43, Kel. Labuhbaru Barat, Kec. Payung Sekaki,
                  Pekanbaru, Riau
                </p>
                <p className="text-sm mt-1">+62822 7886 4530</p>
              </div>
              <div className="flex gap-4 items-center">
                <Link href={'/'}>
                  <Pencil className="lg:w-5 lg:h-5 w-4 h-4 " />
                </Link>
                <button>
                  <X className="lg:w-5 lg:h-5 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full p-5 mb-3 bg-gray-100 rounded-md">
            <h1 className="font-semibold text-lg mb-3">Rumah Dora</h1>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm">
                  Jl. Handayani No.43, Kel. Labuhbaru Barat, Kec. Payung Sekaki,
                  Pekanbaru, Riau
                </p>
                <p className="text-sm mt-1">+62822 7886 4530</p>
              </div>
              <div className="flex gap-4 items-center">
                <Link href={'/'}>
                  <Pencil className="lg:w-5 lg:h-5 w-4 h-4 " />
                </Link>
                <button>
                  <X className="lg:w-5 lg:h-5 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full p-5 mb-3 bg-gray-100 rounded-md">
            <h1 className="font-semibold text-lg mb-3">Rumah Dora</h1>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm">
                  Jl. Handayani No.43, Kel. Labuhbaru Barat, Kec. Payung Sekaki,
                  Pekanbaru, Riau
                </p>
                <p className="text-sm mt-1">+62822 7886 4530</p>
              </div>
              <div className="flex gap-4 items-center">
                <Link href={'/'}>
                  <Pencil className="lg:w-5 lg:h-5 w-4 h-4 " />
                </Link>
                <button>
                  <X className="lg:w-5 lg:h-5 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="w-full mt-8 flex justify-center relative max-w-full overflow-hidden max-h-7">
            <div className="font-extralight bg-clip-text text-transparent bg-gradient-to-r from-gray-50 via-black to-black">
              -----------------------------------------------------
            </div>
            <button className="rounded-full absolute top-0 min-w-[1.5rem] min-h-[1.5rem] inline-flex justify-center items-center bg-black text-white">
              <Plus className="w-4 h-4" />
            </button>
            <div className="font-extralight bg-clip-text text-transparent bg-gradient-to-l from-gray-50 via-black to-black">
              -----------------------------------------------------
            </div>
          </div>
          <h1 className="text-center text-sm my-2">Tambahkan Alamat Baru</h1>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
