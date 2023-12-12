import AddressItemCard from '@/components/elements/card/AddressItemCard';
import SmallMenu from '@/components/elements/menu/SmallMenu';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Address() {
  return (
    <div className="container">
      <Breadcrumbs
        items={[
          {
            name: 'Dashboard',
            link: '/dashboard',
          },
          {
            name: 'Daftar Alamat',
            link: '/dashboard/profile',
          },
        ]}
      />
      <div className="flex md:flex-nowrap flex-wrap gap-4 my-12 lg:px-3">
        <SmallMenu />
        <div className="rounded-xl p-3 w-full border shadow">
          <h1 className="font-semibold text-lg mb-5">Daftar Alamat</h1>

          <AddressItemCard />

          <div className="w-full mt-8 flex justify-center relative max-w-full overflow-hidden max-h-7">
            <div className="font-extralight bg-clip-text text-transparent bg-gradient-to-r from-gray-50 via-black to-black">
              -----------------------------------------------------
            </div>
            <Link
              href="/dashboard/address/add"
              className="rounded-full absolute top-0 min-w-[1.5rem] min-h-[1.5rem] inline-flex justify-center items-center bg-black text-white"
            >
              <Plus className="w-4 h-4" />
            </Link>
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
