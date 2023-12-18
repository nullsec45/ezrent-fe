import OrderDevileredIcon from '@/components/icons/OrderDevileredIcon';
import OrderProcessingIcon from '@/components/icons/OrderProcessingIcon';
import OrderReturnedIcon from '@/components/icons/OrderReturnedIcon';
import OrderShippingIcon from '@/components/icons/OrderShippingIcon';
import PendingIcon from '@/components/icons/PendingIcon';
import { twMerge } from 'tailwind-merge';

const disabledColor = '#A1A1AA';
const activeColor = '#000';

export default function OrderSteps({ activeStep = 'pending' }) {
  const steps = [
    {
      icon: (
        <PendingIcon
          color={activeStep === 'pending' ? activeColor : disabledColor}
        />
      ),
      text: 'Menunggu',
      status: 'pending',
    },
    {
      icon: (
        <OrderProcessingIcon
          color={activeStep === 'processing' ? activeColor : disabledColor}
        />
      ),
      text: 'Diproses',
      status: 'processing',
    },
    {
      icon: (
        <OrderShippingIcon
          color={activeStep === 'shipped' ? activeColor : disabledColor}
        />
      ),
      text: 'Dikirim',
      status: 'shipped',
    },
    {
      icon: (
        <OrderDevileredIcon
          color={activeStep === 'delivered' ? activeColor : disabledColor}
        />
      ),
      text: 'Sampai Tujuan',
      status: 'delivered',
    },
    {
      icon: (
        <OrderReturnedIcon
          color={activeStep === 'returned' ? activeColor : disabledColor}
        />
      ),
      text: 'Dikembalikan',
      status: 'returned',
    },
  ];

  return (
    <div className="hidden lg:flex justify-between p-3">
      {steps.map((step, index) => (
        <div key={step.text} className="flex items-center">
          <div className="flex flex-col gap-1 items-center min-w-[7rem]">
            {step.icon}
            <span
              className={twMerge(
                'text-sm text-gray-400 font-semibold',
                step.status === activeStep && 'text-black'
              )}
            >
              {step.text}
            </span>
          </div>

          {/* Jangan tampilkan garis di akhir */}
          {index !== steps.length - 1 && (
            <div className="font-extralight bg-clip-text text-transparent bg-gradient-to-l from-gray-50 via-black to-gray-50">
              -----------
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
