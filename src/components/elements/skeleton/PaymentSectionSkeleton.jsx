import { Skeleton } from '@/components/ui/skeleton';

export default function PaymentSectionSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <Skeleton className="bg-gray-300 min-h-[10rem]" />
      <Skeleton className="bg-gray-300 min-h-[10rem]" />
    </div>
  );
}
