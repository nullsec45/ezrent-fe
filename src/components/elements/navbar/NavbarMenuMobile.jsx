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
import OpenStoreIcon from '@/components/icons/OpenStoreIcon';
import NavbarMenuMobileAuthenticated from './NavbarMenuMobileAuthenticated';
import useUser from '@/hooks/api/useUser';
import NavbarMenuMobileNotAuthenticated from './NavbarMenuMobileNotAuthenticated';

export default function NavbarMenuMobile({ isMenuOpen }) {
  const { data: user, isLoading } = useUser();

  return (
    <div
      className={`${
        isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 '
      } origin-top transition-all duration-500 ease-in-out md:hidden absolute top-[4.2rem] z-50 bg-none inset-0 min-h-screen  text-black`}
    >
      {user ? (
        <NavbarMenuMobileAuthenticated user={user} />
      ) : (
        <NavbarMenuMobileNotAuthenticated />
      )}
    </div>
  );
}
