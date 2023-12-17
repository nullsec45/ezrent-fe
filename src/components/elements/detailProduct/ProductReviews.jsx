import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import useProductReviews from '@/hooks/api/useProductReviews';
import {
  calculateAverageRating,
  formatISODateToLocalDate,
} from '@/utils/helperFunction';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { MdCommentsDisabled } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export default function ProductReviews({ productId }) {
  const { data: reviews, isLoading } = useProductReviews(productId);

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-40 aspect-square bg-gray-200 rounded-xl" />
        <div className="w-full space-y-7 mt-6">
          <Skeleton className="w-full h-24 bg-gray-200 rounded-xl" />
          <Skeleton className="w-full h-24 bg-gray-200 rounded-xl" />
          <Skeleton className="w-full h-24 bg-gray-200 rounded-xl" />
        </div>
      </>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-medium">Ulasan</h1>

      <div className="my-6 flex flex-wrap items-center lg:flex-nowrap gap-7">
        <div className="p-5 rounded-2xl shadow-md bg-gray-50 text-center max-w-[10rem] h-fit w-full">
          <h1 className="font-medium text-5xl ">
            {calculateAverageRating(reviews)}
            <span className="text-sm text-gray-500"> /5</span>
          </h1>
          <p className="text-gray-500 text-sm my-2">
            of {reviews.length} reviews
          </p>
          <div className="flex gap-2 lg:gap-1 justify-center">
            <StarGroup totalStar={calculateAverageRating(reviews)} />
          </div>
        </div>
      </div>
      {/* review */}

      <div className="w-full ">
        {reviews.length === 0 && (
          <div className="flex flex-col gap-2 justify-center items-center min-h-[350px]">
            <MdCommentsDisabled className="w-16 h-16 text-gray-400" />
            <p className="text-gray-500 text-center">
              Belum ada Ulasan untuk produk ini
            </p>
          </div>
        )}

        {reviews?.map((review, i) => (
          <div
            className="flex p-4 shadow rounded-xl bg-gray-50 mb-8 gap-4"
            key={i}
          >
            <div className="max-w-fit lg:block hidden">
              <Avatar className="w-8 h-8">
                <AvatarImage src={review.user?.profile?.profilePicture} />
                <AvatarFallback>{review.user.username[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex  justify-between rounded-md relative gap-3">
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="max-w-fit lg:hidden block">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={review.user?.profile?.profilePicture} />
                      <AvatarFallback>{review.user.username[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <h1 className="text-base font-medium">
                    {review.user.username}
                  </h1>
                </div>
                <div className="flex gap-2 my-2 lg:my-1 lg:gap-1 justify-center w-fit">
                  <StarGroup totalStar={review.rating} />
                </div>
                <p className="text-gray-600 text-sm mt-3">{review.comment}</p>
              </div>
              <div className="absolute top-1 right-1">
                <p className="text-sm text-gray-600">
                  {formatISODateToLocalDate(review.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarGroup({ totalStar }) {
  return (
    <div className="flex gap-1">
      <FaStar
        className={twMerge(
          'w-4 h-4 cursor-pointer text-gray-400',
          totalStar >= 1 && 'text-yellow-500'
        )}
      />
      <FaStar
        className={twMerge(
          'w-4 h-4 cursor-pointer text-gray-400',
          totalStar >= 2 && 'text-yellow-500'
        )}
      />
      <FaStar
        className={twMerge(
          'w-4 h-4 cursor-pointer text-gray-400',
          totalStar >= 3 && 'text-yellow-500'
        )}
      />
      <FaStar
        className={twMerge(
          'w-4 h-4 cursor-pointer text-gray-400',
          totalStar >= 4 && 'text-yellow-500'
        )}
      />
      <FaStar
        className={twMerge(
          'w-4 h-4 cursor-pointer text-gray-400',
          totalStar >= 5 && 'text-yellow-500'
        )}
      />
    </div>
  );
}
