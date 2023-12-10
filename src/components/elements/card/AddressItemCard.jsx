'use client';

import { CheckCircle, Info, Pencil, X } from 'lucide-react';
import useMyAddress from '@/hooks/api/useMyAddress';
import { toast } from '@/components/ui/use-toast';
import { deleteAddress } from '@/utils/api';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function AddressItemCard() {
  const { data: addresses, isLoading, mutate } = useMyAddress();

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      mutate();

      toast({
        title: 'Success',
        description: 'Alamat berhasil dihapus',
        action: <CheckCircle />,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error?.message,
        action: <Info />,
      });
    }
  };

  if (isLoading || !addresses) return null;

  return (
    <>
      {addresses?.map((address) => (
        <div
          className="w-full p-5 mb-3 bg-gray-100 rounded-md"
          key={address.id}
        >
          <div className="flex justify-between items-center">
            <div>
              <Badge className="rounded-md text-[10px] mb-3">
                {address.label}
              </Badge>
              <p className="font-semibold">{address.fullAddress}</p>
              <p className="mb-3 font-medium text-gray-500">{`${address.province}, ${address.city}, ${address.district}`}</p>
              <p>{address.recipientName}</p>
              <p>{address.phoneNumber}</p>
            </div>
            <div className="flex gap-4 items-center">
              <Link href={`/dashboard/address/${address.id}`}>
                <Pencil className="lg:w-5 lg:h-5 w-4 h-4 " />
              </Link>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                type="button"
              >
                <X className="lg:w-5 lg:h-5 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
