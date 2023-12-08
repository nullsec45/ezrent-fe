import { Skeleton } from '@/components/ui/skeleton';

export default function DirectRentPageSkeleton() {
  return (
    <div className="flex gap-16 flex-col md:flex-row min-h-[80vh] container my-20">
      <div className="flex-1">
        <Skeleton className="w-full flex gap-4 bg-transparent">
          <Skeleton className="w-20 h-20 flex-shrink-0 bg-gray-300" />
          <div className="w-full">
            <Skeleton className="w-full max-w-sm h-5 bg-gray-300" />
            <Skeleton className="w-20 h-3 bg-gray-300 mt-3" />
            <Skeleton className="w-full h-4 bg-gray-300 mt-7" />
          </div>
        </Skeleton>
      </div>
      <Skeleton className="h-96 w-full bg-gray-300 max-w-sm" />
    </div>
  );
}
