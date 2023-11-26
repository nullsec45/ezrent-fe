import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';

export default function ShippingCard({
  title = 'Metode Pengiriman',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, tempora.',
  value,
  id,
  estimationDate = '1 Jan, 2023',
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 bg-white border border-gray-300 p-6 rounded-lg">
      <RadioGroupItem value={value} id={id} />
      <Label
        htmlFor={id}
        className="w-full flex justify-between items-center cursor-pointer"
      >
        <div className="flex flex-col md:flex-row gap-2 md:gap-10 w-full basis-2/3">
          <p className="font-semibold">{title}</p>
          <p className="font-normal text-gray-600">{description}</p>
        </div>
        <div className="text-end">
          <p>{estimationDate}</p>
        </div>
      </Label>
    </div>
  );
}
