import useDetailProduct from '@/hooks/api/useDetailProduct';
import ProductDescriptionSkeleton from '@/components/elements/skeleton/ProductDescriptionSkeleton';
import PropTypes from 'prop-types';

export default function ProductDescription({ productId }) {
  const { data: product, isLoading } = useDetailProduct(productId);

  if (isLoading) return <ProductDescriptionSkeleton />;

  return (
    <div className="p-7 shadow-md rounded-xl mb-12">
      <h1 className="text-xl font-medium">Details</h1>
      <p className="my-6 text-sm text-gray-500">{product.description}</p>
    </div>
  );
}

ProductDescription.propTypes = {
  productId: PropTypes.string.isRequired,
};
