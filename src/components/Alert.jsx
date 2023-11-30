'use client';

import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export default function Alert() {
  const [isClose, setIsClose] = useState(true);

  const handleClose = () => {
    setIsClose(false);
  };
  return (
    <div
      className={twMerge(
        'w-full bg-black py-[0.6rem] relative',
        isClose ? null : 'hidden'
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
                href="/auth"
                className="text-blue-400 underline inline sm:hidden ml-2"
              >
                Lebih lanjut
              </Link>
            </p>
          </div>
          <Link href="/" className="hidden sm:block">
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
