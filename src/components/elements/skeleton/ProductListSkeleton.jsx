import { Skeleton } from '@/components/ui/skeleton';

export default function ProductListSkeleton({ count = 9 }) {
  const skeletonArray = Array.from({ length: count });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3 py-5 lg:px-3">
      {skeletonArray.map((_, index) => (
        <Skeleton
          key={index}
          className="flex flex-col justify-between items-center w-full h-[445px] min-w-[150px] lg:min-w-[220px] max-w-xs bg-gray-200 rounded-xl overflow-hidden"
        >
          <Skeleton className="w-full h-56 min-w-[150px] lg:min-w-[220px] max-w-xs bg-gray-300 rounded-xl overflow-hidden" />

          <div className="w-full p-5">
            <Skeleton className="w-full h-12 bg-gray-300" />
          </div>
        </Skeleton>
      ))}
    </div>
  );
}
