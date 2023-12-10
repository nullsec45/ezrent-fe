'use client';

import { Button } from '@/components/ui/button';
import FieldInput from '../input/FieldInput';
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
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import ErrorMessageInput from '../errors/ErrorMessageInput';
import PropTypes from 'prop-types';
import { updateProfile } from '@/utils/api';
import { CheckCircle } from 'lucide-react';

export default function UpdateProfileForm({
  register,
  control,
  Controller,
  handleSubmit,
  errors,
  isSubmitting,
}) {
  const { edgestore } = useEdgeStore();

  const handleUpdateProfile = async (data) => {
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
    } else {
      const profile = {
        fullname: data?.fullname,
        gender: data?.gender,
        dateOfbirth: data?.dateOfbirth,
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
  return (
    <>
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
        <Button
          onClick={handleSubmit(handleUpdateProfile)}
          className="block px-12"
          type="submit"
          disabled={isSubmitting}
        >
          Update
        </Button>
      </div>
    </>
  );
}

UpdateProfileForm.propTypes = {
  errors: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  Controller: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
