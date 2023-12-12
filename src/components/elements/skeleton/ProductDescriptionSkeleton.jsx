import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDescriptionSkeleton() {
  return (
    <Skeleton className="w-full p-8 min-h-[400px] rounded-2xl">
      <Skeleton className="w-32 h-6 bg-gray-300" />
      <div className="space-y-5 mt-8">
        <Skeleton className="w-full h-3 bg-gray-300" />
        <Skeleton className="w-6/12 h-3 bg-gray-300" />
        <Skeleton className="w-8/12 h-3 bg-gray-300" />
        <Skeleton className="w-12/12 h-3 bg-gray-300" />
        <Skeleton className="w-8/12 h-3 bg-gray-300" />
        <Skeleton className="w-4/12 h-3 bg-gray-300" />
        <Skeleton className="w-5/12 h-3 bg-gray-300" />
        <Skeleton className="w-12/12 h-3 bg-gray-300" />
        <Skeleton className="w-8/12 h-3 bg-gray-300" />
        <Skeleton className="w-4/12 h-3 bg-gray-300" />
        <Skeleton className="w-5/12 h-3 bg-gray-300" />
      </div>
    </Skeleton>
  );
}
