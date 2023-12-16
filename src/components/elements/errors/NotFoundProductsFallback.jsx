import React from 'react';
import { RiBox2Line } from 'react-icons/ri';

export default function NotFoundProductsFallback() {
  return (
    <div className="min-h-[80vh] grid place-content-center text-center gap-6">
      <RiBox2Line className="w-32 h-32 text-gray-200 mx-auto" />
      <p className="text-gray-400 font-medium text-2xl">
        Produk tidak ditemukan
      </p>
    </div>
  );
}
