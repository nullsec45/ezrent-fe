import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  CopyCheck,
  History,
  LogOutIcon,
  MapPin,
  MenuIcon,
  Plus,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';

export default function NavbarMenuMobile({ isMenuOpen }) {
  const [authUser, setAuthUser] = useState(false);

  return (
    <div
      className={`${
        isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 '
      } origin-top transition-all duration-500 ease-in-out sm:hidden absolute top-[4.2rem] z-50 bg-none inset-0 min-h-screen  text-black`}
    >
      {authUser ? (
        <>
          <div className="px-5 flex flex-col bg-white rounded-b-lg  pb-4   pt-2">
            <div className="w-full border-b border-black pb-3 flex justify-between">
              <Link href="/" className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>Nama User</p>
              </Link>
              <Link href="/">
                <Button>
                  Buka Toko
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <ul className="flex flex-col space-y-2 mt-3">
              <li>
                <Link href="/profile/me" className="flex gap-2 items-center">
                  <User />
                  Profile Saya
                </Link>
              </li>
              <li>
                <Link href="/" className="flex gap-2 items-center">
                  <MapPin />
                  Daftar Alamat
                </Link>
              </li>
              <li>
                <Link href="/" className="flex gap-2 items-center">
                  <ShoppingCart />
                  Keranjang Saya
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-2 bg-white pb-4 pt-1 px-5 rounded-lg">
            <ul className="flex flex-col space-y-2 mt-3">
              <li>
                <Link href="/" className="flex gap-2 items-center">
                  <CopyCheck />
                  Menunggu Pembayaran
                </Link>
              </li>
              <li>
                <Link href="/" className="flex gap-2 items-center">
                  <History />
                  Riwayat Transaksi
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-2 mb-2  bg-white  pb-4 pt-1 px-5 rounded-lg">
            <ul className="flex flex-col space-y-2 mt-3">
              <li>
                <button
                  className="flex gap-2 items-center text-red-600"
                  onClick={() => console.log('logout')}
                >
                  <LogOutIcon />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="px-5 bg-white rounded-b-lg  pb-4 pt-2">
          <ul className="flex justify-center space-x-2 mt-3">
            <li>
              <Link href="/auth">
                <Button variant="outline">Login</Button>
              </Link>
            </li>
            <li>
              <Link href="/auth">
                <Button>Register</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
