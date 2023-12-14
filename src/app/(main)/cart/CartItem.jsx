import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/helperFunction';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import useCounterCartItem from '@/hooks/custom/useCounterCartItem';
import useDayPickerCartItem from '@/hooks/custom/useDayPickerCartItem';
import idLocale from 'date-fns/locale/id';
import { HiOutlineTrash } from 'react-icons/hi2';
import useCartDeleteItemMutation from '@/hooks/api/useCartDeleteItemMutation';
import { useSWRConfig } from 'swr';

export default function CartItem({ cart }) {
  const { quantity, handleDecrementItem, handleIncrementItem } =
    useCounterCartItem(
      cart.quantity,
      cart.product.availableStock,
      cart.id,
      cart.product.id
    );
  const { date, day, handleDateSelect } = useDayPickerCartItem(
    cart.rentFrom,
    cart.rentTo,
    cart.id,
    cart.product.id
  );
  const { product } = cart;
  const { trigger } = useCartDeleteItemMutation(cart.id);
  const { mutate } = useSWRConfig();

  const handleDeleteCartItem = async () => {
    await trigger();
    mutate('/product-carts');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-5 py-2">
      <div className="md:basis-1/2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 relative rounded-lg overflow-hidden">
            <Image
              src={product.productPictures[0].url}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="font-bold text-sm">Rp{formatPrice(product.price)}</p>
          </div>
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="p-2"
            onClick={handleDeleteCartItem}
          >
            <HiOutlineTrash className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <div className="w-fit flex items-center border border-gray-300 rounded-md h-auto">
            <Button
              onClick={handleDecrementItem}
              variant="ghost"
              className="rounded-r-none text-black p-3"
              disabled={quantity <= 1}
            >
              -
            </Button>
            <div className="px-2 border-x h-10">
              <p className="mt-2.5 text-black text-sm">{quantity}</p>
            </div>
            <Button
              onClick={handleIncrementItem}
              variant="ghost"
              className="rounded-l-none text-black p-3"
              disabled={quantity >= +product.availableStock}
            >
              +
            </Button>
          </div>

          <div className={cn('grid gap-2')}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    'max-w-[15.5rem] w-full px-1 border border-gray-300 justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 hidden md:block" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'dd LLL', { locale: idLocale })} -{' '}
                        {format(date.to, 'dd LLL')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  max={product.maximumRental}
                  onSelect={handleDateSelect}
                  numberOfMonths={2}
                  required
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center border border-gray-300 rounded-md h-auto">
            <div className="px-2 h-10">
              <p className="mt-2.5 text-black text-sm min-w-max">{day} Hari</p>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Button
            variant="ghost"
            className="p-2"
            onClick={handleDeleteCartItem}
          >
            <HiOutlineTrash className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
