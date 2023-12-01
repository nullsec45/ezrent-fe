'use client';

import CheckoutSteps from '@/components/elements/steps/CheckoutSteps';
import AddressSection from '@/components/AddressSection';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import ShippingSection from '@/components/ShippingSection';
import PaymentSection from '@/components/PaymentSection';

export default function Checkout() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activePage = searchParams.get('step');
  // const CurrentActivePage = Pages[searchParams.get('step')];

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const goToAddressPage = () =>
    router.push(`${pathname}?${createQueryString('step', 'address')}`);

  const goToShippingPage = () =>
    router.push(`${pathname}?${createQueryString('step', 'shipping')}`);

  const goToPaymentPage = () =>
    router.push(`${pathname}?${createQueryString('step', 'payment')}`);

  const pages = {
    address: <AddressSection nextPage={goToShippingPage} />,
    shipping: (
      <ShippingSection nextPage={goToPaymentPage} prevPage={goToAddressPage} />
    ),
    payment: <PaymentSection prevPage={goToShippingPage} />,
  };

  return (
    <main className="container px-4 lg:px-10 py-14 min-h-[700px]">
      <CheckoutSteps activePage={activePage} />

      <div className="mt-20">{pages[activePage]}</div>
    </main>
  );
}
