import { RadioGroup } from '@/components/ui/radio-group';
import AddressCard from '@/components/elements/card/AddressCard';
import { Button } from '@/components/ui/button';
import { FaCirclePlus } from 'react-icons/fa6';
import useSWR from 'swr';
import AddressCardSkeleton from '@/components/elements/skeleton/AddressCardSkeleton';
import { useBoundStore } from './store/useBoundStore';
import { useState } from 'react';

export default function AddressSection({ nextPage }) {
  const { data: addresses, isLoading } = useSWR('/addresses');
  const [selectedAddress, setSelectedAddress] = useState('');
  const setUserAddress = useBoundStore((state) => state.setUserAddress);

  const onButtonNextStep = () => {
    setUserAddress(selectedAddress);
    nextPage();
  };

  if (isLoading) return <AddressCardSkeleton />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-8">Pilih Alamat</h1>

      <div>
        <RadioGroup className="space-y-6">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              id={address.id}
              value={address.id}
              fullAddress={address.fullAddress}
              name="John Doe"
              phone="081277773434"
              province={address.province}
              city={address.city}
              district={address.district}
              onAddressSelected={() => setSelectedAddress(address.id)}
            />
          ))}
        </RadioGroup>
      </div>

      <div className="mt-12">
        <div className="flex items-center">
          <div className="border-t border-gray-400 border-dashed w-full"></div>
          <Button variant="ghost" className="hover:bg-transparent p-0">
            <FaCirclePlus className="w-6 h-6" />
          </Button>
          <div className="border-t border-gray-400 border-dashed w-full"></div>
        </div>
        <p className="text-sm text-center">Tambahkan Alamat</p>
      </div>

      <div className="flex gap-6 justify-center md:justify-end mt-16">
        <Button variant="outline" className="py-7 md:px-10 w-full md:w-auto">
          Kembali
        </Button>
        <Button
          className="py-7 md:px-10 w-full md:w-auto"
          onClick={onButtonNextStep}
        >
          Pengiriman
        </Button>
      </div>
    </div>
  );
}
