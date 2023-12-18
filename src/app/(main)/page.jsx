'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export default function Home() {
  return (
    <main>
      <div className="bg-zinc-900">
        <div className="container pt-16 grid gap-7 grid-cols-1 lg:grid-cols-2 min-h-[600px] items-center">
          <div>
            <p className="text-zinc-600 font-semibold text-2xl">
              Ingin Sewa Barang?
            </p>
            <h1 className="text-8xl font-thin text-white my-3">
              Ez<span className="font-semibold">Rent</span>
            </h1>
            <p className="text-zinc-600 font-semibold text-2xl">
              Solusi Cepat Menyewa Barang
            </p>
            <Button className="bg-transparent border px-12 py-5 border-white mt-8">
              <Link href="/products">Sewa Sekarang</Link>
            </Button>
          </div>
          <div className="w-full h-[400px] lg:h-full relative">
            <Image
              src="/hero.png"
              alt="hero"
              images
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="container px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <section>
            <SectionCard
              src="/pwa-1.png"
              alt="pwa"
              heading="Sewa Menyewa di"
              subHeading="Satu Tempat"
              content="Ez Rent memberikan pengalaman kepada pengguna berupa kegiatan
            sewa menyewa yang efisien melalui platform yang terpusat"
            />

            <div className="flex flex-col md:flex-row">
              <SectionCard
                src="/location-1.png"
                alt="location"
                heading="Akses"
                subHeading="Dimana Saja"
                content="Akses Ez Rent dimana saja tanpa khawatir batasan lokasi."
                bgColor="bg-gray-100"
                isSmall
              />
              <SectionCard
                src="/box-1.png"
                alt="box"
                heading="Barang"
                subHeading="Terpercaya"
                content="Ulasan pengguna membantu mu memilah barang terpercaya."
                bgColor="bg-zinc-800"
                isWhite
                isSmall
              />
              <div className="flex-1">
                <div></div>
                <div></div>
              </div>
            </div>
          </section>
          <section className="flex flex-col lg:flex-row lg:items-center pl-5 md:p-14 py-20">
            <div className="basis-7/12">
              <h2 className="font-thin text-5xl">
                Rent <span className="font-semibold">Easy,</span>
              </h2>
              <h2 className="font-thin text-5xl">
                Rent <span className="font-semibold">Fast</span>
              </h2>
              <p className="text-sm text-gray-500 my-5">
                Ez Rent memudahkan pengguna dalam menyewa dan tentunya menghemat
                waktu pengguna. Sewa Mudah, Sewa Cepat dengan Ez Rent.
              </p>
              <Button variant="outline">
                <Link href="/products">Bergabung Bersama Kami</Link>
              </Button>
            </div>
            <div className="flex-1 relative flex justify-end w-full h-96">
              <Image
                src="/motor-1.png"
                alt="motor"
                fill
                className="object-contain object-left"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="container py-20">
        <div className="flex justify-between mb-8">
          <h2 className="text-base lg:text-xl font-medium">Eksplor Kategori</h2>
          <Link href="/products" className="text-xs lg:text-base font-semibold">
            Lebih Lanjut{' '}
            <span>
              <ChevronRight className="inline-block" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-6 place-content-center gap-8">
          <CategoryCard
            icon="/icons/Phones.svg"
            title="Phones"
            link="/products?category=1dd0d8b0-4cb7-425d-8c32-7fa5a474547d"
          />
          <CategoryCard
            icon="/icons/Smart Watches.svg"
            title="Smart Whatches"
            link="/products?category=dabc3d57-3e1b-4f94-825c-871b054e2a8e"
          />
          <CategoryCard
            icon="/icons/Cameras.svg"
            title="Cameras"
            link="/products?category=dbec18cc-7a4f-4041-a2a8-c5c6c5a8e005"
          />
          <CategoryCard
            icon="/icons/Headphones.svg"
            title="Headphones"
            link="/products?category=38251055-7bef-497b-90d2-759128461a14"
          />
          <CategoryCard
            icon="/icons/Computers.svg"
            title="Computers"
            link="/products?category=1b0853f7-56ca-44cd-9ef1-1c5fb3a74af3"
          />
          <CategoryCard
            icon="/icons/Gaming.svg"
            title="Gaming"
            link="/products?category=b702ecb3-fced-47e3-b77e-35f26cf17bff"
          />
        </div>
      </div>

      <div className="container py-20 text-white text-center bg-gradient-to-br from-neutral-700 to-zinc-900">
        <div className="py-10">
          <h2 className="text-6xl font-thin">
            Jadilah Bagian <span className="font-medium">Dari Kami</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Ingin bermitra dengan kami? Segera kunjungi link dibawah!
          </p>
        </div>
        <Button className="bg-transparent border border-white">
          <Link href="/store/open-store" className="px-10 py-5">
            Buka Toko
          </Link>
        </Button>
      </div>
    </main>
  );
}

function SectionCard({
  src,
  alt,
  heading,
  subHeading,
  content,
  isWhite,
  isSmall,
  bgColor,
}) {
  return (
    <div className={twMerge('flex gap-7 py-16 pr-12', bgColor)}>
      <div className="flex-1 relative text-start">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
      <div className="flex-1">
        <h2
          className={twMerge(
            'text-3xl mb-4',
            isWhite && 'text-white',
            isSmall && 'text-lg'
          )}
        >
          {heading}{' '}
          <span className={twMerge('font-bold', isSmall && 'text-lg')}>
            {' '}
            {subHeading}
          </span>
        </h2>
        <p className={twMerge('text-sm text-gray-500', isSmall && 'text-sm')}>
          {content}
        </p>
      </div>
    </div>
  );
}

function CategoryCard({ icon, title, link }) {
  return (
    <div className="flex flex-col items-center gap-1 py-4 bg-gray-200 rounded-lg w-full max-w-[160px]">
      <Image src={icon} alt="icon" width={48} height={48} />
      <Link href={link} className="text-sm font-medium">
        {title}
      </Link>
    </div>
  );
}
