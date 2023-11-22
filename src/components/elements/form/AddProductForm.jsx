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
import { initialProduct } from '@/config/constant/product/productInitialValues';
import ButtonSubmit from '@/components/elements/button/ButtonSubmit';
import { productSchema } from '@/config/schema/product/productShema';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addProduct } from '@/utils/api';

const categories = [
  { name: 'student', id: 1 },
  { name: 'developer', id: 2 },
  { name: 'manager', id: 3 },
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
          storeId: 1,
          description: data?.description,
          price: data?.price,
          maximumRental: data?.maximumRental,
          stock: data?.stock,
          categoryId: data?.categoryId,
          productPicture: res?.url,
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name of your product"
                  {...register('name')}
                />
                <ErrorMessageInput message={errors.name?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="70.000"
                  {...register('price')}
                />
                <ErrorMessageInput message={errors.price?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Maximum Rental</Label>
                <Input
                  id="maximumRental"
                  name="maximumRental"
                  type="number"
                  placeholder="70"
                  {...register('maximumRental')}
                />
                <ErrorMessageInput message={errors.maximumRental?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="7"
                  {...register('stock')}
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
                <ErrorMessageInput message={errors.category?.message} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">Picture</Label>
                <Input
                  type="file"
                  id="productPicture"
                  name="productPicture"
                  {...register('productPicture')}
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
