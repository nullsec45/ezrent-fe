import DetailProduct from '@/components/pages/DetailProduct';

export default async function page({ params }) {
  return (
    <>
      <DetailProduct productId={params.id} />
    </>
  );
}
