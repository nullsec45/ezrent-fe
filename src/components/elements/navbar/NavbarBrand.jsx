import Image from 'next/image';

export default function NavbarBrand() {
  return (
    <div className="w-full max-w-[7rem] mr-2">
      <Image
        src={'/logo.png'}
        alt="logo"
        width={500}
        height={500}
        quality={100}
        loading="lazy"
      />
    </div>
  );
}
