import Image from 'next/image';

export default function ProductCheckoutCard({
  name = 'Product Name',
  price = '300.000',
  subTotal = '4.000.000',
  pcs = 4,
  rent = 5,
}) {
  return (
    <div className="flex items-center gap-3 bg-gray-100 py-2 pl-2 pr-6 rounded-xl">
      <div className="w-12 h-12 relative overflow-hidden rounded-md bg-gray-300">
        <Image src={''} alt="product photo" fill />
      </div>

      <div className="flex flex-1 justify-between items-center">
        <div className="space-y-2">
          <p className="font-medium text-sm line-clamp-1">{name}</p>
          <div className="font-medium text-xs text-gray-500">
            <span>Rp</span>
            <span>{price}</span>
            <span> / Hari</span>
          </div>
        </div>

        <div className="space-y-2 text-end">
          <div className="font-bold text-sm">
            <span>Rp</span>
            <span>{subTotal}</span>
          </div>
          <div className="font-medium text-xs text-gray-500">
            <span>{pcs}</span>
            <span> pcs</span>
            <span> | </span>
            <span>{rent}</span>
            <span> Hari</span>
          </div>
        </div>
      </div>
    </div>
  );
}
