import EditProductForm from '@/components/elements/form/EditProductForm';

export default function Page({ params }) {
  return (
    <div>
      <EditProductForm productId={params.id} />
    </div>
  );
}
