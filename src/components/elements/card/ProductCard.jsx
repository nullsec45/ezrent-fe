import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProductCard() {
  return (
    <div className="w-full min-w-[168px] max-w-xs bg-red-400 rounded-xl overflow-hidden">
      <div className="relative w-full aspect-[9/6]">
        <Image
          src="https://picsum.photos/seed/picsum/200/300"
          fill={true}
          alt="product image"
        />
      </div>

      <div>
        <Link href={'#'} className="pt-1 pb-6 px-4 font-bold text-sm">
          Sony Alpha 7 Seri III
        </Link>
        <Link href={'#'} className="pt-1 pb-6 px-4 font-bold text-sm">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
