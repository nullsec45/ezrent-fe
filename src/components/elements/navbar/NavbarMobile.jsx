import { MenuIcon, Search, X } from 'lucide-react';
import React from 'react';

export default function NavbarMobile({
  toggleSearchPopUp,
  toggleMenu,
  isMenuOpen,
}) {
  return (
    <div className="flex gap-4 items-center lg:hidden">
      <button onClick={toggleSearchPopUp}>
        <Search />
      </button>
      <button onClick={toggleMenu}>{isMenuOpen ? <X /> : <MenuIcon />}</button>
    </div>
  );
}
