import useUser from '@/hooks/api/useUser';
import NavbarMenuDekstopNotAuthenticated from './NavbarMenuDekstopNotAuthenticated';
import NavbarMenuDekstopAuthenticated from './NavbarMenuDekstopAuthenticated';
import { Skeleton } from '@/components/ui/skeleton';

export default function NavbarMenuDekstop() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="gap-3 flex items-center">
        <Skeleton className="bg-gray-300 h-10 w-10" />
        <Skeleton className="bg-gray-300 h-10 w-36" />
        <Skeleton className="bg-gray-300 h-10 w-32" />
      </div>
    );
  }

  // jika user belum login
  if (!user) return <NavbarMenuDekstopNotAuthenticated />;

  // jika user telah login
  return <NavbarMenuDekstopAuthenticated user={user} />;
}
