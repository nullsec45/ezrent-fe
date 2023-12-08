'use client';

import { CheckCircle, Info, Pencil, X } from 'lucide-react';
import useMyAddress from '@/hooks/api/useMyAddress';
import { toast } from '@/components/ui/use-toast';
import { deleteAddress } from '@/utils/api';
import Link from 'next/link';

export default function AddressItemCard() {
  const { data: addresses } = useMyAddress();

  const handleDeleteAddress = async (id) => {
    try {
      const response = await deleteAddress(id);
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: response.data?.message,
          action: <CheckCircle />,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error?.message,
        action: <Info />,
      });
    }
  };
  return (
    <>
      {addresses?.map((address) => (
        <div
          className="w-full p-5 mb-3 bg-gray-100 rounded-md"
          key={address.id}
        >
          <h1 className="font-semibold text-lg mb-3">{address.label}</h1>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm">{address.fullAddress}</p>
              <p className="text-sm mt-1">{address.phoneNumber}</p>
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
