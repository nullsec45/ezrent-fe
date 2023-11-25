import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Search from '@/components/elements/search/Search';

const listCategories = [
  {
    id: 'alatStudio',
    name: 'Alat Studio',
  },
  {
    id: 'alatMedis',
    name: 'Alat Medis',
  },
  {
    id: 'bajuPesta',
    name: 'Baju Pesta',
  },
  {
    id: 'dapur',
    name: 'Dapur',
  },
  {
    id: 'laptop',
    name: 'Laptop',
  },
  {
    id: 'mobil',
    name: 'Mobil',
  },
];
export default function CategoryFilter() {
  const [categories, setCategories] = useState(listCategories);
  const [searchedCategories, setSearchedCategories] = useState(categories);

  const searchCategory = (e) => {
    const { value } = e?.target;
    const categorySearchResult = categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedCategories(categorySearchResult);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="">
        <AccordionTrigger className="hover:no-underline">
          Kategori
        </AccordionTrigger>
        <AccordionContent className="px-1 pt-3">
          <Search onChange={searchCategory} />

          <RadioGroup className="space-y-2 my-4">
            {!searchedCategories.length && (
              <div className="text-gray-400 font-medium">
                Kategori tidak ditemukan
              </div>
            )}
            {searchedCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
