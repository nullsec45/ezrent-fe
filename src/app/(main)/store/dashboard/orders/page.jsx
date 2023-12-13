import React from 'react';
import OrderHeader from './OrderHeader';
import OrderMain from './OrderMain';

export default function page() {
  return (
    <div>
      <h1 className="font-bold text-xl mb-6">Riwayat Order</h1>
      <OrderHeader />
      <OrderMain />
    </div>
  );
}
