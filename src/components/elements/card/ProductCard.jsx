import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaStar } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { twMerge } from 'tailwind-merge';
import { calculateAverageRating, formatPrice } from '@/utils/helperFunction';

export default function ProductCard({ product }) {
  const { id, name, reviews, price, availableStock, productPictures, store } =
    product;

  return (
    <div className="w-full min-w-[150px] lg:min-w-[220px] max-w-xs bg-gray-50 shadow-md rounded-xl overflow-hidden">
      <div className="relative w-full aspect-[9/8] max-h-56">
        <Image
          src={productPictures[0]?.url}
          fill={true}
          alt="product image"
          className="object-contain"
        />
      </div>

      <div className="pt-2 pb-6 px-4">
        <div className="h-10">
          <Link
            href={`/products/${id}`}
            className="font-bold text-sm line-clamp-2"
          >
            {name}
          </Link>
        </div>

        <Link href={'#'} className="flex items-center gap-2 mt-3">
          <Avatar className="w-4 h-4">
            {store.profilePicture ? (
              <>
                <AvatarImage src={store.profilePicture} />
                <AvatarFallback>{store.name}</AvatarFallback>
              </>
            ) : (
              <>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{store.name}</AvatarFallback>
              </>
            )}
          </Avatar>

          <span className="text-xs capitalize">{store.name}</span>
        </Link>

        <div className="flex flex-col lg:flex-row-reverse lg:justify-between gap-2 mt-3 mb-2">
          <div className="text-sm lg:text-base font-bold">
            <span>Rp{formatPrice(price)}</span>
            <span className="text-xs font-200 text-gray-500"> / Hari</span>
          </div>
          <div className="flex items-center gap-1 text-xs lg:text-base">
            <FaStar className="text-yellow-400" />
            <span className="font-medium">
              {calculateAverageRating(reviews)}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <div className="flex items-center gap-1">
            <FaLocationDot />
            <span className="font-medium text-xs lg:text-xs">
              {store.storeAddress?.city || 'Lokasi'}
            </span>
          </div>
          <div
            className={twMerge(
              'font-medium text-xs',
              availableStock > 0 && 'text-green-500 ',
              availableStock < 1 && 'text-red-500'
            )}
          >
            {availableStock > 0 ? 'Tersedia' : 'Tidak Tersedia'}
          </div>
        </div>

        <Link href={`/products/${id}`}>
          <Button className="mt-4 w-full py-6" disabled={availableStock < 1}>
            Sewa Sekarang
          </Button>
        </Link>
      </div>
    </div>
  );
}
