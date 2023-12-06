'use client';

import { Controller, useForm } from 'react-hook-form';
import ErrorMessageInput from '../errors/ErrorMessageInput';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ButtonSubmit from '../button/ButtonSubmit';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import FieldInput from '../input/FieldInput';
import { Textarea } from '@/components/ui/textarea';
import useProvinces from '@/hooks/api/useProvinces';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useEdgeStore } from '@/lib/edgestore';
import { toast } from '@/components/ui/use-toast';
import { addStore } from '@/utils/api';
import useCities from '@/hooks/api/useCities';
import useDistricts from '@/hooks/api/useDistricts';
import useSubDistricts from '@/hooks/api/useSubDistricts';
import usePostalCode from '@/hooks/api/usePostalCode';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export default function OpenStoreForm() {
  const { edgestore } = useEdgeStore();

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
  } = useForm();
  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

  const { data: provinces } = useProvinces();

  const [position, setPosition] = useState(null);
  // {last, lng} <- posisi

  const { data: cities } = useCities(provinceId); // ini GET Kota berdasarkan ID Provinsi nya
  const { data: districts } = useDistricts(cityId); // ini GET Kecamatan berdasarkan ID Kota nya
  const { data: subDistricts } = useSubDistricts(districtId); // ini GET Kelurahan berdasarkan ID Kecataman nya
  const { data: postalCodes } = usePostalCode(cityId, districtId); // ini GET KodePos berdasarkan ID Kota && ID Kecamatan nya

  const handleOpenStore = async (data) => {
    console.log(data);
    const profilePicture = data?.profilePicture?.[0];

    if (data.profilePicture.length !== 0) {
      try {
        const res = await edgestore.publicFiles.upload({
          file: profilePicture,
        });

        const store = {
          name: data?.name,
          profilePicture: res?.url,
          description: data?.description,
          accountNumber: data?.accountNumber,
          storeAddress: {
            province: data?.province,
            city: data?.city,
            district: data?.district,
            subDistrict: data?.subDistrict,
            fullAddress: data?.fullAddress,
            postalCode: position?.postalCode,
            latitude: position?.lat,
            longitude: position?.lng,
          },
        };

        const response = await addStore(store);
        if (response.status === 201) {
          reset(initialStore);
          toast({
            title: 'Success',
            description: response.data?.message,
          });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error?.message,
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please pick one picture',
      });
    }
  };
  return (
    <>
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

            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="province">Provinsi</Label>
              <Controller
                control={control}
                name="province"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      const province = value.split(',');
                      field.onChange(province[1]);
                      setProvinceId(province[0]);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Provinsi" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      <SelectGroup>
                        {provinces?.map((province) => (
                          <SelectItem
                            value={`${province.id},${province.text}`}
                            key={province.id}
                          >
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
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="city">Kota</Label>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      const city = value.split(',');
                      field.onChange(city[1]);
                      setCityId(city[0]);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kota" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      <SelectGroup>
                        {cities?.map((city) => (
                          <SelectItem
                            value={`${city.id},${city.text}`}
                            key={city.id}
                          >
                            {city.text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessageInput message={errors.city?.message} />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="district">Kecamatan</Label>
              <Controller
                control={control}
                name="district"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      const district = value.split(',');
                      field.onChange(district[1]);
                      setDistrictId(district[0]);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kecamatan" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      <SelectGroup>
                        {districts?.map((district) => (
                          <SelectItem
                            value={`${district.id},${district.text}`}
                            key={district.id}
                          >
                            {district.text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessageInput message={errors.district?.message} />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="subDistrict">Kelurahan</Label>
              <Controller
                control={control}
                name="subDistrict"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      const subDistrict = value.split(',');
                      field.onChange(subDistrict[1]);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kelurahan" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      <SelectGroup>
                        {subDistricts?.map((subDistrict) => (
                          <SelectItem
                            value={`${subDistrict.id},${subDistrict.text}`}
                            key={subDistrict.id}
                          >
                            {subDistrict.text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessageInput message={errors.subDistrict?.message} />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="postalCode">Kode POS</Label>
              <Controller
                control={control}
                name="postalCode"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      const postalCode = value.split(',');
                      field.onChange(postalCode[1]);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kelurahan" />
                    </SelectTrigger>
                    <SelectContent className="z-[9999]">
                      <SelectGroup>
                        {postalCodes?.map((postalCode) => (
                          <SelectItem
                            value={`${postalCode.id},${postalCode.text}`}
                            key={postalCode.id}
                          >
                            {postalCode.text}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessageInput message={errors.subDistrict?.message} />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Map position={position} setPosition={setPosition} />
            </div>
          </CardContent>
          <CardFooter>
            <ButtonSubmit isSubmitting={isSubmitting} text="Buka Toko" />
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
