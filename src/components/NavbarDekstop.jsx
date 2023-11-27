import React from 'react';
import FieldInputGroup from '@/components/elements/input/FieldInputGroup';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { api } from '@/utils/axios';

export default function NavbarDekstop() {
  return (
    <div className="hidden sm:flex sm:justify-between items-center gap-3 w-full">
      <FieldInputGroup />

      <ul className="flex gap-4 items-center">
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
  );
}
