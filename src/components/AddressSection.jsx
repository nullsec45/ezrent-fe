import { RadioGroup } from '@/components/ui/radio-group';
import AddressCard from '@/components/elements/card/AddressCard';
import { Button } from '@/components/ui/button';
import { FaCirclePlus } from 'react-icons/fa6';

export default function AddressSection({ nextPage }) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-8">Pilih Alamat</h1>

      <div>
        <RadioGroup defaultValue="address-1" className="space-y-6">
          <AddressCard
            fullAddress="Jl Mawar RT 05/ RW 04 No.10"
            name="John Doe"
            phone="081299994343"
            id="address-1"
            value="address-1"
          />
          <AddressCard
            fullAddress="Jl Durian RT 09/ RW 01 No.14"
            name="Bapak Budi"
            phone="08955554343"
            id="address-2"
            value="address-2"
          />
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
        <Button className="py-7 md:px-10 w-full md:w-auto" onClick={nextPage}>
          Pengiriman
        </Button>
      </div>
    </div>
  );
}
