import useDetailProduct from '@/hooks/api/useDetailProduct';
import {
  calculateRentalDurationDay,
  formatPrice,
} from '@/utils/helperFunction';
import Image from 'next/image';

export default function ProductCheckoutCard({
  productId,
  quantity,
  rentPeriod,
  price,
  subTotal,
}) {
  const { data: product, isLoading } = useDetailProduct(productId);

  if (isLoading || !product) return <div>Loading</div>;

  const dayFrom = new Date(rentPeriod.from);
  const dayTo = new Date(rentPeriod.to);
  const rentalDurationInDay = calculateRentalDurationDay(dayFrom, dayTo);

  return (
    <div className="flex items-center gap-3 bg-gray-100 py-2 pl-2 pr-6 rounded-xl">
      <div className="w-12 h-12 relative overflow-hidden rounded-md">
        <Image src={product.productPictures[0]?.url} alt={product.name} fill />
      </div>

      <div className="flex flex-1 justify-between items-center">
        <div className="space-y-2">
          <p className="font-medium text-sm line-clamp-1">{product.name}</p>
          <div className="font-medium text-xs text-gray-500">
            <span>Rp</span>
            <span>{formatPrice(price)}</span>
            <span> / Hari</span>
          </div>
        </div>

        <div className="space-y-2 text-end">
          <div className="font-bold text-sm">
            <span>Rp</span>
            <span>{formatPrice(subTotal)}</span>
          </div>
          <div className="font-medium text-xs text-gray-500">
            <span>{quantity}</span>
            <span> Barang</span>
            <span> | </span>
            <span>{rentalDurationInDay}</span>
            <span> Hari</span>
          </div>
        </div>
      </div>
    </div>
  );
}
