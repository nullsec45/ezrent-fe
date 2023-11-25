import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { twMerge } from 'tailwind-merge';

export default function SelectMenu({ items, placeholder, fullWidth }) {
  return (
    <Select>
      <SelectTrigger
        className={twMerge('w-44 py-5', `${fullWidth && 'w-full'}`)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {/* {items.map((item) => {
          <SelectItem value={item}>
            {item}
          </SelectItem>;
        })} */}
        <SelectItem value="opsi1">Opsi 1</SelectItem>
        <SelectItem value="opsi2">Opsi 2</SelectItem>
      </SelectContent>
    </Select>
  );
}
