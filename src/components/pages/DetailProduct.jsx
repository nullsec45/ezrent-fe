'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import { Button } from '../ui/button';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { IoBagCheckOutline, IoStar, IoStarOutline } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ProductCard from '../elements/card/ProductCard';
import { PiMapPinFill } from 'react-icons/pi';
import { BsBoxSeam, BsChat, BsChatText } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

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
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [item, setItem] = useState(1);
  const [day, setDay] = useState(1);

  const handleIncrementItem = () => {
    setItem(item + 1);
  };
  const handleDecrementItem = () => {
    if (item === 0) return;
    setItem(item - 1);
  };
  const handleIncrementDay = () => {
    setDay(day + 1);
  };
  const handleDecrementDay = () => {
    if (day === 0) return;
    setDay(day - 1);
  };

  return (
    <div className="container">
      <Breadcrumbs />
      <div className="my-12 flex flex-wrap  h-full max-h-fit items-center sm:flex-nowrap gap-7">
        <div className="w-full h-[27rem]">
          <Image
            src={'/iphone.png'}
            alt="/"
            width={100}
            height={100}
            quality={100}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
            Apple IPhone 15 Promag
          </h1>
          <div className="flex items-center gap-2 text-base md:text-lg">
            <h2 className="font-semibold  ">Rp.200.000</h2>
            <span className="text-gray-400 ">/ Hari</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Avatar className="w-7 h-7">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-sm">Toko Sewa Cefat</p>
          </div>

          <div className="flex items-center gap-2">
            <PiMapPinFill size={27} />
            <p className="font-semibold text-sm">
              Jl. HR Soedimas No.77,Kec. Tempes,Pekanbaru, Riau
            </p>
          </div>
          <div className="flex lg:flex-nowrap flex-wrap my-2 gap-5 max-w-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-[0.65rem]">
                <IoBagCheckOutline size={23} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Tersewa</p>
                <p className="text-black font-medium text-sm">874x</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-[0.65rem]">
                <BsBoxSeam size={23} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Stok Tersedia</p>
                <p className="text-black font-medium text-sm">50 Unit</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-[0.65rem]">
                <CiStar size={23} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Rating</p>
                <p className="text-black font-medium text-sm">4.7</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-[0.65rem]">
                <BsChatText size={23} />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Komentar</p>
                <p className="text-black font-medium text-sm">526</p>
              </div>
            </div>
          </div>
          {/* order */}
          <div className="p-3 border border-gray-500 rounded-lg ">
            <h1 className="font-semibold text-base">Order</h1>
            <div className="flex items-center flex-wrap gap-2 mt-4 text-gray-500">
              <div>
                <h1 className="text-sm text-gray-500 mb-1">Item</h1>
                <div className="flex items-center border border-gray-400 rounded-md h-auto">
                  <Button
                    onClick={handleDecrementItem}
                    variant="ghost"
                    className="rounded-r-none text-black "
                  >
                    -
                  </Button>
                  <div className="px-6 border-x h-10">
                    <h1 className="mt-2.5 text-black text-sm">{item}</h1>
                  </div>
                  <Button
                    onClick={handleIncrementItem}
                    variant="ghost"
                    className="rounded-l-none text-black "
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <h1 className="text-sm text-gray-500 mb-1">Durasi</h1>
                <div className="flex items-center border border-gray-400 rounded-md h-auto">
                  <Button
                    onClick={handleDecrementDay}
                    variant="ghost"
                    className="rounded-r-none text-black "
                  >
                    -
                  </Button>
                  <div className="px-3 border-x h-10">
                    <h1 className="mt-2.5 text-black text-sm">{day}Hari</h1>
                  </div>
                  <Button
                    onClick={handleIncrementDay}
                    variant="ghost"
                    className="rounded-l-none text-black "
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <h1 className="text-sm text-gray-500 mb-1">Tanggal</h1>
                <div className={cn('grid gap-2')}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                          'max-w-[15.5rem] w-full border border-gray-500 justify-start text-left font-normal',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, 'LLL dd, y')} -{' '}
                              {format(date.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(date.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          {/* order */}
          {/*  */}
          <div className="flex my-3 gap-3 w-full ">
            <Button className="w-full" variant="outline">
              Add to Wishlist
            </Button>
            <Button className="w-full">Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className="mb-14 mt-28 lg:px-3">
        <div className="p-7 shadow-md rounded-xl mb-12">
          <h1 className="text-xl font-medium">Details</h1>
          <p className="my-6 text-sm text-gray-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
            possimus inventore, enim illo a rerum facilis animi amet eius veniam
            ipsum dicta aspernatur doloribus architecto fugit iusto modi
            voluptate assumenda! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Incidunt quaerat nihil quidem. Natus totam sit
            accusantium inventore. Officia accusantium quasi ullam adipisci
            repellendus commodi optio repudiandae ea, corporis ducimus numquam
            vitae, laboriosam rerum ad quis. Aspernatur, saepe aliquam. Magni
            delectus provident ea. Reprehenderit est maiores sit id enim
            accusamus natus odit earum deleniti corporis architecto, tenetur,
            placeat explicabo inventore debitis.
          </p>
        </div>
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
