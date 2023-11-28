import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import OpenStoreIcon from '@/components/icons/OpenStoreIcon';

export default function NavbarMenuDekstopAuthenticated({ user }) {
  return (
    <ul className="flex gap-4 items-center">
      <li>
        <Link href="/cart">
          <Button size="icon" variant="ghost">
            <ShoppingCart />
          </Button>
        </Link>
      </li>

      <li>
        <Link href="/user/profile">
          <Button variant="ghost" className="flex gap-3">
            <span className="hidden lg:inline-block">{user.username}</span>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </Link>
      </li>

      <li>
        <Link href="/store/add-store">
          <Button className="flex gap-3 items-center px-8">
            <span>Buka Toko</span>
            <OpenStoreIcon />
          </Button>
        </Link>
      </li>
    </ul>
  );
}
