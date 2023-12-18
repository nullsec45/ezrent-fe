import { MdLocationOn } from 'react-icons/md';
import { GiHandTruck } from 'react-icons/gi';
import { MdOutlinePayment } from 'react-icons/md';
import StepItem from './StepItem';
import { twMerge } from 'tailwind-merge';

export default function CheckoutSteps({ activePage }) {
  return (
    <div className="flex justify-between items-center">
      <StepItem
        icon={<MdLocationOn className="w-6 h-6" />}
        title="Step 1"
        label="Alamat"
        disabled={activePage !== 'address'}
        hidden={activePage === 'payment' || activePage === 'shipping'}
      />

      {/* Separator */}
      <div
        className={twMerge(
          'border-t-2 border-dashed w-full max-w-xs text-gray-700',
          (activePage === 'payment' || activePage === 'shipping') &&
            'hidden md:block'
        )}
      ></div>
      {/* Separator */}

      <StepItem
        icon={
          <GiHandTruck className="w-4 h-4 p-1 box-content bg-black text-white rounded-full" />
        }
        title="Step 2"
        label="Metode"
        disabled={activePage !== 'shipping'}
      />

      {/* Separator */}
      <div
        className={twMerge(
          'border-t-2 border-dashed w-full max-w-xs text-gray-700',
          activePage === 'address' && 'hidden md:block'
        )}
      ></div>
      {/* Separator */}

      <StepItem
        icon={
          <MdOutlinePayment className="w-4 h-4 p-1 box-content bg-black text-white rounded-full" />
        }
        title="Step 3"
        label="Pembayaran"
        disabled={activePage !== 'payment'}
        hidden={activePage === 'address'}
      />
    </div>
  );
}
