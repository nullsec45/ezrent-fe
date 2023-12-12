import EditAddress from '@/components/pages/EditAddress';

export default function page({ params }) {
  return (
    <>
      <EditAddress addressId={params.id} />
    </>
  );
}
