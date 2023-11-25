import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaStar } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product }) {
  const {
    id,
    name,
    description,
    price,
    availableStock,
    productPictures,
    store,
  } = product;

  return (
    <div className="w-full min-w-[150px] lg:min-w-[220px] max-w-xs bg-gray-50 shadow-md rounded-xl overflow-hidden">
      <div className="relative w-full aspect-[9/8] max-h-56">
        <Image
          src="https://picsum.photos/seed/picsum/200/300"
          fill={true}
          alt="product image"
        />
      </div>

      <div className="pt-1 pb-6 px-4">
        <div className="h-10">
          <Link href={'#'} className="font-bold text-sm line-clamp-2">
            {name}
          </Link>
        </div>

        <Link href={'#'} className="flex items-center gap-2 mt-3">
          <Avatar className="w-4 h-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="text-xs">{store.name}</span>
        </Link>

        <div className="flex flex-col lg:flex-row-reverse lg:justify-between gap-2 mt-3 mb-2">
          <div className="text-sm lg:text-base font-bold">
            <span>Rp{price}</span>
            <span className="text-xs font-200 text-gray-500"> / Hari</span>
          </div>
          <div className="flex items-center gap-1 text-xs lg:text-base">
            <FaStar className="text-yellow-400" />
            <span className="font-medium">4.7</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <div className="flex items-center gap-1">
            <FaLocationDot />
            <span className="font-medium text-xs lg:text-base">
              {store.storeAddress?.city || 'Lokasi'}
            </span>
          </div>
          <div className="text-green-500 font-medium text-xs">
            {availableStock > 0 ? 'Tersedia' : 'Tidak Tersedia'}
          </div>
        </div>

        <Button className="mt-4 w-full py-6">Sewa Sekarang</Button>
      </div>
    </div>
  );
}
