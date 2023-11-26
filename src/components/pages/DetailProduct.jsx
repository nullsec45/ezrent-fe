import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import { Button } from '../ui/button';
import { BadgeCheck, Car, Store } from 'lucide-react';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ProductCard from '../elements/card/ProductCard';

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
        url: '<url_picture_xboxone>',
        productId: 'c63b7789-3859-4d88-84b2-b8cc39dc5d37',
      },
    ],
    store: {
      id: 'c41c7358-4c1b-4f01-8b99-9883b6c9a394',
      name: 'rizki toko',
      storeAddress: null,
    },
  },
];

export default function DetailProduct() {
  return (
    <div className="container">
      <Breadcrumbs />
      <div className="my-32 flex flex-wrap  sm:flex-nowrap gap-7">
        <div className="w-full h-full">
          <Image
            src={'/iphone.png'}
            alt="/"
            width={100}
            height={100}
            quality={100}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Apple IPhone 15 Promag
          </h1>
          <h2 className="font-medium text-lg sm:text-xl md:text-3xl my-3">
            $9999
          </h2>
          <div className="flex my-7 gap-3 w-full max-w-md ">
            <Button className="w-full" variant="outline">
              Add to Wishlist
            </Button>
            <Button className="w-full">Add to Cart</Button>
          </div>
          <div className="flex lg:flex-nowrap flex-wrap gap-5 max-w-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-[0.65rem]">
                <Car />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Free Delivery</p>
                <p className="text-black font-medium text-sm">1-2 day</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-[0.65rem]">
                <Store />
              </div>
              <div>
                <p className="text-gray-600 text-sm">In Stock</p>
                <p className="text-black font-medium text-sm">Today</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-[0.65rem]">
                <BadgeCheck />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Guaranted</p>
                <p className="text-black font-medium text-sm">1 Year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-14 mt-28 ">
        <h1 className="text-xl font-medium">Details</h1>
        <p className="my-6 text-sm text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
          possimus inventore, enim illo a rerum facilis animi amet eius veniam
          ipsum dicta aspernatur doloribus architecto fugit iusto modi voluptate
          assumenda! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Incidunt quaerat nihil quidem. Natus totam sit accusantium inventore.
          Officia accusantium quasi ullam adipisci repellendus commodi optio
          repudiandae ea, corporis ducimus numquam vitae, laboriosam rerum ad
          quis. Aspernatur, saepe aliquam. Magni delectus provident ea.
          Reprehenderit est maiores sit id enim accusamus natus odit earum
          deleniti corporis architecto, tenetur, placeat explicabo inventore
          debitis.
        </p>
        {/* review */}
        <div>
          <h1 className="text-xl font-medium">Reviews</h1>
          <div className="my-6 flex flex-wrap lg:flex-nowrap gap-7">
            <div className="p-5 rounded-md bg-gray-50 text-center max-w-[10rem] h-fit w-full">
              <h1 className="font-medium text-5xl ">4.8</h1>
              <p className="text-gray-400 text-sm my-2">of 125 reviews</p>
              <div className="flex gap-4 lg:gap-1 justify-center">
                <IoStar className="w-6 h-6 text-yellow-400" />
                <IoStar className="w-6 h-6 text-yellow-400" />
                <IoStar className="w-6 h-6 text-yellow-400" />
                <IoStar className="w-6 h-6 text-yellow-400" />
                <IoStarOutline className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="w-full">
              {reviews?.map((item, i) => (
                <div className="flex mb-14 gap-4" key={i}>
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
          </div>
        </div>
        <div className="">
          <h1 className="text-xl font-medium">Related Products</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 lg:gap-4 py-5 lg:px-3 flex-1">
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
