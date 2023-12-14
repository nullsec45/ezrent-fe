import { RadioGroup } from '@/components/ui/radio-group';
import AddressCard from '@/components/elements/card/AddressCard';
import { Button } from '@/components/ui/button';
import { FaCirclePlus } from 'react-icons/fa6';
import AddressCardSkeleton from '@/components/elements/skeleton/AddressCardSkeleton';
import { useBoundStore } from './store/useBoundStore';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import useAddresses from '@/hooks/api/useAddresses';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartOrdersStore } from './store/useCartOrdersStore';
import Link from 'next/link';

export default function AddressSection({ prevPage, nextPage }) {
  const { data: addresses, isLoading } = useAddresses();
  const { toast } = useToast();
  const order = useBoundStore((state) => state.order);
  const setUserAddress = useBoundStore((state) => state.setUserAddress);
  const [selectedAddress, setSelectedAddress] = useState(order.userAddressId);

  // Untuk alur Cart Orders
  const searchParams = useSearchParams();
  const isCartOrders = searchParams.get('cartOrders') === 'true' ? true : false;
  const setAddressCartOrders = useCartOrdersStore(
    (state) => state.setAddressCartOrders
  );
  const router = useRouter();

  const onButtonNextStep = () => {
    if (!selectedAddress) {
      return toast({
        variant: 'destructive',
        title: 'Anda belum memilih alamat',
        description: 'Pilih alamat terlebih dahulu sebelum melanjutkan',
      });
    }

    // Jika Order dari Cart
    if (isCartOrders) {
      setAddressCartOrders(selectedAddress);
      router.push('/checkout?step=shipping&cartOrders=true');
    } else {
      // Jika Order secara langsung (Direct-Rent)
      setUserAddress(selectedAddress);
      nextPage();
    }
  };

  if (isLoading) return <AddressCardSkeleton />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-8">Pilih Alamat</h1>

      <div>
        <RadioGroup className="space-y-6" defaultValue={order.userAddressId}>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              id={address.id}
              value={address.id}
              fullAddress={address.fullAddress}
              name={address.recipientName}
              phone={address.phoneNumber}
              label={address.label}
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
            <Link href="/dashboard/address/add">
              <FaCirclePlus className="w-6 h-6" />
            </Link>
          </Button>
          <div className="border-t border-gray-400 border-dashed w-full"></div>
        </div>
        <p className="text-sm text-center">Tambahkan Alamat</p>
      </div>

      <div className="flex gap-6 justify-center md:justify-end mt-16">
        <Button
          variant="outline"
          className="py-7 md:px-10 w-full md:w-auto"
          onClick={prevPage}
        >
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
