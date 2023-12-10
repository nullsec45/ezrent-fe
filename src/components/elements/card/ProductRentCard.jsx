import Image from 'next/image';
import Counter from '@/components/elements/input/Counter';
import { Button } from '@/components/ui/button';
import { RiDeleteBin5Line } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ProductRentCard({ product }) {
  const [productCounter, setProductCounter] = useState(1);

  const incrementCounter = () => setProductCounter(productCounter + 1);

  const decrementCounter = () => {
    if (productCounter > 1) {
      setProductCounter(productCounter - 1);
    }
  };

  const inputCounterChange = (e) => {
    const value = e?.target.value.replace(/[^0-9]/g, '');
    if (value === 0) return;
    setProductCounter(+value);
  };

  return (
    <div className="flex gap-5">
      <div className="w-20 shrink-0 aspect-square rounded-lg relative">
        <Image
          src={'/iphone.png'}
          alt="produk photo"
          fill
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="lg:w-60">
          <p className="font-medium">
            Apple iPhone 14 Pro Max 128Gb Deep Purple
          </p>
        </div>
        <div className="flex items-center justify-between lg:w-full">
          <Counter
            value={productCounter}
            onIncement={incrementCounter}
            onDecrement={decrementCounter}
            onInputChange={inputCounterChange}
          />
          <div className="text-lg font-medium">Rp200.000</div>
          <Button variant="ghost" className="group">
            <RiDeleteBin5Line className="w-4 h-4 group-hover:text-red-600 transition-all duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}

ProductRentCard.propTypes = {
  product: PropTypes.object.isRequired,
};
