import DetailProduct from '@/components/pages/DetailProduct';
import PropTypes from 'prop-types';

export default async function page({ params }) {
  return (
    <>
      <DetailProduct productId={params.id} />
    </>
  );
}

page.propTypes = {
  params: PropTypes.object.isRequired,
};
