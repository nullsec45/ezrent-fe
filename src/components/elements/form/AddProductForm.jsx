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
import { initialProduct } from '@/config/constant/product/productInitialValues';
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
import { addProduct } from '@/utils/api';

const categories = [
  { name: 'Elektronik', id: 'c58d789f-c681-4b36-9710-411bfbb6f7b3' },
  { name: 'Lainnya', id: '6agwh9f-c681-827b-9710-813501bf7b3' },
];

export default function AddProductForm() {
  const { edgestore } = useEdgeStore();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialProduct,
    resolver: yupResolver(productSchema),
  });

  const handleAddProduct = async (data) => {
    const picture = data?.productPicture?.[0];

    if (data.productPicture.length !== 0) {
      try {
        const res = await edgestore.publicFiles.upload({
          file: picture,
        });
        const product = {
          name: data?.name,
          storeId: 'f1119eed-14ee-4ebd-9a32-d8661990f66b',
          description: data?.description,
          price: Number(data?.price),
          maximumRental: Number(data?.maximumRental),
          stock: Number(data?.stock),
          availableStock: Number(data?.stock),
          categoryId: data?.categoryId,
          productPictures: [res?.url],
        };

        const response = await addProduct(product);

        if (response.status === 201) {
          reset(initialProduct);
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
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <CardHeader>
            <CardTitle>Add Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FieldInput
                  name={'name'}
                  type={'text'}
                  placeholder={'Name of your product'}
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
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories?.map((item, i) => (
                            <SelectItem value={item.id.toString()} key={i}>
                              {item.name}
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
          <CardFooter>
            <ButtonSubmit isSubmitting={isSubmitting} text={'Add Product'} />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
