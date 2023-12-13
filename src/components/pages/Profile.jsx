'use client';

import { updateProfileSchema } from '@/config/schema/profile/profileSchema';
import SmallMenu from '@/components/elements/menu/SmallMenu';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useMyProfile from '@/hooks/api/useMyProfile';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { ImageOff, Info } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import FieldInput from '@/components/elements/input/FieldInput';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEdgeStore } from '@/lib/edgestore';
import { toast } from '@/components/ui/use-toast';
import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import { addProfile, updateProfile } from '@/utils/api';
import { CheckCircle } from 'lucide-react';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';

export default function Profile() {
  const [previewImage, setPreviewImage] = useState(null);
  const { data: user } = useMyProfile();
  const { edgestore } = useEdgeStore();

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: user ? user : null,
    resolver: yupResolver(updateProfileSchema),
  });

  const handleUpdateProfile = async (data) => {
    const profilePicture = data?.profilePicture?.[0];

    if (data.profilePicture.length !== 0) {
      if (data?.profilePicture == user?.profilePicture) {
        const profile = {
          fullname: data?.fullname,
          gender: data?.gender,
          dateOfbirth: new Date(data?.dateOfbirth).toISOString(),
          phoneNumber: data?.phoneNumber,
          profilePicture: data?.profilePicture,
        };

        const response = await updateProfile(profile);

        if (response?.status === 200) {
          toast({
            title: 'Success',
            description: response?.data?.message,
            action: <CheckCircle />,
          });
        }
      } else {
        try {
          const res = await edgestore.publicFiles.upload({
            file: profilePicture,
          });
          const profile = {
            fullname: data?.fullname,
            gender: data?.gender,
            dateOfbirth: new Date(data?.dateOfbirth).toISOString(),
            phoneNumber: data?.phoneNumber,
            profilePicture: res?.url,
          };
          const response = await updateProfile(profile);

          if (response?.status === 200) {
            toast({
              title: 'Success',
              description: response?.data?.message,
              action: <CheckCircle />,
            });
          }
        } catch (error) {
          console.log(error?.message);
        }
      }
    } else {
      const profile = {
        fullname: data?.fullname,
        gender: data?.gender,
        dateOfbirth: new Date(data?.dateOfbirth).toISOString(),
        phoneNumber: data?.phoneNumber,
      };
      const response = await updateProfile(profile);

      if (response?.status === 200) {
        toast({
          title: 'Success',
          description: response?.data?.message,
          action: <CheckCircle />,
        });
      }
    }
  };

  const handleCreateProfile = async (data) => {
    const profilePicture = data?.profilePicture?.[0];
    if (data.profilePicture.length !== 0) {
      try {
        const res = await edgestore.publicFiles.upload({
          file: profilePicture,
        });
        const profile = {
          fullname: data?.fullname,
          gender: data?.gender,
          dateOfbirth: new Date(data?.dateOfbirth).toISOString(),
          phoneNumber: data?.phoneNumber,
          profilePicture: res?.url,
        };

        const response = await addProfile(profile);

        if (response?.status === 201) {
          toast({
            title: 'Success',
            description: response?.data?.message,
            action: <CheckCircle />,
          });
        }
      } catch (error) {
        console.log(error?.message);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Opps!',
        description: 'Foto profil tidak boleh kosong',
        action: <Info />,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(user ? handleUpdateProfile : handleCreateProfile)}
      className="rounded-xl w-full"
    >
      <h1 className="font-semibold text-lg mb-5">Ubah Profil</h1>
      <div className="flex gap-2 lg:flex-nowrap flex-wrap h-fit items-center">
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
                  setPreviewImage(URL?.createObjectURL?.(e.target?.files?.[0]))
                }
                className="absolute top-0 right-0 left-0 z-30 w-full h-10 rounded-md cursor-pointer opacity-0 overflow-hidden"
              />
            </Button>
          </div>
          <Button variant="outline" className="w-fit">
            Hapus Foto
          </Button>
          <p className="text-xs text-gray-500">
            Gambar Profile Anda sebaiknya memiliki rasio 1:1 dan berukuran tidak
            lebih dari 2MB.
          </p>
        </div>
      </div>
      <div className="grid gap-4 mt-7 lg:grid-cols-2 grid-cols-1">
        <div className="col-span-2">
          <FieldInput
            name={'fullname'}
            label={'Nama Lengkap'}
            type={'text'}
            required={true}
            placeholder={'ex. John Doe'}
            register={register}
          />
          <ErrorMessageInput message={errors?.fullname?.message} />
        </div>
        <div className="lg:col-span-1 col-span-2">
          <FieldInput
            name={'dateOfbirth'}
            label={'Tanggal Lahir'}
            type={'date'}
            required={true}
            register={register}
          />
          <ErrorMessageInput message={errors?.dateOfbirth?.message} />
        </div>
        <div className="lg:col-span-1 col-span-2">
          <Label
            htmlFor={'gender'}
            className="capitalize block mb-2 text-gray-600"
          >
            Jenis Kelamin
          </Label>
          <Controller
            control={control}
            id="gender"
            name="gender"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full text-gray-600">
                  <SelectValue placeholder="Pilih Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={'LAKI'}>LAKI - LAKI</SelectItem>
                    <SelectItem value={'PEREMPUAN'}>PEREMPUAN</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <ErrorMessageInput message={errors?.gender?.message} />
        </div>
        <div className="col-span-2">
          <FieldInput
            name={'phoneNumber'}
            label={'Nomor Telepon'}
            type={'number'}
            min={1}
            required={true}
            register={register}
            placeholder={'ex. 08xxxx'}
          />
          <ErrorMessageInput message={errors?.phoneNumber?.message} />
        </div>
        <div className="flex justify-end col-span-2 mt-2">
          <ButtonSubmit
            className={'px-12'}
            text={'Update Profil'}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}
