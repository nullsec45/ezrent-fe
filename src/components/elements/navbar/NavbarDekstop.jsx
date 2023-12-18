import FieldInputGroup from '@/components/elements/input/FieldInputGroup';
import NavbarMenuDekstop from './NavbarMenuDekstop';

export default function NavbarDekstop() {
  return (
    <div className="hidden lg:flex lg:justify-between items-center gap-3 w-full">
      <FieldInputGroup />
      <NavbarMenuDekstop />
    </div>
  );
}
