import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';

export default function AddressCard({
  fullAddress = 'Jl Alamat',
  name = 'Atas Nama',
  phone = '08199999999',
  id,
  value,
}) {
  return (
    <div className="flex gap-2 space-x-2 bg-gray-100 p-6 rounded-lg">
      <RadioGroupItem value={value} id={id} />
      <Label htmlFor={id} className="w-full cursor-pointer">
        <div className="space-y-2 w-full">
          <p className="mb-4 font-semibold">{fullAddress}</p>
          <p>{name}</p>
          <p>{phone}</p>
        </div>
      </Label>
    </div>
  );
}
