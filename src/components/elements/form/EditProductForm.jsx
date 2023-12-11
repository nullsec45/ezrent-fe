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
<<<<<<< HEAD
import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import { productSchema } from '@/config/schema/product/productShema';
=======
import { initialProduct } from '@/config/constant/product/productInitialValues';
import ErrorMessageInput from '@/components/elements/errors/ErrorMessageInput';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import { editProductSchema } from '@/config/schema/product/productShema';
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
import FieldInput from '@/components/elements/input/FieldInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
import { Label } from '@/components/ui/label';
<<<<<<< HEAD
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
=======
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
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)

  const { edgestore } = useEdgeStore();
  const {
    register,
    handleSubmit,
    control,
<<<<<<< HEAD
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
=======
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
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
          description: data?.description,
          price: Number(data?.price),
          maximumRental: Number(data?.maximumRental),
          stock: Number(data?.stock),
<<<<<<< HEAD
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
=======
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
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
          });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error?.message,
<<<<<<< HEAD
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
=======
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
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
                  register={register}
                  required={true}
                />
                <ErrorMessageInput message={errors.name?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FieldInput
<<<<<<< HEAD
=======
                  label={'Harga Sewa/Hari'}
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
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
<<<<<<< HEAD
                  label={'Maximum Rental'}
=======
                  label={'Maksimum Hari Penyewaan'}
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
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
<<<<<<< HEAD
                  name={'stock'}
                  type={'number'}
                  placeholder={7}
=======
                  label={'Stok Total'}
                  name={'stock'}
                  type={'number'}
                  placeholder={'7'}
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
                  register={register}
                  min={1}
                  required={true}
                />
                <ErrorMessageInput message={errors.stock?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
<<<<<<< HEAD
                <Label htmlFor="categoryId">Category</Label>
=======
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
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
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
<<<<<<< HEAD
                        <SelectValue placeholder={product?.category} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
=======
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup defaultValue={field.value}>
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
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
<<<<<<< HEAD
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
=======
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
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
                className="min-h-[10rem]"
                {...register('description')}
              />
              <ErrorMessageInput message={errors.description?.message} />
            </div>
          </CardContent>
<<<<<<< HEAD
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
=======

          <CardFooter className="p-0 mt-5 flex justify-end">
            <ButtonSubmit isSubmitting={isSubmitting} text={'Edit Produk'} />
>>>>>>> c6feaf0 (fix(store-dashboard): add Add Product and Edit Product page on Store Dashboard)
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
