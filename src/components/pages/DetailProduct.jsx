'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProductCard from '@/components/elements/card/ProductCard';
import ProductMainContent from '@/components/elements/detailProduct/ProductMainContent';
import ProductDescription from '@/components/elements/detailProduct/ProductDescription';
import useDetailProduct from '@/hooks/api/useDetailProduct';

const reviews = [
  {
    body: 'haha',
    review_image: [
      {
        image: 'https://picsum.photos/seed/picsum/200/300',
      },
    ],
  },
  {
    body: 'haha',
    review_image: null,
  },
];
const products = [
  {
    id: 'c63b7789-3859-4d88-84b2-b8cc39dc5d37',
    categoryId: 'c58d789f-c681-4b36-9710-411bfbb6f7b3',
    storeId: 'c41c7358-4c1b-4f01-8b99-9883b6c9a394',
    name: 'XBOX ONE',
    description: 'description XBOX one',
    price: 150000,
    maximumRental: 10,
    stock: 100,
    availableStock: 98,
    createdAt: '2023-11-23T05:02:05.617Z',
    updatedAt: '2023-11-23T05:06:25.483Z',
    productPictures: [
      {
        id: 'bddfe5c8-3f1a-40ac-8733-60b4f079e322',
        url: 'https://example.com/xbox.jpg',
        productId: 'c63b7789-3859-4d88-84b2-b8cc39dc5d37',
      },
    ],
    store: {
      id: 'c41c7358-4c1b-4f01-8b99-9883b6c9a394',
      name: 'TechShop',
      storeAddress: null,
    },
  },
];

export default function DetailProduct({ productId }) {
  const { data: product } = useDetailProduct(productId);

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          {
            name: 'Produk',
            link: '/products',
          },
          {
            name: product?.name,
            link: '#',
          },
        ]}
      />

      <ProductMainContent productId={productId} />

      <div className="mb-14 mt-28 lg:px-3">
        <ProductDescription productId={productId} />
        {/* review */}
        <div>
          <h1 className="text-xl font-medium">Reviews</h1>
          <div className="my-6 flex flex-wrap items-center lg:flex-nowrap gap-7">
            <div className="p-5 rounded-2xl shadow-md bg-gray-100 text-center max-w-[10rem] h-fit w-full">
              <h1 className="font-medium text-5xl ">4.8</h1>
              <p className="text-gray-500 text-sm my-2">of 125 reviews</p>
              <div className="flex gap-4 lg:gap-1 justify-center">
                <IoStar className="w-6 h-6 text-yellow-400" />
                <IoStar className="w-6 h-6 text-yellow-400" />
                <IoStar className="w-6 h-6 text-yellow-400" />
                <IoStar className="w-6 h-6 text-yellow-400" />
                <IoStarOutline className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="p-5 lg:ml-10 rounded-xl shadow-md bg-gray-100 text-center max-w-[7rem] h-fit w-full">
              <IoStar className="w-6 h-6 text-yellow-400 text-center mx-auto" />
              <p className="text-gray-500 text-sm my-2">0 Review</p>
            </div>
            <div className="p-5 rounded-xl shadow-md bg-gray-100 text-center max-w-[7rem] h-fit w-full">
              <div className="flex gap-1 justify-center items-center">
                <IoStar className="w-6 h-6 text-yellow-400 text-center" />
                <IoStar className="w-6 h-6 text-yellow-400 text-center" />
              </div>
              <p className="text-gray-500 text-sm my-2">0 Review</p>
            </div>
            <div className="p-5 rounded-xl shadow-md bg-gray-100 text-center max-w-[7rem] h-fit w-full">
              <div className="flex justify-center gap-1 items-center">
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
              </div>
              <p className="text-gray-500 text-sm my-2">23 Review</p>
            </div>
            <div className="p-5 rounded-xl shadow-md bg-gray-100 text-center max-w-[9rem] h-fit w-full">
              <div className="flex justify-center gap-1 items-center">
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
              </div>
              <p className="text-gray-500 text-sm my-2">300 Review</p>
            </div>
            <div className="p-5 rounded-xl shadow-md bg-gray-100 text-center max-w-[11rem] h-fit w-full">
              <div className="flex justify-center gap-1 items-center">
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
                <IoStar className="w-6 h-6 text-yellow-400 text-center " />
              </div>
              <p className="text-gray-500 text-sm my-2">125 Review</p>
            </div>
          </div>
          {/* review */}
          <div className="w-full ">
            {reviews?.map((item, i) => (
              <div
                className="flex p-4 shadow rounded-xl bg-gray-100 mb-8 gap-4"
                key={i}
              >
                <div className="max-w-fit lg:block hidden">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="w-full flex  justify-between rounded-md relative gap-3">
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <div className="max-w-fit lg:hidden block">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <h1 className="text-base font-medium">John Doe</h1>
                    </div>
                    <div className="flex gap-2 my-2 lg:my-1 lg:gap-1 justify-center w-fit">
                      <IoStar className="w-4 h-4 text-yellow-400" />
                      <IoStar className="w-4 h-4 text-yellow-400" />
                      <IoStar className="w-4 h-4 text-yellow-400" />
                      <IoStar className="w-4 h-4 text-yellow-400" />
                      <IoStarOutline className="w-4 h-4 text-yellow-400" />
                    </div>
                    <p className="text-gray-600 text-sm ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veritatis ex totam, deserunt eveniet ab dicta adipisci
                      debitis ullam itaque eligendi repudiandae excepturi
                      molestias fugiat voluptate soluta doloremque provident
                      iure unde odit sed recusandae. Vitae recusandae aperiam
                      voluptatum tempore nobis quis.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-4">
                      {item.review_image?.map((img, i) => (
                        <div className="max-w-[7rem] w-full" key={i}>
                          <Image
                            src="https://picsum.photos/id/237/200/300"
                            width={500}
                            height={500}
                            quality={100}
                            className="w-full max-h-fit h-full rounded-md object-contain"
                            alt="/"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-1 right-1">
                    <p className="text-sm text-gray-400">21 November 2023</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* review */}
          {/* load more review button */}
          <div className="flex flex-col justify-center gap-10 items-center my-12">
            <ChevronDown />
            <Button variant="outline" className="flex items-center gap-2 px-10">
              Muat Lebih Banyak <ChevronDown className="w-5 h-5 " />
            </Button>
          </div>
          {/* load more review button */}
        </div>
        <div>
          <h1 className="text-xl font-medium ">Produk yang Berkaitan</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 lg:gap-4 py-6  flex-1">
            {products.map((product, index) => (
              <>
                <ProductCard key={product.id + index} product={product} />
                <ProductCard key={product.id + index} product={product} />
                <ProductCard key={product.id + index} product={product} />
                <ProductCard key={product.id + index} product={product} />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
