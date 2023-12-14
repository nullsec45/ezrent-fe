import { calculateRentalDurationDay } from '@/utils/helperFunction';
import { useState } from 'react';
import useCartUpdateMutation from '../api/useCartUpdateMutation';
import useCart from '../api/useCart';

export default function useDayPickerCartItem(
  rentFrom,
  rentTo,
  cartItemId,
  productId
) {
  const { trigger } = useCartUpdateMutation(cartItemId);
  const { mutate } = useCart();
  const [date, setDate] = useState({
    from: new Date(rentFrom),
    to: new Date(rentTo),
  });
  const [day, setDay] = useState(
    calculateRentalDurationDay(date.from, date.to)
  );

  const updateDayCounter = (range) => {
    if (range?.from && range?.to) {
      const dayFrom = new Date(range?.from);
      const dayTo = new Date(range?.to);

      const rentalDurationInDay = calculateRentalDurationDay(dayFrom, dayTo);
      setDay(rentalDurationInDay);
      return;
    }

    setDay(0);
  };

  const handleDateSelect = async (range) => {
    const rangeSelected = {
      from: range?.from,
      to: range?.to,
    };
    if (!range?.to) rangeSelected.to = rangeSelected.from;

    setDate(rangeSelected);
    updateDayCounter(rangeSelected);

    if (rangeSelected.from && rangeSelected.to) {
      await trigger({
        productId,
        rentFrom: rangeSelected.from.toISOString(),
        rentTo: rangeSelected.to.toISOString(),
      });
      mutate();
    }
  };

  return { date, day, handleDateSelect };
}
