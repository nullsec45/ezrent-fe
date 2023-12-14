import { useState } from 'react';
import useCart from '@/hooks/api/useCart';
import useCartUpdateMutation from '@/hooks/api/useCartUpdateMutation';

export default function useCounterCartItem(
  initialState = 1,
  maxCounter,
  cartItemId,
  productId
) {
  const [quantity, setQuantity] = useState(initialState);
  const { trigger } = useCartUpdateMutation(cartItemId);
  const { mutate } = useCart();

  const handleIncrementItem = async () => {
    if (quantity >= maxCounter) return;
    setQuantity(quantity + 1);

    await trigger({
      productId,
      quantity: quantity + 1,
    });
    mutate();
  };

  const handleDecrementItem = async () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);

    await trigger({
      productId,
      quantity: quantity - 1,
    });
    mutate();
  };

  return { quantity, handleIncrementItem, handleDecrementItem };
}
