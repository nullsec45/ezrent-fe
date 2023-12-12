import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import PropTypes from 'prop-types';

export default function AddressCard({
  fullAddress = 'Jl Alamat',
  name = 'Atas Nama',
  phone = '08199999999',
  label,
  id,
  value,
  province,
  city,
  district,
  onAddressSelected,
}) {
  return (
    <div className="flex gap-2 space-x-2 bg-gray-100 p-6 rounded-lg">
      <RadioGroupItem value={value} id={id} onClick={onAddressSelected} />
      <Label htmlFor={id} className="w-full cursor-pointer">
        <div className="w-full leading-normal">
          <Badge className="rounded-md text-[10px] mb-3">{label}</Badge>
          <p className="font-semibold">{fullAddress}</p>
          <p className="mb-3 font-medium text-gray-500">{`${province}, ${city}, ${district}`}</p>
          <p>{name}</p>
          <p>{phone}</p>
        </div>
      </Label>
    </div>
  );
}
