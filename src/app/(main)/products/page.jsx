import Products from '@/components/pages/Products';
import { Button } from '@/components/ui/button';
import React from 'react';

export const metadata = {
  title: 'EzRent | Products',
  description:
    'EzRent adalah platform e-commerce penyewaan barang di seluruh indonesia.E zRent merupakan platform penyewaan inovatif untuk pengguna individu dan bisnis. Pengalaman penyewaan yang mudah dengan berbagai barang dan layanan.',
};

export default function page() {
  return (
    <>
      <Products />
    </>
  );
}
