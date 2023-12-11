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
import useCategories from '@/hooks/api/useCategories';
import useMyStore from '@/hooks/api/useMyStore';
<<<<<<< HEAD
import { CheckCircle, Info } from 'lucide-react';
=======
import { PictureUploadDropzone } from '../input/PictureUploadDropzone';
import { useState } from 'react';
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)

export default function AddProductForm() {
  const { data: categories } = useCategories();
  const { data: store } = useMyStore();
  const [file, setFile] = useState();

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
    const picture = file;

    if (picture) {
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

        const response = await addProduct(product);

        if (response.status === 201) {
          reset(initialProduct);
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
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please pick one picture',
        action: <Info />,
      });
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none">
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <CardHeader className="p-0">
            <CardTitle className="font-bold text-xl mb-6">
              Tambah Produk
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <FieldInput
                  label={'Nama Produk'}
                  name={'name'}
                  type={'text'}
                  placeholder={'Nama Produk dan Tipe'}
                  register={register}
                  required={true}
                />
                <ErrorMessageInput message={errors.name?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FieldInput
                  label={'Harga Sewa/Hari'}
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
                  label={'Maksimum Hari Penyewaan'}
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
                  label={'Stok'}
                  name={'stock'}
                  type={'number'}
                  placeholder={'7'}
                  register={register}
                  min={1}
                  required={true}
                />
                <ErrorMessageInput message={errors.stock?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="categoryId">Kategori</Label>
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
                <Label>Upload Gambar Produk</Label>
                <PictureUploadDropzone
                  value={file}
                  onChange={(file) => {
                    setFile(file);
                  }}
                  height={200}
                  className="w-full h-96"
                />
              </div>
            </div>
            <div className="flex flex-col mt-4 space-y-1.5">
              <Label htmlFor="description">Deskripsi Produk</Label>
              <p className="text-gray-500 text-xs md:max-w-lg">
                Deskripsikan produk Anda secara detail, Anda juga bisa
                menuliskan tipe-tipe barang Anda dan menuliskan syarat-syarat
                tambahan untuk menyewa barang Anda
              </p>
              <Textarea
                id="description"
                name="description"
                placeholder="Tulis deskripsi Anda disini"
                className="min-h-[10rem]"
                {...register('description')}
              />
              <ErrorMessageInput message={errors.description?.message} />
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-5 flex justify-end">
            <ButtonSubmit isSubmitting={isSubmitting} text={'Tambah Produk'} />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
