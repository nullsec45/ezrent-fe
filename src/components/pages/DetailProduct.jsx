'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/elements/card/ProductCard';
import ProductMainContent from '@/components/elements/detailProduct/ProductMainContent';
import ProductDescription from '@/components/elements/detailProduct/ProductDescription';
import useDetailProduct from '@/hooks/api/useDetailProduct';
import PropTypes from 'prop-types';
import ProductReviews from '@/components/elements/detailProduct/ProductReviews';

export default function DetailProduct({ productId }) {
  const { data: product } = useDetailProduct(productId);
  return (
    <div className="container">
      <Breadcrumbs
        items={[
          {
            name: 'Produk',
            link: '/products',
          },
          {
            name: product?.name,
            link: '#',
          },
        ]}
      />

      <ProductMainContent productId={productId} />

      <div className="mb-14 mt-28 lg:px-3">
        <ProductDescription productId={productId} />
        {/* review */}
        <ProductReviews productId={productId} />
      </div>
    </div>
  );
}

DetailProduct.propTypes = {
  productId: PropTypes.number.isRequired,
};
