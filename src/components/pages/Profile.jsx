'use client';

import UpdateProfileForm from '@/components/elements/form/UpdateProfileForm';
import { updateProfileSchema } from '@/config/schema/profile/profileSchema';
import SmallMenu from '@/components/elements/menu/SmallMenu';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useMyProfile from '@/hooks/api/useMyProfile';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { ImageOff } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Profile() {
  const [previewImage, setPreviewImage] = useState(null);
  const { data: user } = useMyProfile();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });
  return (
    <div className="container">
      <Breadcrumbs
        items={[
          {
            name: 'Dashboard',
            link: '/dashboard',
          },
          {
            name: 'Profil Saya',
            link: '/dashboard/profile',
          },
        ]}
      />
      <div className="flex lg:flex-nowrap flex-wrap gap-4 my-12 lg:px-3">
        {/* menu */}
        <SmallMenu />
        {/* menu */}

        {/* update profile */}
        <div className="rounded-xl p-3 w-full border shadow">
          <h1 className="font-semibold text-lg mb-5">Ubah Profil</h1>
          <div className="flex gap-2 lg:flex-nowrap flex-wrap h-fit items-center">
            {/* avatar */}
            <div className="w-40 h-32 rounded-lg">
              {!user ? (
                previewImage ? (
                  <Image
                    src={previewImage}
                    alt="foto profil"
                    width={200}
                    height={200}
                    loading="lazy"
                    quality={100}
                    className="h-full w-full rounded-lg object-contain"
                  />
                ) : (
                  <div className="rounded-lg bg-gray-200 shadow h-full flex text-gray-600 items-center flex-col justify-center">
                    <ImageOff />
                    <h1 className="text-center text-sm font-medium mt-2">
                      Tidak ada Foto
                    </h1>
                  </div>
                )
              ) : (
                <Image
                  src={previewImage ? previewImage : user?.profilePicture}
                  alt="foto profil"
                  width={200}
                  height={200}
                  loading="lazy"
                  quality={100}
                  className="h-full w-full rounded-lg object-contain"
                />
              )}
            </div>
            {/* avatar */}

            <div className="flex lg:flex-col md:flex-col flex-row flex-wrap mt-2 lg:mt-0 gap-3">
              <div className="flex gap-2 items-center cursor-pointer">
                <Button className="w-fit px-5 relative">
                  Ubah Foto
                  <input
                    type="file"
                    {...register('profilePicture')}
                    name="profilePicture"
                    accept="image/*"
                    onChange={(e) =>
                      setPreviewImage(
                        URL?.createObjectURL?.(e.target?.files?.[0])
                      )
                    }
                    className="absolute top-0 right-0 left-0 z-30 w-full h-10 rounded-md cursor-pointer opacity-0 overflow-hidden"
                  />
                </Button>
              </div>
              <Button variant="outline" className="w-fit">
                Hapus Foto
              </Button>
              <p className="text-xs text-gray-500">
                Gambar Profile Anda sebaiknya memiliki rasio 1:1 dan berukuran
                tidak lebih dari 2MB.
              </p>
            </div>
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
