'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { initialStore } from '@/config/constant/store/initialStoreValues';
import { storeSchema } from '@/config/schema/store/storeSchema';
import { addStore } from '@/utils/api';

export default function AddStoreForm() {
  const { edgestore } = useEdgeStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialStore,
    resolver: yupResolver(storeSchema),
  });

  const handleAddStore = async (data) => {
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
          address: {
            city: data?.city,
            province: data?.province,
            district: data?.district,
            fullAddress: data?.fullAddress,
            postalCode: data?.postalCode,
            latitude: data?.latitude,
            longitude: data?.longitude,
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
    <div className="max-w-4xl mx-auto mt-5 p-4">
      <Card>
        <form onSubmit={handleSubmit(handleAddStore)}>
          <CardHeader>
            <CardTitle>Create Store</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Bukataplak"
                  {...register('name')}
                />
                <ErrorMessageInput message={errors.name?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">Picture</Label>
                <Input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  {...register('profilePicture')}
                  className="cursor-pointer"
                />
                <ErrorMessageInput message={errors.profilePicture?.message} />
              </div>
            </div>

            <div className="my-4">
              <h1>Address</h1>
            </div>
            <div className="gap-4 grid lg:grid-cols-2 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 w-full">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Jakarta"
                  {...register('city')}
                />
                <ErrorMessageInput message={errors.city?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  name="province"
                  type="text"
                  placeholder="Jawa Barat"
                  {...register('province')}
                />
                <ErrorMessageInput message={errors.profince?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">District</Label>
                <Input
                  id="district"
                  name="district"
                  type="text"
                  placeholder="Jakarta Selatan"
                  {...register('district')}
                />
                <ErrorMessageInput message={errors.district?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="41235"
                  {...register('postalCode')}
                />
                <ErrorMessageInput message={errors.postalCode?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="text"
                  placeholder="+126-8384"
                  {...register('latitude')}
                />
                <ErrorMessageInput message={errors.latitude?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="text"
                  placeholder="-826-2384"
                  {...register('longitude')}
                />
                <ErrorMessageInput message={errors.longitude?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  placeholder="8210489120"
                  {...register('accountNumber')}
                />
                <ErrorMessageInput message={errors.longitude?.message} />
              </div>
              <div className="flex col-span-2 flex-col space-y-1.5">
                <Label htmlFor="fullAddress">Full Address</Label>
                <Textarea
                  id="fullAddress"
                  name="fullAddress"
                  placeholder="Jl. nin aja dulu, beli seblack kemudian"
                  className="min-h-[10rem]"
                  {...register('fullAddress')}
                />
                <ErrorMessageInput message={errors.fullAddress?.message} />
              </div>
            </div>
            <div className="flex w-full mt-4 flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="description"
                className="min-h-[10rem]"
                {...register('description')}
              />
              <ErrorMessageInput message={errors.description?.message} />
            </div>
          </CardContent>
          <CardFooter>
            <ButtonSubmit isSubmitting={isSubmitting} text={'Create Store'} />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
