import Image from 'next/image';
import Link from 'next/link';

export default function NavbarBrand() {
  return (
    <div className="w-full max-w-[7rem] mr-2">
      <Link href="/">
        <Image
          src={'/logo.svg'}
          alt="logo"
          width={500}
          height={500}
          quality={100}
          loading="lazy"
        />
      </Link>
    </div>
  );
}
