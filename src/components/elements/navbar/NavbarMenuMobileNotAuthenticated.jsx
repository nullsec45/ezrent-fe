import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NavbarMenuMobileNotAuthenticated() {
  return (
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
  );
}
