import useUser from '@/hooks/api/useUser';
import NavbarMenuDekstopNotAuthenticated from './NavbarMenuDekstopNotAuthenticated';
import NavbarMenuDekstopAuthenticated from './NavbarMenuDekstopAuthenticated';

export default function NavbarMenuDekstop() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div>LOADING.......</div>;
  }

  // jika user belum login
  if (!user) return <NavbarMenuDekstopNotAuthenticated />;

  // jika user telah login
  return <NavbarMenuDekstopAuthenticated user={user} />;
}
