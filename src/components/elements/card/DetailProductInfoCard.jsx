import { IoBagCheckOutline } from 'react-icons/io5';

export default function DetailProductInfoCard({
  icon = <IoBagCheckOutline size={23} />,
  title = 'Title',
  value = 'value',
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gray-100 text-gray-400 rounded-[0.65rem]">
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-xs md:text-sm">{title}</p>
        <p className="text-black font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}
