'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '../ui/button';
import { FileClock, FileText, History, LogOut, User2 } from 'lucide-react';
import Link from 'next/link';
import { PiMapPinFill } from 'react-icons/pi';
import Image from 'next/image';
import UpdateProfileForm from '../elements/form/UpdateProfileForm';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

export default function Profile() {
  const [nameImage, setNameImage] = useState('');
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <div className="container">
      <Breadcrumbs mainTitle={'Profil Saya'} />
      <div className="flex lg:flex-nowrap flex-wrap gap-4 my-12 lg:px-3">
        {/* menu */}
        <div className="rounded-xl max-w-xs w-full border-[1.4px] h-fit shadow p-3">
          <ul className="flex flex-col gap-1 ">
            <li>
              <Link
                href="/"
                className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
              >
                <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
                  <User2 />
                  Profil Saya
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
              >
                <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
                  <PiMapPinFill size={25} />
                  Daftar Alamat
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
              >
                <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
                  <FileText />
                  Kelengkapan Data
                </Button>
              </Link>
            </li>
          </ul>
          <hr className="w-full h-[1.5px] bg-gray-400 my-3" />
          <ul className="flex flex-col gap-1 ">
            <li>
              <Link
                href="/"
                className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
              >
                <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
                  <FileClock />
                  Menunggu Pembayaran
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
              >
                <Button className="hover:bg-transparent bg-transparent text-black flex gap-2 items-center">
                  <History />
                  Daftar Transaksi
                </Button>
              </Link>
            </li>
          </ul>
          <hr className="w-full h-[1.5px] bg-gray-400 my-3" />
          <Link
            href="/"
            className="py-1 w-full hover:bg-gray-200 hover:translate-x-2 inline-block transition-all duration-300 rounded-lg"
          >
            <Button className="hover:bg-transparent bg-transparent text-red-500  flex gap-2 items-center">
              <LogOut />
              Logout
            </Button>
          </Link>
        </div>
        {/* menu */}
        {/* update profile */}
        <div className="rounded-xl p-3 w-full border shadow">
          <h1 className="font-semibold text-lg mb-5">Ubah Profil</h1>
          <div className="flex gap-2 lg:flex-nowrap flex-wrap h-fit items-center">
            {/* avatar */}
            <div className="w-40 h-32 rounded-lg">
              <Image
                src="/iphone.png"
                alt="/"
                width={200}
                height={200}
                loading="lazy"
                quality={100}
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
            {/* avatar */}

            {/* tombol */}
            <div className="flex lg:flex-col md:flex-col flex-row flex-wrap mt-2 lg:mt-0 gap-3">
              <div className="flex gap-2 items-center">
                <Button className="w-fit px-5 relative">
                  Ubah Foto
                  <input
                    type="file"
                    {...register('profilePicture')}
                    name="profilePicture"
                    onChange={(e) => setNameImage(e.target?.files?.[0]?.name)}
                    className="absolute top-0 right-0 left-0 z-30 w-full h-10 rounded-md opacity-0 overflow-hidden"
                  />
                </Button>
                <p className="text-sm">{nameImage ? nameImage : null}</p>
              </div>
              <Button variant="outline" className="w-fit">
                Hapus Foto
              </Button>
              <p className="text-xs text-gray-500">
                Gambar Profile Anda sebaiknya memiliki rasio 1:1 dan berukuran
                tidak lebih dari 2MB.
              </p>
            </div>
            {/* tombol */}
          </div>
          <div className="grid gap-4 mt-7 lg:grid-cols-2 grid-cols-1">
            <UpdateProfileForm
              Controller={Controller}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              register={register}
              reset={reset}
            />
          </div>
        </div>
        {/* update profile */}
      </div>
    </div>
  );
}
