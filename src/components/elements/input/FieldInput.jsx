import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FieldInput({
  label,
  name,
  type,
  placeholder,
  register,
  min,
  required,
}) {
  return (
    <>
      <Label htmlFor={name} className="capitalize">
        {label ? label : name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        min={min}
        required={required}
        className={type == 'file' ? 'cursor-pointer' : null}
      />
    </>
  );
}
