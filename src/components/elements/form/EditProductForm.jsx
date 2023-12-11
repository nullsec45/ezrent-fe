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
import { initialProduct } from '@/config/constant/product/productInitialValues';
import { editProductSchema } from '@/config/schema/product/productShema';
import FieldInput from '@/components/elements/input/FieldInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
import { Label } from '@/components/ui/label';
import ButtonCancel from '../button/ButtonCancel';
import useCategories from '@/hooks/api/useCategories';
import { api } from '@/utils/axios';
import { PictureUploadDropzone } from '../input/PictureUploadDropzone';
import { useState } from 'react';
import { updateProduct } from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function EditProductForm({ productId }) {
  const { data: categories } = useCategories();
  const [file, setFile] = useState();
  const router = useRouter();

  const { edgestore } = useEdgeStore();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      const response = await api.get(`/products/${productId}`);
      const {
        name,
        price,
        maximumRental,
        stock,
        availableStock,
        categoryId,
        description,
        productPictures,
      } = response.data.data;

      setFile(productPictures[0].url);

      return {
        name,
        price,
        maximumRental,
        stock,
        availableStock,
        categoryId,
        description,
      };
    },
    resolver: yupResolver(editProductSchema),
  });

  const handleUpdateProduct = async (data) => {
    const picture = file;

    if (picture) {
      try {
        let productPictures = picture;

        // cek apakah gambar produk di update, jika productPictures tidak bertipe 'string', berarti gambar diupdate
        if (typeof productPictures !== 'string') {
          const res = await edgestore.publicFiles.upload({
            file: picture,
          });

          productPictures = res?.url;
        }

        const product = {
          name: data?.name,
          description: data?.description,
          price: Number(data?.price),
          maximumRental: Number(data?.maximumRental),
          stock: Number(data?.stock),
          availableStock: Number(data?.availableStock),
          productPictures: [productPictures],
          availableStock: Number(data?.stock),
          categoryId: data?.categoryId,
        };

        const response = await updateProduct(productId, product);

        if (response.status === 200) {
          reset(initialProduct);
          router.push('/store/dashboard/products');
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
    <div className="max-w-4xl mx-auto">
      <Card className="border-none">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <CardHeader className="p-0">
            <CardTitle className="font-bold text-xl mb-6">
              Edit Produk
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
                  label={'Stok Total'}
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
                <FieldInput
                  label={'Stok Tersedia'}
                  name={'availableStock'}
                  type={'number'}
                  placeholder={'5'}
                  helperTextTop={
                    'Contoh: Jika Stok Total Anda berjumlah 20 dan ada 5 barang Anda yang sedang disewa, maka isikan Stok Tersedia dengan jumlah 15'
                  }
                  register={register}
                  min={0}
                  required={true}
                />
                <ErrorMessageInput message={errors.availableStock?.message} />
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
                        <SelectGroup defaultValue={field.value}>
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
                  height={250}
                  width={250}
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
          <CardFooter className="flex justify-end mt-7 gap-5 px-0">
            <ButtonCancel
              back={router.back}
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
