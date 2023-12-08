import AddAddressForm from '@/components/elements/form/AddAddressForm';

export default function AddAddress() {
  return (
    <main className="container px-4 lg:px-10 py-16">
      <div>
        <h1 className="text-3xl font-semibold mb-8">Tambah Alamat</h1>
      </div>
      <AddAddressForm />
    </main>
  );
}
