import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function FieldInputGroup() {
  return (
    <div className="flex w-full items-center">
      <Input
        type="search"
        placeholder="Search"
        className="rounded-r-none border border-input focus:border-black bg-background ring-offset-background  focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-ring focus-visible:-ring-offset-0"
      />
      <Button type="submit" className="rounded-l-none">
        <Search />
      </Button>
    </div>
  );
}
