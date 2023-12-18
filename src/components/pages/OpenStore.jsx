import OpenStoreForm from '@/components/elements/form/OpenStoreForm';

export default function OpenStore() {
  return (
    <main className="container px-4 lg:px-10 py-16">
      <div>
        <h1 className="text-3xl font-semibold mb-8">Buka Toko</h1>
      </div>
      <OpenStoreForm />
    </main>
  );
}
