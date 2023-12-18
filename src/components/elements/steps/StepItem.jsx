import { MdLocationOn } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export default function StepItem({
  title = 'Title',
  label = 'Label',
  icon,
  hidden,
  disabled,
}) {
  return (
    <div
      className={twMerge(
        'flex items-center gap-2',
        disabled && 'opacity-40',
        hidden && 'hidden md:flex'
      )}
    >
      <div>{icon || <MdLocationOn className="w-6 h-6" />}</div>
      <div className="font-medium">
        <p className="text-[10px] md:text-xs">{title}</p>
        <p className="text-sm md:text-base leading-none">{label}</p>
      </div>
    </div>
  );
}
