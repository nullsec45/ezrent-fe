'use client';

import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import useMyProfile from '@/hooks/api/useMyProfile';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Alert() {
  const { data: profile, isLoading } = useMyProfile();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    profile ? setIsOpen(false) : setIsOpen(true);
  }, [isLoading, setIsOpen, profile]);

  const handleClose = () => setIsOpen(false);

  return (
    <div
      className={twMerge(
        'w-full bg-black py-[0.6rem] sticky top-[72px] sm:top-[58px] lg:top-[72px] z-50',
        !isOpen ? 'hidden' : null
      )}
      data-aos="fade-down"
    >
      <div className="container">
        <div className="flex justify-center gap-3 flex-wrap items-center">
          <div className="flex justify-center items-center flex-wrap gap-2">
            <Info className="text-white" />
            <p className="text-white text-sm text-center">
              Segera lengkapi data diri anda agar dapat melakukan transaksi !
              <Link
                href="/dashboard/data-completeness"
                className="text-blue-400 underline inline sm:hidden ml-2"
              >
                Lebih lanjut
              </Link>
            </p>
          </div>
          <Link
            href={`/dashboard?callback=${pathname}?${searchParams.toString()}`}
            className="hidden sm:block"
          >
            <Button variant="outline" className="text-sm px-6">
              Lebih Lanjut
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 right-0 ">
        <Button
          onClick={handleClose}
          size="icon"
          className="bg-black rounded-full text-white"
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
