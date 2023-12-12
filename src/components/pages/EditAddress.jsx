'use client';

import EditAddressForm from '@/components/elements/form/EditAddressForm';

export default function EditAddress({ addressId }) {
  return (
    <main className="container px-4 lg:px-10 py-16 min-h-[100vh]">
      <div>
        <h1 className="text-3xl font-semibold mb-8">Ubah Alamat</h1>
      </div>
      <EditAddressForm addressId={addressId} />
    </main>
  );
}
