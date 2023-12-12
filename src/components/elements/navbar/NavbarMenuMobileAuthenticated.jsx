'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  CopyCheck,
  History,
  LogOut,
  MapPin,
  ShoppingCart,
  User,
} from 'lucide-react';
import OpenStoreIcon from '@/components/icons/OpenStoreIcon';
import ButtonLogout from '@/components/elements/button/ButtonLogout';
import PropTypes from 'prop-types';
import useMyStore from '@/hooks/api/useMyStore';
import StoreIcon from '@/components/icons/StoreIcon';

export default function NavbarMenuMobileAuthenticated({ user, setIsMenuOpen }) {
  const { data: store } = useMyStore();

  return (
    <>
      <div className="font-medium px-5 flex flex-col bg-white rounded-b-lg pb-4 pt-2">
        <div className="w-full border-b border-gray-400 pb-3 flex justify-between">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
            <p>{user.username}</p>
          </div>

          {store ? (
            <Link onClick={() => setIsMenuOpen(false)} href="/store/dashboard">
              <Button className="flex gap-3 items-center px-8">
                <span>Toko Saya</span>
                <StoreIcon />
              </Button>
            </Link>
          ) : (
            <Link onClick={() => setIsMenuOpen(false)} href="/store/open-store">
              <Button className="flex gap-3 items-center">
                <span> Buka Toko</span>
                <OpenStoreIcon />
              </Button>
            </Link>
          )}
        </div>

        <ul className="flex flex-col space-y-4 mt-3">
          <li>
            <Link
              onClick={() => setIsMenuOpen(false)}
              href="/dashboard/profile"
              className="flex gap-2 items-center"
            >
              <User />
              Profile Saya
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsMenuOpen(false)}
              href="/dashboard/address"
              className="flex gap-2 items-center"
            >
              <MapPin />
              Daftar Alamat
            </Link>
          </li>
          <li>
            <Link href="/cart" className="flex gap-2 items-center">
              <ShoppingCart />
              Keranjang Saya
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-2 bg-white pb-4 pt-1 px-5 rounded-lg font-medium">
        <ul className="flex flex-col space-y-4 mt-3">
          <li>
            <Link
              onClick={() => setIsMenuOpen(false)}
              href="/dashboard/history-orders"
              className="flex gap-2 items-center"
            >
              <CopyCheck />
              Riwayat Order
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsMenuOpen(false)}
              href="/dashboard/history-transactions"
              className="flex gap-2 items-center"
            >
              <History />
              Riwayat Transaksi
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-2 mb-2  bg-white  pb-4 pt-1 px-5 rounded-lg">
        <ul className="mt-3">
          <li>
            <ButtonLogout
              LogoutIcon={LogOut}
              classNameBtn={
                'flex gap-2 items-center text-base text-red-600 bg-white hover:bg-white h-6 p-0'
              }
              text={'Logout'}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

NavbarMenuMobileAuthenticated.propTypes = {
  user: PropTypes.object,
};
