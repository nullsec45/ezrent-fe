'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/elements/card/ProductCard';
import ProductMainContent from '@/components/elements/detailProduct/ProductMainContent';
import ProductDescription from '@/components/elements/detailProduct/ProductDescription';
import useDetailProduct from '@/hooks/api/useDetailProduct';
import PropTypes from 'prop-types';
import ProductReviews from '@/components/elements/detailProduct/ProductReviews';

const products = [
  {
    id: 'c63b7789-3859-4d88-84b2-b8cc39dc5d37',
    categoryId: 'c58d789f-c681-4b36-9710-411bfbb6f7b3',
    storeId: 'c41c7358-4c1b-4f01-8b99-9883b6c9a394',
    name: 'XBOX ONE',
    description: 'description XBOX one',
    price: 150000,
    maximumRental: 10,
    stock: 100,
    availableStock: 98,
    createdAt: '2023-11-23T05:02:05.617Z',
    updatedAt: '2023-11-23T05:06:25.483Z',
    productPictures: [
      {
        id: 'bddfe5c8-3f1a-40ac-8733-60b4f079e322',
        url: 'https://example.com/xbox.jpg',
        productId: 'c63b7789-3859-4d88-84b2-b8cc39dc5d37',
      },
    ],
    store: {
      id: 'c41c7358-4c1b-4f01-8b99-9883b6c9a394',
      name: 'TechShop',
      storeAddress: null,
    },
  },
];

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

        <div className="mt-10">
          <h1 className="text-xl font-medium ">Produk yang Berkaitan</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 lg:gap-4 py-6  flex-1">
            {products.map((product, index) => (
              <>
                <ProductCard key={product.id + index} product={product} />
                <ProductCard key={product.id + index} product={product} />
                <ProductCard key={product.id + index} product={product} />
                <ProductCard key={product.id + index} product={product} />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

DetailProduct.propTypes = {
  productId: PropTypes.number.isRequired,
};
