import { Facebook, Github, Instagram, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  gap-6">
          <div
            className="lg:col-span-2 md:col-span-2  sm:col-span-2 
           space-y-2"
          >
            <Image
              src="/logo-white.png"
              alt="/"
              width={110}
              height={110}
              quality={100}
              loading="lazy"
              className="mb-5"
            />
            <p className="text-white text-base font-light">
              Ez Rent memberikan pengalaman penyewaan tak terlupakan dengan
              pilihan terluas, layanan berkualitas, dan kenyamanan tanpa batas
            </p>
          </div>
          <div
            className="text-base font-light flex flex-col space-y-3
          "
          >
            <h1 className="text-white font-semibold text-lg">Navigasi</h1>
            <Link href="/">Beranda</Link>
            <Link href="/">Developer</Link>
            <Link href="/">Tentang Kami</Link>
            <Link href="/">Pusat Bantuan</Link>
            <Link href="/">Kebiajakan Privasi</Link>
            <Link href="/">Syarat & Ketentuan Umum</Link>
          </div>
          <div
            className="text-base font-light flex flex-col space-y-3
          "
          >
            <h1 className="text-white font-semibold text-lg">
              Bantuan Pengguna
            </h1>
            <Link href="/">Membuka Toko</Link>
            <Link href="/">Profil Pengguna</Link>
            <Link href="/">Keamanan Akun</Link>
            <Link href="/">Temukan Pesanan</Link>
            <Link href="/">Hukum yang Berlaku</Link>
            <Link href="/">Ketentuan Pengiriman</Link>
          </div>
          <div className="lg:-mt-12 md:-mt-12 sm:-mt-0">
            <div
              className="text-sm font-light flex space-x-5
          "
            >
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
      </div>
    </footer>
  );
}
