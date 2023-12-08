'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addressInitialValues } from '@/config/constant/address/addressInitialValues';
import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import { addressSchema } from '@/config/schema/address/addressSchema';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import ButtonCancel from '@/components/elements/button/ButtonCancel';
import FieldInput from '@/components/elements/input/FieldInput';
import useSubDistricts from '@/hooks/api/useSubDistricts';
import { Controller, useForm } from 'react-hook-form';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import usePostalCode from '@/hooks/api/usePostalCode';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea } from '@/components/ui/textarea';
import useProvinces from '@/hooks/api/useProvinces';
import useDistricts from '@/hooks/api/useDistricts';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle, Info } from 'lucide-react';
import useCities from '@/hooks/api/useCities';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { createAddress } from '@/utils/api';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

export default function AddAddressForm() {
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
    defaultValues: addressInitialValues,
    resolver: yupResolver(addressSchema),
  });

  const [provinceId, setProvinceId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [position, setPosition] = useState(null);

  const { data: provinces } = useProvinces();
  const { data: cities } = useCities(provinceId);
  const { data: districts } = useDistricts(cityId);
  const { data: subDistricts } = useSubDistricts(districtId);
  const { data: postalCodes } = usePostalCode(cityId, districtId);

  const { back } = useRouter();

  const handleAddAddress = async (data) => {
    try {
      const address = {
        label: data?.label,
        recipientName: data?.recipientName,
        phoneNumber: data?.phoneNumber,
        province: data?.province,
        city: data?.city,
        district: data?.district,
        subDistrict: data?.subDistrict,
        fullAddress: data?.fullAddress,
        postalCode: data?.postalCode,
        latitude: position?.lat.toString(),
        longitude: position?.lng.toString(),
      };

      const response = await createAddress(address);
      if (response?.status === 201) {
        reset(addressInitialValues);
        back();
        toast({
          title: 'Success',
          description: response.data?.message,
          action: <CheckCircle />,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error?.message,
        action: <Info />,
      });
    }
  };
  return (
    <>
      <Card className="border-none shadow-none">
        <form onSubmit={handleSubmit(handleAddAddress)}>
          <CardContent className="space-y-7 p-0">
            <div className="flex flex-col space-y-1.5">
              <FieldInput
                label="Label Alamat"
                name="label"
                type="text"
                placeholder="Rumah"
                register={register}
                required={true}
              />
              <ErrorMessageInput message={errors.label?.message} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <FieldInput
                label="Nama Penerima"
                name="recipientName"
                type="text"
                placeholder="John Doe"
                register={register}
                required={true}
              />
              <ErrorMessageInput message={errors.recipientName?.message} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <FieldInput
                label="Nomor Handphone"
                name="phoneNumber"
                type="tel"
                placeholder="0812XXXXXXXX"
                helperTextTop="Gunakan nomor Whatsapp agar mudah dihubungi"
                register={register}
                required={true}
              />
              <ErrorMessageInput message={errors.phoneNumber?.message} />
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
                      <SelectValue placeholder="Pilih Kota" />
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

            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-col mt-4 space-y-1.5">
                <Label htmlFor="fullAddress">Alamat Lengkap</Label>
                <Textarea
                  id="fullAddress"
                  name="fullAddress"
                  placeholder="Jl Mawar RT 05/RW 02 No.2"
                  className="min-h-[7rem]"
                  rows="2"
                  {...register('fullAddress')}
                />
                <ErrorMessageInput message={errors.fullAddress?.message} />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 ">
              <Label>Pilih Lokasi Anda</Label>
              <div className="text-xs text-gray-500 font-medium max-w-md">
                Pilih lokasi anda dengan memberikan PIN pada peta.
              </div>
              <Map position={position} setPosition={setPosition} />
            </div>

            <div className="flex flex-col gap-3 items-end max-w-lg ml-auto mt-7 text-gray-500">
              <BsFillInfoCircleFill className="w-5 h-5 inline-block" />
              <span className="text-xs font-medium text-end">
                Pastikan alamat sesuai dengan tempat tinggal anda saat ini
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end mt-7 gap-5 px-0">
            <ButtonCancel
              back={back}
              title={'Batal Tambah Alamat?'}
              message={'Apakah anda yakin akan membatalkan pembuatan alamat?'}
            />
            <ButtonSubmit
              isSubmitting={isSubmitting}
              text="Tambahkan Alamat"
              className="px-10 py-6"
            />
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
