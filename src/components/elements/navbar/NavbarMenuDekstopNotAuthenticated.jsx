import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NavbarMenuDekstopNotAuthenticated() {
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
  );
}
