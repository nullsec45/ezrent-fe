import { Facebook, Github, Instagram, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="container py-12">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="space-y-3 lg:col-span-2">
            <Image
              src="/logo-white.png"
              alt="/"
              width={110}
              height={110}
              quality={100}
              loading="lazy"
              className="mx-auto lg:m-0"
            />
            <p className="text-gray-300 text-sm font-light text-center lg:text-start">
              Ez Rent memberikan pengalaman penyewaan tak terlupakan dengan
              pilihan terluas, layanan berkualitas, dan kenyamanan tanpa batas
            </p>
          </div>

          <div className="font-light space-y-3 text-center lg:text-start">
            <h1 className="text-white text-base font-semibold">Navigasi</h1>
            <div className="text-sm flex flex-col gap-3 text-gray-300">
              <Link href="/">Beranda</Link>
              <Link href="/">Developer</Link>
              <Link href="/">Tentang Kami</Link>
              <Link href="/">Pusat Bantuan</Link>
              <Link href="/">Kebiajakan Privasi</Link>
              <Link href="/">Syarat & Ketentuan Umum</Link>
            </div>
          </div>

          <div className="font-light space-y-3 text-center lg:text-start">
            <h1 className="text-white text-base font-semibold">
              Bantuan Pengguna
            </h1>
            <div className="text-sm flex flex-col gap-3 text-gray-300">
              <Link href="/">Membuka Toko</Link>
              <Link href="/">Profil Pengguna</Link>
              <Link href="/">Keamanan Akun</Link>
              <Link href="/">Temukan Pesanan</Link>
              <Link href="/">Hukum yang Berlaku</Link>
              <Link href="/">Ketentuan Pengiriman</Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-start mt-8">
          <div className="text-sm font-light flex space-x-5">
            <Link href="/">
              <Facebook />
            </Link>
            <Link href="/">
              <Instagram />
            </Link>
            <Link href="/">
              <Github />
            </Link>
            <Link href="/">
              <MapPin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
