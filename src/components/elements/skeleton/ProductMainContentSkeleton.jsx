import { Skeleton } from '@/components/ui/skeleton';

export default function ProductMainContentSkeleton() {
  return (
    <div className="my-12 flex flex-col lg:flex-row h-full max-h-fit items-center gap-7">
      <Skeleton className="w-full lg:max-w-lg min-h-[550px] rounded-2xl" />
      <div className="w-full min-h-[550px] rounded-2xl space-y-4">
        <Skeleton className="w-1/2 bg-gray-300 h-10 rounded-lg" />
        <Skeleton className="w-3/12 bg-gray-300 h-7 rounded-lg" />
        <div className="flex gap-3 items-center">
          <Skeleton className="w-9 h-9 bg-gray-300 rounded-full" />
          <Skeleton className="w-24 bg-gray-300 h-7 rounded-lg" />
        </div>
        <Skeleton className="w-6/12 bg-gray-300 h-7 rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 my-2 gap-5 w-full">
          <Skeleton className="w-full bg-gray-300 h-12 rounded-lg" />
          <Skeleton className="w-full bg-gray-300 h-12 rounded-lg" />
          <Skeleton className="w-full bg-gray-300 h-12 rounded-lg" />
          <Skeleton className="w-full bg-gray-300 h-12 rounded-lg" />
        </div>
        <Skeleton className="w-full h-full p-5 pb-12 space-y-8">
          <Skeleton className="w-2/12 bg-gray-300 h-5 rounded-lg" />
          <div className="flex flex-wrap gap-5">
            <Skeleton className="min-w-[140px] lg:min-w-[200px] bg-gray-300 h-12 rounded-lg" />
            <Skeleton className="min-w-[140px] lg:min-w-[200px] bg-gray-300 h-12 rounded-lg" />
            <Skeleton className="min-w-[140px] lg:min-w-[200px] bg-gray-300 h-12 rounded-lg" />
          </div>
        </Skeleton>
        <div className="grid sm:grid-cols-2 gap-3 pt-7">
          <Skeleton className="w-full bg-gray-300 h-14 rounded-lg" />
          <Skeleton className="w-full bg-gray-300 h-14 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
