import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';

export default function PaymentMethodCard({
  title = 'Metode Pembayaran',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, tempora.',
  value,
  id,
  onSelected,
}) {
  return (
    <div className="flex flex-col md:items-center md:flex-row gap-3 bg-white border border-gray-300 p-6 rounded-lg">
      <RadioGroupItem value={value} id={id} onClick={onSelected} />
      <Label
        htmlFor={id}
        className="w-full flex flex-col md:flex-row justify-between md:items-center gap-6 cursor-pointer"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 w-full basis-2/3">
          <p className="font-semibold w-[9rem]">{title}</p>
          <p className="font-normal text-gray-600 leading-tight">
            {description}
          </p>
        </div>
      </Label>
    </div>
  );
}
