import NavbarMenuMobileAuthenticated from './NavbarMenuMobileAuthenticated';
import useUser from '@/hooks/api/useUser';
import NavbarMenuMobileNotAuthenticated from './NavbarMenuMobileNotAuthenticated';

export default function NavbarMenuMobile({ isMenuOpen, setIsMenuOpen }) {
  const { data: user, isLoading } = useUser();

  return (
    <div
      className={`${
        isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 '
      } origin-top transition-all duration-500 ease-in-out lg:hidden absolute top-[4.2rem] sm:top-[3.6rem] z-[999999] bg-none inset-0 min-h-screen  text-black`}
    >
      {user ? (
        <NavbarMenuMobileAuthenticated
          setIsMenuOpen={setIsMenuOpen}
          user={user}
        />
      ) : (
        <NavbarMenuMobileNotAuthenticated />
      )}
    </div>
  );
}
