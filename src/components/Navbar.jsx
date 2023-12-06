'use client';

import { useState } from 'react';
import NavbarBrand from '@/components/elements/navbar/NavbarBrand';
import NavbarMobile from '@/components/elements/navbar/NavbarMobile';
import NavbarDekstop from '@/components/elements/navbar/NavbarDekstop';
import NavbarSearchMobile from '@/components/elements/navbar/NavbarSearchMobile';
import NavbarBackdrop from '@/components/elements/navbar/NavbarBackdrop';
import NavbarMenuMobile from '@/components/elements/navbar/NavbarMenuMobile';

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
    <header className="w-full sticky top-0 sm:py-4 py-6 bg-white z-[9999]">
      <nav className="container px-4 lg:px-10 w-full flex justify-between gap-3 items-center">
        <NavbarBrand />

        <NavbarMobile
          toggleMenu={toggleMenu}
          toggleSearchPopUp={toggleSearchPopUp}
          isMenuOpen={isMenuOpen}
        />

        <NavbarDekstop />

        <NavbarSearchMobile isSearchPopUpOpen={isSearchPopUpOpen} />

        <NavbarBackdrop
          isMenuOpen={isMenuOpen}
          isSearchPopUpOpen={isSearchPopUpOpen}
        />

        <NavbarMenuMobile isMenuOpen={isMenuOpen} />
      </nav>
    </header>
  );
}
