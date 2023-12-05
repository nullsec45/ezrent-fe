'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { initialStore } from '@/config/constant/store/initialStoreValues';
import { storeSchema } from '@/config/schema/store/storeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import FieldInput from '@/components/elements/input/FieldInput';
import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import ButtonSubmit from '../button/ButtonSubmit';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useProvinces from '@/hooks/api/useProvinces';
import useCities from '@/hooks/api/useCities';
import useDistricts from '@/hooks/api/useDistricts';
import useSubDistricts from '@/hooks/api/useSubDistricts';
import usePostalCode from '@/hooks/api/usePostalCode';

export default function OpenStoreForm() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/elements/map/Map'), { ssr: false }),
    []
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialStore,
    resolver: yupResolver(storeSchema),
  });

  // position ini isinya LATITUDE & LONGITUDE
  const [position, setPosition] = useState(null);
  console.log(position);

  const { data: provinces } = useProvinces();
  // const { data: cities } = useCities(provinceId); // ini GET Kota berdasarkan ID Provinsi nya
  // const { data: districts } = useDistricts(cityId); // ini GET Kecamatan berdasarkan ID Kota nya
  // const { data: subDistricts } = useSubDistricts(districtId); // ini GET Kelurahan berdasarkan ID Kecataman nya
  // const { data: postalCode } = usePostalCode(cityId, districtId); // ini GET KodePos berdasarkan ID Kota && ID Kecamatan nya

  const handleOpenStore = async (data) => {
    console.log('SUBMIT');
  };

  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit(handleOpenStore)}>
          <CardHeader>
            <CardTitle>Buka Toko</CardTitle>
          </CardHeader>

          <CardContent className="space-y-7">
            <div className="flex flex-col space-y-1.5">
              <FieldInput
                label="Nama Toko"
                name="name"
                type="text"
                placeholder="Nama Toko Anda"
                register={register}
                required={true}
              />
              <ErrorMessageInput message={errors.name?.message} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-col mt-4 space-y-1.5">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Deskripsikan toko anda secara singkat"
                  className="min-h-[10rem]"
                  {...register('description')}
                />
                <ErrorMessageInput message={errors.description?.message} />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <FieldInput
                label="Nomor Rekening"
                name="accountNumber"
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
                helperText="Masukkan 16 digit nomor rekening tanpa spasi"
                register={register}
                required={true}
                pattern="[0-9\s]{13,19}"
              />
              <ErrorMessageInput message={errors.accountNumber?.message} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FieldInput
                label="Foto Profil Toko"
                name="profilePicture"
                type="file"
                register={register}
                className="cursor-pointer"
              />
              <ErrorMessageInput message={errors.profilePicture?.message} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="province">Provinsi</Label>
              <Controller
                control={control}
                id="province"
                name="province"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {provinces?.map((province) => (
                          <SelectItem value={province.text} key={province.id}>
                            {province.text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessageInput message={errors.province?.message} />
            </div>
          </CardContent>

          <div className="px-7">
            <Map position={position} setPosition={setPosition} />
          </div>

          <CardFooter>
            <ButtonSubmit isSubmitting={isSubmitting} text="Buka Toko" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
