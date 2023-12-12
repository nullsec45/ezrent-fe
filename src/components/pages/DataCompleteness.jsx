import SmallMenu from '@/components/elements/menu/SmallMenu';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components//ui/badge';
import { BsQuestionCircle } from 'react-icons/bs';
import { ChevronDown, ImageOff, Pencil, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DataCompleteness() {
  return (
    <div className="container">
      <Breadcrumbs
        items={[
          {
            name: 'Dashboard',
            link: '#',
          },
          {
            name: 'Kelengkapan Data',
            link: '/dashboard/data-completeness',
          },
        ]}
      />
      <div className="flex md:flex-nowrap flex-wrap gap-4 my-12 lg:px-3">
        {/* menu */}
        <SmallMenu />
        <div className="rounded-xl p-3 w-full border shadow">
          <h1 className="font-semibold text-lg mb-4">Kelengkapan Data</h1>

          <div className="w-full p-3 mb-3 rounded-lg border">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center">
                <div className="rounded-lg shadow h-full min-h-[6rem] max-w-[6rem] w-full flex text-gray-600 items-center flex-col justify-center">
                  <Image
                    src={'/logo.png'}
                    width={100}
                    height={100}
                    quality={100}
                    alt="foto"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h1 className="text-base font-medium">
                    KTP <span className="inlint text-red-500">*</span>
                  </h1>
                  <h2 className="font-light">ktp.png</h2>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Link href={`/dashboard/data-completeness/1`}>
                  <Pencil className="lg:w-5 lg:h-5 w-4 h-4 " />
                </Link>
                <button type="button">
                  <X className="lg:w-5 lg:h-5 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full p-3 mb-3 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center w-full">
                <div className="rounded-lg bg-gray-200 shadow h-full min-h-[6rem] max-w-[6rem] w-full flex text-gray-600 items-center flex-col justify-center">
                  <ImageOff size={30} />
                </div>
                <div>
                  <h1 className="font-light ">
                    Belum ada file yang di inputkan
                  </h1>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Button variant={'outline'} className="w-fit px-5 relative">
                  Pilih Gambar
                  <input
                    type="file"
                    // {...register('profilePicture')}
                    name="profilePicture"
                    accept="image/*"
                    // onChange={(e) =>
                    //   setPreviewImage(
                    //     URL?.createObjectURL?.(e.target?.files?.[0])
                    //   )
                    // }
                    className="absolute top-0 right-0 left-0 z-30 w-full h-10 rounded-md cursor-pointer opacity-0 overflow-hidden"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
