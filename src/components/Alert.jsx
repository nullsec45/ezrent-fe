import { Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Alert() {
  return (
    <div className="w-full bg-black py-[0.6rem]" data-aos="fade-down">
      <div className="container">
        <div className="flex justify-center gap-3 flex-wrap items-center">
          <div className="flex justify-center items-center flex-wrap gap-2">
            <Info className="text-white" />
            <p className="text-white text-sm text-center">
              Segera lengkapi data diri anda agar dapat melakukan transaksi !
              <Link
                href="/auth"
                className="text-blue-400 underline inline lg:hidden md:hidden sm:hidden ml-2"
              >
                Lebih lanjut
              </Link>
            </p>
          </div>
          <Link href="/" className="hidden lg:block md:block sm:block">
            <Button variant="outline" className="text-sm px-6">
              Lebih Lanjut
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
