'use client';

import { useState } from 'react';
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
import Image from 'next/image';
import FieldInputGroup from '@/components/elements/input/FieldInputGroup';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchPopUpOpen, setIsSearchPopUpOpen] = useState(false);
  const [authUser, setAuthUser] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchPopUpOpen(false);
  };

  const toggleSearchPopUp = () => {
    setIsSearchPopUpOpen(!isSearchPopUpOpen);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 lg:py-4 md:py-4 sm:py-4 xl:py-4 2xl:py-4 py-6 bg-white z-50">
      <nav className="container w-full flex justify-between  gap-3 items-center ">
        <div className="w-full max-w-[7rem] mr-2">
          <Image
            src={'/logo.png'}
            alt="logo"
            width={500}
            height={500}
            quality={100}
            loading="lazy"
          />
        </div>
        <div className="flex gap-4 items-center sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
          <button onClick={toggleSearchPopUp}>
            <Search />
          </button>
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
        <div className="hidden sm:flex md:flex lg:flex xl:flex 2xl:flex sm:justify-between md:justify-between lg:justify-between xl:justify-between 2xl:justify-between items-center gap-3 w-full">
          <FieldInputGroup />
          <ul className="flex gap-4 items-center ">
            <li>
              <Link href="/">
                <Button size="icon" variant="ghost">
                  <ShoppingCart />
                </Button>
              </Link>
            </li>
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
        {/* search pop-up */}
        <div
          className={twMerge(
            'origin-top transition-all duration-500 ease-in-out sm:hidden absolute top-20 z-50 h-fit border-b bg-white p-2 text-black right-4 left-4 rounded-md',
            `${
              isSearchPopUpOpen
                ? 'opacity-100 scale-y-100'
                : 'opacity-0 scale-y-0 '
            }`
          )}
        >
          <FieldInputGroup />
        </div>
        {/* search pop-up */}
        {/* backdrop */}
        <div
          className={twMerge(
            'bg-black/60 z-10 min-h-screen absolute top-[4.2rem] left-0 bottom-0 right-0 sm:hidden transition-all duration-300 ease-in-out',
            `${isMenuOpen || isSearchPopUpOpen ? 'block' : 'hidden'}`
          )}
        />
        {/* backdrop */}
        {/* nav menu */}
        <div
          className={`${
            isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 '
          } origin-top transition-all duration-500 ease-in-out sm:hidden absolute top-[4.2rem] z-50 bg-none inset-0 min-h-screen border-b text-black`}
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
                    <Link
                      href="/profile/me"
                      className="flex gap-2 items-center"
                    >
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
        {/* nav menu */}
      </nav>
    </header>
  );
}
