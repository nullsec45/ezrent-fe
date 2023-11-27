'use client';

import { useState } from 'react';
import NavbarMenuMobile from './NavbarMenuMobile';
import NavbarBackdrop from './NavbarBackdrop';
import NavbarSearchMobile from './NavbarSearchMobile';
import NavbarBrand from './NavbarBrand';
import NavbarMobile from './NavbarMobile';
import NavbarDekstop from './NavbarDekstop';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchPopUpOpen, setIsSearchPopUpOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchPopUpOpen(false);
  };

  const toggleSearchPopUp = () => {
    setIsSearchPopUpOpen(!isSearchPopUpOpen);
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 sm:py-4 py-6 bg-white z-50">
      <nav className="container px-4 lg:px-10 w-full flex justify-between gap-3 items-center">
        <NavbarBrand />

        <NavbarMobile
          toggleMenu={toggleMenu}
          toggleSearchPopUp={toggleSearchPopUp}
          isMenuOpen={isMenuOpen}
        />

        <NavbarDekstop />

        <NavbarSearchMobile />

        <NavbarBackdrop
          isMenuOpen={isMenuOpen}
          isSearchPopUpOpen={isSearchPopUpOpen}
        />

        <NavbarMenuMobile isMenuOpen={isMenuOpen} />
      </nav>
    </header>
  );
}
