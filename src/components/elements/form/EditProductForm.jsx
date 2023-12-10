'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import { productSchema } from '@/config/schema/product/productShema';
import FieldInput from '@/components/elements/input/FieldInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
import { Label } from '@/components/ui/label';
import { updateProduct } from '@/utils/api';
import useCategories from '@/hooks/api/useCategories';
import useMyStore from '@/hooks/api/useMyStore';
import { CheckCircle, Info } from 'lucide-react';
import useDetailProduct from '@/hooks/api/useDetailProduct';
import ButtonCancel from '../button/ButtonCancel';

export default function EditProductForm({ productId }) {
  const { data: categories } = useCategories();
  const { data: product } = useDetailProduct(productId);
  console.log(product);

  const { edgestore } = useEdgeStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const handleUpdateProduct = async (data) => {
    const picture = data?.productPicture?.[0];

    if (data.productPicture.length !== 0) {
      try {
        const res = await edgestore.publicFiles.upload({
          file: picture,
        });
        const product = {
          name: data?.name,
          storeId: store?.id,
          description: data?.description,
          price: Number(data?.price),
          maximumRental: Number(data?.maximumRental),
          stock: Number(data?.stock),
          availableStock: Number(data?.stock),
          categoryId: data?.categoryId,
          productPictures: [res?.url],
        };

        const response = await updateProduct(product, productId);

        if (response.status === 200) {
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
    } else {
      const product = {
        name: data?.name,
        storeId: store?.id,
        description: data?.description,
        price: Number(data?.price),
        maximumRental: Number(data?.maximumRental),
        stock: Number(data?.stock),
        availableStock: Number(data?.stock),
        categoryId: data?.categoryId,
      };
      const response = await updateProduct(product, productId);

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: response.data?.message,
          action: <CheckCircle />,
        });
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-5 p-4">
      <Card>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <CardHeader>
            <CardTitle>Ubah Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FieldInput
                  name={'name'}
                  type={'text'}
                  placeholder={'PS5'}
                  register={register}
                  required={true}
                />
                <ErrorMessageInput message={errors.name?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FieldInput
                  name={'price'}
                  type={'number'}
                  placeholder={'70.000'}
                  register={register}
                  min={1}
                  required={true}
                />
                <ErrorMessageInput message={errors.price?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FieldInput
                  label={'Maximum Rental'}
                  name={'maximumRental'}
                  type={'number'}
                  placeholder={'70'}
                  register={register}
                  min={1}
                  required={true}
                />
                <ErrorMessageInput message={errors.maximumRental?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FieldInput
                  name={'stock'}
                  type={'number'}
                  placeholder={7}
                  register={register}
                  min={1}
                  required={true}
                />
                <ErrorMessageInput message={errors.stock?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="categoryId">Category</Label>
                <Controller
                  control={control}
                  id="categoryId"
                  name="categoryId"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={product?.category} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories?.map((category) => (
                            <SelectItem value={category.id} key={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorMessageInput message={errors.categoryId?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FieldInput
                  label={'picture'}
                  name={'productPicture'}
                  type={'file'}
                  register={register}
                  className="cursor-pointer"
                />
                <ErrorMessageInput message={errors.productPicture?.message} />
              </div>
            </div>
            <div className="flex flex-col mt-4 space-y-1.5">
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
          <CardFooter className="flex justify-end mt-7 gap-5 px-0">
            <ButtonCancel
              back={back}
              title={'Batal Ubah Produk?'}
              message={
                'Apakah anda yakin akan membatalkan perubahan pada produk?'
              }
            />
            <ButtonSubmit
              isSubmitting={isSubmitting}
              text="Perbarui Produk"
              className="px-10 py-6"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
